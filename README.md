# wp-quick-tasks

## Translations

Install WP-CLI

### Generate .pot translations template file

`wp i18n make-pot . languages/quicktasker.pot`

### Make .po translations

Use Poedit program to generate language .po and .mo files from .pot

### Generate .json translation files from .po

`wp i18n make-json languages/et.po languages/json --no-purge`

## Publishing free version

`git clone git@github.com:SiimKirjanen/quicktasker.git`

Run `./cleanup.sh`

Commit to WordPress plugin directory

## Publishing PRO version

Clone respository

`git clone git@github.com:SiimKirjanen/quicktasker.git quicktasker-pro`

Run `./convert-to-pro.sh`

Make sure the required changes were made in code

- src/providers/AppContextProvider.tsx (is_customFields)
- src/user-page-app/providers/UserPageAppContextProvider.tsx (cf)
- src/constants.tsx (HAS_AUTOMATIONS)
- plugin name change in quicktasker.php to QuickTasker-PRO
- admin-pages.php menu page title change to QuickTasker-PRO

Run `npm ci`

Run `npm run build`

Run `./cleanup.sh`
