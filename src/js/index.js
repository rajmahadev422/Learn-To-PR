document.addEventListener('DOMContentLoaded', () => {
  // Fetch contributors data from contributors.json
  fetch('contributors.json')
    .then(response => response.json())
    .then(contributors => {
      // Get the contributors container element
      const contributorsContainer = document.getElementById('contributors-container');

      // Check if the container exists
      if (contributorsContainer) {
        // Iterate through the contributors and create elements to display them
        contributors.forEach(contributor => {
          // Create a div element for each contributor
          const contributorDiv = document.createElement('div');
          contributorDiv.classList.add('contributor'); // Add a class for styling

          // Create an image element for the contributor's avatar
          const avatarImg = document.createElement('img');
          avatarImg.src = contributor.avatar_url;
          avatarImg.alt = contributor.login;
          contributorDiv.appendChild(avatarImg);

          // Create a heading element for the contributor's username
          const usernameHeading = document.createElement('h3');
          usernameHeading.textContent = contributor.login;
          contributorDiv.appendChild(usernameHeading);

          // Create a link to the contributor's GitHub profile
          const profileLink = document.createElement('a');
          profileLink.href = contributor.html_url;
          profileLink.textContent = 'View Profile';
          contributorDiv.appendChild(profileLink);

          // Append the contributor div to the container
          contributorsContainer.appendChild(contributorDiv);
        });
      } else {
        console.error('Contributors container not found.');
      }
    })
    .catch(error => console.error('Error fetching contributors:', error));
});