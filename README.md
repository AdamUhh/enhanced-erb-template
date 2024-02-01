## References

- Installing Tailwind
  - First, Docs: <https://electron-react-boilerplate.js.org/docs/styling>
  - Then, <https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/3084>

- Installing shadcn/ui
  - Just follow this <https://ui.shadcn.com/docs/installation/manual>
  

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/AdamUhh/enhanced-erb-template.git your-project-name
cd your-project-name
npm install
```


## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

# Packaging

Ensure that your `package.json` is updated with your info, specifically:

Within `./package.json`:

- author
- homepage
- repository
- bugs.url
- build.appId
- build.productName
- build.publish.private (true/false)
- build.publish.releaseType (draft/prerelease/release)

Within `./release/app/package.json`:

- name
- version (Very important for github release versioning)
- description
- license
- author.name
- author.email
- author.url

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Packaging for Production (Github Releases)

To package apps for the all platforms & release it to github:

1. Go to github and create a new release/a new tag (ex: 0.0.10)

2. Type the below into your terminal

```bash
GH_TOKEN=YOUR-GITHUB-TOKEN-HERE npm run package-publish
```
