# Spotat

A tool that can check your top artists and tracks that you listen to

## How it works

You log into the website, and it fetches information about your profile from the [Spotify Web API](https://developer.spotify.com/), depending on which buttons you click.

## Running locally

1. Clone the repository.

```
git clone https://github.com/brunolepis/spotat
```

2. Go into the directory.
3. Then install the dependencies.

> **Note** This project uses [pnpm](https://pnpm.io) as the package manager. If you want to use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) as the package manager, go to step 4.

```
pnpm install
pnpm run dev
```

4. Using npm, install the dependencies.

> **Note** It is recommended to delete the file called `pnpm-lock.yaml`.

```
npm install
npm run dev
```

## Contributing

Contributions are always welcome to anything that can be fixed or improved.
