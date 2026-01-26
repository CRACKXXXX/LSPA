# Los Santos Performance Analyzer (LSPA)

![LSPA Logo](https://placehold.co/600x200/13131f/00f0ff?text=LSPA+Banner)

**Deployment URL:** [Insert GitHub Pages URL Here]
**Repository:** [Insert GitHub Repo URL Here]

LSPA is a premium digital dealership and telemetry dashboard for GTA V/FiveM vehicles. It provides in-depth analysis, comparisons, and fleet management tools in a high-performance "Nightlife/Cyberpunk" interface.

## 🚀 Home Page Description
The Home Page serves as the central hub (Fleet Directory) for the application.
- **Hero Section:** Features a dynamic background and real-time stats of the database and user's garage value.
- **Fleet Gallery:** A smart grid/list view of all vehicles.
  - **Predictive Search:** Real-time filtering by name.
  - **Advanced Filters:** Filter by Class, Drivetrain, Seats, and Price range.
  - **View Toggle:** Switch between a visual Grid view and a data-dense List view.
- **Random Car:** A feature to discover vehicles by chance.

## 🛠 Third-Party Components
This project leverages several powerful React libraries:
- **[Leaflet](https://react-leaflet.js.org/):** Used in the Contact page to render an interactive map of Los Santos (mapped to LA coordinates).
- **[Chart.js](https://react-chartjs-2.js.org/):** Powers the "Spider Chart" loop visualization in the Analyzer for comparing 6 different performance metrics simultaneously.
- **[Lucide React](https://lucide.dev/):** Provides the consistent, clean icon set used throughout the UI.
- **[React Router](https://reactrouter.com/):** Handles client-side routing between Home, Analyzer, and Contact pages.

## 📚 Resources & Tutorials
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template): Used as inspiration for this documentation.
- [React Leaflet Guide](https://react-leaflet.js.org/docs/start-introduction/): Helped with implementing the map component.
- [Chart.js Radar Chart Docs](https://www.chartjs.org/docs/latest/charts/radar.html): Reference for the telemetry visualization.
- [CSS CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/): Vital for the responsive layout.

## 🎨 Design & Aesthetics
The design follows a "Premium Nightlife" aesthetic with:
- **Dark Mode Only:** Using deep blues (`#050510`) and gunmetal greys.
- **Neon Accents:** Cyan (`#00f0ff`) for primary actions and Purple (`#bd00ff`) for secondary highlights.
- **Glassmorphism:** Semi-transparent headers and panels.
- **Figma Design:** [Link to Figma Prototype](https://www.figma.com/) (Placeholder).

## ⚡ Features
- **Telemtry Analysis:** Detailed breakdown of vehicle stats including hidden stats like Handling and Off-Road.
- **Versus Pro:** Compare two vehicles side-by-side with an auto-generated verdict.
- **Garage Valuation:** Track the total value of your saved favorites.
- **Paint Shop:** Preview vehicles in different colors using real-time CSS filters.

## 📦 Installation & Setup
1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/LSPA.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Run Development Server
   ```sh
   npm run dev
   ```

## 🏗 Project Structure
The project follows a clean architecture:
- `components/`: Reusable UI blocks (kebab-case folders, PascalCase files).
- `pages/`: Route-specific views.
- `context/`: Global state management (Garage).
- `data/`: Static JSON datasets.
- `styles/`: Modular and global CSS.

---
© 2024 Los Santos Performance Analyzer. 
