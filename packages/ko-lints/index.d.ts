import { Pattern } from 'fast-glob';

export type IOpts = {
  write: boolean;
  configPath: string;
  patterns: Pattern[];
  concurrency?: boolean;
  concurrentNumber?: number;
};

export type IKeys = 'eslint' | 'prettier' | 'stylelint';

declare class Lints {
  private runner;
  private opts;
  state: 0 | 1;
  constructor(opts: IOpts);
  run(key: IKeys): Promise<string[]>;
}

export default Lints;
