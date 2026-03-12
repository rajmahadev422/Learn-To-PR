import { render } from './router.js';

// Initial render
render();

// Listen for navigation events (e.g., back/forward buttons)
window.addEventListener('popstate', render);

// Function to load contributors from JSON and update the contributors section
async function loadContributors() {
  try {
    const response = await fetch('contributors.json');
    const contributors = await response.json();

    const contributorsSection = document.querySelector('.contributors-section'); // Target the correct element

    if (!contributorsSection) {
      console.error('Contributors section not found in the HTML.');
      return;
    }

    // Clear existing content
    contributorsSection.innerHTML = '';

    // Create and append contributor elements
    contributors.forEach(contributor => {
      const contributorElement = document.createElement('div');
      contributorElement.classList.add('contributor');

      const avatar = document.createElement('img');
      avatar.src = contributor.avatar_url;
      avatar.alt = contributor.login;
      avatar.classList.add('contributor-avatar');

      const username = document.createElement('a');
      username.href = contributor.html_url;
      username.textContent = contributor.login;
      username.classList.add('contributor-username');
      username.target = '_blank'; // Open link in new tab

      contributorElement.appendChild(avatar);
      contributorElement.appendChild(username);
      contributorsSection.appendChild(contributorElement);
    });

  } catch (error) {
    console.error('Error loading contributors:', error);
    contributorsSection.innerHTML = '<p>Failed to load contributors.</p>'; // Display an error message
  }
}

// Call loadContributors when the Home page is rendered (or when the script loads if Home is the default)
//  This should be called after the DOM is fully loaded, so we wrap it in a DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/' || window.location.pathname === '/Home') {
    loadContributors();
  }
});

// Example usage (assuming you have a link with id="home-link")
// document.getElementById("home-link").addEventListener("click", function(event) {
//     event.preventDefault(); // Prevent the default link behavior
//     window.history.pushState({}, "Home", "/"); // Change the URL
//     render(); // Re-render the application
//     loadContributors(); // Reload contributors
// });

