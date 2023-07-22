### Deprecated

As the website has been flagged as a phishing site by Google (which I have already reported as a false flag), I've decided to **deprecate** this repository **for the time being**; no updates will be released during this period.

---

# Spotat

A tool that can check your top artists, tracks that you listen to and even show how your personal ranking changes over time.

## How it works

You log into the website, and it fetches information about your profile from the [Spotify Web API](https://developer.spotify.com/), depending on which buttons you click.

## Ranking

The first time you log into the website, the artists and tracks that you listen to get saved into a database, and every time the order of the artists and tracks changes, the change gets shown accordingly on the website (e.g., a green up arrow when a track moves up a place). If an artist or track is new to the list, a "New" badge will show.

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
pnpm dev
```

7. Using npm, install the dependencies and start the development server.

> **Note** It is recommended to delete the file called `pnpm-lock.yaml`.

```
npm install
npm run dev
```

## Contributing

Contributions are always welcome to anything that can be fixed or improved.
