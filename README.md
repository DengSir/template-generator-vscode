# Template Generator

This extension helps in creating files and folders easily from defined templates.

## Features

* File template support
* Folder template support

## Usages

### Commands

* `Files: New File from Template`
* `Template: Open Templates Folder`

### Default templates path

* Windows : %HOMEPATH%/.vscode/templates
* Linux : ~/.vscode/templates
* Mac : ~/.vscode/templates

### Custom fields

* `{__name__}` : file name
* `{__author__}` : author
* `{__email__}` : email
* `{__link__}` : link
* `{__date__}` : create time

You can define the name displayed on the template selector, like:

* `{__name__.python}.py`

### Example

File name :

`{__name__.python}.py`

File content :

```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# {__name__}.py
# @Author : {__author__} ({__email__})
# @Link   : {__link__}
# @Date   : {__date__}

```

[More Example](https://github.com/DengSir/template-generator-example)

### Default templates

* `html.html`
* `javascript.js`
* `lua.lua`
* `python.py`
* `typescript.ts`
* `python Folder`

## Extension Settings

This extension contributes the following settings:

#### Settings

* `templateGenerator.templatesPath` : Where do you want to save the template Settings
* `templateGenerator.openFileByFileTemplate` : Open the file when the file is created by file template
* `templateGenerator.openFilesByFolderTemplate` : Open all files when the files is created by folder template

#### Fileds

* `templateGenerator.fields.author` : Custom fields of Template Generator: author
* `templateGenerator.fields.email` : Custom fields of Template Generator: email
* `templateGenerator.fields.link` : Custom fields of Template Generator: link

## Known Issues

## Release Notes

### For more information

**Enjoy!**
