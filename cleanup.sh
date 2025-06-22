#!/bin/bash

# List of files and directories to remove
FILES_TO_REMOVE=(
    "tsconfig.json"
    ".eslintrc.json"
    ".prettierrc"
    ".vscode"
    ".github"
    ".git"
    ".husky"
    ".gitignore"
    "package-lock.json"
    "package.json"
    "README.md"
    "tailwind.config.js"
    "webpack.config.js"
    "reports"
    "cleanup.sh" 
    "convert-to-pro.sh"
    "jest.config.js"
    "jest.setup.ts"
    "custom.d.ts"
    "node_modules"
)

# Prompt the user for confirmation
read -p "Do you want to continue with the cleanup? (y/n): " CONFIRMATION

if [[ "$CONFIRMATION" != "y" ]]; then
  echo "Cleanup aborted."
  exit 1
fi

# Remove each file and directory
for FILE in "${FILES_TO_REMOVE[@]}"; do
  if [ -e "$FILE" ]; then
    rm -rf "$FILE"
    echo "Removed $FILE"
  else
    echo "$FILE does not exist"
  fi
done