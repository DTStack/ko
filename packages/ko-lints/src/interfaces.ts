import { Pattern } from 'fast-glob';

export type IOpts = {
  write: boolean;
  configPath: string;
  patterns: Pattern[];
  concurrency?: boolean;
  concurrentNumber?: number;
};

export type IKeys = 'eslint' | 'prettier' | 'stylelint';

export type IRet = string[];

export type IFormatOpts = {
  entries: string[];
  write: boolean;
  config: Record<string, any>;
  extensions?: string[];
};
