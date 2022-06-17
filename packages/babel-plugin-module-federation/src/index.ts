import { NodePath } from '@babel/traverse';
// import { checkIfMatch } from './utils';
import Types from '@babel/types';

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

type IOptions = {
  remoteName: string;
  externals: Record<string, string>;
  alias: Record<string, string>;
  onMatch: Function;
};

module.exports = function ({ types: t }: { types: typeof Types }) {
  return {
    name: 'babel-plugin-module-federation',
    visitor: {
      Program: {
        exit(
          path: NodePath<Types.Program>,
          {
            opts,
          }: {
            opts: IOptions;
          }
        ) {
          const { remoteName, externals, alias, onMatch } = opts;
          const begin: Types.Statement[] = [];
          let len = path.node.body.length - 1;
          while (len >= 0) {
            const node = path.node.body[len];
            if (t.isImportDeclaration(node)) {
              // const isMatch = checkIfMatch(node.source.value, {
              //   externals,
              //   alias,
              // });
              const isMatch = true;
              if (isMatch) {
                onMatch(node.source.value);
                const { begin, defaultImportIdentifier } =
                  importSpecifiersDetail(node.specifiers, t);
                const id = t.objectPattern(begin);
                const init = t.awaitExpression(
                  t.callExpression(t.import(), [
                    t.stringLiteral(`${remoteName}/${node.source.value}`),
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
                // path.node.body.splice(len, 1);
              }
            }
            // // export { foo } from './foo'
            // if (t.isExportNamedDeclaration(node) && node.source) {
            //   const isMatch = checkIfMatch(node.source.value, {
            //     externals,
            //     alias,
            //   });
            //   if (isMatch && node.specifiers.length) {
            //     const id = t.objectPattern(
            //       node.specifiers.reduce((current, n) => {
            //         t.isExportSpecifier(n) &&
            //           current.push(t.objectProperty(n.exported, n.local));
            //         return current;
            //       }, [])
            //     );
            //     const init = t.awaitExpression(
            //       t.callExpression(t.import(), [
            //         t.stringLiteral(`${remoteName}/${node.source.value}`),
            //       ])
            //     );
            //     begin.unshift(
            //       t.variableDeclaration('const', [
            //         t.variableDeclarator(id, init),
            //       ])
            //     );
            //     // transfer export { bar } from 'mod' to export { bar }
            //     node.source = null;
            //   }
            // }
            // len--;
          }
          // path.node.body = begin.concat(path.node.body);
        },
      },
    },
  };
};
