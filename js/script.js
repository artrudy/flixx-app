const global = {
    currentPage: window.location.pathname,
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
            console.log('Home');
            break;

        case '/shows.html':
            console.log('Shows');
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