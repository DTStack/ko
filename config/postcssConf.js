/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 14:35:23
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-13 17:26:11
 */
const autoprefixer = require('autoprefixer');

//设置 postcss配置
module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4.1'
      ],
    })
  ]
};
