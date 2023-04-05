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
3. Create an application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
> **Note** The app name, description and website can be whatever you want, but one of the redirect URIs needs to point to `http://localhost:3000/api/auth/callback/spotify`.

4. Copy the **Client ID** and the **Client Secret** and paste them into the file called `.env.template`.
5. Rename the aforesaid file to `.env.local`.
6. Then install the dependencies and start the development server.

> **Note** This project uses [pnpm](https://pnpm.io) as the package manager. If you want to use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) as the package manager, go to step 7.

```
pnpm install
pnpm run dev
```

7. Using npm, install the dependencies and start the development server.

> **Note** It is recommended to delete the file called `pnpm-lock.yaml`.

```
npm install
npm run dev
```

## Contributing

Contributions are always welcome to anything that can be fixed or improved.
