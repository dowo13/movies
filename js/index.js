/**
 * api key for moviedb.org
 * APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
 * IMGPATH = "https://image.tmdb.org/t/p/w1280";
 * SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
 */

function searchMoviesDB(){

    const main = document.getElementById('main');
    const searchBar = document.querySelector('.searchbar')

    const apiURL = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`
    const IMGPATH = "https://image.tmdb.org/t/p/w1280"


    let resObj;
    let searchQ;

    function getInputData(e){
      const target = e.key
      console.log(target)
      let res = ''

      if(target === 'Enter'){
        res = searchBar.value
        searchBar.value = ''
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
            movieEl.style.gridColumn = `1/2`
            
            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', `${IMGPATH}${m.poster_path}`)
            imgEl.setAttribute('alt', 'image of movie');
            imgEl.style.width = `94px`
            imgEl.style.height = `141px`
            imgEl.style.padding = '10px'


            movieEl.appendChild(imgEl)
            main.appendChild(movieEl)
        }

    }
}
document.addEventListener('DOMContentLoaded', searchMoviesDB)