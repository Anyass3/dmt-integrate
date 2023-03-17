import fs from 'fs';
import { join as pathJoin } from 'path';

import colors from './colors.js';

const args = process.argv.slice(2);

const projectRoot = args[0];

const settingsPath = pathJoin(projectRoot, 'dmt-install/settings.def');

const appBase = fs.readFileSync(settingsPath, 'utf-8').match(/base: (.*)/)[1];

const base = pathJoin('/', appBase);

const AddedConfig = `[\\t\\n\\ ]*paths\\:[\\ ]{[\\t\\n\\ ]*base:[\\ ]*\\'${base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,[\\t\\n\\ ]*`;

const restore = filePath => {
  if (fs.existsSync(filePath)) {
    let svelteConfigFile = fs.readFileSync(filePath, 'utf8');
    svelteConfigFile = svelteConfigFile.replace(RegExp(AddedConfig), `\n\t`);
    fs.writeFileSync(filePath, svelteConfigFile);

    console.log(colors.yellow('— Restored svelte.config.cjs'));
  }
};

restore(pathJoin(projectRoot, 'svelte.config.js'));
