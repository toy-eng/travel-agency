# Agent Instructions

## Project Overview

- **Framework and language:** Angular 21 standalone components written in strict TypeScript. The app also uses Angular SSR, Angular Material, and Tailwind CSS.
- **Package manager and runtime:** npm (`package-lock.json` and `packageManager` in `package.json`); Node 22 is required by `package.json`.
- **Browser entry point:** `src/main.ts` bootstraps `App` from `src/app/app.ts` using `appConfig` in `src/app/app.config.ts`.
- **Server entry points:** `src/main.server.ts` and `src/server.ts` provide SSR; `api/index.mjs` forwards Vercel requests to the built SSR handler.
- **Routing:** `src/app/app.routes.ts` defines the root routes under `Shell`. Feature routes live in `src/app/features/<feature>/<feature>.routes.ts`; `src/app/app.routes.server.ts` controls SSR render modes.
- **Layout and shared UI:** `src/app/layout/` contains the shell, header, and footer. Reusable components, directives, animations, data, motion helpers, and pipes live under `src/app/shared/`.
- **Features:** Domain screens are under `src/app/features/`, organized by feature with `pages/` and feature-local `components/` where needed.
- **Services and state:** Shared services live in `src/app/core/services/`; HTTP interceptors live in `src/app/core/interceptors/`. There is no NgRx or other external state library. Component state uses Angular signals (`signal`, `computed`) and RxJS interop such as `toSignal`.
- **Models and types:** Shared models live in `src/app/core/models/`; feature-specific interfaces and types are often exported beside their component.
- **Environment files:** `src/environments/environment.ts` is the development configuration and `src/environments/environment.prod.ts` is the production configuration. The API base URL is `environment.apiUrl`; relative requests are prefixed by `src/app/core/interceptors/auth.interceptors.ts`.
- **Style conventions:** Use standalone components with explicit `imports`, `ChangeDetectionStrategy.OnPush`, relative imports, kebab-case directories and filenames, `app-` selectors, single quotes, two-space indentation, and the Prettier settings in `.prettierrc` (100-character line width). There are no TypeScript path aliases.

## Commands

- **Start the development server:** `npm start` (runs `ng serve`; served at `http://localhost:4200/` by default).
- **Build for production:** `npm run build` (runs `ng build`; production is the default configuration in `angular.json`).
- **Run tests:** `npm test` (runs `ng test` with Vitest).
- **Run lint:** No lint script or lint target is configured.
- **Run type checking:** No standalone type-check script is configured. `npm run build` performs strict TypeScript and Angular template checking.

## Coding Conventions

- Match the existing Angular style: standalone components, explicit imports, `OnPush` change detection, and `inject()` for dependencies where present.
- Keep changes small and focused on the requested behavior.
- Reuse existing components, services, models, directives, and utilities before adding new abstractions.
- Do not add dependencies without a clear reason.
- Do not leave unused imports, dead code, or new `console` statements.
- Prefer Angular signals for local UI state and existing RxJS patterns for streams.
- Lazy-load feature pages through route files rather than eagerly importing large feature trees.
- Follow `.editorconfig` and `.prettierrc`; do not introduce a separate formatting style.

## Commits and Pushing

When the user asks to push, create commits and then push. Break the work into as many reasonable commits as possible, but only where each commit represents one logical change.

### Commit Granularity

- A change confined to one file is normally one commit. For example, a fix in the user service becomes `fix(user): handle failed profile request`.
- Group multiple files into one commit when they are required for the same feature, bug, or refactor. A component change that requires its template, styles, and service belongs in one commit.
- Do not split dependent changes just to increase the commit count. If file A does not work without file B, commit them together.
- Commit a newly created standalone file as its own commit when it is independent, such as a shared model, interface, or utility. If the new file exists only for a specific feature, commit it with that feature's files.
- Keep unrelated changes in separate commits, including formatting, dependency updates, and feature work.
- Avoid catch-all commits such as `chore: misc changes` and pointless one-line commits that do not represent real logical steps.

### Commit Messages

Use Conventional Commits:

```text
<type>(<scope>): <summary>
```

Common types:

- `feat` - new behavior or functionality
- `fix` - bug fix
- `refactor` - code change that neither fixes a bug nor adds a feature
- `chore` - tooling, dependencies, or maintenance
- `test` - tests only
- `docs` - documentation only
- `style` - formatting or whitespace only
- `perf` - performance improvement
- `build` - build system or dependency changes

Rules:

- Use imperative, present tense: `add`, `fix`, `remove`.
- Keep the summary lowercase and do not end it with a period.
- Keep the first line to 72 characters or fewer.
- Use a scope matching the area changed, such as `auth`, `user`, `header`, `dashboard`, `api`, or `config`.
- Add an optional body when the reason for the change is not obvious.

Example commits:

```text
fix(auth): reset token after logout
feat(user): add profile edit form
refactor(api): centralize error handling
style(header): align navigation items
```

If one feature requires changes to `user.component.ts`, `user.component.html`, `user.service.ts`, and `user.model.ts`, commit them together:

```text
feat(user): add user profile editing
```

### Human-Like Practice

- Write commits the way a developer naturally groups their work, not as a mechanical one-commit-per-file dump.
- Review `git status` and `git diff` before committing; stage only the files relevant to each commit.
- Do not commit `node_modules`, build output, secrets, or `.env` files.
- Run the available tests and production build before pushing when the changes affect application code.
- After committing, push to the current branch unless the user asked only to commit.
- Do not amend, rebase, force-push, or reset history unless the user explicitly asks for it.
