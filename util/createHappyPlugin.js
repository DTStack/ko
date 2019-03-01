/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2019-02-22 11:02:22
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-22 11:31:46
 */

const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
/**
 * @description: 创建happypackid
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date:2019-02-22 11:03:33
 */
module.exports={
    createHappyPlugin:function(id, loaders){
        return new HappyPack({
            id: id,
            loaders: loaders,
            threadPool: happyThreadPool
        })
    }
}