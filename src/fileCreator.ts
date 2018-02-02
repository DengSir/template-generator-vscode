/**
 * @File   : fileCreator.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

import env from './environment';

import { Template } from './template';
import { InputController } from './inputController';

export class FileCreator {
    public readonly templates: Template[];

    public constructor(targetFolderPath: string) {
        env.targetFolderPath = targetFolderPath;

        this.templates = fs
            .readdirSync(env.templatesFolderPath)
            .filter(f => !f.startsWith('.'))
            .map(f => new Template(f))
            .sort((a, b) => (a.weight < b.weight && -1) || (a.weight > b.weight && 1) || 0);
    }

    public async run() {
        let template = await this.askTemplate();
        if (!template) {
            return;
        }

        if (fs.existsSync(template.targetPath)) {
            throw Error('Target file/folder exists, can`t create.');
        }

        try {
            this.createTemplate(template);
        } catch (error) {
            throw Error('Create file/folder failed.');
        }
    }

    public async askTemplate(): Promise<Template> {
        let inputController = new InputController();
        let { template, fileName } = await inputController.run(this.templates);
        if (!template) {
            return;
        }

        env.fileName = fileName;
        return template;
    }

    public createTemplate(template: Template) {
        for (let templateFile of template.templateFiles) {
            mkdirp.sync(path.dirname(templateFile.targetPath));
            fs.writeFileSync(templateFile.targetPath, templateFile.content);
        }

        let openFileConfig = env.config.get<boolean>(
            template.isFile() ? 'openFileByFileTemplate' : 'openFilesByFolderTemplate'
        );
        if (openFileConfig) {
            for (let templateFile of template.templateFiles) {
                let uri = vscode.Uri.file(templateFile.targetPath);
                vscode.commands.executeCommand('vscode.open', uri);
            }
        }
    }
}
