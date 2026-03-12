import { router } from "./router.js";

const contributorsDataUrl = '/contributors.json';

async function fetchContributors() {
  try {
    const response = await fetch(contributorsDataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contributors = await response.json();
    return contributors;
  } catch (error) {
    console.error('Failed to fetch contributors:', error);
    return [];
  }
}

async function displayContributors() {
  const contributors = await fetchContributors();
  const leaderboardPage = document.querySelector('leaderboard-page');
  if (leaderboardPage) {
    leaderboardPage.contributors = contributors;
  } else {
    console.warn('Leaderboard page not found.');
  }
}

window.addEventListener("DOMContentLoaded", () => {
  router();
  displayContributors();
});