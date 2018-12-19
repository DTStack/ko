const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./defaultPaths');
const getScript=require('./getScript');
const scripts=getScript();
//console.log(scripts,scripts);
module.exports = function getHtmlPlugins(entries) {
  if (typeof entries === 'string' || Array.isArray(entries)) {
    return [
      new HtmlWebpackPlugin({
        //inject: true,
        template: paths.appHtml,
        filename: "./index.html",
        minify: false,
        scripts
      }),
    ];
  }
  const entriesNames = Object.keys(entries);
  return entriesNames.map((entryName) => {
    return new HtmlWebpackPlugin({
      filename: `${entryName}.html`,
  
      template: paths.appHtml,
      minify: false,
      title: 'Custom template using Handlebars',
      scripts:'12113'
    });
  });
};
