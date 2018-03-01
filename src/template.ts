/**
 * @File   : template.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as util from './util';

import { once } from './decorators';
import { TemplateFile } from './templateFile';

export class Template implements vscode.QuickPickItem {
    private _templateFiles: TemplateFile[];
    private _isFile: boolean;

    public constructor(public readonly templatePath: string) {
        this._isFile = fs.statSync(util.absTemplatePath(templatePath)).isFile();
    }

    @once()
    public get label(): string {
        return util.convert(this.templatePath, true);
    }

    @once()
    public get weight(): string {
        return `${this.isFile() ? '0' : '1'}${this.label}`;
    }

    public get description(): string {
        return this.isFile() ? 'File' : 'Folder';
    }

    @once()
    public get templateName(): string {
        return util.convert(this.templatePath);
    }

    @once()
    public get targetPath(): string {
        return util.absTargetPath(this.templateName);
    }

    @once()
    public get templateFiles(): TemplateFile[] {
        return this.initTemplateFiles(this.templatePath);
    }

    private initTemplateFiles(templatePath: string, templateFiles: TemplateFile[] = []): TemplateFile[] {
        let fullPath = util.absTemplatePath(templatePath);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fs.readdirSync(fullPath).map(f => this.initTemplateFiles(path.join(templatePath, f), templateFiles));
        } else if (stat.isFile()) {
            templateFiles.push(new TemplateFile(templatePath));
        }
        return templateFiles;
    }

    public isFile(): boolean {
        return this._isFile;
    }
}
