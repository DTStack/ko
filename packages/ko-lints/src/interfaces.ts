import { Pattern } from 'fast-glob';

export type IOpts = {
  write: boolean;
  configPath: string;
  patterns: Pattern[];
  concurrency?: boolean;
  concurrentNumber?: number;
};

export type IParserOpts = Pick<IOpts, 'write' | 'configPath'>;

export type IThreadOpts = IParserOpts & {
  entries: string[];
  concurrentNumber: NonNullable<IOpts['concurrentNumber']>;
};

export type IKeys = 'eslint' | 'prettier' | 'stylelint';

export type IRet = string[];
