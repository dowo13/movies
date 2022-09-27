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


    // let {poster_path, id, title} = resObj;
    let resObj = [];
    let searchQ;
    let hasBuiltDOM = false
    let mainArr = []

    function getInputData(e){
        // retrieve search input and call fetch 
      const target = e.key
    //   console.log(target)
      let res = ''

      console.log(main.hasChildNodes())

            
      if(target === 'Enter'){
        res = searchBar.value
        searchBar.value = ''
        headingDiv.remove()
        main.style.backgroundImage = 'none'
        
        let fectCall = fetchURL(apiURL, res)
        .then((data) => {

            // remove previous search results and replace with new search data
            if(hasBuiltDOM !== false){
               const myChild = document.querySelectorAll('.movieEl')
                for(let i=0; i<myChild.length; i++){
                    myChild[i].remove()
                    resObj = []
                    for(let prop of data.results){
                        resObj.push({title:prop.title, id: prop.id, poster_path: prop.poster_path})
                    }
                }
            }else{
                for(let prop of data.results){
                    resObj.push({title:prop.title, id: prop.id, poster_path: prop.poster_path})
                }
            }

        return buildItems(resObj)
    })
      }
    }

    searchBar.addEventListener('keydown', getInputData)

    async function fetchURL(url, qry){
        let serchQry = qry
        const data = await fetch(`${url}${serchQry}`)
        const res = await data.json();
        
        return res
    }

    function buildItems(movieObj){

        const films = movieObj.forEach(el => {
            // console.log(el)
            const movieEl = document.createElement('div')
            movieEl.className = 'movieEl'
            movieEl.style.border = 'black 4px solid';
            movieEl.style.width = 'auto'
            movieEl.style.height = 'auto'

            const aLink = document.createElement('a');
            aLink.classList.add('link-tmdb');
            aLink.setAttribute('href', `https://www.themoviedb.org/movie/${el.id}-${el.title.toLowerCase()}`);

            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', `${IMGPATH}${el.poster_path}`)
            imgEl.setAttribute('alt', 'image of movie');
            imgEl.style.width = `121px`
            imgEl.style.height = `200px`
            imgEl.style.padding = '10px'

            // if no image is available
            let noImage;
            if(el.poster_path === null){
                imgEl.alt = `${el.title}`
                noImage = document.createElement('p')
                noImage.classList.add('noimage');
                noImage.textContent = 'no image available';
                noImage.style.textAlign = 'center'
                movieEl.appendChild(noImage)
            }

            movieEl.appendChild(aLink)
            aLink.appendChild(imgEl)
            main.appendChild(movieEl)

            hasBuiltDOM = true;
           
        });

    }
}
document.addEventListener('DOMContentLoaded', searchMoviesDB)