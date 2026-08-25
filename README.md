# Smart Form Builder

A modern, responsive **Google Forms-inspired** form builder built with **HTML5, CSS3, Vanilla JavaScript, LocalStorage, SortableJS, and Chart.js**. It is designed as a portfolio-grade frontend SaaS simulation that runs on GitHub Pages with no backend and no React.

## Features

- Multi-form dashboard
- Blank forms and four business templates
- Demo workspace with preloaded responses
- Simulated Admin / Viewer authentication
- Drag field types into the builder on desktop; tap to add on mobile
- Touch-friendly drag-and-drop question reordering with SortableJS
- Short answer, paragraph, email, number, dropdown, checkbox, multiple choice, date, and section fields
- Rename labels, edit placeholders and options
- Required fields
- Duplicate and delete questions
- Undo / Redo history
- AND / OR conditional rules with multiple conditions
- Live preview without builder controls
- Auto-save to LocalStorage
- Public-form theme customization: primary color, light/dark mode, font size, and corner radius
- Stable ID-based shareable form URLs
- Public form validation and local response storage
- Completion-rate tracking
- Chart.js analytics per question
- Response table
- CSV export
- Print / Save PDF analytics
- Persistent app dark mode
- Offline-aware PWA with manifest and service worker
- Keyboard accessibility, focus states, ARIA labels, reduced-motion support
- Mobile-first responsive design for phone, tablet, and desktop
- Smooth micro-interactions and polished empty states

## Project Structure

```text
Smart-Form-Builder/
├── login.html
├── index.html
├── builder.html
├── form.html
├── analytics.html
├── manifest.json
├── service-worker.js
├── README.md
├── LICENSE
├── css/
│   └── style.css
├── js/
│   ├── core.js
│   ├── auth.js
│   ├── app.js
│   ├── builder.js
│   ├── form.js
│   └── analytics.js
└── assets/icons/
    ├── icon-192.png
    └── icon-512.png
```

## Employer Demo Flow

1. Open `login.html` and choose **Admin**.
2. Click **Load demo workspace** or choose a template.
3. Open a form in the builder.
4. Add multiple field types, rename a question, edit choices, mark it required, duplicate it, and drag it to reorder.
5. Select a question and create an **AND / OR conditional rule**.
6. Change the form theme, then use **Undo / Redo**.
7. Open **Live preview**.
8. Click **Share** or **Open form**, submit a response, then return to Analytics.
9. Show per-question charts, completion rate, the response table, CSV export, and **Print / Save PDF**.
10. Turn the browser offline after the app has loaded once to demonstrate the local-first PWA experience.

## Interview Explanation

> SmartForm is a Google Forms-style frontend SaaS simulation that I built with Vanilla JavaScript. I implemented the complete form lifecycle—creation, conditional logic, live preview, sharing, submission, persistence, and analytics—without a framework or backend. I used a stable JSON form schema, LocalStorage for local-first persistence, SortableJS for touch-friendly ordering, Chart.js for analytics, and a responsive CSS design system for mobile and desktop.

### Why no backend?

This portfolio version intentionally uses LocalStorage so it can run entirely on GitHub Pages. The storage layer is separated from the UI/data model so it can later be replaced by REST APIs, Firebase, Supabase, or another backend.

### Share-link limitation

Share links are simulated with stable form IDs. Because the demo stores form definitions in LocalStorage, a form created in one browser does not automatically exist on another device. A production backend would make those links globally shareable.

## Run Locally

Most features work by opening `login.html`, but use a local server for service-worker/PWA testing:

```bash
python -m http.server 8080
```

Open `http://localhost:8080/login.html`.

## GitHub Pages

Push the files to the repository root, then enable **Settings → Pages → Deploy from branch → main / root**.

## Author

**Sayed Rahim Sadat** — Frontend Web Developer

## License

MIT
