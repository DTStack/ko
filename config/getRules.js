/*
 * @Description: 设置webpack rule 配置
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors: Charles
 * @LastEditTime: 2019-01-28 19:24:17
 */

const getBabelConf = require('./getBabelConf');
const colors = require('colors');
const deepAssign = require('deep-assign');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const postcssConf = require('./postcssConf');
const paths = require('./defaultPaths');

const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const LESS_LOADER = require.resolve('less-loader');
const STYLE_LOADER= require.resolve('style-loader');
const POSTCSS_LOADER = require.resolve('postcss-loader');
const SASS_LOADER = require.resolve('sass-loader');
const FILE_LOADER=require.resolve('file-loader');
const VUE_LOADER=require.resolve('vue-loader');
const URL_LOADER_LIMIT = 8192;

module.exports = () => {
    const babelConfig = getBabelConf();

    const miniCssExtractPluginLoader = {
        loader: MiniCssExtractPlugin.loader
    };
    const styleLoader={
        loader:STYLE_LOADER
    }
    const loaderType= process.env.NODE_ENV == 'production'?miniCssExtractPluginLoader:styleLoader;
    return [{
            test: /\.scss$/,
            use: [
                loaderType, 
                {
                    loader: CSS_LOADER,
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: POSTCSS_LOADER,
                    options: Object.assign({
                        sourceMap: true
                    }, postcssConf),
                },
                {
                    loader: SASS_LOADER,
                    options: {
                        sourceMap: true,
                    },
                }
            ],
        },
        {
            test: /\.css$/,
            use: [
                loaderType,
                {
                    loader: CSS_LOADER,
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: POSTCSS_LOADER,
                    options: Object.assign({
                        sourceMap: true
                    }, postcssConf),
                },
            ],
        },
        {
            test: /\.less$/,
            use: [
                loaderType,
                {
                    loader: CSS_LOADER,
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: POSTCSS_LOADER,
                    options: Object.assign({
                        sourceMap: true
                    }, postcssConf),
                },
                {
                    loader: LESS_LOADER,
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true 
                    },
                },
            ],
        },
        {
            test: /\.jsx|.js?$/,
            //exclude: /node_modules/,
            loader: BABEL_LOADER,
            options: deepAssign({}, babelConfig, {
                cacheDirectory: true
            }),
        },
        {
            test:/\.vue$/,
            loader:VUE_LOADER
        },
        {
            test: /\.(woff|woff2|svg|ttf|eot)$/,
            loader:FILE_LOADER ,
            options: {
                name: 'fonts/[hash].[ext]',
            }
          },
          {
            test: /\.(png|jpg|jpeg|gif)$/i,
            loader: FILE_LOADER,
            options: {
              name: 'imgs/[hash].[ext]',
            },
          },
    ];
};