document.addEventListener('DOMContentLoaded', async () => {
  // Fetch contributors data from contributors.json
  async function fetchContributors() {
    try {
      const response = await fetch('contributors.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contributors = await response.json();
      return contributors;
    } catch (error) {
      console.error('Could not fetch contributors:', error);
      return []; // Return an empty array to avoid errors later
    }
  }

  // Function to display contributors
  async function displayContributors() {
    const contributors = await fetchContributors();
    const contributorsContainer = document.getElementById('contributors');

    if (!contributorsContainer) {
      console.error('Contributors container not found!');
      return;
    }

    contributorsContainer.innerHTML = ''; // Clear existing content

    if (contributors.length === 0) {
      contributorsContainer.innerHTML = '<p>No contributors to display.</p>';
      return;
    }

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
      username.target = '_blank'; // Open in a new tab
      username.classList.add('contributor-username'); // Add a class for styling

      contributorElement.appendChild(avatar);
      contributorElement.appendChild(username);
      contributorsContainer.appendChild(contributorElement);
    });
  }

  // Call the function to display contributors
  displayContributors();
});