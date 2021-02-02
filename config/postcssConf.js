/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 14:35:23
 * @LastEditors: Charles
 * @LastEditTime: 2019-06-20 16:53:27
 */
const autoprefixer = require('autoprefixer');

//设置 postcss配置
module.exports = {
  postcssOptions: {
    plugins: [autoprefixer()],
  },
};
