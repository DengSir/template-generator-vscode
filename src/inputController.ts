/**
 * @File   : inputController.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

'use strict';

import * as vscode from 'vscode';

export interface IInput {
    template?: vscode.QuickPickItem;
    fileName?: string;
}

export class InputController {
    private validateNameRegex: RegExp;

    public constructor() {
        if (process.platform === 'win32') {
            this.validateNameRegex = /[/?*:|<>\\]/;
        } else {
            this.validateNameRegex = /\//;
        }
    }

    private async showTemplatePicker(templates: vscode.QuickPickItem[]) {
        let template = await vscode.window.showQuickPick(templates, {
            ignoreFocusOut: true,
            placeHolder: 'Select file/folder template:'
        });
        return template;
    }

    private async showNameInput() {
        let fileName = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'Input file/folder name',
            validateInput: text =>
                this.validateNameRegex.test(text) ? 'Invalidate file name' : null
        });
        return fileName;
    }

    public async run(templates: vscode.QuickPickItem[]): Promise<IInput> {
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
