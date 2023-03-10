import fs from 'fs';
//const fs = require('fs');
import { join as pathJoin, basename } from 'path';

import colors from './colors.js';

const args = process.argv.slice(2);

const project_root = args[0];
const frontend_dir = args[1];

const settingsPath = pathJoin(project_root, 'dmt-install/settings.json');
let settings = fs.readFileSync(settingsPath, 'utf-8');
settings = JSON.parse(settings);

const app_base = pathJoin('/', settings.app_base);

//const AddedConfig = `[\\t\\n\\ ]*paths\\:[\\ ]{[\\t\\n\\ ]*assets:[\\ ]*\\'${app_base}\\'\\,[\\t\\n\\ ]*base:[\\ ]*\\'${app_base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,[\\t\\n\\ ]*`;
const AddedConfig = `[\\t\\n\\ ]*paths\\:[\\ ]{[\\t\\n\\ ]*base:[\\ ]*\\'${app_base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,[\\t\\n\\ ]*`;

const restore = filePath => {
  if (fs.existsSync(filePath)) {
    let svelteConfigFile = fs.readFileSync(filePath, 'utf8');
    svelteConfigFile = svelteConfigFile.replace(RegExp(AddedConfig), `\n\t`);
    fs.writeFileSync(filePath, svelteConfigFile);

    console.log(colors.yellow('— Restored svelte.config.cjs'));
  }
};

restore(pathJoin(frontend_dir, 'svelte.config.js'));
restore(pathJoin(frontend_dir, 'svelte.config.cjs'));
