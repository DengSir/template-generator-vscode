/**
 * @File   : util.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as path from 'path';
import * as fs from 'mz/fs';

import env from './environment';

export function convert(content: string, ignore_variables?: boolean): string {
    return content.replace(
        /\{__(name|email|author|link|date|dateMMDDYYYY|delete|camelCaseName|pascalCaseName|snakeCaseName|upperSnakeCaseName|kebabCaseName|lowerDotCaseName)__\.?([^{}]*)\}/g,
        (_, key, description) => (!ignore_variables ? env.fields[key] || '' : description),
    );
}

export function absTemplatePath(...args: string[]): string {
    return path.join(env.templatesFolderPath, ...args);
}

export function absTargetPath(...args: string[]): string {
    return path.join(env.targetFolderPath, ...args);
}

function copyFile(src, dst) {
    return new Promise((resolve, reject) => {
        fs
            .createReadStream(src)
            .pipe(fs.createWriteStream(dst))
            .on('close', err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(undefined);
                }
            });
    });
}

async function copyFolder(src, dst) {
    let stats = await fs.stat(dst).catch(e => undefined);
    if (stats && !stats.isDirectory()) {
        throw Error('not folder');
    }

    await fs.mkdir(dst);
    await Promise.all(
        (await fs.readdir(src)).map(async file => {
            let source = path.join(src, file);
            let target = path.join(dst, file);

            let stats = await fs.stat(source);

            if (stats.isDirectory()) {
                await copyFolder(source, target);
            } else if (stats.isFile()) {
                await copyFile(source, target);
            }
        }),
    );
}

export async function checkTemplatesFolder() {
    let templatesFolderPath = env.templatesFolderPath;
    if (!await fs.exists(templatesFolderPath)) {
        await copyFolder(path.join(env.context.extensionPath, 'templates'), templatesFolderPath);
        return await fs.exists(templatesFolderPath);
    }

    let stat = await fs.stat(templatesFolderPath);
    if (!stat.isDirectory()) {
        return false;
    }
    return true;
}
