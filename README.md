<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CRACKXXXX/LSPA">
    <img src="public/lspa-logo.jpg" alt="Logo" width="80" height="80" style="border-radius:50%">
  </a>

  <h3 align="center">Los Santos Performance Analyzer (LSPA)</h3>

  <p align="center">
    The ultimate vehicle performance database for GTA V Online, featuring real-time comparisons, minigames, and a persistent garage system.
    <br />
    <a href="https://github.com/CRACKXXXX/LSPA"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CRACKXXXX/LSPA">View Demo</a>
    ·
    <a href="https://github.com/CRACKXXXX/LSPA/issues">Report Bug</a>
    ·
    <a href="https://github.com/CRACKXXXX/LSPA/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#home-page-description">Home Page Description</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#gamification-system">Gamification & User System</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#tutorials-and-resources">Tutorials and Resources</a></li>
    <li><a href="#design-and-inspiration">Design and Inspiration</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

**LSPA (Los Santos Performance Analyzer)** is the ultimate vehicle performance database and user ecosystem for GTA V Online roleplayers and high-octane enthusiasts.

Key Features:
*   **Massive Database:** Browse over 700 vehicles with visual stats.
*   **User Ecosystem:**
    *   **Authentication:** Create an account to save your progress (localStorage based).
    *   **Persistent Garage:** Save vehicles to your personal collection, tagged by status (Obtained, Hunting, Priority).
    *   **User Profile:** Customize your Avatar, Bio, and Driving Preferences.
    *   **Leveling System:** Earn XP by using the app, winning minigames, and expanding your collection.
*   **Comparison Tool:** "Versus Mode" to compare two vehicles side-by-side.
*   **Minigames Suite:**
    *   *Guess The Car:* Test your knowledge to earn XP.
    *   *Battle Cards:* A strategy card game using vehicle stats vs AI.
    *   *Higher or Lower:* Predict vehicle prices and speeds.
*   **Analytics Dashboard:** Visualize your garage value and class distribution with Chart.js.
*   **Cyberpunk/Neon Aesthetic:** A fully immersive dark-mode UI with glassmorphism and animations.

### Home Page Description
The Home Page serves as the central hub and catalog. It features:
*   A responsive **Grid System** displaying hundreds of vehicle cards via a JSON data source.
*   **Advanced Filtering:** Filter by Class (Super, Muscle, etc.), search by name, or sort by performance metrics.
*   **Dynamic Stats:** Vehicle cards display performance with **Traffic Light Color Coding** (Green for excellent, Pink for God-Tier).
*   **Sticky Navigation:** Easy access to the Garage, Versus Mode, and Games.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project exploits modern web technologies:

*   [![React][React.js]][React-url]
*   **React Router Dom**: For seamless client-side navigation.
*   **Leaflet & React-Leaflet**: Interactive Los Santos map implementation.
*   **Chart.js**: For the Analytics Dashboard.
*   **Vite**: Next-generation frontend tooling.
*   **Context API**: Managing Global State (Auth, Garage, Gamification) without Redux.
*   **CSS3 Variables**: "Fire & Neon" Theming engine.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/CRACKXXXX/LSPA.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Start the Development Server
    ```sh
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GAMIFICATION -->
## Gamification System

LSPA includes a fully integrated progression system:
*   **XP Actions**:
    *   Add Vehicle to Garage: +5 XP
    *   Win Battle Card Game: +50 XP
    *   Guess Correct Car: +15 XP
*   **Leaderboard**: Compete globally with other users to reach the top of the "Most Wanted" list.
*   **Dynamic Tags**: Garage vehicles are tagged with neon statuses (OBTAINED, HUNTING, PRIORITY) that glow based on rarity.

<!-- USAGE EXAMPLES -->
## Usage

*   **Browsing:** Use the filters on the left sidebar to find "Super" cars with high "Handling".
*   **Versus:** Navigate to "Versus" and select two cars to see which one is objectively better.
*   **Garage:** Click the :heart: icon on any card to add it to your Garage.
*   **Profile:** Click your avatar to see your Level, XP Bar, and Stats.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TUTORIALS -->
## Tutorials and Resources

This project was built with the help of the following resources:

*   [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
*   [React Leaflet Documentation](https://react-leaflet.js.org/)
*   [Chart.js Documentation](https://www.chartjs.org/)
*   [GTA V Vehicle Data](https://gtacars.net/) (Inspiration for data structure)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Design and Inspiration

The UI/UX design focuses on a "Cyber/Neon" aesthetic suitable for a high-performance gaming theme.

*   **Theme:** "Fire & Gold" - Dark backgrounds featuring Neon Red accents and Gold highlights.
*   **Figma Inspiration:** [Gaming Dashboard UI Kit](https://www.figma.com/community/file/1169620831636988223)
*   **UX Principles:**
    *   **Gamified Feedback:** Animations for leveling up and earning XP.
    *   **Glassmorphism:** Translucent panels for a modern, futuristic feel.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/CRACKXXXX/LSPA](https://github.com/CRACKXXXX/LSPA)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
