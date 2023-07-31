const path = require('path');

const finalKoConfig = (function () {
  const ROOT_PATH = process.cwd();
  const APP_PATH = path.resolve(ROOT_PATH, 'src');
  const BUILD_PATH = path.resolve(ROOT_PATH, `dist`);
  const WEB_PUBLIC = path.resolve(APP_PATH, 'public');
  /**
   * @type {import("ko/lib/types").IOptions}
   */
  const baseKoConfig = {
    entry: path.join(APP_PATH, './main.tsx'),
    outputPath: BUILD_PATH,
    staticPath: APP_PATH,
    htmlTemplate: path.join(APP_PATH, './public/index.html'),
    alias: {
      '@': path.resolve('src'),
      public: path.resolve('src/public/'),
      styles: path.resolve('src/styles/'),
    },
    serve: {
      staticPath: path.join(process.cwd(), './src/public'),
    },
    copy: [
      {
        from: path.resolve(WEB_PUBLIC),
        to: path.resolve(BUILD_PATH, 'public'),
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ['**/index.html'],
        },
      },
    ],
    // more config can find in https://dtstack.github.io/ko/docs/current/configuration
  };
  // You can add extra ko config here
  const extraConfig = {};
  // You can add extra plugins config here
  const plugins = [];
  const config = { ...baseKoConfig, ...extraConfig, plugins };
  return config;
})();

module.exports = finalKoConfig;
