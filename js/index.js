/**
 * api key for moviedb.org
 * APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
 * IMGPATH = "https://image.tmdb.org/t/p/w1280";
 * SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
 */

function searchMoviesDB(){

    const main = document.getElementById('main');
    const searchBar = document.querySelector('.searchbar')
    const headingDiv = document.querySelector('.heading')

    const apiURL = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`
    const IMGPATH = "https://image.tmdb.org/t/p/w1280"


    let resObj;
    let searchQ;

    function getInputData(e){
        // retrieve search input and call fetch 
      const target = e.key
      console.log(target)
      let res = ''

      if(target === 'Enter'){
        res = searchBar.value
        searchBar.value = ''
        headingDiv.remove()
        main.style.backgroundImage = 'none'
        let fectCall = fetchURL(apiURL, res)
        .then((data) => {
            console.log(data)
            resObj = data;
        return buildItems(resObj)
    })
      }

      console.log(res)
    }

    searchBar.addEventListener('keydown', getInputData)

    async function fetchURL(url, qry){
        let serchQry = qry
        const data = await fetch(`${url}${serchQry}`)
        const res = await data.json();
        
        return res
    }

    function buildItems(movieObj){
        console.log(movieObj)

        for(let m of movieObj.results){
            console.log(m)
            const movieEl = document.createElement('div');
            movieEl.classList.add = 'movieEl';
            movieEl.style.border = 'black 4px solid';
            movieEl.style.width = 'auto'
            movieEl.style.height = 'auto'
            
            const aLink = document.createElement('a');
            aLink.classList.add('link-tmdb');
            aLink.setAttribute('href', `https://www.themoviedb.org/movie/${m.id}-${m.title.toLowerCase()}`);

            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', `${IMGPATH}${m.poster_path}`)
            imgEl.setAttribute('alt', 'image of movie');
            imgEl.style.width = `121px`
            imgEl.style.height = `200px`
            imgEl.style.padding = '10px'

            // if no image is available
            let noImage;
            if(m.poster_path === null){
                imgEl.alt = `${m.title}`
                noImage = document.createElement('p')
                noImage.classList.add('noimage');
                noImage.textContent = 'no image available';
                noImage.style.textAlign = 'center'
                movieEl.appendChild(noImage)
            }

            movieEl.appendChild(aLink)
            aLink.appendChild(imgEl)
            main.appendChild(movieEl)
        }

    }

    // if a new search is done, clear old data and images 
    function resetSearch(){

    }
}
document.addEventListener('DOMContentLoaded', searchMoviesDB)