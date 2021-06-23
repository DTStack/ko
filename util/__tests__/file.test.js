const { getFileRealPath } = require('../file');
const path = require('path');

describe('file utils:', () => {
  it('module import:', () => {
    expect(getFileRealPath).toBeInstanceOf(Function);
  });

  it('getFileRealPath', () => {

    const workspace = process.cwd();
    const dirname = 'build';

    const realPath = getFileRealPath(dirname);
    expect(realPath).toBe(
      path.resolve(workspace, dirname)
    )
  })
});

