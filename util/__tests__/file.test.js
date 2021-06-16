const { getFileRealPath } = require('../file');
const path = require('path');

describe('file utils:', () => {
  it('module import:', () => {
    expect(getFileRealPath).toBeInstanceOf(Function);
  });

  // it ('getFileRealPath', () => {

  //   const realPath = getFileRealPath('./a.js');
  //   expect(realPath).toBe(
  //     path.resolve(__dirname, 'a.js')
  //   )
  // })
});

