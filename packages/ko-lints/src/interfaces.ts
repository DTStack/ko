type Options = {
  configPath?: string;
  ignorePath?: string;
};

export type PrettierOptions = Options & {
  write?: boolean;
};

export type EslintOptions = Options & {
  fix?: boolean;
};

export type MdlintOptions = Options & {
  fix?: boolean;
};

type ErrorLine = {
  line: number;
  column: number;
}

export type MdError = {
  start: ErrorLine,
  end: ErrorLine,
  text: string;
  level: string;
  type: string;
}