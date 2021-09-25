import { findRealPath } from "./utils";
import * as stylelint from 'stylelint';
import { StylelintOptions } from './interfaces';

export async function formatFilesWithStylelint(opts: StylelintOptions & { targetFiles: string[] } ) {
    const { configPath, fix, targetFiles } = opts;
    const config = configPath
    ? require(findRealPath(configPath))
    : require('ko-config/stylelint');
    console.log('stylelint process starting...');
    try {
        let options: StylelintOptions = {};
        options.files = targetFiles?.length ? targetFiles : (config.files || []);
        const result = await stylelint.lint({
            fix,
            config,
            ...options
        });
        if (result.errored) {
            const resultText = stylelint.formatters.string(result.results);
            console.log('Not all matched style files are linted: ');
            console.log(resultText);
        } else {
            console.log('All matched style files has been fixed successfully!');
        }
        return true;
    } catch (ex) {
        console.log('stylelint failed: ', ex)
    }
}
