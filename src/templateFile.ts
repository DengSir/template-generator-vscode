/**
 * @File   : templateFile.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as util from './util';

import { once } from './decorators';

export class TemplateFile {
    public constructor(public readonly templatePath: string) {}

    @once()
    public get targetPath(): string {
        return util.absTargetPath(util.convert(this.templatePath));
    }

    @once()
    public get content(): string {
        return util.convert(this.read());
    }

    private read(): string {
        return fs.readFileSync(util.absTemplatePath(this.templatePath)).toString();
    }
}
