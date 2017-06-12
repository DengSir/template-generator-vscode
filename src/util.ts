/**
 * @File   : util.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

'use strict';

import * as fs from 'fs';
import * as path from 'path';

import env from './env';

export function convert(content: string, ignore_variables?: boolean): string {
    return content.replace(
        /\{__(name|email|author|link|date)__.?([^{}]*)\}/g,
        (_, key, description) => (!ignore_variables ? env.fields[key] || '' : description)
    );
}

export function absTemplatePath(...args: string[]): string {
    return path.join(env.templatesFolderPath, ...args);
}

export function absTargetPath(...args: string[]): string {
    return path.join(env.targetFolderPath, ...args);
}

export function isTemplatesFolderExists(): boolean {
    let templatesFolderPath = env.templatesFolderPath;
    if (!fs.existsSync(templatesFolderPath)) {
        return false;
    }

    let templateFolder = fs.statSync(templatesFolderPath);
    if (!templateFolder.isDirectory()) {
        return false;
    }
    return true;
}

export function checkTemplatesFolder() {
    if (!isTemplatesFolderExists()) {
        throw Error('Not found templates folder.');
    }
}
