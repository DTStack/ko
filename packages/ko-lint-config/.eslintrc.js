module.exports = {
  root: true, // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果发现配置文件中有 “root”: true，它就会停止在父级目录中寻找。
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8, // 支持es8语法，但并不意味着同时支持新的 ES8 全局变量或类型
    sourceType: 'module', // 指定来源的类型，"script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    // "project": "./tsconfig.json",
    // 使用的额外的语言特性
    ecmaFeatures: {
      jsx: true, // 启用 jsx
      tsx: true, // 启用 tsx
      globalReturn: true, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.6.3',
    },
  },
  env: {
    es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
    node: true, // Node.js 全局变量和 Node.js 作用域
    browser: true, // 浏览器全局变量
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', 'react', 'jsx-a11y', 'react-hooks', 'dt-react'],
  globals: {
    expect: 'readonly',
    test: 'readonly',
    describe: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    jest: 'readonly',
  },
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    semi: 0,
    strict: 0,
    // 缩进
    indent: [
      // TODO offsetTernaryExpressions
      0,
      4,
      {
        SwitchCase: 1, // 指定 switch-case 语句的缩进级别
        VariableDeclarator: 1, // 指定 var 变量声明语句的缩进级别
        outerIIFEBody: 1, // 指定 IIFE（立即调用的函数表达式）的缩进级别
        MemberExpression: 1, // 指定多行属性链的缩进级别
        FunctionDeclaration: { parameters: 1, body: 1 }, // 通过传入一个对象来指定函数声明的缩进规则
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 }, // 通过传入一个对象来指定函数调用表达式的缩进规则
        ArrayExpression: 1, // 指定数组中的元素的缩进级别
        ObjectExpression: 1, // 指定对象中的属性的缩进级别
        ImportDeclaration: 1, // 指定 import 语句的缩进级别
        flatTernaryExpressions: false, // 指定是否需要缩进嵌套在其他三元表达式中的三元表达式
        offsetTernaryExpressions: true, // 三元表达式的缩进
        ignoreComments: false, // 指定注释是否需要需要与前一行或下一行的节点对齐
        ignoredNodes: [
          'TemplateLiteral *',
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
      },
    ],
    // 建议驼峰命名
    camelcase: [
      1,
      {
        ignoreDestructuring: true, // 忽略解构时的驼峰命名校验
      },
    ],
    eqeqeq: 0,
    'arrow-body-style': 0, // 控制箭头函数的语法形式
    'object-shorthand': 2, // 对象的 key 和 value 一致时要求简写
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ], // 当最后一个元素或属性与结束或属性位于不同的行时，要求末尾逗号
    'lines-between-class-members': 0, // 方法间是否空行间隔开
    'space-before-function-paren': [
      // 箭头函数是否要求始终有小括号
      // 函数括号前的空格
      2,
      {
        anonymous: 'always', // 匿名函数表达式，例如 function () {}
        named: 'never', // 命名函数表达式，例如 function foo () {}
        asyncArrow: 'always', // 异步箭头函数表达式，例如 async () => {}
      },
    ],
    'one-var': 0, // 可同时定义多个变量，逗号隔开
    'dot-notation': 0, // 允许方括号表示法 foo['bar']
    'multiline-ternary': 0, // 三元运算符不强制换行
    'prefer-regex-literals': 0, // 正则的构造函数
    'prefer-promise-reject-errors': 0, // reject 仅接收 Error 对象
    'prettier/prettier': 0, // prettier 在三元运算符换行处的缩进有问题

    'no-eval': 1,
    'no-prototype-builtins': 0,
    'no-mixed-operators': 1, // 混合使用不同的运算符，建议添加括号增加代码的可读性
    'no-return-assign': 0, // return 的代码中有运算
    'no-useless-escape': 1,
    'no-useless-constructor': 0, // 空构造函数
    'no-template-curly-in-string': 0,
    'no-console': 0,
    'no-debugger': 2,
    'no-param-reassign': 2, // 给函数的入参赋值
    'no-use-before-define': 0, // 使用尚未声明的变量
    'no-async-promise-executor': 1, // new Promise 构造函数中有 async

    'import/no-extraneous-dependencies': 0,
    'import/no-absolute-path': 0,

    /**
     * 是否强制组件中的方法顺序，顺序如下：
     * 1、静态方法和属性
     * 2、生命周期方法：displayName, propTypes, contextTypes, childContextTypes, mixins, statics, defaultProps, constructor, getDefaultProps, state, getInitialState, getChildContext, getDerivedStateFromProps, componentWillMount, UNSAFE_componentWillMount, componentDidMount, componentWillReceiveProps, UNSAFE_componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate, UNSAFE_componentWillUpdate, getSnapshotBeforeUpdate, componentDidUpdate, componentDidCatch, componentWillUnmount（按此顺序）。
     * 3、自定义方法
     * 4、render方法
     */
    'react/sort-comp': 0,
    'react/display-name': [0],
    'react/jsx-uses-react': 1, // 防止 require('react') 被 JSX 语法错误的标记为未使用
    'react/prefer-stateless-function': 0, // 是否强制将无状态的 React 组件编写为纯函数
    'react/jsx-closing-bracket-location': 0, // 验证 JSX 中右括号的位置是否与开始标签对齐
    'react/prop-types': [0, { ignore: ['children'] }], // 验证 React 组件中是否缺少 Props 属性
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.tsx', '.js', '.jsx'] },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-boolean-value': [1, 'never'],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,

    'jsx-quotes': 1,
    'dt-react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'dt-react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        // beforeSelfClosing: 'proportional-always',
        beforeClosing: 'proportional-always',
      },
    ],
    'dt-react/jsx-wrap-multilines': 1,
    'dt-react/self-closing-comp': [
      1,
      {
        component: true,
        html: false,
      },
    ],

    'jsx-a11y/no-static-element-interactions': 0,

    '@typescript-eslint/no-unused-vars': [
      2,
      { vars: 'all', args: 'none', ignoreRestSiblings: false },
    ],
    '@typescript-eslint/semi': [2, 'always'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-empty-function': 0, // 允许函数内容为空
    '@typescript-eslint/no-this-alias': [
      // 允许 this 别名
      1,
      {
        allowDestructuring: false, // 不允许从 this 中解构，默认值 true
        allowedNames: ['self', '_this', 'that', 'ctx'], // 允许的别名，默认值 []
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_', // 函数参数忽略以下划线开头的变量
        destructuredArrayIgnorePattern: '^_', // 解构数组忽略以下划线开头的变量
        caughtErrorsIgnorePattern: '^err', // 捕获错误忽略以 err 开头的变量
      },
    ],

    'standard/object-curly-even-spacing': 0,
    // standard 要求 callback 内的值不为具体值
    'standard/no-callback-literal': 0,
    'n/no-callback-literal': 0,
  },
};
