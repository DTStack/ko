import { Pattern } from 'fast-glob';

export type IOpts = {
  write: boolean;
  configPath: string;
  patterns: Pattern[];
};

export type IKeys = 'eslint' | 'prettier' | 'stylelint';

declare class Lints {
  private runner;
  private opts;
  state: 0 | 1;
  constructor(opts: IOpts);
  run(key: IKeys): Promise<true | string[]>;
}

export default Lints;
