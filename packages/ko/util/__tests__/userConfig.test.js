const path = require('path');
const workspace = process.cwd();
const filename = 'ko.config.js';
const complatePath = path.resolve(workspace, filename);
const fs = require('fs');

const mockComfigTemplate = `
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const copyConfig = [
  { from: path.resolve(__dirname, 'public/config'), to: 'config' },
  { from: path.resolve(__dirname, 'public/assets'), to: 'assets' },
];

if (process.env.NODE !== 'production') {
  copyConfig.push({ from: path.resolve(__dirname, 'public/mock'), to: 'mock' });
}

module.exports = () => {
  return {
    server: {
      host: '127.0.0.1',
      port: 8082,
    },
    proxy: [],
    dll: [
      'classnames',
    ],
    webpack: {
      entry: ['./src/app.tsx'],
      output: {
        publicPath: isDev ? '/' : '/publicService/',
      },
      plugins: [],
      externals: {
        APP_CONF: 'APP_CONF',
      },
    },
  };
};
`;

describe('get user config:', () => {
  it('whithout ko.config.js:', () => {
    const userConfig = require('../userConfig');
    expect(userConfig).toEqual({
      webpack: {},
      babel: {},
      prettier: '',
      eslint: '',
    });
  });

  it('with ko.config.js', () => {
    fs.writeFileSync(complatePath, mockComfigTemplate);
    const userConfig = require('../userConfig');
    expect(userConfig).toEqual({
      webpack: {
        entry: ['./src/app.tsx'],
        output: {
          publicPath: '/publicService/',
        },
        plugins: [],
        externals: {
          APP_CONF: 'APP_CONF',
        },
      },
      babel: {},
      prettier: '',
      eslint: '',
    });
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    if (fs.existsSync(complatePath)) fs.unlinkSync(complatePath);
  });
});
