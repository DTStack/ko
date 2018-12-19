process.env.NODE_ENV = 'production';
const gulp = require('gulp');
const webpack = require('webpack');
const getWebpackPro = require('../config/webpackPro');

module.exports = function () {
  const webpackConfig = getWebpackPro();
  gulp.task('build', () => {
    gulp.start(['webpack']);
  });
  //webpack 打包工作流
  gulp.task('webpack', (done) => {
    webpack(webpackConfig, (error, stats) => {
      if (error) {
        throw error;
      } else {
        console.log(
          stats.toString({
            colors: true,
            chunks: false,
            children: false,
            modules: false,
            chunkModules: false,
          })
        );
        if (stats.hasErrors()) {
          throw new Error('webpack compiled failed.');
        }
      }
      done();
    });
  });

  gulp.start('build', (err) => {
    if (err) {
      console.log('ko BUILD ERROR');
      console.log(err.stack);
    } else {
      console.log('ko build finished');
    }
  });
}