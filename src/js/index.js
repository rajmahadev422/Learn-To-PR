// src/js/index.js

import router from './router.js';

// Function to fetch contributors from contributors.json and update the UI
async function updateContributors() {
  try {
    const response = await fetch('contributors.json');
    const contributors = await response.json();

    const contributorsContainer = document.getElementById('contributors-container');
    if (!contributorsContainer) {
      console.error('Contributors container not found.');
      return;
    }

    contributorsContainer.innerHTML = ''; // Clear existing content

    contributors.forEach(contributor => {
      const contributorElement = document.createElement('div');
      contributorElement.classList.add('contributor'); // Add a class for styling

      const avatar = document.createElement('img');
      avatar.src = contributor.avatar_url;
      avatar.alt = contributor.login;
      avatar.classList.add('contributor-avatar');
      contributorElement.appendChild(avatar);

      const username = document.createElement('a');
      username.href = contributor.html_url;
      username.textContent = contributor.login;
      username.classList.add('contributor-username');
      contributorElement.appendChild(username);

      contributorsContainer.appendChild(contributorElement);
    });
  } catch (error) {
    console.error('Error fetching or parsing contributors:', error);
    contributorsContainer.innerHTML = '<p>Failed to load contributors.</p>';
  }
}

// Call updateContributors when the page loads, but only on the home page.
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path === '/Home.html') {
        updateContributors();
    }
    router();
});

