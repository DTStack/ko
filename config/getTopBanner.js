const  moment =require('moment');

module.exports=function (){
 return {
    banner: [
        '/*!',
        ' * @project        ' + 'dtux',
        ' * @name           ' + 'dtux',
        ' * @author         ' + 'dtux',
        ' * @build          ' + moment().format('llll') + ' ET',
        ' * @release        ' + 'v1.2.8',
        ' * @copyright      Copyright (c) ' + moment().format('YYYY') + ' ' + "袋鼠云",
        ' *',
        ' */',
        ''
    ].join('\n'),
    raw: true
  }
}