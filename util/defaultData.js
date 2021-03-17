module.exports = {
  createChoiceData: [
    {
      name: 'component-创建基于react组件的目录',
      value: 'component',
    },
    {
      name: 'page-创建基于react页面的目录',
      value: 'page',
    },
  ],
  createComData: [
    {
      type: 'Input',
      name: 'name',
      message: '请输入组件名(以大驼峰法命名，如：HelloTable)',
      default: 'HelloTable',
    },
    {
      type: 'Input',
      name: 'ts',
      message: '是否使用TS？(y/n)',
      default: 'y',
    },
    {
      type: 'Input',
      name: 'path',
      message: '请输入生成目录(当前项目为根目录,默认为src/components/)',
      default: 'src/components/',
    },
  ],
  createPageData: [
    {
      type: 'Input',
      name: 'name',
      message: '请输入页面名称名(以小驼峰法命名，如：UserLogin)',
      default: 'UserLogin',
    },
    {
      type: 'Input',
      name: 'ts',
      message: '是否使用typescript？(y/n)',
      default: 'y',
    },
    {
      type: 'Input',
      name: 'path',
      message: '请输入生成目录(当前项目为根目录,默认为src/pages/)',
      default: 'src/pages/',
    },
    {
      type: 'Input',
      name: 'route',
      message: '请输入访问路径(默认为当前项目名称，如：/user-login)',
      default: '/user-login',
    },
    // {
    //     type: 'Input',
    //     name: 'layout',
    //     message: '请输入布局组件名(默认为：null)',
    //     default: 'null'
    // }
  ],
};
