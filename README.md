# PokimonApp

PokimonApp is a small Angular 21 application that browses Pokémon details using server-side rendering, standalone components, and reactive Signals.

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

## Build

Create a production build:

```bash
npm run build
```

Serve the SSR build locally after building:

```bash
npm run serve:ssr:pokimon-app
```

## Testing

Run unit tests:

```bash
npm test
```

## Design decisions

- Standalone components for better modularity and simpler imports.
- Server-side rendering with `@angular/ssr` to support faster first paint and SEO.
- Client hydration with `provideClientHydration(withEventReplay())`.
- Route-based architecture, including a dedicated 404 page for unmatched routes.
- Angular `Title` service used for dynamic detail page titles.

## Challenges solved

- Added a not-found page instead of silent wildcard redirects.
- Provided a server route footprint for SSR wildcard handling.
- Updated the browser title to show the selected Pokémon name.

## Remaining enhancements

- Add caching for Pokémon list results to reduce duplicate API calls.
- Create retry behavior for failed HTTP requests.

## Notes

- The app reads the PokeAPI base URL from `src/environments/environment.ts`.
- The wildcard route is now handled by a dedicated `NotFound` component.
