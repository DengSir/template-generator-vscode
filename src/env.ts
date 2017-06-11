/**
 * @File   : env.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

export interface IFields {
    name?: string;
    author?: string;
    email?: string;
    link?: string;
}

class Env {
    public fileName: string;
    public targetFolderPath: string;

    public get config(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('templateGenerator');
    }

    public get templatesFolderPath(): string {
        return (
            this.config.get<string>('templatesPath') || path.join(os.homedir(), '.vscode/templates')
        );
    }

    public get fields(): IFields {
        return {
            name: this.fileName,
            author: this.config.get<string>('fields.author'),
            email: this.config.get<string>('fields.email'),
            link: this.config.get<string>('fields.link')
        };
    }

    public constructor() {}
}

export default new Env();
