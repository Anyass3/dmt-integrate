## DMT APP INSTALL

Run `dmt integrate` inside an _installable dmt app directory_.

This command will look into `dmt-install` directory and find `settings.json` and `dmt-customize` script (optional) or `dmt-install` script.

If `dmt-install/dmt-install` script is present then `dmt integrate` only runs this script.

If `settings.json` file is present then app frontend is built accoring to these settings:

```json
{
  "app_base": "dmt-search",
  "build": "dist",
  "target": "here"
}
```

- `app_base` where the app will be mounted on the url path, for example: `localhost:7777/dmt-search`
- `build` directory with frontend result which is synced into `~/.dmt/user/apps` or `~/.dmt-here/apps`
- `target` `here` or `user`

If installable app has a `dmt` then this is synced to `~/.dmt/user/apps/[app_name]/dmt`. This directory contains `index.js` which is integrated into `dmt engine`.

If there is any other tasks that need to be performed after building the app and syncing over the artefacts and any hook (`dmt` subdir), then these tasks can be specified in `dmt-customize` script which will run at this point. It will run from the perspective of installed app (current directory will be `~/.dmt/user/apps/[app_name]`). See example in [svelte-demo](https://github.com/dmtsys/svelte-demo).

Installable apps can return ssr handler from `index.js`:

```js
export async function init(program) {
  const { handler } = await import('./handler.js');
  return { handler };
}
```

If app has `index.html` then directory is served statically.

This work with SvelteKit and other apps that use express-compatible server middleware.
