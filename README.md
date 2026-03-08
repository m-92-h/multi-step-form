# Multi-Step Form

A clean and interactive multi-step subscription form built with TypeScript and Vite.  
Users can fill in their info, choose a plan, pick add-ons, and review a live summary before confirming.

---

## Preview

![Multi-Step Form Preview](./public/preview.jpg)

---

## Features

- 4-step form with smooth navigation (Next / Go Back / Sidebar clicks)
- Real-time field validation on Step 1 (name, email, phone)
- Monthly / Yearly billing toggle with price updates across all steps
- Interactive plan cards and add-on selection
- Live order summary with total price calculation

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 + Bootstrap 5 | Styling and layout |
| TypeScript | Logic and DOM manipulation |
| Vite | Dev server and bundler |

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+) and **npm** installed.

```bash
node -v
npm -v
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/m-92-h/multi-step-form.git

# 2. Navigate into the project folder
cd multi-step-form

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
multi-step-form/
├── public/          # preview
├── src/
├── assets/          # SVGs, favicon, and background images
│   ├── main.ts
│   └── style.css
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```