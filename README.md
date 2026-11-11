# Photo Library

An Angular app with an infinite, random photo stream and a Favorites library saved in the browser.

- **Photos** (`/`): An endless 3-column grid of random photos. Scroll to load more and click a photo to add it to your favorites.
- **Favorites** (`/favorites`): The photos you saved as favourites. Click one to open it.
- **Single photo** (`/photos/:id`): the photo in large size, with **Remove from favorites** button.

Favorites are stored in `localStorage`. There is no backend.

## Installation steps

Requires Node.js 22.22+, 24.15+ or 26+.

- Download the code / Clone the repository into your pc
- Install the dependencies `npm install`
- Start the app `npm start` and open **http://localhost:4200** in your browser to view the app

If you want to run the tests, use this command: `npm test --watch=false`

## Tech stack

- Angular 22: standalone components, signals, zoneless change detection, OnPush everywhere
- Angular Material 3: toolbar, buttons, icons, progress spinner, snackbar, with a custom theme
- SCSS, RxJS, Vitest
- Photos from Lorem Picsum (https://picsum.photos)
- Vitest for generating unit tests
