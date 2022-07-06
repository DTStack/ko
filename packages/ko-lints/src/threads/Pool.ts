import { join } from 'path';
import { Worker } from 'worker_threads';

type IOpts = {
  concurrentNumber: number;
  entries: string[];
  write: boolean;
};

class WorkerPool {
  private readonly workers: Worker[] = [];
  private readonly workerPromises: Promise<string[]>[] = [];
  private readonly opts: IOpts;
  constructor(opts: IOpts) {
    console.log('use worker');
    this.opts = opts;
    this.init();
  }

  init() {
    const totalCount = this.opts.entries.length;
    const everyEntiresCount =
      Math.floor(totalCount / this.opts.concurrentNumber) + 1;
    for (let i = 0; i < totalCount; i = i + everyEntiresCount) {
      this.format(this.opts.entries.slice(i, i + everyEntiresCount));
    }
  }

  format(entries: string[]) {
    if (this.workers.length < this.opts.concurrentNumber) {
      this.createWorker(entries, this.opts.write);
    }
  }

  createWorker(entries: string[], write: boolean) {
    const worker = new Worker(join(__dirname, './Worker.js'), {
      workerData: {
        entries,
        write,
      },
    });
    this.workerPromises.push(
      new Promise((resolve, reject) => {
        worker.on('message', (data: { result: string[] }) =>
          resolve(data.result)
        );
        worker.on('error', err => reject(err));
      })
    );
    this.workers.push(worker);
  }

  async start(): Promise<string[]> {
    return Promise.all(this.workerPromises).then(list => {
      this.workers.forEach(worker => worker.terminate());
      return list.reduce((prev, curr) => {
        curr = curr.concat(prev);
        return curr;
      }, []);
    });
  }
}

export default WorkerPool;
