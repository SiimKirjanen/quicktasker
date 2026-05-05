# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend
```bash
npm run start          # dev mode (wp-scripts + Tailwind watch)
npm run build          # production build
npm run lint           # ESLint
npm run lint:fix       # ESLint with auto-fix
npm run format:fix     # Prettier auto-fix
```

### JavaScript unit tests
```bash
npm run test:unit                                          # all tests
npm run test:unit:watch                                    # watch mode
npm run test:unit -- --testPathPattern="ComponentName"     # single file
npm run test:unit -- --testNamePattern="test description"  # single test
```

### E2E tests (Playwright)
```bash
npm run test:e2e              # starts wp-env then runs all tests
npm run test:e2e:ci           # assumes wp-env already running
npm run test:e2e:headed       # visible browser
npm run test:e2e:ui           # Playwright UI mode
npm run test:e2e -- --grep "test name"  # single test
```

### PHP
```bash
composer test:unit:be                                     # all PHPUnit tests
composer test:unit:be -- --filter "ClassName::methodName" # single test
composer cs:fix                                           # fix PHP code style
```

### wp-env
```bash
npm run wp-env:start   # start local WordPress on port 8889
npm run wp-env:stop
npm run wp-env:reset
```

## Architecture

QuickTasker is a WordPress kanban-board plugin with two separate React apps and a PHP REST API backend.

### Frontend (`src/`)

Two webpack entry points (configured in `webpack.config.js`):
- **Admin app** (`src/index.js`) — full board management UI
- **User page app** (`src/user-page-app/`) — simplified public-facing task interface

Both apps follow the same pattern: Context providers wrap the app and hold global state (pipelines, modals, active board, loading). State mutations go through reducers dispatched via context. The modal system is centralized — `ModalContextProvider` holds open/closed state for every modal, and components dispatch actions like `OPEN_PIPELINE_MODAL` rather than managing local open state.

API calls live in `src/api/api.ts` (admin) and `src/user-page-app/api/` (user app). Components call hooks like `usePipelineActions`, `useTaskActions`, which internally call the API client and dispatch reducer actions.

Tailwind CSS uses the `wpqt-` prefix on all utility classes to avoid conflicts with WordPress styles.

### PHP backend (`php/`)

Service Locator pattern — `php/services/ServiceLocator.php` is the DI container. All services and repositories are registered there and retrieved via `ServiceLocator::get('ServiceName')`.

Layers:
- **Repositories** (`php/repositories/`) — raw DB queries only
- **Services** (`php/services/`) — business logic, call repositories
- **API files** (`php/api/`) — register REST endpoints, call services, return responses

Three API files map to three authentication contexts:
- `admin-api.php` — WordPress admin capability checks
- `user-page-api.php` — QuickTasker user session tokens
- `token-api.php` — API key authentication

Error handling is centralized in `ErrorHandlerService` — all API catch blocks call `handlePrivateApiError()` / `handlePublicApiError()`, which `error_log()`s the exception and returns a 400 response.

### Testing

- **JS unit tests**: Jest + `@testing-library/react`, configured in `jest.config.js`. Test files colocated with source (`*.test.tsx`).
- **PHP unit tests**: PHPUnit, tests in `tests/unit/be/`.
- **E2E tests**: Playwright in `tests/e2e/`. Auth state stored in `playwright/.auth/` (gitignored). Shared helpers in `tests/e2e/utils/` — use `getStageContainer()`, `getTaskCard()`, `createBoard()`, `createStage()`, `createTask()` rather than raw locators. Fixture files for import tests in `tests/e2e/fixtures/`.

## Working conventions

- **Playwright MCP screenshots**: when you take screenshots via `mcp__playwright__browser_take_screenshot` to inspect the UI, delete the resulting `.png` files from the project root before ending the task. Don't leave them lying around.
