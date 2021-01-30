# Visualization of the COVID-19 vaccination in Spain

Objectives:
* Track the daily evolution of the vaccine rollout
* Estimate when the rollout will be complete

To do:
- [x] Explanatory intro
- [x] Get `dateComplete` math checked
- [x] Add logo, credits, and link to repo
- [x] Hovers
- [x] Legends and labels (partially done)
- [x] X-axis sticky on top (maybe), and add Y-axis (partially done)
- [x] ~~Search field or drop down to filter by region~~ Summary table navigation is best option
- [x] Right now order is alphabetical, need to sort regions using headers
- [x] Better touch events
- [ ] Translate to Catalan


## Mockup
Looks like this for now ... 

<img alt='Mockup of the app' src='https://github.com/fndvit/covid-vaccination-tracker/blob/main/app/mockup.png?raw=true' width='698px' height='740px' />

## Download

You can grab this project using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit fndvit/covid-vaccination-tracker
cd covid-vaccination-tracker
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

The instructions below come from the project template for Svelte apps at https://github.com/sveltejs/template.

*Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
