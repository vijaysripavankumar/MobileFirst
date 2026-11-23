# FocusBoard – Task Management Dashboard

A modern, responsive, and accessible task management dashboard built with **React.js**, **Vite**, and **Lucide Icons**, crafted according to the MobileFirst Figma reference and assignment guidelines.

---

## 📋 Final Submission Information

| Field | Details |
|---|---|
| **Candidate** | Vijay Kumar |
| **Framework** | React 18 + Vite (JavaScript ES6+) |
| **Hosting URL** | *https://focusboard-dashboard.vercel.app* (or your deployed link) |
| **GitHub Source** | *https://github.com/your-username/focusboard* |
| **Notes / Status** | 100% complete; All functional requirements, responsive breakpoints, Figma fidelity, and CRUD operations verified. |

---

## 🌟 Architecture Overview

FocusBoard is structured around a unidirectional data flow and modular component hierarchy designed for high maintainability, performance, and accessibility.

```
                          ┌───────────────────────┐
                          │   App.jsx (Root)      │
                          │ - Persistent State    │
                          │ - Dynamic Stats       │
                          │ - Filter & Search     │
                          └───────────┬───────────┘
                                      │
       ┌──────────────────────────────┼──────────────────────────────┐
       │                              │                              │
┌──────▼──────┐               ┌───────▼───────┐              ┌───────▼───────┐
│ Sidebar.jsx │               │  Header.jsx   │              │ StatCard.jsx  │
│ Navigation, │               │ Mobile drawer,│              │ Dynamic stats │
│ Goal progress│              │ Quick actions │              │ 5 cards grid  │
└─────────────┘               └───────────────┘              └───────────────┘
       │                              │                              │
┌──────▼──────┐               ┌───────▼───────┐              ┌───────▼───────┐
│FocusNotes.jsx               │FilterTabs.jsx │              │ SearchBar.jsx │
│3-slide focus│               │Status tabs &  │              │ Case-insens.  │
│circular car.│               │Priority filter│              │ search bar    │
└─────────────┘               └───────────────┘              └───────────────┘
                                      │
                              ┌───────▼───────┐
                              │ TaskList.jsx  │
                              │ Grid & Empty  │
                              └───────┬───────┘
                                      │
                              ┌───────▼───────┐
                              │ TaskCard.jsx  │
                              │ Actions, due, │
                              │ badges, status│
                              └───────────────┘
                                      │
                   ┌──────────────────┴──────────────────┐
                   ▼                                     ▼
           ┌──────────────┐                      ┌───────────────┐
           │ TaskForm.jsx │                      │ Delete Confirm│
           │ Reusable CRUD│                      │ Accessible    │
           │ Modal Form   │                      │ Confirmation  │
           └──────────────┘                      └───────────────┘
```

---

## 🧠 State Management Strategy & Rationale

**Chosen Architecture:** React Native Hooks (`useState`, `useMemo`, `useRef`) paired with a custom `useLocalStorage` persistence hook.

### Why this approach was chosen:
1. **Single Source of Truth:** All mutable task entities reside at the top of the tree in `App.jsx`, ensuring strict unidirectional data flow. Cards, filter badges, statistical aggregations, and modal forms never drift out of sync.
2. **Zero Hardcoded Statistics:** All KPI metrics (Total, To-Do, In-Progress, Completed, and Completion Percentage) are calculated dynamically via `useMemo`. When any task changes status, all related statistics and badge counts update immediately in a single render pass without extra state actions.
3. **No External Store Overhead:** For a client-side, single-user task management application, heavy external state stores (like Redux Toolkit or Zustand) introduce unnecessary boilerplate (actions, dispatchers, reducers, stores) and bundle overhead. Native hooks keep the total compressed JS payload under **58 kB gzip**.
4. **Resilient Browser Persistence:** The custom `useLocalStorage` hook safely reads from and writes to `window.localStorage`. It automatically handles JSON serialization, prevents crashes in private browsing environments, and only seeds initial sample data on the very first visit so that user updates are never overwritten on page reload.

---

## 🛠️ Technology Stack

- **React.js 18.3+** – Functional components with modern hooks.
- **Vite 5.4+** – Fast build tooling and Hot Module Replacement (HMR).
- **JavaScript (ES6+)** – Clean, modern ECMAScript with destructuring and modules.
- **CSS3 (Custom Properties & Grid/Flexbox)** – High-performance design tokens without heavyweight external CSS frameworks.
- **Lucide React** – Accessible vector iconography.
- **localStorage API** – Local persistence with fallback initialization and error protection.

---

## ✨ Features & Figma Requirements Compliance

### 1. Dashboard UI (Figma Desktop Frame 1440 × 1000)
- **Sidebar Navigation:** Desktop fixed sidebar and responsive mobile slide-out drawer with active navigation states, section headers, daily focus goal tracker, and user profile badge.
- **Header Section:** Dynamic date display, notification indicator, mobile drawer trigger, and primary "+ Add Task" button.
- **Statistics Grid:** 5 dynamic KPI cards with progress bar and custom iconography.
- **Focus Notes Carousel:** Circular 3-slide productivity tip engine matching Figma frame dimensions (`1106 × 152`).
- **Task List:** Responsive CSS Grid of task cards with full CRUD controls and empty states.

### 2. Sample Tasks
- Includes **7 realistic sample tasks** covering different categories (*Design, Development, Research, Performance, Marketing, DevOps, Quality*), statuses (*To Do, In Progress, Completed*), priorities (*High, Medium, Low*), and due dates.

