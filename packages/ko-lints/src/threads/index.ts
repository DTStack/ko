import ThreadPool from './Pool';
import { IThreadOpts } from '../interfaces';

class MultiThreading {
  private opts: IThreadOpts;
  constructor(opts: IThreadOpts) {
    this.opts = opts;
  }

  public async batch() {
    const pool = new ThreadPool(this.opts);
    return await pool.exec();
  }
}

export default MultiThreading;
