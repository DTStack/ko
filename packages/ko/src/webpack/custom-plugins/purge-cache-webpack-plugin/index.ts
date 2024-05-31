import { Compiler } from 'webpack';
import fs from 'fs/promises';
import path from 'path';

class PurgeCacheWebpackPlugin {
  WEBPACK_PLUGIN_NAME = 'PurgeCacheWebpackPlugin';

  purgeCacheFiles(
    directory: string,
    maxAge: number,
    callback: (errors?: Error[]) => void
  ) {
    fs.readdir(directory)
      .then(files => {
        const expiredPacks = [];
        if (files.length === 0) return callback();

        for (const file of files) {
          const pack = new Promise((resolve, reject) => {
            const filePath = path.join(directory, file);
            fs.stat(filePath)
              .then(stats => {
                if (stats.mtime.getTime() + maxAge < Date.now()) {
                  fs.unlink(filePath)
                    .then(() => {
                      resolve(true);
                    })
                    .catch(err => reject(err));
                } else {
                  resolve(true);
                }
              })
              .catch(err => reject(err));
          });

          expiredPacks.push(pack);
        }

        Promise.allSettled(expiredPacks).then(results => {
          const errors = results
            .filter(result => result.status === 'rejected')
            .map((result: any) => result.reason);
          callback(errors);
        });
      })
      .catch(err => {
        callback([err]);
      });
  }

  apply(compiler: Compiler) {
    compiler.hooks.done.tapAsync(
      { name: this.WEBPACK_PLUGIN_NAME },
      (_, callback) => {
        const { type, maxAge, cacheLocation } = compiler.options.cache as any;
        if (type === 'filesystem') {
          const logger = compiler.getInfrastructureLogger(
            this.WEBPACK_PLUGIN_NAME
          );
          this.purgeCacheFiles(cacheLocation, maxAge, errors => {
            if (errors?.length) {
              errors.forEach(err => logger.warn(err.message));
            } else {
              logger.info(`purge expired cache files completed`);
            }
            callback();
          });
        } else {
          callback();
        }
      }
    );
  }
}

export default PurgeCacheWebpackPlugin;
