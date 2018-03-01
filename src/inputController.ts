/**
 * @File   : inputController.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';

import { Template } from './template';

export interface IInput {
    template?: Template;
    fileName?: string;
}

const validateNameRegex = ((): RegExp => {
    if (process.platform === 'win32') {
        return /[/?*:|<>\\]/;
    } else if (process.platform === 'darwin') {
        return /[/:]/;
    } else {
        return /\//;
    }
})();

export class InputController {
    public constructor() {}

    private async showTemplatePicker(templates: Template[]) {
        let template = await vscode.window.showQuickPick(templates, {
            placeHolder: 'Select file/folder template:',
        });
        return template;
    }

    private async showNameInput() {
        let fileName = await vscode.window.showInputBox({
            placeHolder: 'Input file/folder name',
            validateInput: text => (validateNameRegex.test(text) ? 'Invalidate file name' : null),
        });
        return fileName;
    }

    public async run(templates: Template[]): Promise<IInput> {
        let template = await this.showTemplatePicker(templates);
        if (!template) {
            return {};
        }

        let fileName = await this.showNameInput();
        if (!fileName) {
            return {};
        }
        return { template, fileName };
    }
}
