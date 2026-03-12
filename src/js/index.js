import { routes } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    // Initial routing
    routes();

    // Listen for navigation events (e.g., from navigation links)
    window.addEventListener('popstate', routes);
  } else {
    console.error('App element not found!');
  }
  fetchContributors();
});

async function fetchContributors() {
  try {
    const response = await fetch('contributors.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contributors = await response.json();
    displayContributors(contributors);
  } catch (error) {
    console.error('Could not fetch contributors:', error);
    // Display a fallback message in the UI, if appropriate
    const contributorsSection = document.getElementById('contributors');
    if (contributorsSection) {
        contributorsSection.innerHTML = '<p>Failed to load contributors.</p>';
    }
  }
}

function displayContributors(contributors) {
  const contributorsSection = document.getElementById('contributors');
  if (!contributorsSection) {
    console.error('Contributors section not found!');
    return;
  }

  contributorsSection.innerHTML = ''; // Clear any existing content

  contributors.forEach(contributor => {
    const contributorElement = document.createElement('div');
    contributorElement.classList.add('contributor'); // Add a class for styling

    const avatar = document.createElement('img');
    avatar.src = contributor.avatar_url;
    avatar.alt = contributor.login;
    avatar.width = 50; // Set a default width
    avatar.height = 50; // Set a default height
    contributorElement.appendChild(avatar);

    const username = document.createElement('a');
    username.href = contributor.html_url;
    username.textContent = contributor.login;
    username.target = '_blank'; // Open link in a new tab
    contributorElement.appendChild(username);

    contributorsSection.appendChild(contributorElement);
  });
}
