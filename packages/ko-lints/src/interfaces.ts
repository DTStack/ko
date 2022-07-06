import { Pattern } from 'fast-glob';
import Parser from './factory/parser';

export type IOpts = {
  write: boolean;
  configPath: string;
  patterns: Pattern[];
  concurrency?: boolean;
  concurrentNumber?: number;
};

export type IKeys = 'eslint' | 'prettier' | 'stylelint';

export type IParserOpts = Pick<IOpts, 'write' | 'configPath'> & {
  name: IKeys;
};

export type IThreadOpts = IParserOpts & {
  entries: string[];
  concurrentNumber: NonNullable<IOpts['concurrentNumber']>;
};

export type IRet = string[];

export type IChildOpts = {
  parser: Parser;
  ignoreFiles: string[];
  name: IKeys;
};
