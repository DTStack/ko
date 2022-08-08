import { join } from 'path';
import { Worker } from 'worker_threads';
import { IThreadOpts, IParserOpts } from '../interfaces';

class ThreadPool {
  private readonly workers: Worker[] = [];
  private readonly workerPList: Promise<boolean>[] = [];
  private readonly opts: IThreadOpts;
  private queue: string[];
  private stdout: string[] = [];

  constructor(opts: IThreadOpts) {
    console.log(
      `Using concurrent mode with ${opts.concurrentNumber} threads...`
    );
    this.opts = opts;
    this.queue = this.opts.entries;
    this.format();
  }

  format() {
    const { concurrentNumber, configPath, write, name } = this.opts;
    if (this.workers.length < concurrentNumber) {
      this.workerPList.push(
        this.createWorker({
          configPath,
          write,
          name,
        })
      );
      this.format();
    }
  }

  createWorker(opts: IParserOpts): Promise<boolean> {
    const worker = new Worker(join(__dirname, './Worker.js'), {
      workerData: {
        opts,
      },
    });
    return new Promise(resolve => {
      worker.postMessage(this.queue.shift());
      worker.on('message', (result: string) => {
        this.stdout.push(result);
        if (this.queue.length === 0) {
          resolve(true);
        } else {
          const next = this.queue.shift();
          worker.postMessage(next);
        }
      });
      worker.on('error', err => {
        console.log(err);
        process.exit(1);
      });
      this.workers.push(worker);
    });
  }

  async exec(): Promise<string[]> {
    return Promise.all(this.workerPList).then(() => {
      return this.stdout;
    });
  }
}

export default ThreadPool;
