const { custom } = require('babel-loader');

export default custom((babel: any) => {
  return {
    customOptions({ moduleGraph, ...loader }: any) {
      return {
        custom: {
          moduleGraph,
        },
        loader,
      };
    },
  };
});
