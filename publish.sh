#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check if GH_TOKEN is set
if [ -z "$GH_TOKEN" ]; then
  echo "GH_TOKEN is not set. Please add it to your .env file."
  exit 1
fi

# Check if a version number was provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <new-version>"
  exit 1
fi

NEW_VERSION=$1

# Try to create the git tag
if ! git tag v$NEW_VERSION 2>/dev/null; then
  echo "Error: Tag v$NEW_VERSION already exists locally. If it does not exist remotely, try calling: git tag -d v$NEW_VERSION"
  exit 1
fi

# Update the version number in ./package.json
jq --arg version "$NEW_VERSION" '.version = $version' release/app/package.json > tmp.$$.json && mv tmp.$$.json release/app/package.json

# Commit the change
git commit -am "v$NEW_VERSION"

# Push the changes and tags to GitHub
git push && git push --tags

# Publish to GitHub
GH_TOKEN=$GH_TOKEN npm run package-publish

echo "Release v$NEW_VERSION has been successfully published."
