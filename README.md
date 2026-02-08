<p align="center">
    <img src="img/old-banner-big.png" alt="QuickTasker">
</p>

# QuickTasker - WordPress task management plugin
Task management plugin designed to help you organize your projects, streamline workflows, and get tasks done efficiently.

## Install
Clone this project to your local WordPress installation plugins directory. Make sure you name the folder as quicktasker. Activate the plugin through the ‘Plugins’ menu in WordPress. You can also download it directly from WordPress plugins directory https://wordpress.org/plugins/quicktasker/

## Development

Run `npm ci`

Run `npm run start`

## Build

Run `npm run build`


## Translations
Translations are loaded from https://translate.wordpress.org/projects/wp-plugins/quicktasker/

### Generate .pot translations template file
Install WP-CLI

`wp i18n make-pot . languages/quicktasker.pot --exclude=node_modules,src --include="*.php,php/**/*.php,build/*.js,build/**/*.js"`