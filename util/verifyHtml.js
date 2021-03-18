/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-19 14:05:34
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:32:55
 */
const {
  createFileSync,
  readFileSync,
  existsSync,
  mkdir,
} = require('./fileService');
const { appPublic } = require('../config/defaultPaths');
/**
 * @description: 模版文件默认引入
 * @param1: path 模版文件路径
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:32:09
 */
module.exports = function (path) {
  if (!existsSync(appPublic)) mkdir(appPublic);
  const txt = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <%= htmlWebpackPlugin.options.assets.config %>
            </head>
            <body>
                <div id='root'></div>
                <div class="dll">
                    <%= htmlWebpackPlugin.options.assets.scripts %>
                </div>
            </body>
            </html>
        `;
  if (!existsSync(path)) {
    createFileSync(path, txt);
  } else {
    let txt = readFileSync(path);
    const reg_script = /htmlWebpackPlugin.options.assets.scripts/;
    const ret_config = /htmlWebpackPlugin.options.assets.config/;
    if (!reg_script.test(txt)) {
      const insertTxt = `<div class="dll">
                  <%= htmlWebpackPlugin.options.assets.scripts %>
             </div>`;
      txt = txt.replace(/(<\/body>([\s\S])*<\/html>)/g, `${insertTxt}\n$1`);
      createFileSync(path, txt);
    } else if (!ret_config.test(txt)) {
      const insertTxt = ` <%= htmlWebpackPlugin.options.assets.config %> `;
      txt = txt.replace(/(<\/head>([\s\S])*<\/html>)/g, `${insertTxt}\n$1`);
      createFileSync(path, txt);
    }
  }
};
