/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: xiuneng
 * @Date: 2019-01-07 17:06:53
 * @LastEditors: xiuneng
 * @LastEditTime: 2019-01-08 16:49:48
 */


const Colors = require('colors');
const Log = console.log;
const fs = require('fs');
const { resolveApp } = require('../config/defaultPaths');
const url = require('url');
const { get } = require('../util/request');
const Mustache = require('mustache');

interface StringArray {
    [index: number]: string | object;
}
enum method {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
}

module.exports = (path: String) => {
    let result = url.parse(path);
    const apiDoc = `${result.protocol}//${result.host}/v2/api-docs`;
    get({}, apiDoc).then((res: any) => {
        let result: Array<{ name: string, description: string, data: object[] }> = [];
        res.tags.map((item: { name: string, description: string, }) => {
            result.push({ name: item.name, description: item.description, data: [] });
        })
        Object.keys(res.paths).map((reqApi: string) => {
            const method: method = <method>Object.keys(res.paths[reqApi])[0];
            const info = res.paths[reqApi][method];
            let object = <{ name: string, description: string, data: object[] }>result.find(o => o.name == info.tags[0]);
            object.data.push({ ...info, path: reqApi });
        })
        Log(result[0].data);
        let temp: String = fs.readFileSync(resolveApp('resultTemp.js', "utf-8")).toString();
        let rend = Mustache.render(temp, { result: result });
        fs.writeFile('./result.js', rend, function (err: Error) {
            if (err) Log(Colors.red('写文件操作失败'));
            else Log(Colors.green('写文件操作成功'));
        })
        /* let result: StringArray = {};
        let apis: StringArray = {};
        let tags: String[] = res.tags;
        Object.keys(res.paths).map((index) => {
            const item: { operationId: number } = res.paths[index].get || res.paths[index].post;
            result[item.operationId] = index;
            apis[item.operationId] = item;
        })
        fs.writeFile('./result.js', 'export default' + JSON.stringify(result, null, '\n'), function (err: Error) {
            if (err) Log(Colors.red('写文件操作失败'));
            else Log(Colors.green('写文件操作成功'));
        }) */
    })
}