document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch contributors data from contributors.json
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
      return []; // Return an empty array in case of an error
    }
  }

  // Function to dynamically create contributor elements
  async function renderContributors() {
    const contributors = await fetchContributors();
    const contributorsContainer = document.getElementById('contributors-container');

    if (!contributorsContainer) {
      console.error('Contributors container not found!');
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

      const username = document.createElement('a');
      username.href = contributor.html_url;
      username.textContent = contributor.login;
      username.classList.add('contributor-username');

      contributorElement.appendChild(avatar);
      contributorElement.appendChild(username);
      contributorsContainer.appendChild(contributorElement);
    });
  }

  // Call renderContributors to populate the contributors section
  renderContributors();
});
