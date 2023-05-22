const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: '1',
      totalPages: 1
    },

    api: {
       apiKey: 'd46a260bcd3d09bb7a83480819d5c14e',
       apiUrl: 'https://api.themoviedb.org/3/',
    }   
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

//Display movie details
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1]
  console.log(movieID);  
  
  const movie = await fetchAPIData(`movie/${movieID}`);
  // console.log(movie)

  //Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
    ?` <img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />` 
  : `  <img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date} </p>
    <p>
    ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> ${addCommasToNumber(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${movie.production_companies.map((company) => `<span> ${company.name}</span>`)
  .join(', ')}
  </div>
</div>
  `;
  document.querySelector('#movie-details').appendChild(div);
}


//Display show details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1]
  
  const show = await fetchAPIData(`tv/${showId}`);
  console.log(show);  

  //Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
    ?` <img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />` 
  : `  <img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)}/10
    </p>
    <p class="text-muted">Las air date: ${show.last_air_date} </p>
    <p>
    ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of episodes:</span> ${(show.number_of_episodes)}</li>
    <li><span class="text-secondary">Last episoe to air:</span> ${(show.last_episode_to_air.name)}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${show.production_companies.map((company) => `<span> ${company.name}</span>`)
  .join(', ')}
  </div>
</div>
  `;
  document.querySelector('#show-details').appendChild(div);
}

// Display Backdrop on Details Page

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if(type === 'movie'){
    document.querySelector('#movie-details').appendChild(overlayDiv)
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv)

  }

  
}

//Search movies and shows

async function search(params) {
  const querryString = window.location.search;
  const urlParams = new URLSearchParams(querryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  
  if(global.search.term !== '' && global.search.term !== null){
    // todo - make request
    const result = await searchAPIData();
    console.log(result);

  } else {
    showAlert("Please enter a search form")
  }
}



//Display Slider Movies
async function displaySlider(params) {
  const {results} = await fetchAPIData('movie/now_playing');

results.forEach((movie) => {
  const div = document.createElement('div');
  div.classList.add('swipere-slide');

  div.innerHTML = `

    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average}/ 10
    </h4>
`
  document.querySelector('.swiper-wrapper').appendChild(div);

  initSwiper()
})  
}

function initSwiper(params) {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 400,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView : 2
      },
      700: {
        slidesPerView : 3
      },
      1200: {
        slidesPerView : 4
      }
    }

  })
  
}



//Fetching data from TMDB API

async function fetchAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&languaage=en-En`);
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

// make search request
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&languaage=en-US&query=${global.search.term}`);
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


//Show Alert
function showAlert(message, className) {const

  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 900)

  
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
}

//init app
function init(){
    switch(global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            // console.log('Home');
            displaySlider();
            break;

        case '/shows.html':
            // console.log('Shows');
            displayPopularShows();
            break;
        case '/tv-details.html':
            // console.log('TV details');
            displayPopularShows();
            break;
        case '/movie-details.html':
            // console.log('Movie details');
            displayMovieDetails();
            break;
        case '/search.html':
            search();
            // console.log('Search');
            break;
    }
    highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init)