const {
  createFileSync,
  createWriteStream,
  readFileSync,
  existsSync,
  mkdir,
  getCurFilePath,
  isAbsolute,
} = require('../fileService');

const fs = require('fs');
const path = require('path');

// global data filed
const mockContent = 'this is string test string...';
const mockFilename = 'test.txt';
const completePath = path.resolve(__dirname, mockFilename);
const errorFileNotPrepared = new Error('testing file is not prepared...');
const mockDirname = 'mock';
const completeDirPath = path.resolve(__dirname, mockDirname);

describe('file service:', () => {
  it('create file sync:', () => {
    createFileSync(completePath, mockContent);
    const content = fs.readFileSync(completePath).toString();
    expect(content).toBe(mockContent);
  });

  it('create write stream:', (done) => {
    fs.writeFileSync(completePath, mockContent);
    if (!fs.existsSync(completePath)) throw errorFileNotPrepared;
    const writeStream = createWriteStream(completePath);
    const newLabel = 'hello, this is new label test...';
    writeStream.write(newLabel, 'utf8');
    writeStream.end();
    writeStream.on('finish', () => {
      const content = fs.readFileSync(completePath).toString();
      expect(content).toBe(newLabel);
      done();
    });
  });

  it('read file sync:', () => {
    fs.writeFileSync(completePath, mockContent);
    if (!fs.existsSync(completePath)) throw errorFileNotPrepared;
    const result = readFileSync(completePath);
    const content = fs.readFileSync(completePath).toString();
    expect(result).toBe(content);
  });

  it('exists sync:', () => {
    const notExist = existsSync(completePath);
    expect(notExist).toBe(false);
    fs.writeFileSync(completePath, mockContent);
    if (!fs.existsSync(completePath)) throw errorFileNotPrepared;
    const exist = existsSync(completePath);
    expect(exist).toBe(true);
  });

  it('mkdir', () => {
    mkdir(completeDirPath);
    const result = fs.existsSync(completeDirPath);
    expect(result).toBe(true);
    try {
      mkdir(completeDirPath);
    } catch (error) {
      expect(error.message).toMatch(/EEXIST: file already exists/);
    }
  });

  it('mkdir access control:', () => {
    mkdir(completeDirPath);
    fs.accessSync(completeDirPath, fs.constants.W_OK | fs.constants.R_OK);
  });

  it('getCurFilePath', () => {
    const dirname = 'mock';
    const result = getCurFilePath(dirname);
    const workspace = process.cwd();
    expect(result).toBe(path.resolve(workspace, dirname));
  });

  it('get absolute path:', () => {
    const relationPath = './build';
    const absolutePath = '/Users';
    const relationResult = isAbsolute(relationPath);
    const absoluteResult = isAbsolute(absolutePath);
    const workspace = process.cwd();
    expect(relationResult).toBe(path.resolve(workspace, relationPath));
    expect(absoluteResult).toBe(absoluteResult);
  });

  afterEach(() => {
    if (fs.existsSync(completePath)) {
      fs.unlinkSync(completePath);
    }
    if (fs.existsSync(completeDirPath)) {
      fs.rmdirSync(completeDirPath);
    }
  });
});
