# Enhanced ERB Template

This template was created to make it easier and faster to create applications with essential features like shortcuts that can actually be used by the application, for both user macros and menubar shortcuts (I'm looking at you, accelerator -.-).

It also follows an app architecture that allows for multiple apps within one Electron application, though it may take some time to get used to.

## Install

Clone the repo and install dependencies:

```bash
git clone https://github.com/AdamUhh/enhanced-erb-template.git your-project-name
cd your-project-name
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging

There are two `package.json` files due to the [two package.json structure](https://www.electron.build/tutorials/two-package-structure.html) by electron-builder
> This structure is beneficial for many reasons, such as smaller builds, performance, etc.

Ensure that these `package.json` files are updated appropriately with own details, specifically:

`./package.json` :

- author
- description
- homepage
- repository.url
- bugs.url
- build.productName (Name of app that will appear on windows)
- build.appId (ex: name.NameOfApp)
- build.publish.owner (githubname)
- build.publish.repo (github-repo-name)
- build.publish.releaseType (draft/prerelease/release)

`./release/app/package.json`:

This package.json is in charge of your `setup.exe`

- name (name-of-app)
- author (same as other package.json)
- description (same as other package.json)
- version (Very important for github release versioning)

## Packaging for Production

To package apps for the `local platform`:

```bash
npm run package
```

## Packaging for Production (Github Releases)

To package apps for your `local platform` & release it to github:

1. Go to github and create a new release/a new tag (ex: 0.0.10)

2. Go to `./release/app/package.json` and match the version number (to ex: 0.0.10)

3. Push your files to github

4. Type the below into your terminal

```bash
GH_TOKEN=YOUR-GITHUB-TOKEN-HERE npm run package-publish
```

> You can also (try to) publish packaged apps for different platforms, using the below:
>
> ```bash
>   npm run package-publish:mac <- only supported on macOS
>   npm run package-publish:win
>   npm run package-publish:linux
>   npm run package-publish:all <- won't work if not on macOS
> ```

## References

- Installing Tailwind
  - First, Docs: <https://electron-react-boilerplate.js.org/docs/styling>
  - Then, <https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/3084>

- Installing shadcn/ui
  - Just follow this <https://ui.shadcn.com/docs/installation/manual>
  
## Contributions

Inspired by:

- Base electron code by [electron-react-boilerplate](https://github.com/HyperSprite/electron-react-boilerplate/tree/single-package-setup)
- App architecture by [thenewboston - tnbOS](https://github.com/thenewboston-developers/tnbOS)
