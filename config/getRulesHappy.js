const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssConf = require('./postcssConf');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const STYLE_LOADER = require.resolve('style-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const FILE_LOADER = require.resolve('file-loader');
const VUE_LOADER = require.resolve('vue-loader');
const deepAssign = require('deep-assign');
const getBabelConf = require('./getBabelConf');
const BABEL_LOADER = require.resolve('babel-loader');
const autoprefixer = require.resolve('autoprefixer');
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
 * @Date: 2019-01-29 11:07:11
 */
function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool
    })
}

module.exports = () => {
    const babelConfig = getBabelConf();
    const miniCssExtractPluginLoader = {
        loader: MiniCssExtractPlugin.loader
    };
    const styleLoader = {
        loader: STYLE_LOADER
    }
    const loaderType = process.env.NODE_ENV == 'production' ? miniCssExtractPluginLoader : styleLoader;
    let happyPlugins = [];
    happyPlugins.push(
        createHappyPlugin('happy-babel-js', [{
            loader: BABEL_LOADER,
            options: deepAssign({}, babelConfig, {
                cacheDirectory: true
            })
        }]),
        // createHappyPlugin('happy-scss', [
        //     loaderType,
        //     {
        //         loader: CSS_LOADER,
        //         options: {
        //             sourceMap: true,
        //         },
        //     },
        //     {
        //         loader: POSTCSS_LOADER,
        //         options: Object.assign({
        //             sourceMap: true
        //         }, postcssConf),
        //     },
        //     {
        //         loader: SASS_LOADER,
        //         options: {
        //             sourceMap: true,
        //         },
        //     }
        // ]),
        // createHappyPlugin('happy-less', [
        //     loaderType,
        //     {
        //         loader: CSS_LOADER,
        //         options: {
        //             sourceMap: true,
        //         },
        //     },
        //     {
        //         loader: LESS_LOADER,
        //         options: {
        //             sourceMap: true,
        //             javascriptEnabled: true
        //         },
        //     },
        // ]),
    );
    return happyPlugins;
}