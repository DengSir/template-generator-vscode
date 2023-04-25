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
    private _upperSnakeCaseName: string;

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

    @once('_upperSnakeCaseName')
    public get upperSnakeCaseName() {
        return _.snakeCase(this._name).toUpperCase();
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
        this._upperSnakeCaseName = null;
    }

    public get date() {
        return new Date().toLocaleString();
    }

    public get dateMMDDYYYY() {
        var date = new Date();
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '-' + day + '-' + year;
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
        const configPath = this.config.get<string>('templatesPath') || path.join(os.homedir(), '.vscode/templates');

        if (!path.isAbsolute(configPath) && this.workspaceRoot) {
            return path.join(this.workspaceRoot, configPath)
        }

        return configPath
    }

    public set fileName(fileName: string) {
        this.fields.name = fileName;
    }

    private get workspaceRoot(): string | undefined {
        return (vscode.workspace.workspaceFolders || [])[0]?.uri?.fsPath
    }
}

export default new Environment();
