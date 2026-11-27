# Sweet Treats Search

A small web app for finding dessert recipes. Type a sweet you're craving (like "cake" or "pie"), and the app fetches matching recipes from [TheMealDB](https://www.themealdb.com/) API and shows them as cards with photos.

![Screenshot](docs/screenshot.png)

## Features

- **Live recipe search** using TheMealDB public API (`fetch` + `async/await`)
- **Desserts only:** results are filtered to the Dessert category, with a friendly message if the dish isn't a dessert
- **Recipe cards** with photo, name, category, cuisine and a short preview (up to 6 results)
- **Full recipe popup (modal)** with the full instructions, closable with ✕ or by clicking outside
- **Clear results** button and status messages for empty searches, no results and connection errors

## Tech stack

- HTML, CSS, vanilla JavaScript
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [TheMealDB API](https://www.themealdb.com/api.php)

## How to run

No installation needed:

1. Clone the repo:
   ```bash
   git clone https://github.com/Asmaalghanmi/SweetSearchWebSite.git
   ```
2. Open `index.html` in your browser.

## Project structure

```
index.html   Page layout and search form
style.css    Custom styles
script.js    API calls, filtering, result cards and recipe popup
```
