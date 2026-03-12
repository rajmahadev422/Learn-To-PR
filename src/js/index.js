import { router } from "./router.js";

// Function to fetch contributors data and update the contributors section
async function updateContributors() {
  try {
    const response = await fetch('contributors.json');
    const contributors = await response.json();

    const contributorsContainer = document.getElementById('contributors-list');
    if (contributorsContainer) {
      contributorsContainer.innerHTML = ''; // Clear existing content

      contributors.forEach(contributor => {
        const contributorElement = document.createElement('div');
        contributorElement.classList.add('contributor'); // Add a class for styling

        const avatar = document.createElement('img');
        avatar.src = contributor.avatar_url;
        avatar.alt = contributor.login;
        avatar.classList.add('contributor-avatar'); // Add a class for styling

        const username = document.createElement('a');
        username.href = contributor.html_url;
        username.textContent = contributor.login;
        username.classList.add('contributor-username'); // Add a class for styling

        contributorElement.appendChild(avatar);
        contributorElement.appendChild(username);
        contributorsContainer.appendChild(contributorElement);
      });
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
    // Display an error message to the user, or retry the fetch.
    const contributorsContainer = document.getElementById('contributors-list');
    if (contributorsContainer) {
      contributorsContainer.innerHTML = '<p>Failed to load contributors. Please try again later.</p>';
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  router();
  updateContributors(); // Call the function to update the contributors section
});