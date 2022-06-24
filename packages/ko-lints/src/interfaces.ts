import { Pattern } from 'fast-glob';

export type IOpts = {
  write: boolean;
  configPath: string;
  patterns: Pattern[];
};

export type IKeys = 'eslint' | 'prettier' | 'stylelint';
