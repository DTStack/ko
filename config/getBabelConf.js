/*
 * @Description: 设置babel插件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 14:57:12
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 11:48:10
 */


/**
 * @description: 获取插件绝对路径
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:13:44
 */ 
function resolvePlugin(plugins) {
    return plugins.filter(Boolean).map((plugin) => {
        if (Array.isArray(plugin)) {
            const [pluginName, ...args] = plugin;
            return [require.resolve(pluginName), ...args];
        }
        return require.resolve(plugin);
    });
}

module.exports = () => {
    return {
        babelrc: false,
        presets: resolvePlugin([
            [
                '@babel/preset-env',
                {
                    modules: false,
                    useBuiltIns: 'entry',
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'ie >= 9',
                            'iOS >= 8',
                            'Android >= 4.1'
                        ],
                    },
                },
            ],
            '@babel/preset-react',
        ]),
        plugins: resolvePlugin([
            // Stage 0
            '@babel/plugin-proposal-function-bind',
            // Stage 1
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-logical-assignment-operators',
            ['@babel/plugin-proposal-optional-chaining', {
                loose: false
            }],
            ['@babel/plugin-proposal-pipeline-operator', {
                proposal: 'minimal'
            }],
            ['@babel/plugin-proposal-nullish-coalescing-operator', {
                loose: false
            }],
            '@babel/plugin-proposal-do-expressions',
            // Stage 2
            ['@babel/plugin-proposal-decorators', {
                legacy: true
            }],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            // Stage 3
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            ['@babel/plugin-proposal-class-properties', {
                loose: true
            }],
            '@babel/plugin-proposal-json-strings'
            // [
            //  "@babel/plugin-transform-runtime",
            //     {
            //         "helpers": false,
            //         "polyfill": false,
            //         "regenerator": true,
            //         "moduleName": "babel-runtime"
            //     }
            // ],
    
            ["babel-plugin-import", { "libraryName": "antd", "libraryDirectory": "lib"}, "ant"],
            ["babel-plugin-import", { "libraryName": "ant-mobile", "libraryDirectory": "lib"}, "ant-mobile"]
            ["babel-plugin-import", { "libraryName": "ant-design-vue", "libraryDirectory": "lib"}, "ant-design-vue"]
        
        ]),
    };
};