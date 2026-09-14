/**
 * Vercel serverless entry point for the Angular SSR build.
 *
 * Vercel's Node.js runtime calls the default export with Node's `(req, res)`. The Angular build
 * already emits such a handler — `reqHandler` in `dist/travel-agency/server/server.mjs` is the
 * Express app wrapped with `createNodeRequestHandler()` — so this file only forwards the call.
 *
 * `vercel.json` ships the whole `dist/travel-agency` folder (browser assets + server bundle +
 * `prerendered-routes.json`) into this function via `functions.includeFiles`, which keeps the
 * relative layout the Angular server bundle expects (`../browser` next to the server output).
 */
import { reqHandler } from '../dist/travel-agency/server/server.mjs';

export default function handler(request, response) {
  return reqHandler(request, response);
}
