/**
 * api key for moviedb.org
 * APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
 * IMGPATH = "https://image.tmdb.org/t/p/w1280";
 * SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
 */

 function searchMoviesDB(){

    const main = document.getElementById('main');
    const searchBar = document.querySelector('#searchBar');
    const headingDiv = document.querySelector('.heading');
    const formOne = document.getElementById('one');

    // navbar
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');

    navbarToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active')
    })
    
    let resObj = [];
    let hasBuiltDOM = false;
    

    const searchResObj = {
        API_KEY: `04c35731a5ee918f014970082a0088b1`,
        IMGPATH: `https://image.tmdb.org/t/p/w1280`,
        pageNum: 1,

    };

    let apiURL = `https://api.themoviedb.org/3/search/movie?&page=${searchResObj.pageNum}&api_key=${searchResObj.API_KEY}&query=`;

    searchBar.focus();

    function getInputData(e){
        // retrieve search input and call fetch 
      
        e.preventDefault();

        searchResObj.query = searchBar.value;
        res = searchBar.value;
        searchBar.value = '';
        headingDiv.remove();
        main.style.backgroundImage = 'none';
        let movedSpaces = lookForSpacesOrWhitespace(res)

        return handleAPIdata(apiURL, movedSpaces);
    }

    formOne.addEventListener('submit', getInputData)

    function handleAPIdata(url, qry){
        let fectCall = fetchURL(url, qry)
        .then((data) => {
            searchResObj.data = data;
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
        
        return buildItems(resObj, searchResObj.data)
    })
    }

    async function fetchURL(url, qry){
       try {
        let serchQry = qry
        const data = await fetch(`${url}${serchQry}`)
        const res = await data.json();
        return res
       } catch (err) {
        consolre.log(err, 'error obj')
       }
    }

    function lookForSpacesOrWhitespace(search){
        let replaced = search.replace(/\s+/gi, '+')
        if(!search.trim()){
            history.back()
        }else{
            return replaced
        }
    }

    function buildItems(movieObj, apiData){
        // look for screen size matches
        let mql = matchMedia('(max-width: 600px)');
      
        
        if(hasBuiltDOM !== false){
            let removeChildrenMain = main.children;
            let arrayMainChildren = Array.from(removeChildrenMain)
            let removeChildren = arrayMainChildren.forEach(el => el.remove())
        }
        
        const films = movieObj.forEach(el => {
            
            const movieEl = document.createElement('div')
            movieEl.className = 'movieEl'
            movieEl.style.border = 'black 4px solid';
            movieEl.style.width = 'auto'
            movieEl.style.minHeight = `auto`
            
            main.style.alignItems = 'center'
            main.style.background = `linear-gradient(to right,#000024, #001839, #004660, #003E55, #000024, #000000)`

            const aLink = document.createElement('a');
            aLink.classList.add('link-tmdb');
            aLink.setAttribute('href', `https://www.themoviedb.org/movie/${el.id}-${el.title.toLowerCase()}`);

            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', `${searchResObj.IMGPATH}${el.poster_path}`)
            imgEl.setAttribute('alt', 'image of movie');
            imgEl.classList.add('imgEl')
            imgEl.style.width = '175px' 
            imgEl.style.height = '250px'
            imgEl.style.padding = '10px'
            imgEl.setAttribute('title', `${el.title}`)

            // if no image is available
            let noImage;
            if(el.poster_path === null){
                imgEl.alt = `${el.title}`
                noImage = document.createElement('p')
                noImage.classList.add('noimage');
                noImage.textContent = 'no image available';
                noImage.style.color = '#ffff'
                noImage.style.textAlign = 'center'
                noImage.style.height = 'auto'
                noImage.style.width =   `auto`
                noImage.style.padding = '10px'
                movieEl.style.height = `262px`
                movieEl.style.width = `183px`
                movieEl.style.textAlign = 'center'
                
                aLink.appendChild(noImage)
            }

            movieEl.appendChild(aLink)
            aLink.appendChild(imgEl)
            main.appendChild(movieEl)

            hasBuiltDOM = true;
    
        });

         // show total number of results
         const resultsTotalDiv = document.createElement('div');
         resultsTotalDiv.classList.add('resTotDiv');
         resultsTotalDiv.style.height = 'auto'
         resultsTotalDiv.style.width = '100vw'
         resultsTotalDiv.style.background = `linear-gradient(to right,#000024, #001839, #004660, #003E55, #000024, #000000)`
         resultsTotalDiv.style.textAlign = 'center'

         const prevBut = document.createElement('button');
         prevBut.classList.add('prevBut')
         prevBut.style.height = '4rem'
         prevBut.style.width = '4rem'
         prevBut.style.float = 'left'
         prevBut.style.marginLeft = '6vw'
         prevBut.style.backgroundImage = `url(assets/Ic_arrow_back_36px.svg.png)`
         prevBut.style.backgroundSize = '2.5rem'
         prevBut.style.backgroundRepeat = 'no-repeat'
         prevBut.style.backgroundPosition = 'center'
         prevBut.style.borderRadius = '1rem'
         prevBut.style.cursor = 'pointer'
         prevBut.setAttribute('title', 'previous')
         
         const resTots = document.createElement('span');
         resTots.classList.add('resTots');
         resTots.textContent = `page ${apiData.page} of ${apiData.total_pages}`;
         resTots.style.fontSize = '1.5rem'
         resTots.style.color = `#ffff`
         resTots.style.height = 'auto'

         const nextBut = document.createElement('button');
         nextBut.classList.add('nextBut')
         nextBut.style.height = '4rem'
         nextBut.style.width = '4rem'
         nextBut.style.float = 'right'
         nextBut.style.marginRight = '6vw'
         nextBut.style.backgroundImage = 'url(assets/1200px-Ic_arrow_forward_48px.svg.png)'
         nextBut.style.backgroundSize = '2.5rem'
         nextBut.style.backgroundRepeat = 'no-repeat'
         nextBut.style.backgroundPosition = 'center'
         nextBut.style.borderRadius = '1rem'
         nextBut.style.cursor = 'pointer'
         nextBut.setAttribute('title', 'next')


        const footerDiv = document.createElement('div');
        footerDiv.className = 'footerDiv';
        footerDiv.style.height = '80px';
        footerDiv.style.width = '100%';
     
        footerDiv.style.background = `linear-gradient(to right,#000024, #001839, #004660, #003E55, #000024, #000000)`;

        const attibutationLink = document.createElement('a');
        attibutationLink.setAttribute('href', 'https://themoviedb.org/');
    
        const tmdbLogo = document.createElement('img');
        tmdbLogo.className = 'tmdbLogo'
        tmdbLogo.setAttribute('src', `assets/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`);
        tmdbLogo.setAttribute('alt', 'tmdb logo');
        tmdbLogo.style.height = '50px'
        tmdbLogo.style.width = '50px'
        tmdbLogo.style.textAlign = 'center'
    
        tmdbLogo.style.marginLeft = '50%'
        tmdbLogo.style.transform = `translateX(-50%)`
        tmdbLogo.style.marginTop = '20px'

        resultsTotalDiv.appendChild(prevBut)
        resultsTotalDiv.appendChild(resTots)
        resultsTotalDiv.appendChild(nextBut)
        main.appendChild(resultsTotalDiv)

        attibutationLink.appendChild(tmdbLogo)
        footerDiv.appendChild(attibutationLink)
        main.appendChild(footerDiv)

        if(mql.matches){
            console.log(mql)
            responsiveButtonsCss(prevBut)
            responsiveTextCss(resTots)
            responsiveButtonsCss(nextBut)
        }

        function responsiveButtonsCss(el){
            el.style.height = '2rem';
            el.style.width = '2rem';
            el.style.borderRadius = '0.2rem'
            el.style.backgroundColor = 'pink'
            el.style.backgroundSize = '1rem'
        }
        function responsiveTextCss(el){
            el.style.fontSize = '1rem';
        }

        // add event listeners for next and prev buttons
        nextBut.addEventListener('click', nextPage)
        prevBut.addEventListener('click', previousPage)
        
    }

    function nextPage(){
        searchBar.value = searchResObj.query;
        if(searchResObj.pageNum >=1){
            if(searchResObj.pageNum === searchResObj.data.total_pages){
                searchResObj.pageNum = searchResObj.data.total_pages;
            }else{
                searchResObj.pageNum++;
            }
        }
        
        searchBar.value = ''
        const newapiURL = `https://api.themoviedb.org/3/search/movie?&page=${searchResObj.pageNum}&api_key=${searchResObj.API_KEY}&query=`
        let nextPageFetch = fetchURL(newapiURL, searchResObj.query)
        .then(data => {
            searchResObj.data = data;
        
            let mainsChildren = main.children
            let mainsChildrenArray = Array.from(mainsChildren)
            // clear page of elements and empty resobjs array
            let removed = mainsChildrenArray.forEach(el => el.remove())
            resObj = []

            if(hasBuiltDOM !== false){
                for(let prop of data.results){
                    resObj.push({title:prop.title, id: prop.id, poster_path: prop.poster_path})
                }
            }
            
            return buildItems(resObj, searchResObj.data)
        })
    }

    function previousPage(){
        
        if(searchResObj.pageNum > 1){
            searchResObj.pageNum--
        }
        searchBar.value = '';
        const newapiURL = `https://api.themoviedb.org/3/search/movie?&page=${searchResObj.pageNum}&api_key=${searchResObj.API_KEY}&query=`;

        let nextPageFetch = fetchURL(newapiURL, searchResObj.query)
        .then(data => {
            searchResObj.data = data;
        
            let mainsChildren = main.children
            let mainsChildrenArray = Array.from(mainsChildren)
            // clear page of elements and empty resobjs array
            let removed = mainsChildrenArray.forEach(el => el.remove())
            resObj = []

            if(hasBuiltDOM !== false){
                for(let prop of data.results){
                    resObj.push({title:prop.title, id: prop.id, poster_path: prop.poster_path})
                }
            }

            return buildItems(resObj, searchResObj.data)
        }) 
    }
}
document.addEventListener('DOMContentLoaded', searchMoviesDB)