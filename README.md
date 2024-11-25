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

Run cleanup.sh

## Publishing PRO version

Make the required changes in code

- src/providers/AppContextProvider.tsx (is_customFields)
- src/user-page-app/providers/UserPageAppContextProvider.tsx (cf)

Change Plugin Name in readme.txt to QuickTasker-PRO

Run `npm run build`

Run `./cleanup.sh`
