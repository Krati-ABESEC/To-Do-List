const STORAGE_KEY = "taskspace.tasks.v1";
const SETTINGS_KEY = "taskspace.settings.v1";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const summary = document.querySelector("#task-summary");
const emptyState = document.querySelector("#empty-state");
const message = document.querySelector("#form-message");
const filterButtons = document.querySelectorAll("[data-filter]");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const accentInput = document.querySelector("#accent-color");
const fontSizeSelect = document.querySelector("#font-size");
const resetAppearanceButton = document.querySelector("#reset-appearance");

let tasks = loadTasks();
let activeFilter = "all";
let settings = loadSettings();

function loadTasks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((task) =>
      task && typeof task.id === "string" &&
      typeof task.text === "string" &&
      typeof task.completed === "boolean"
    );
  } catch (error) {
    console.error("Could not read saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Could not save tasks:", error);
    message.textContent = "Your browser could not save changes. Check storage settings.";
    return false;
  }
}

function loadSettings() {
  const defaults = { theme: "light", accent: "#7657e8", fontSize: "16" };
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return {
      theme: stored.theme === "dark" ? "dark" : defaults.theme,
      accent: /^#[0-9a-f]{6}$/i.test(stored.accent || "") ? stored.accent : defaults.accent,
      fontSize: ["14", "16", "18", "20"].includes(String(stored.fontSize)) ? String(stored.fontSize) : defaults.fontSize
    };
  } catch {
    return defaults;
  }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Could not save preferences:", error);
  }
}

function applySettings() {
  document.body.classList.toggle("dark", settings.theme === "dark");
  document.documentElement.style.setProperty("--accent", settings.accent);
  document.documentElement.style.setProperty("--task-font-size", `${settings.fontSize}px`);
  accentInput.value = settings.accent;
  fontSizeSelect.value = settings.fontSize;
  themeToggle.textContent = settings.theme === "dark" ? "🌙 Theme" : "☀️ Theme";
}

function createTask(text) {
  return { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, text, completed: false, createdAt: new Date().toISOString() };
}

function getVisibleTasks() {
  if (activeFilter === "active") return tasks.filter((task) => !task.completed);
  if (activeFilter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  const remaining = tasks.filter((task) => !task.completed).length;
  summary.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining · ${tasks.length} total`;
  list.replaceChildren();

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "active" : "completed"}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    // textContent treats user input as text, preventing HTML/script injection.
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.text}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, text, deleteButton);
    list.append(item);
  }

  emptyState.hidden = visibleTasks.length > 0;
  emptyState.textContent = tasks.length === 0
    ? "Nothing here yet. Add your first task above."
    : activeFilter === "active"
      ? "You're all caught up — no active tasks."
      : activeFilter === "completed"
        ? "No completed tasks yet."
        : "No tasks to show.";
  clearCompletedButton.disabled = !tasks.some((task) => task.completed);
}

function toggleTask(id) {
  tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    message.textContent = "Please enter a task before adding it.";
    input.focus();
    return;
  }

  tasks.unshift(createTask(text));
  saveTasks();
  renderTasks();
  form.reset();
  input.focus();
  message.textContent = "Task added.";
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    renderTasks();
  });
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
  message.textContent = "Completed tasks cleared.";
});

themeToggle.addEventListener("click", () => {
  settings.theme = settings.theme === "dark" ? "light" : "dark";
  applySettings();
  saveSettings();
});

accentInput.addEventListener("input", () => {
  settings.accent = accentInput.value;
  applySettings();
  saveSettings();
});

fontSizeSelect.addEventListener("change", () => {
  settings.fontSize = fontSizeSelect.value;
  applySettings();
  saveSettings();
});

resetAppearanceButton.addEventListener("click", () => {
  settings = { theme: "light", accent: "#7657e8", fontSize: "16" };
  applySettings();
  saveSettings();
});

applySettings();
renderTasks();










