# TaskSpace — To-Do List

A responsive browser-based task manager built with semantic HTML, CSS, and vanilla JavaScript.

## Features
- Add tasks with input validation
- Mark tasks as completed and delete individual tasks
- Filter by all, active, and completed
- Clear all completed tasks in one action
- Persist tasks and appearance preferences using `localStorage`
- Dark/light theme, configurable accent color, and text-size controls
- Responsive layout and accessible labels / live status feedback
- Safe task rendering with `textContent` rather than injecting user input as HTML

## Run locally
No build tools or dependencies are required.

1. Download or clone this repository.
2. Open `index.html` in a browser, or use VS Code Live Server.
3. Add a task; refresh the page to verify persistence.

## Project structure
- `index.html` — semantic page structure
- `styles.css` — responsive layout and theme variables
- `app.js` — task state, persistence, rendering, filters, and settings

## Technical notes
Tasks are stored under `taskspace.tasks.v1`; appearance settings use `taskspace.settings.v1`. Data stays in the current browser and is not synced between devices. The app uses no backend or account system.

## Future improvements
- Due dates and priority labels
- Search and task editing
- Unit tests and automated accessibility checks
- Optional backend sync and authentication
