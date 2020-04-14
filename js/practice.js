let userText;
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        userText = $('#searchText').val();
        films(userText);
        e.preventDefault();
        loadMore(userText);
    });
  });

let pages;
let totalResults;
let output = '';
let convertData = function(respData) {
    output = '';
    totalResults = respData.totalResults;
    pages = (respData.totalResults/10).toFixed(0);
    if (respData.totalResults < 10){
        pages = 0;
    };
    for (let i = 0; i < respData.Search.length; i++) {

        let movies = respData.Search[i];
        let movieName = movies.Title;
        let moviePoster = movies.Poster;
        let year = movies.Year;
        output += `
          <div class="movie-card">
            <div class="movie-card__poster-wrap">
                <img class="movie-card__poster" src="${moviePoster}" alt="image is not available">
            </div>
            <p class="movie-card__title">${movieName}</p>
            <p class="movie-card__year">Year: ${year}</p>
            <a onclick="getMovie('${movies.imdbID}')" class="movie-card__btn btn" href="#">Movie Details</a>
          </div>
      `;
     };
     
}
let selectorVal;
$('input').change(function(){
    if ($("#mov").is(':checked')==true){
        selectorVal = "movie";
    } else if($("#ser").is(':checked')==true){
        selectorVal = "series";
    } else if($("#ep").is(':checked')==true){
        selectorVal = "episode";
    }else{
        selectorVal = null;
    }
});

function films(userText) {
    const apiUrl = `http://www.omdbapi.com/?s=${userText}&type=${selectorVal}&apikey=a506ace3`;
    
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((respData) => {
            convertData(respData);
            $('#movies-list').html(output);
        })
        .catch(function(error) {
            console.log(error);
            swal({
                title: "(ಠ_ಠ)",
                text: "I can't find it. So... it doesn't exist. \n And yeah, I'm sure.",
                icon: "warning",
                dangerMode: true,
              });
        })

};

let outputFilm;
let showMovie = function(respMov){

    outputFilm =`
    <div class="modal">
    <div class="modal-content container">
        <div class="movie-info row">
            <div class="movie-info__img-box col-lg-4 col-md-12">
                <img class="movie-info__img"src="${respMov.Poster}">
            </div>
            <div class="movie-info__info col-lg-8 col-md-12">
                <h2>${respMov.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${respMov.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${respMov.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${respMov.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${respMov.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${respMov.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${respMov.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${respMov.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row plot-sec">
            <div class="offset-1 col-10">
                ${respMov.Plot}
                <hr>
                <a href="http://imdb.com/title/${respMov.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            </div>
        </div>
        <span class="close-btn">&times;</span>
    </div>
    </div>
    `
    ;
};
function getMovie(id){
    const movInfo = `http://www.omdbapi.com/?i=${id}&apikey=a506ace3`;
    fetch(movInfo)
        .then((response) => {
            return response.json();
        })
        .then((respMov) => {
            showMovie(respMov);
            $('#movieInfo').html(outputFilm);
            $('.close-btn').on('click', function(){
                $('.modal').addClass('hide');
            });
            $('.modal').on('click', function(event){
                if (event.target == $(".modal")){
                $('.modal').addClass('hide');
            }
            });
            
        })
        .catch(function(error) {
            console.log(error);
            swal({
                title: "(ಠ_ಠ)",
                text: "I can't find it. So... it doesn't exist. \n And yeah, I'm sure.",
                icon: "warning",
                dangerMode: true,
              });
        })
    };
    


$(window).scroll(function(){
    if(totalResults>10&&$(window).scrollTop() == $(document).height() - $(window).height()){
            loadMore();
        }

});
let counter = 2;


let loadMore = function() {
        let apiUrl = `http://www.omdbapi.com/?s=${userText}&type=${selectorVal}&page=${counter}&apikey=a506ace3`;
        fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((respData) => {
            convertDataNew(respData);
            $('#movies-list').html(output);
        })
        .catch(function(error) {
            console.log(error);
        })
        let convertDataNew = function(respData) {
            for (let i = 0; i < respData.Search.length; i++) {
                let movies = respData.Search[i];
                let movieName = movies.Title;
                let moviePoster = movies.Poster;
                let year = movies.Year;
                pages = (respData.totalResults/10).toFixed(0);
                
                output += `
                  <div class="movie-card">
                    <div class="movie-card__poster-wrap">
                        <img class="movie-card__poster" src="${moviePoster}" alt="image is not available">
                    </div>
                    <p class="movie-card__title">${movieName}</p>
                    <p class="movie-card__year">Year: ${year}</p>
                    <a onclick="getMovie('${movies.imdbID}')" class="movie-card__btn btn" href="#">Movie Details</a>
                  </div>
              `;
             };
            
        if(loadMore){
            counter += 1;
        }
};
};
