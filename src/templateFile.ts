/**
 * @File   : templateFile.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as util from './util';

export class TemplateFile {
    public templatePath: string;

    private _targetPath: string;
    private _content: string;

    public get targetPath(): string {
        return (this._targetPath =
            this._targetPath || util.absTargetPath(util.convert(this.templatePath)));
    }

    public get content(): string {
        return (this._content = this._content || util.convert(this.read()));
    }

    public constructor(templatePath: string) {
        this.templatePath = templatePath;
    }

    private read(): string {
        return fs.readFileSync(util.absTemplatePath(this.templatePath)).toString();
    }
}
