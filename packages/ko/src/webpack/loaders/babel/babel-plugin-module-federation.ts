import { isAbsolute } from 'path';
import { NodePath } from '@babel/traverse';
import Types from '@babel/types';

type IAlias = { [key: string]: string };

type IExternals = { [key: string]: string };

function matchLib({
  path,
  webpackAlias,
  webpackExternals,
}: {
  path: string;
  webpackAlias: IAlias;
  webpackExternals: IExternals;
}) {
  const NODE_MODULES_REG = /node_modules/;
  if (path.startsWith('.')) {
    return false;
  }
  // at now we only consider the case object type of webpack externals
  if (webpackExternals[path]) {
    return false;
  }
  if (isAbsolute(path)) {
    return NODE_MODULES_REG.test(path);
  }
  if (webpackAlias[path]) {
    //TODO: we should get absolute path of webpack alias here
    return NODE_MODULES_REG.test(webpackAlias[path]);
  }
  return true;
}

function importSpecifiersDetail(specifiers: any[], t: typeof Types) {
  return specifiers.reduce(
    (current, node) => {
      if (t.isImportSpecifier(node)) {
        current.begin.push(t.objectProperty(node.imported, node.local));
      } else {
        current.begin.push(
          t.objectProperty(t.identifier('default'), node.local)
        );
        current.defaultImportIdentifier = node.local;
      }
      return current;
    },
    {
      begin: [],
      defaultImportIdentifier: null,
    }
  );
}

function babelPluginMFImport({ types: t }: { types: typeof Types }) {
  return {
    visitor: {
      Program: {
        exit(
          path: NodePath<Types.Program>,
          opts: {
            remoteName: string;
            webpackAlias: IAlias;
            webpackExternals: IExternals;
            onMatch: (path: string, filepath: string) => void;
          }
        ) {
          const begin = [];
          const end = [];
          let len = path.node.body.length - 1;
          while (len >= 0) {
            const node = path.node.body[len];
            if (t.isImportDeclaration(node)) {
              const isMatch = matchLib({
                path: node.source.value,
                webpackAlias: opts.webpackAlias,
                webpackExternals: opts.webpackExternals,
              });
              // style file should be extract
              if (isMatch) {
                opts.onMatch(
                  node.source.value,
                  (path.hub as any).file.opts.filename
                );
                const { begin, defaultImportIdentifier } =
                  importSpecifiersDetail(node.specifiers, t);
                const id = t.objectPattern(begin);
                const init = t.awaitExpression(
                  t.callExpression(t.import(), [
                    t.stringLiteral(`${opts.remoteName}/${node.source.value}`),
                  ])
                );
                if (defaultImportIdentifier) {
                  //transfer to: const a = await import('./mod')
                  begin.unshift(
                    t.variableDeclaration('const', [
                      t.variableDeclarator(defaultImportIdentifier, init),
                    ])
                  );
                } else {
                  // transfer to const { a } = await import('./mode')
                  begin.unshift(
                    t.variableDeclaration('const', [
                      t.variableDeclarator(id, init),
                    ])
                  );
                }
              }
            }
            // export { foo } from './foo'
            if (t.isExportNamedDeclaration(node) && node.source) {
              const isMatch = matchLib({
                path: node.source.value,
                webpackAlias: opts.webpackAlias,
                webpackExternals: opts.webpackExternals,
              });
              if (isMatch && node.specifiers.length) {
                const id = t.objectPattern(
                  node.specifiers.reduce((current, n) => {
                    t.isExportSpecifier(n) &&
                      current.push(t.objectProperty(n.exported, n.local));
                    return current;
                  }, [] as Types.ObjectProperty[])
                );
                const init = t.awaitExpression(
                  t.callExpression(t.import(), [
                    t.stringLiteral(`${opts.remoteName}/${node.source.value}`),
                  ])
                );
                begin.unshift(
                  t.variableDeclaration('const', [
                    t.variableDeclarator(id, init),
                  ])
                );
                // transfer export { bar } from 'mod' to export { bar }
                node.source = null;
              }
            }
            path.node.body.splice(len, 1);
            len--;
          }
        },
      },
    },
  };
}

export default babelPluginMFImport;
