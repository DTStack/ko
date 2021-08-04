const { formatBundle, getCurDirPath, getCurFilePath } = require('../');
const path = require('path');
const fs = require('fs');

describe('index.js:', () => {
  it('format bundle:', () => {
    const mockData = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = formatBundle(mockData, 3);
    expect(result).toEqual({
      vendor_1: [1, 2, 3],
      vendor_2: [4, 5, 6],
      vendor_3: [7, 8],
    });

    const result2 = formatBundle(mockData, 1);
    expect(result2).toEqual({
      vendor_1: [1],
      vendor_2: [2],
      vendor_3: [3],
      vendor_4: [4],
      vendor_5: [5],
      vendor_6: [6],
      vendor_7: [7],
      vendor_8: [8],
    });
  });

  it('getCurDirPath:', () => {
    const mockDirname = 'build';
    const workspace = process.cwd();
    const completeDirPath = path.resolve(workspace, mockDirname);
    try {
      fs.mkdirSync(completeDirPath);
      if (!fs.existsSync(completeDirPath))
        throw new Error('testing directory is not prepared...');
      const result = getCurDirPath(mockDirname);
      expect(result).toBe(completeDirPath);
    } catch (err) {
      throw err;
    } finally {
      if (fs.existsSync(completeDirPath)) fs.rmdirSync(completeDirPath);
    }
  });

  it('getCurFilePath', () => {
    const filename = 'test.txt';
    const result = getCurFilePath(filename);
    const workspace = process.cwd();
    expect(result).toBe(path.resolve(workspace, filename));
  });
});
