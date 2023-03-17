import fs from 'fs';

import { join, dirname } from 'path';

import colors from './colors.js';

const _dirname = dirname(process.argv[1])

const projectRoot = process.argv[2] || '';

if (!fs.existsSync(join(projectRoot, 'dmt-install'))) {
  fs.mkdirSync(join(projectRoot, 'dmt-install'));
}

if (!fs.existsSync(join(projectRoot, 'dmt-install/settings.def'))) {
  fs.copyFileSync(join(_dirname, 'settings.def'), join(projectRoot, 'dmt-install/settings.def'));
}

console.log(colors.green('initialized dmt install'));