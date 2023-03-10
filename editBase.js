import fs from 'fs';

//const fs = require('fs');
import { join as pathJoin, basename } from 'path';

import colors from './colors.js';

//const colors = require('./colors.js');

const args = process.argv.slice(2);

const projectRoot = args[0];

//'dmt/settings.json'
const settingsPath = pathJoin(projectRoot, 'dmt-install/settings.json');

let settings = fs.readFileSync(settingsPath, 'utf-8');
settings = JSON.parse(settings);

const base = pathJoin('/', settings.app_base);
// change this to your app base name
// ie. the frontend sub-route in which the app should run.

//const canEditRe = `paths\\:[\\ ]{[\\t\\n\\ ]*assets:[\\ ]*\\'${app_base}\\'\\,[\\t\\n\\ ]*base:[\\ ]*\\'${app_base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,`;
const canEditRe = `paths\\:[\\ ]{[\\t\\n\\ ]*base:[\\ ]*\\'${base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,`;

function edit(filePath) {
  const re = /kit:[\ ]*{/;
  const toAdd = `kit: {
    paths: {
      base: '${base}'
    },`;
  if (fs.existsSync(filePath)) {
    let fileStr = fs.readFileSync(filePath, 'utf8');
    const canEdit = !RegExp(canEditRe).test(fileStr);
    if (canEdit) {
      fileStr = fileStr.replace(re, toAdd);
      fs.writeFileSync(filePath, fileStr);
      console.log(
        `${colors.green('✓')} Changed app base to ${colors.green(base)} (file: ${colors.cyan(projectRoot)}${colors.cyan('/')}${colors.yellow(
          basename(filePath)
        )})`
      );
    } else {
      console.log(colors.yellow(`Correct app base was already present in ${colors.cyan(projectRoot)}${colors.cyan('/')}${basename(filePath)}`));
    }
  }
}

edit(pathJoin(projectRoot, 'svelte.config.js'));
