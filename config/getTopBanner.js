/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-12 11:19:07
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:20:31
 */

const date = new Date();


/**
 * @description: 设置文件打包banner
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:20:05
 */
module.exports=function (){
 return {
    banner: [
        '/*!',
        ' * @project        ' + 'dtux',
        ' * @name           ' + 'dtux',
        ' * @author         ' + 'dtux',
        ' * @build          ' +  date.toString(),
        ' * @release        ' + 'v1.2.8',
        ' * @copyright      Copyright (c) ' + date.getFullYear() + ' ',
        ' *',
        ' */',
        ''
    ].join('\n'),
    raw: true
  }
}