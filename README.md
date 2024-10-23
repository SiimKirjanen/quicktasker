# wp-quick-tasks

## Translations

Install WP-CLI

### Generate .pot translations template file

`wp i18n make-pot . languages/quicktasker.pot`

### Make .po translations

Use Poedit program to generate language .po and .mo files from .pot

### Generate .json translation files from .po

`wp i18n make-json languages/et.po languages/json --no-purge`
