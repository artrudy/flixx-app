const global = {
    currentPage: window.location.pathname,
}

//display 20 most popular movie
async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');
    // console.log(results);    
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
            ?` <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` :
          `
          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />
          `

          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
    `;

    document.querySelector('#popular-movies').appendChild(div)
    })
}

//display 20 most popular tv show
async function displayPopularShows() {
    const {results} = await fetchAPIData('tv/popular');
    // console.log(results);    
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${show.id}">
          ${
            show.poster_path
            ?` <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` :
          `
          <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />
          `

          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
    `;

    document.querySelector('#popular-shows').appendChild(div)
    })
}

//Fetching data from TMDB API

async function fetchAPIData(endpoint) {
    const API_KEY = 'd46a260bcd3d09bb7a83480819d5c14e';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&languaage=by-BY`);
    const data = await response.json();

    hideSpinner(); 

    return data;    
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');    
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');    
}

//highlight active link
function highlightActiveLink () {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    })
}

//init app
function init(){
    switch(global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            // console.log('Home');
            break;

        case '/shows.html':
            // console.log('Shows');
            displayPopularShows();
            break;
        case '/tv-details.html':
            console.log('TV details');
            break;
        case '/movie-details.html':
            console.log('Movie details');
            break;
        case '/search.httml':
            console.log('Search');
            break;
    }
    highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init)