import configInstance from './config';

console.log(typeof configInstance.getFileRealPath);

describe('config instance', () => {
  it('getFileRealPath should return absolute path', () => {
    const absolutePath = '/foo/bar';
    expect(configInstance.getFileRealPath(absolutePath)).toBe(absolutePath);
    const relativePath = 'ko.config.js';
    expect(configInstance.getFileRealPath(relativePath)).toBe(
      process.cwd() + '/' + relativePath
    );
  });
  it('userConf should throw', () => {
    expect(() => {
      configInstance.userConf;
    }).toThrow();
  });
  it('defaultPaths should ', () => {
    const cwd = process.cwd();
    expect(configInstance.defaultPaths).toEqual({
      src: cwd + '/src',
      dist: cwd + '/dist',
      public: cwd + '/public',
      html: cwd + '/public/index.html',
      tsconfig: cwd + '/tsconfig.json',
    });
  });
});
