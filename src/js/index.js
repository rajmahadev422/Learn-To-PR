import { routes } from './router.js'

const app = document.querySelector('#app')

const components = {
    Home: () => import('./pages/Home.html'),
    Leaderboard: () => import('./pages/Leaderboard.html'),
    FourOhFour: () => import('./pages/404.html'),
    Header: () => import('./pages/layout/Header.html'),
    Footer: () => import('./pages/layout/Footer.html')
}


const route = () => {
    
    // Get the current route from the URL
    let route = window.location.hash.slice(1) || '/'

    // If the route starts with a '/', remove it
    if (route.startsWith('/')) {
        route = route.slice(1)
    }

    // If the route is empty, set it to '/'
    if (route === '') {
        route = '/'
    }


    // Find the route in the routes object
    const routeObj = routes[route] ? routes[route] : routes['404']

    // Get the component from the route object
    const component = routeObj.component

    // Render the component
    components[component]().then(module => {
        app.innerHTML = module.default
        if(component === 'Leaderboard'){
          fetchContributors();
        }
    })

}

window.addEventListener('hashchange', route)
window.addEventListener('load', route)

async function fetchContributors() {
  try {
    const response = await fetch('contributors.json');
    const contributors = await response.json();
    const contributorsList = document.getElementById('contributors-list');

    if (contributorsList) {
      contributorsList.innerHTML = ''; // Clear existing content
      contributors.forEach(contributor => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${contributor.url}">${contributor.name}</a>`;
        contributorsList.appendChild(listItem);
      });
    } else {
      console.error('Element with ID "contributors-list" not found.');
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
  }
}