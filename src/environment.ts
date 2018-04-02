/**
 * @File   : environment.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as _ from 'lodash';
import { once } from './decorators';

export class Fields {
    private _name: string;
    private _camelCaseName: string;
    private _pascalCaseName: string;
    private _snakeCaseName: string;
    private _kebabCaseName: string;
    private _lowerDotCaseName: string;

    public get name() {
        return this._name;
    }

    @once('_camelCaseName')
    public get camelCaseName() {
        return _.camelCase(this._name);
    }

    @once('_pascalCaseName')
    public get pascalCaseName() {
        return _.chain(this._name)
            .camelCase()
            .upperFirst()
            .value();
    }

    @once('_snakeCaseName')
    public get snakeCaseName() {
        return _.snakeCase(this._name);
    }

    @once('_kebabCaseName')
    public get kebabCaseName() {
        return _.kebabCase(this._name);
    }

    @once('_lowerDotCaseName')
    public get lowerDotCaseName() {
        return this.snakeCaseName.replace(/_/g, '.');
    }

    public set name(name: string) {
        this._name = name;
        this._camelCaseName = null;
        this._pascalCaseName = null;
        this._snakeCaseName = null;
        this._kebabCaseName = null;
        this._lowerDotCaseName = null;
    }

    public get date() {
        return new Date().toLocaleString();
    }

    public get author(): string {
        return this.config.get('fields.author');
    }

    public get email(): string {
        return this.config.get('fields.email');
    }

    public get link(): string {
        return this.config.get('fields.link');
    }

    private get config() {
        return vscode.workspace.getConfiguration('templateGenerator');
    }
}

export class Environment {
    public targetFolderPath: string;
    public context: vscode.ExtensionContext;
    public fields: Fields = new Fields();

    public get config(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('templateGenerator');
    }

    public get templatesFolderPath(): string {
        return this.config.get<string>('templatesPath') || path.join(os.homedir(), '.vscode/templates');
    }

    public set fileName(fileName: string) {
        this.fields.name = fileName;
    }
}

export default new Environment();
