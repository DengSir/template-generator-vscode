'use strict';

import * as vscode from 'vscode';
import * as util from './util';

import env from './env';
import { FileCreator } from './fileCreator';
import { SettingController } from './settingController';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('templateGenerator.newFile', async function(e: vscode.Uri) {
            try {
                util.checkTemplatesFolder();

                let targetFolderPath = e && e.fsPath ? e.fsPath : vscode.workspace.rootPath;
                let fileCreator = new FileCreator(targetFolderPath);

                await fileCreator.run();
            } catch (error) {
                vscode.window.showErrorMessage(`Template Generator: ${error.message}`);
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('templateGenerator.openTemplatesFolder', function() {
            try {
                util.checkTemplatesFolder();

                let uri = vscode.Uri.file(env.templatesFolderPath);
                vscode.commands.executeCommand('vscode.openFolder', uri, true);
            } catch (error) {
                vscode.window.showErrorMessage(`Template Generator: ${error.message}`);
            }
        })
    );

    new SettingController().initTemplates();
}

export function deactivate() {}
