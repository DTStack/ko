import Ajv, { Schema as AjvSchema } from 'ajv';
import { assert } from './utils';

type ISchema = Schema | string;

class Schema {
  private ajv: Ajv;
  private schema: Record<string, Schema>;
  constructor() {
    this.ajv = new Ajv();
    this.schema = {};
  }

  register(opts: { name: string; schema: ISchema }) {
    assert(
      this.schema[opts.name],
      `schema ${opts.name} has been registered before`
    );
    this.schema[opts.name] =
      typeof opts.schema === 'string' ? require(opts.schema) : opts.schema;
  }
}

export default Schema;
