import { findRealPath, getTargetFiles } from '../utils';
import { join } from 'path';

describe('utils test--findRealPath', () => {
  it('find absolute path', () => {
    const path1 = process.cwd() + "/packages/ko-config/eslint.js";
    expect(findRealPath(path1)).toBe(path1);
  })
  it('find relative path', () => {
    const path2 = 'packages/ko-config/eslint.js'
    expect(findRealPath(path2)).toBe(join(process.cwd(), path2));
  })
  it('error path', () => {
    const errorAbsolutePath = process.cwd() + "/packages/ko-config/eslint1.js";
    expect(() => { findRealPath(errorAbsolutePath) }).toThrow();
    const errorRelativePath = process.cwd() + "packages/ko-config/eslint1.js";
    expect(() => { findRealPath(errorRelativePath) }).toThrow();
  })
})

describe('utils test--getTargetFiles', () => {
  it('get target md files', () => {
    const expectResult = ["CHANGELOG.md", "CONTRIBUTING.md", "README.md"]
    expect(getTargetFiles('*.md')).toEqual(expectResult)
  })
  it('get target json files', () => {
    const expectResult = ["lerna.json", "package.json", "tsconfig.base.json"]
    expect(getTargetFiles('*.json')).toEqual(expectResult)
  })
  it('get tsx json files', () => {
    const expectResult: any[] = []
    expect(getTargetFiles('*.tsx')).toEqual(expectResult)
  })
})