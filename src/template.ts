/**
 * @File   : template.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as util from './util';

import { TemplateFile } from './templateFile';

export class Template implements vscode.QuickPickItem {
    public readonly templatePath: string;

    private _templateFiles: TemplateFile[];
    private _templateName: string;
    private _targetPath: string;
    private _label: string;
    private _weight: string;
    private _isFile: boolean;

    public get label(): string {
        return (this._label = this._label || util.convert(this.templatePath, true));
    }

    public get weight(): string {
        return (this._weight = this._weight || `${this.isFile() ? '0' : '1'}${this.label}`);
    }

    public get description(): string {
        return this.isFile() ? 'File' : 'Folder';
    }

    public get templateName(): string {
        return (this._templateName = this._templateName || util.convert(this.templatePath));
    }

    public get targetPath(): string {
        return (this._targetPath = this._targetPath || util.absTargetPath(this.templateName));
    }

    public get templateFiles(): TemplateFile[] {
        return (this._templateFiles =
            this._templateFiles || this.initTemplateFiles(this.templatePath));
    }

    public constructor(templatePath: string) {
        this.templatePath = templatePath;
        this._isFile = fs.statSync(util.absTemplatePath(templatePath)).isFile();
    }

    private initTemplateFiles(
        templatePath: string,
        templateFiles: TemplateFile[] = []
    ): TemplateFile[] {
        let fullPath = util.absTemplatePath(templatePath);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fs
                .readdirSync(fullPath)
                .map(f => this.initTemplateFiles(path.join(templatePath, f), templateFiles));
        } else if (stat.isFile()) {
            templateFiles.push(new TemplateFile(templatePath));
        }
        return templateFiles;
    }

    public isFile(): boolean {
        return this._isFile;
    }
}
