# CardWise

CardWise is a modern, blazing-fast, and fully responsive credit card recommendation platform built for the Indian market. It features a premium deep navy dark theme with vibrant lime and lavender accents, dynamic animations, and a seamless user experience.

## Features

- **Multi-Step Branching Quiz:** Users are guided through a sleek, interactive quiz to understand their spending habits (Travel vs. Shopping/Bills), complete with a dynamic progress bar.
- **Smart Recommendation Engine:** A custom scoring algorithm (`src/lib/quiz-logic.ts`) matches users to the perfect card based on fee tolerance, spending categories, and specific perks (like lounge access or UPI).
- **Rich Result Pages:** 
  - Realistic, dynamically generated CSS card mockups featuring accurate issuer branding and network logos.
  - Confetti celebrations on finding a match.
  - Clear breakdowns of Joining/Annual fees, Reward point categories, and important caveats ("Things to Know").
- **Shortlist Functionality:** Users can bookmark their favorite cards for comparison using a slide-out drawer, with data persisted locally.
- **Deep Linking:** Powered by TanStack Router, every card has a dedicated, shareable URL (e.g., `/cards/hdfc-infinia-metal`).

## Tech Stack

- **Framework:** React + Vite
- **Routing:** TanStack Router (File-based routing)
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui components)
- **Animations:** Framer Motion & Canvas Confetti
- **Icons:** Lucide React
- **Data:** A rich, locally stored JSON dataset (`src/data/cards.json`) containing 30+ real Indian credit cards.

## Getting Started

To run this project locally, you will need [Node.js](https://nodejs.org/) installed on your machine. We recommend using [Bun](https://bun.sh/) or `npm` for dependency management.

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd cardwise
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or if using bun:
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or if using bun:
   bun run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:8080/` (or the port specified in your terminal).

## Project Structure

- `src/components/`: Reusable UI components (Navbar, Hero, Footer, etc.).
- `src/components/quiz/`: Components handling the multi-step quiz flow.
- `src/components/results/`: Components for the rich recommendation payoff (Card Mockups, Points Lists).
- `src/data/`: Contains the credit card dataset (`cards.json`) and the dynamic logo configurations (`logos.ts`).
- `src/hooks/`: Custom React hooks, including `use-shortlist.ts` for localStorage management.
- `src/lib/`: Utility functions and the core `quiz-logic.ts` scoring engine.
- `src/routes/`: File-based routing definitions for TanStack Router.

## License
MIT License
