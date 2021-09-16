type Options = {
  configPath?: string;
};

export type PrettierOptions = Options & {
  write?: boolean;
}

export type EslintOptions = Options & {
  fix?: boolean,
  typescript?: boolean,
  react?: boolean
}