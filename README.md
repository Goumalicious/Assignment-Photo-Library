# Photo Library

An Angular app with an infinite, random photo stream and a Favorites library saved in the browser.

- **Photos** (`/`): An endless 3-column grid of random photos. Scroll to load more and click a photo to add it to your favorites.
- **Favorites** (`/favorites`): The photos you saved as favorites. Click one to open it.
- **Single photo** (`/photos/:id`): the photo in large size, with a **Remove from favorites** button.

Favorites are stored in `localStorage`. There is no backend.

## Installation steps

Requires Node.js 22.22+, 24.15+ or 26+ (check with `node -v`).

1. Clone the repository and open the folder:
   ```bash
   git clone https://github.com/Goumalicious/Assignment-XM-Photo-Library.git
   cd Assignment-XM-Photo-Library
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the app, then open **http://localhost:4200** in your browser:
   ```bash
   npm start
   ```

To run the unit tests once:

```bash
npm test -- --watch=false
```

## Tech stack

- Angular 22: standalone components, signals, zoneless change detection, OnPush everywhere
- Angular Material 3: toolbar, buttons, icons, progress spinner, snackbar, with a custom theme
- SCSS, RxJS, Vitest
- Photos from Lorem Picsum (https://picsum.photos)
