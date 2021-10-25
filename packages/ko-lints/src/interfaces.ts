type Options = {
  configPath?: string;
  ignorePath?: string;
};

export type PrettierOptions = Options & {
  write?: boolean;
}

export type EslintOptions = Options & {
  fix?: boolean,
}

export type StylelintOptions = Options & {
  fix?: boolean,
  files?: string[],
  code?: string
}