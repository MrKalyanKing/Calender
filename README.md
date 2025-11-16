# 📅 Event Calendar

A modern, interactive event calendar application built with React and Vite. Browse events across months, view detailed event information, and manage your schedule with an intuitive UI.

## ✨ Features

- **Interactive Calendar Grid** – Navigate through months with previous/next buttons
- **Event Display** – View up to 2 event previews per day with event counts
- **Event Details** – Click on a day to see the first event's full details
- **Today Highlight** – Current day is highlighted with a purple border
- **Event Management** – Display event information including:
  - Event title and timing
  - Member capacity and current attendance
  - Scheduled event days
  - Time duration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calender
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Calender.jsx       # Main calendar component
│   ├── Event.jsx          # Event badge component
│   └── EventTop.jsx       # Event details display
├── utils/
│   └── calenderutil.js    # Calendar matrix builder
├── App.jsx                # Main app wrapper
├── main.jsx               # React entry point
└── index.css              # Global styles
public/
└── event.json             # Event data source
```

## 📝 Event Data Format

Events are loaded from `public/event.json`. Each event should have the following structure:

```json
{
  "id": 1,
  "title": "Event Name",
  "date": "2025-11-05",
  "timeStart": "3:00 PM",
  "timeEnd": "4:00 PM",
  "members": 25,
  "capacity": 30,
  "days": ["Wed"]
}
```

## 🛠 Tech Stack

- **React 19** – UI library
- **Vite 7** – Build tool with HMR
- **Tailwind CSS 4** – Utility-first CSS framework
- **date-fns 4** – Date manipulation and formatting
- **ESLint 9** – Code quality tool

## 📦 Dependencies

### Main
- `react` – UI framework
- `react-dom` – React DOM rendering
- `date-fns` – Date utilities
- `tailwindcss` – CSS framework
- `@tailwindcss/vite` – Tailwind integration

### Dev
- `vite` – Build tool
- `@vitejs/plugin-react` – React support for Vite
- `eslint` – Linting
- `eslint-plugin-react-hooks` – React hooks linting
- `eslint-plugin-react-refresh` – Fast refresh linting

## 🧹 Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📖 Key Components

### [Calendar](src/components/Calender.jsx)
Main calendar component that:
- Fetches events from `event.json`
- Builds a calendar matrix for the current month
- Handles month navigation
- Manages selected event state
- Displays events on calendar days

### [EventTop](src/components/EventTop.jsx)
Displays detailed information about the selected event:
- Event title and category
- Member attendance
- Event timing
- Days of the week
- Edit button for master event management

### [EventBadge](src/components/Event.jsx)
Shows a compact preview of an event:
- Event title (truncated)
- Event start time

### [Calendar Utility](src/utils/calenderutil.js)
Helper function `buildCalendarMatrix()` that:
- Generates a 2D matrix of dates for the current month
- Includes days from previous/next months for a complete grid
- Uses Monday as the week start

## 🎨 Styling

The application uses Tailwind CSS with custom tweaks:
- Soft UI shadow effects
- Color-coded event indicators (green)
- Interactive hover states
- Day highlighting for today

## 🔧 Configuration

- **Vite Config** – [vite.config.js](vite.config.js)
- **ESLint Config** – [eslint.config.js](eslint.config.js)
- **Tailwind** – Configured via Vite plugin in `vite.config.js`

## 📄 License

This project is open source and available under the MIT License.
