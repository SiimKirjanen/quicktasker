#!/bin/bash

# File to update
QUICKTASKER_FILE="quicktasker.php"
ADMIN_PAGES_FILE="php/admin-pages.php"
CONSTANTS_FILE="src/constants.ts"
APPCONTEXT_FILE="src/providers/AppContextProvider.tsx"
USERPAGEAPPCONTEXT_FILE="src/user-page-app/providers/UserPageAppContextProvider.tsx"

# Update quicktasker.php
if [ -e "$QUICKTASKER_FILE" ]; then
  sed -i 's/Plugin Name: QuickTasker/Plugin Name: QuickTasker-PRO/' "$QUICKTASKER_FILE"
  echo "Updated Plugin Name in $QUICKTASKER_FILE"
else
  echo "$QUICKTASKER_FILE does not exist"
fi

# Update admin-pages.php
if [ -e "$ADMIN_PAGES_FILE" ]; then
  # Replace only specific instances of "QuickTasker" that haven't been modified yet
  sed -i 's/\bQuickTasker\b/QuickTasker-PRO/g' "$ADMIN_PAGES_FILE"
  echo "Updated QuickTasker references in $ADMIN_PAGES_FILE"
else
  echo "$ADMIN_PAGES_FILE does not exist"
fi

# Update HAS_AUTOMATIONS
if [ -e "$CONSTANTS_FILE" ]; then
  sed -i 's/const HAS_AUTOMATIONS = false;/const HAS_AUTOMATIONS = true;/' "$CONSTANTS_FILE"
  echo "Updated HAS_AUTOMATIONS in $CONSTANTS_FILE"
else
  echo "$CONSTANTS_FILE does not exist"
fi

# Update HAS_WEBHOOKS
if [ -e "$CONSTANTS_FILE" ]; then
  sed -i 's/const HAS_WEBHOOKS = false;/const HAS_WEBHOOKS = true;/' "$CONSTANTS_FILE"
  echo "Updated HAS_WEBHOOKS in $CONSTANTS_FILE"
else
  echo "$CONSTANTS_FILE does not exist"
fi

# Update is_customFields
if [ -e "$APPCONTEXT_FILE" ]; then
  sed -i 's/is_customFields: false,/is_customFields: true,/' "$APPCONTEXT_FILE"
  echo "Updated is_customFields in $APPCONTEXT_FILE"
else
  echo "$APPCONTEXT_FILE does not exist"
fi

# Update cf
if [ -e "$USERPAGEAPPCONTEXT_FILE" ]; then
  sed -i 's/cf: false,/cf: true,/' "$USERPAGEAPPCONTEXT_FILE"
  echo "Updated cf in $USERPAGEAPPCONTEXT_FILE"
else
  echo "$USERPAGEAPPCONTEXT_FILE does not exist"
fi