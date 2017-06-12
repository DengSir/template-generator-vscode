/**
 * @File   : settingController.ts
 * @Author : DengSir (tdaddon@163.com)
 * @Link   : https://dengsir.github.io/
 */

import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as util from './util';

import env from './env';

const templates = {
    '{__name__.python}.py': `#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# {__name__}.py
# @Author : {__author__} ({__email__})
# @Link   : {__link__}
# @Date   : {__date__}
`,
    '{__name__.html}.html': `<!DOCTYPE html>
<!--
@File   : {__name__}.html
@Author : {__author__} ({__email})
@Link   : {__link__}
@Date   : {__date__}
-->
<html>
<head>
<title></title>
</head>
<body>
</body>
</html>
`,

    '{__name__.javascript}.js': `#!/usr/bin/env node
/**
 * @File   : {__name__}.js
 * @Author : {__author__} ({__email__})
 * @Link   : {__link__}
 * @Date   : {__date__}
 */
`,
    '{__name__.lua}.lua': `#!/usr/bin/env lua
--
-- {__name__}.lua
-- @Author : {__author__} ({__email__})
-- @Link   : {__link__}
-- @Date   : {__date__}
`,
    '{__name__.typescript}.ts': `/**
 * @File   : {__name__}.ts
 * @Author : {__author__} ({__email__})
 * @Link   : {__link__}
 * @Date   : {__date__}
 */

'use strict';
`,

    '{__name__.python Folder}/__init__.py': `#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# __init__.py
# @Author : {__author__} ({__email__})
# @Link   : {__link__}
# @Date   : {__date__}
`
};

export class SettingController {
    public initTemplates() {
        let templatesFolderPath = env.templatesFolderPath;

        if (fs.existsSync(templatesFolderPath)) {
            let stat = fs.statSync(templatesFolderPath);
            if (stat.isDirectory()) {
                return;
            } else {
                throw Error('Templates folder path is not directory !!!');
            }
        }

        for (let key in templates) {
            let fullPath = path.join(templatesFolderPath, key);
            mkdirp.sync(path.dirname(fullPath));
            fs.writeFileSync(fullPath, templates[key]);
        }
    }
}
