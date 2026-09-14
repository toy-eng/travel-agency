# TravelAgency

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.20.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deploying to Vercel

The app is set up as a hybrid deployment: the CDN serves everything in `dist/travel-agency/browser`
(including the prerendered HTML for all 17 static routes) and anything else is rendered on demand by
a Node function.

| File | Purpose |
| --- | --- |
| `vercel.json` | Build command, output directory, the catch-all rewrite and the function settings |
| `api/index.mjs` | Serverless entry point — forwards `(req, res)` to the SSR handler from the Angular build |
| `angular.json` → `security.allowedHosts` | Hosts allowed to trigger SSR (Vercel's own host validation) |
| `package.json` → `engines.node` | Pins the build and runtime to Node 22 |

### Deploy

```bash
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

Or import the repository at [vercel.com/new](https://vercel.com/new) — the committed `vercel.json`
supplies every setting, so no dashboard configuration is needed. No environment variables are
required.

### How the routing works

1. Vercel runs `npm run build` (`ng build`), which emits `dist/travel-agency/browser`,
   `dist/travel-agency/server` and `dist/travel-agency/prerendered-routes.json`.
2. Static files are served straight from the CDN — hashed JS/CSS, `public/` assets and the
   prerendered `index.html` of each static route.
3. Everything else matches `"source": "/((?!api/).*)"` and is rewritten to `/api/index`, the
   serverless function. The function ships the entire `dist/travel-agency` folder
   (`functions.includeFiles`), keeping the `server`/`browser` layout the Angular server expects.
4. Requests that cannot be rendered on the server fall back to client-side rendering, so the
   wildcard route still lands on the home page.

### Adding a custom domain

`security.allowedHosts` in `angular.json` lists the hosts permitted to trigger SSR
(`*.vercel.app` covers production, branch and preview URLs). Add your domain there and rebuild:

```json
"security": {
  "allowedHosts": ["localhost", "127.0.0.1", "*.vercel.app", "golobe.com", "*.golobe.com"]
}
```

Without this, Angular refuses the `Host` header, logs a warning and silently serves the
client-rendered shell instead of server-rendered HTML.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
