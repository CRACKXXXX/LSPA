
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#tutorials-and-resources">Tutorials and Resources</a></li>
    <li><a href="#design-and-inspiration">Design and Inspiration</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

**LSPA** is a comprehensive React-based single-page application designed for gaming enthusiasts to analyze and compare vehicle statistics.

Key Features:
*   **Massive Database:** Browse over 700 vehicles with visual stats.
*   **Comparison Tool:** "Versus Mode" to compare two vehicles side-by-side.
*   **Dream Garage:** Add vehicles to your wishlist, tag them (Pending, Obtained, Hunting), and track your collection.
*   **Minigames:**
    *   *Guess The Car:* Identify vehicles from blurred images.
    *   *Battle Cards:* A "Top Trumps" style card strategy game.
*   **Responsive Design:** Fully adapted for Desktop, Laptop, Tablet, and Mobile devices.

### Home Page Description
The Home Page serves as the central hub and catalog. It features:
*   A responsive **Grid System** displaying hundreds of vehicle cards via a JSON data source (`vehicles.json`).
*   **Advanced Filtering:** Filter by Class (Super, Muscle, etc.), search by name, or sort by performance metrics.
*   **Interactive Sidebar:** A collapsible filter panel (responsive) that allows fine-grained control over the viewed dataset.
*   **Dynamic Routing:** Easy access to the Garage, Versus Mode, and Games via a sticky Navigation Header.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project exploits modern web technologies and third-party components:

*   [![React][React.js]][React-url]
*   **React Router Dom**: For seamless client-side navigation.
*   **Leaflet & React-Leaflet**: Used in the `/location` page to render interactive maps.
*   **Vite**: Next-generation frontend tooling for fast builds.
*   **CSS3 Custom Properties**: For the "Neon/Dark Mode" aesthetic without heavy frameworks.

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
   The app will be available at `http://localhost:5173` and `http://localhost:5173/home`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

*   **Browsing:** Use the filters on the left sidebar to find "Super" cars with high "Handling".
*   **Versus:** Navigate to "Versus" and select two cars to see which one is objectively better.
*   **Garage:** Click the :heart: icon on any card to add it to your Garage. Go to the Garage page to organize them by tags.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TUTORIALS -->
## Tutorials and Resources

This project was built with the help of the following resources:

*   [Best-README-Template](https://github.com/othneildrew/Best-README-Template) - Used for this documentation.
*   [React Leaflet Documentation](https://react-leaflet.js.org/) - Guide for implementing the map.
*   [CSS Grid Guide (CSS-Tricks)](https://css-tricks.com/snippets/css/complete-guide-grid/) - Essential for the responsive catalog layout.
*   [React Router v6 Tutorial](https://reactrouter.com/en/main/start/tutorial) - Routing implementation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Design and Inspiration

The UI/UX design focuses on a "Cyber/Neon" aesthetic suitable for a high-performance gaming theme.

*   **Figma Design Inspiration:** [Gaming Dashboard UI Kit (Example)](https://www.figma.com/community/file/1169620831636988223)
*   **Color Palette:** Dark background (`#1a1a20`) with Neon Yellow (`#ffe600`) and Red (`#ff003c`) accents.
*   **UX Principles:**
    *   **Feedback:** Hover effects and instant visual cues (heart animation).
    *   **Visibility:** Clear navigation and active states.
    *   **Consistency:** Reusable `VehicleCard` and `Button` styles.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/CRACKXXXX/LSPA](https://github.com/CRACKXXXX/LSPA)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
