module.exports = {
    files: ['**/*.css', '**/*.scss'],
    customSyntax: require.resolve('postcss-scss'),
    extends: 'stylelint-config-standard',
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        // null 为关闭规则
        indentation: 4, // 缩进4格
        'declaration-empty-line-before': 'never', // 第一条属性声明前不允许有空行
        'selector-class-pattern': '[a-zA-Z]+', // className 的大小写
        // 规则之前的空行
        'rule-empty-line-before': [
            'always',
            {
                except: ['inside-block', 'first-nested', 'after-single-line-comment'],
            },
        ],
        'alpha-value-notation': 'number', // 小数显示数字(number)或百分数(percentage)
        'color-function-notation': 'legacy', // 颜色 rgba 等使用传统逗号隔开
        'color-hex-case': 'upper', // 颜色十六进制字符大写
        'selector-list-comma-newline-after': 'always-multi-line',
        'max-line-length': 300, // 最大宽度
        'font-family-no-missing-generic-family-keyword': null, // 是否必须包含通用字体
        'no-descending-specificity': null, // 选择器顺序
        'keyframes-name-pattern': null, // keyframes 推荐小写+连字符命名
        'no-empty-source': null, // 空文件
        'block-no-empty': null, // 空规则
    },
};
