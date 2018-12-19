process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const getWebpackDll = require('../config/webpackDll');
const colors=require('colors');
const log=console.log;
module.exports = ()=> {
    let webpackDll = getWebpackDll();

    log(colors.green('start dll ...'));
    webpack(webpackDll, (error, stats) => {
        if (error) {
            throw error;
        } else {
            log(
                stats.toString({
                    colors: true,
                    chunks: false,
                    children: false,
                    modules: false,
                    chunkModules: false
                })
            );
            if (stats.hasErrors()) {
                throw new Error('webpack dll compiled failed.');
            }
        }
    });
}