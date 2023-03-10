import fs from 'fs';

//const fs = require('fs');
import { join as pathJoin, basename } from 'path';

import colors from './colors.js';

//const colors = require('./colors.js');

const args = process.argv.slice(2);

const project_root = args[0];
const frontend_dir = args[1];

const parentFolder1 = project_root.substr(project_root.lastIndexOf('/')).replace('/', '');
const parentFolder2 = frontend_dir.substr(frontend_dir.lastIndexOf('/')).replace('/', '');

let parent = parentFolder1;

if (parentFolder1 != parentFolder2) {
  parent = `${parentFolder1}/${parentFolder2}`;
}

//console.log(parentFolder);

//'dmt/settings.json'
const settingsPath = pathJoin(project_root, 'dmt-install/settings.json');

let settings = fs.readFileSync(settingsPath, 'utf-8');
settings = JSON.parse(settings);

const app_base = pathJoin('/', settings.app_base);
// change this to your app base name
// ie. the frontend sub-route in which the app should run.

//const canEditRe = `paths\\:[\\ ]{[\\t\\n\\ ]*assets:[\\ ]*\\'${app_base}\\'\\,[\\t\\n\\ ]*base:[\\ ]*\\'${app_base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,`;
const canEditRe = `paths\\:[\\ ]{[\\t\\n\\ ]*base:[\\ ]*\\'${app_base}\\'[\\t\\n\\ ]*\\}[\\ ]*\\,`;

function edit(filePath) {
  const re = /kit:[\ ]*{/;
  const toAdd = `kit: {
    paths: {
      base: '${app_base}'
    },`;
  // const toAdd = `kit: {
  //   paths: {
  //     assets: '${app_base}',
  //     base: '${app_base}'
  //   },`;
  if (fs.existsSync(filePath)) {
    let fileStr = fs.readFileSync(filePath, 'utf8');
    const canEdit = !RegExp(canEditRe).test(fileStr);
    if (canEdit) {
      fileStr = fileStr.replace(re, toAdd);
      fs.writeFileSync(filePath, fileStr);
      console.log(
        `${colors.green('✓')} Changed app base to ${colors.green(app_base)} (file: ${colors.cyan(parent)}${colors.cyan('/')}${colors.yellow(
          basename(filePath)
        )})`
      );
    } else {
      console.log(colors.yellow(`Correct app base was already present in ${colors.cyan(parent)}${colors.cyan('/')}${basename(filePath)}`));
    }
  }
}

edit(pathJoin(frontend_dir, 'svelte.config.js'));
edit(pathJoin(frontend_dir, 'svelte.config.cjs'));
