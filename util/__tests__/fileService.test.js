const {
  createFileSync,
  createWriteStream,
  readFileSync,
  existsSync,
  mkdir,
  getCurFilePath,
  isAbsolute
} = require('../fileService');

const fs = require('fs');
const path = require('path');

// global data filed
const str = 'this is string test string...';
const filename = 'test.txt';
const completePath = path.resolve(__dirname, filename);
const errorFileNotPrepared = new Error('testing file is not prepared...');

describe('file service:', () => {
  it('create file sync:', () => {
    createFileSync(completePath, str);
    const content = fs.readFileSync(completePath).toString();
    expect(content).toBe(str);
  });

  it('create write stream:', done => {
    fs.writeFileSync(completePath, str);
    if (!fs.existsSync(completePath))
      throw errorFileNotPrepared;
    const writeStream = createWriteStream(completePath);
    const newLabel = 'hello, this is new label test...';
    writeStream.write(newLabel, 'utf8');
    writeStream.end();
    writeStream.on('finish', () => {
      const content = fs.readFileSync(completePath).toString();
      expect(content).toBe(newLabel);
      done();
    })
  });

  it('read file sync:', () => {
    fs.writeFileSync(completePath, str);
    if (!fs.existsSync(completePath))
      throw errorFileNotPrepared;
    const result = readFileSync(completePath);
    const content = fs.readFileSync(completePath).toString();
    expect(result).toBe(content);
  })

  afterEach(() => {
    if (fs.existsSync(completePath)) {
      fs.unlinkSync(completePath);
    }
  })
})

