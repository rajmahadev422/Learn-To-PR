import router from './router.js';

// Import pages
import Home from '../pages/Home.html';
import Leaderboard from '../pages/Leaderboard.html';
import NotFound from '../pages/404.html';

// Import Layouts
import Header from '../pages/layout/Header.html';
import Footer from '../pages/layout/Footer.html';

// Define routes
const routes = {
  '/': Home,
  '/leaderboard': Leaderboard,
};

// Function to load layout components
const loadLayout = () => {
  document.querySelector('header').innerHTML = Header;
  document.querySelector('footer').innerHTML = Footer;
};

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  loadLayout();
  router(routes, NotFound);
});

// Listen for hash changes
window.addEventListener('hashchange', () => {
  router(routes, NotFound);
});

// Function to fetch contributors from contributors.json and display them
async function displayContributors() {
  try {
    const response = await fetch('contributors.json');
    const contributors = await response.json();

    const contributorsContainer = document.createElement('div');
    contributorsContainer.id = 'contributors-container';

    contributors.forEach(contributor => {
      const contributorElement = document.createElement('div');
      contributorElement.classList.add('contributor');

      const avatar = document.createElement('img');
      avatar.src = contributor.avatar_url;
      avatar.alt = contributor.login;
      avatar.width = 50;
      avatar.height = 50;

      const username = document.createElement('a');
      username.href = contributor.html_url;
      username.textContent = contributor.login;

      contributorElement.appendChild(avatar);
      contributorElement.appendChild(username);
      contributorsContainer.appendChild(contributorElement);
    });

    document.querySelector('main').appendChild(contributorsContainer);
  } catch (error) {
    console.error('Error fetching contributors:', error);
    document.querySelector('main').innerHTML = '<p>Failed to load contributors.</p>';
  }
}

// Call the function to display contributors (you might want to call it based on the route)
if (window.location.hash === '#/leaderboard') { // adjust condition according to your route
    displayContributors();
}