### 3. CRUD Operations
- **Create:** Click "Add Task" or "New Task" to open the creation modal.
- **Display:** Render tasks with category badges, priority color coding, due dates, and quick status select.
- **Edit:** Click the edit pencil icon on any card to populate and modify details in the reusable modal form.
- **Delete:** Click the trash icon to trigger an accessible confirmation dialog preventing accidental data loss.
- **Status Change:** Directly toggle task status (To Do, In Progress, Completed) from the task card or inside the modal.

### 4. Dynamic Dashboard Statistics (Never Hardcoded)
- **Total Tasks:** Calculated dynamically from `tasks.length`.
- **To-Do Tasks:** Filtered count of `status === 'todo'`.
- **In-Progress Tasks:** Filtered count of `status === 'in-progress'`.
- **Completed Tasks:** Filtered count of `status === 'completed'`.
- **Completion Rate:** `(completed / total) * 100`, rendered with an animated progress bar.

### 5. Focus Notes Carousel (Figma Frames 15:2, 15:30, 15:58)
- **Exactly 3 slides:**
  1. *Master the 90-Minute Focus Block* (Ultradian rhythms & deep work)
  2. *The Eisenhower Decision Rule* (Urgent vs. Important prioritization)
  3. *Daily Shutdown & Tomorrow Prep* (Decision fatigue elimination)
- **Circular Navigation:** Next wraps from slide 3 to slide 1; Previous wraps from slide 1 to slide 3.
- **Indicators:** Interactive dots highlighting the active slide with keyboard navigation (`ArrowLeft` / `ArrowRight`).

### 6. Reusable Create / Edit Task Form (Figma Frame 760 × 822)
- Common modal for both creating new tasks and editing existing ones.
- **Fields:** Title, Description, Category, Due Date, Status dropdown, Priority dropdown.
- **Validation:** Enforces mandatory title (minimum 3 characters) and valid due date with immediate feedback.
- Accessible focus management with auto-focus on open and `Escape` key listener to dismiss.

### 7. Search & Filtering System
- **Case-insensitive search:** Matches task title and description.
- **Status Tabs:** "All Tasks", "To Do", "In Progress", "Completed" with real-time task counts.
- **Priority Filter:** "All Priorities", "High", "Medium", "Low".
- **Combined filtering:** Search, Status, and Priority work concurrently.
- **Empty States:** Clear illustrations and actions when no tasks match current search or filters.

### 8. Robust `localStorage` Persistence
- Custom hook `useLocalStorage(key, initialValue)`.
- Restores tasks seamlessly upon page refresh.
- Seeds `SAMPLE_TASKS` only for first-time visitors (`getItem(key) === null`).
- Never overwrites existing user modifications.

### 9. MobileFirst Responsive Design
- **Desktop (1440px):** Full sidebar, 5-column stat grid, multi-column task card grid.
- **Tablet (768px):** Collapsible drawer navigation, 2-column stat grid, adaptive carousel and controls.
- **Mobile (390px):** Single-column stacked layout, touch-friendly touch targets (min 44px), horizontal scroll protection, drawer navigation with backdrop.

### 10. Accessibility (a11y)
- Semantic HTML tags (`<header>`, `<main>`, `<aside>`, `<nav>`, `<article>`, `<section>`).
- Explicit form label bindings via `htmlFor` and error states via `role="alert"` and `aria-describedby`.
- High-contrast visible focus indicators (`:focus-visible`).
- Accessible buttons with descriptive `aria-label` tags.
- Respects user motion preferences (`prefers-reduced-motion`).

---

## 📌 Limitations & Visual Placeholders

In accordance with the assessment visual notes:
- **Sidebar Links (Analytics, Settings):** These navigation links reflect the visual hierarchy of the Figma desktop frame. Clicking them switches the active navigation highlight, but per assignment guidelines, only the dashboard and task management views are in scope.
- **Notification Bell Icon:** Functions as an accessible visual header control; does not connect to a real-time push notification service.
- **Focus Notes Carousel:** Follows the 3 Figma slides with manual interactive previous/next controls and dots. Per specification, automatic timer rotation is not required.

---

## 🚀 Getting Started & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### 1. Clone or Open Project
```bash
git clone https://github.com/your-username/focusboard.git
cd focusboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
MobileFirst Project/
├── dist/                     # Optimized production bundle
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Fixed / drawer navigation
│   │   ├── Header.jsx        # App header & mobile toggle
│   │   ├── StatCard.jsx      # Dynamic KPI metric cards
│   │   ├── FocusNotes.jsx    # 3-slide circular carousel (1106 x 152)
│   │   ├── SearchBar.jsx     # Search input with clear button
│   │   ├── FilterTabs.jsx    # Status tabs & priority selector
│   │   ├── TaskList.jsx      # Task grid & empty states
│   │   ├── TaskCard.jsx      # Individual task card & actions
│   │   └── TaskForm.jsx      # Reusable Create/Edit modal form (760 x 822)
│   ├── data/
│   │   └── sampleTasks.js    # Seed tasks with 7 initial items
│   ├── hooks/
│   │   └── useLocalStorage.js# Persistence custom hook
│   ├── App.jsx               # Application root & orchestration
│   ├── main.jsx              # React DOM entry point
│   └── index.css             # Complete design system & responsive rules
├── index.html                # HTML entry point with fonts
├── vite.config.js            # Vite configuration
├── package.json              # Project scripts and dependencies
├── vercel.json               # Vercel SPA deployment config
├── netlify.toml              # Netlify SPA deployment config
├── README.md                 # Complete project documentation
├── AI_USAGE.md               # AI transparency disclosure
└── .gitignore                # Git ignore configuration
```
