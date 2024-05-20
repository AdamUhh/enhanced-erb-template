# Enhanced ERB Template

This template was created to speedup the development of Electron applications with essential features like automatic app updates and useful customizable shortcuts, making it versatile for creating complex applications. It also follows a simplified app architecture that allows for multiple apps within a single Electron application, although this might require some adaptation.

## Preview

![Buttons Preview](<https://i.imgur.com/O7iTUec.gif> "Buttons Preview")
![Shortcuts Preview](<https://i.imgur.com/aCGeyhJ.gif> "Shortcuts Preview")
![Auto Updater Preview](<https://i.imgur.com/2WmtNXi.gif> "Auto Updater Preview")

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AdamUhh/enhanced-erb-template.git your-project-name
cd your-project-name
npm install
```

### Development

Starting the app (development):

```bash
npm start
```

## App Configuration

This project follows the [two package.json structure](https://www.electron.build/tutorials/two-package-structure.html) recommended by electron-builder. This structure is beneficial for smaller builds, better performance, and more efficient development workflows.

Before packaging your application, ensure that the following files are updated with your specific project details:

### Main Package.json (`./package.json`)

Update the following fields with your own details:

- `author`
- `description`
- `homepage`
- `repository.url`
- `bugs.url`
- `build.productName` (Name of the app that appears on Windows)
- `build.appId` (e.g., com.example.app)
- `build.publish.owner` (GitHub username)
- `build.publish.repo` (GitHub repository name)
- `build.publish.releaseType` (draft/prerelease/release)

### Release Package.json (`./release/app/package.json`)

This file is used for the setup executable:

- `name` (Name of the app)
- `author` (Same as main package.json)
- `description` (Same as main package.json)
- `version` (Important for GitHub release versioning)

## Building for Production

### Packaging Locally

To package the application for your local platform:

```bash
npm run package
```

### Packaging (Locally) for GitHub Releases

To package the application and create a release on GitHub, follow these steps:

1. **Ensure GitHub Token**: Ensure you have a GitHub token named `GH_TOKEN` saved in your `.env` file, or manually set it before running the packaging command.

2. **Versioning**: Ensure your versioning number follows the [Semantic Versioning](https://semver.org/) rules, (e.g. `0.0.10`).

#### Quick and Easy

**Windows:**

```bash
bash publish.sh 0.0.10
```

> Note: Ensure you are in a Bash terminal, and `jq` is installed via `choco install jq`.

**Linux:**

```bash
npm run publish-github -- 0.0.10
```

#### Manual Steps

1. Update the version number in `./release/app/package.json`. Ensure it is just numbers (e.g. `0.0.10`).
2. Commit the changes:

   ```bash
   git commit -am "v0.0.10"
   ```

3. Tag the commit:

   ```bash
   git tag v0.0.10
   ```

4. Push changes to GitHub:

   ```bash
   git push && git push --tags
   ```

5. Publish the release:

   ```bash
   GH_TOKEN=YOUR_GITHUB_TOKEN_HERE npm run package-publish
   ```

### Cross-Platform Packaging

Electron-builder recommends using [Docker](https://www.electron.build/multi-platform-build.html#docker).

### Notes

- Webpack plugins, such as `monaco-editor-webpack-plugin`, must be listed in `devDependencies` to avoid packaging issues.

### Contributing

Contributions are welcome! Please follow the standard GitHub workflow for submitting pull requests and issues.

### Inspiration

- Base electron code by [electron-react-boilerplate](https://github.com/HyperSprite/electron-react-boilerplate/tree/single-package-setup)
- App architecture by [thenewboston - tnbOS](https://github.com/thenewboston-developers/tnbOS)

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
