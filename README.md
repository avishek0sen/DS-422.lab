# Air Quality Prediction Using Machine Learning

Project website for **DS422 – Machine Learning I (2026)**. It presents a supervised regression study that predicts carbon monoxide concentration `CO(GT)` from the UCI Air Quality dataset, comparing four scikit-learn models. Every number and figure comes from the executed notebook `DS_422_LAB(744).ipynb`.

## Results (from the notebook)

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Linear Regression | 0.3048 | 0.4693 | 0.8943 |
| Decision Tree | 0.3416 | 0.5417 | 0.8591 |
| **Random Forest (best, lowest RMSE)** | **0.2247** | **0.3536** | **0.9400** |
| Gradient Boosting | 0.2397 | 0.3671 | 0.9353 |

Cleaned data: 7,674 rows × 15 columns (14 features + target); 6,139 train / 1,535 test rows; random split with `random_state=42`.

## Tech

Static site: HTML, CSS, vanilla JavaScript, inline SVG charts, canvas hero animation. No build step, no dependencies, no backend. Font: Plus Jakarta Sans via Google Fonts (falls back to system fonts offline).

## Project structure

```
air-quality-ml-website/
├── index.html              page structure and content
├── css/styles.css          design tokens, dark/light themes, responsive layout
├── js/
│   ├── config.js           Colab and GitHub links (edit this)
│   └── main.js             theme toggle, menu, tables, timeline, charts, hero canvas
├── assets/
│   ├── favicon.svg
│   └── images/             7 plots exported from the notebook
├── .github/workflows/pages.yml   GitHub Pages deployment
├── netlify.toml  vercel.json     optional hosting config
├── package.json  .gitignore
└── README.md
```

## Run locally

Option A: open `index.html` directly in a browser.

Option B (local server, recommended):

```bash
npm start            # needs Node.js; serves http://localhost:3000
# or, with Python:
python3 -m http.server 3000
```

## Set your links

Edit `js/config.js` and replace the two placeholders:

```js
var COLAB_URL = "https://colab.research.google.com/...";
var GITHUB_URL = "https://github.com/<user>/<repo>";
```

Until you do, those two cards show "Link pending" and do not navigate.

## Upload to GitHub

```bash
git init
git add .
git commit -m "Add DS422 air quality ML website"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

## Deploy

- **GitHub Pages:** repo → Settings → Pages → Source: **GitHub Actions**. The included workflow deploys on every push to `main`. The site appears at `https://<user>.github.io/<repo>/`.
- **Netlify:** import the repo; no build command; publish directory `.` (configured in `netlify.toml`).
- **Vercel:** import the repo; framework preset "Other"; no build command.

## Updating results

Model metrics are in the `R` array in `js/main.js`; the best-model cards in `index.html` (section "The Winning Model") hold the rounded values. If you re-run the notebook, update both, and replace the images in `assets/images/`.

## Notes on accuracy

- The notebook's CSV loads 9,471 rows (114 empty); the original UCI metadata (9,358 instances) is shown separately from the notebook's actual shapes.
- A random split was used, not a chronological one.
- Feature-importance values in the text are approximate readings of the notebook plot, because the notebook did not print them.

## Browser support

Current Chrome, Edge, Firefox and Safari, on desktop and mobile.
