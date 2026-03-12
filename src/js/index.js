document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('contributors.json');
    const contributors = await response.json();

    const contributorsContainer = document.getElementById('contributors');

    if (contributorsContainer) {
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

        contributorElement.appendChild(avatar);
        contributorElement.appendChild(username);
        contributorsContainer.appendChild(contributorElement);
      });
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
    // Handle the error appropriately, e.g., display an error message on the page.
    const contributorsContainer = document.getElementById('contributors');
    if (contributorsContainer) {
        contributorsContainer.textContent = 'Failed to load contributors.';
    }
  }
});