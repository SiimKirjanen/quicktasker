<p align="center">
    <img src="img/old-banner-icon.png" alt="QuickTasker">
</p>

# QuickTasker - WordPress task management plugin
Task management plugin designed to help you organize your projects, streamline workflows, and get tasks done efficiently.

## Install
Clone this project to your local WordPress installation plugins directory. Make sure you name the folder as `quicktasker`. Activate the plugin through the 'Plugins' menu in WordPress. You can also download it directly from the WordPress plugins directory: https://wordpress.org/plugins/quicktasker/

## System requirements

| Requirement | Version |
|---|---|
| PHP | >= 7.2.28 |
| Node.js | >= 20.0.0 |
| WordPress | Latest recommended |
| Docker | Required for wp-env local development |

## Development options

### Option 1 — wp-env (recommended)
Uses `@wordpress/env` to spin up a local WordPress environment in Docker on port 8889. No existing WordPress installation needed.

```bash
npm ci
composer install
npm run wp-env:start   # starts WordPress at http://localhost:8889
npm run start          # starts JS/CSS dev build with watch
```

Stop or reset the environment:
```bash
npm run wp-env:stop
npm run wp-env:reset
```

### Option 2 — existing WordPress installation
Clone the repo directly into your WordPress `wp-content/plugins/` directory and activate the plugin.

```bash
npm ci
composer install
npm run start
```

## Build

```bash
npm run build
```

## Testing

### JavaScript unit tests
```bash
npm run test:unit              # run all tests
npm run test:unit:watch        # watch mode
```

### PHP unit tests
```bash
composer test:unit:be          # run all tests
```

### E2E tests (Playwright)
Requires wp-env or a running WordPress instance on port 8889.

```bash
npm run test:e2e               # starts wp-env then runs all tests
npm run test:e2e:headed        # visible browser
npm run test:e2e:ui            # Playwright UI mode
```

## Code quality

```bash
npm run lint           # ESLint
npm run lint:fix       # ESLint with auto-fix
npm run format:fix     # Prettier auto-fix
composer cs:fix        # PHP code style fix
```

## Translations
Translations are loaded from https://translate.wordpress.org/projects/wp-plugins/quicktasker/

### Generate .pot translations template file
Install WP-CLI, then run:

```bash
wp i18n make-pot . languages/quicktasker.pot --exclude=node_modules,src --include="*.php,php/**/*.php,build/*.js,build/**/*.js"
```
