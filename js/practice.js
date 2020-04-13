$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let userText = $('#searchText').val();
        films(userText)
        e.preventDefault();
    });
  });

let output = '';
let convertData = function(respData) {
    for (let i = 0; i < respData.Search.length; i++) {
        // console.log(respData.Search[i]);
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
            <a onclick="movieSelected('${movies.imdbID}')" class="movie-card__btn btn" href="#">Movie Details</a>
          </div>
      `;
     };
     
}


function films(userText) {
    const apiUrl = `http://www.omdbapi.com/?s=${userText}&apikey=a506ace3`;

    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((respData) => {
            convertData(respData);
            // console.log(respData);
            $('#movies-list').html(output);
        })
        .catch(function(error) {
            console.log("error!!");
            swal({
                title: "(ಠ_ಠ)",
                text: "I can't find it. So... it doesn't exist. \n And yeah, I'm sure.",
                icon: "warning",
                dangerMode: true,
              });
        })

};

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
}



let outputFilm = '';
let mov;
let showMovie = function(respMov){
    mov = response.data;
    outputFilm =`
    <div class="modal">
    <div class="modal-content">
        <div class="row">
            <div class="col-md-4">
                <img src="${mov.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${mov.Title}</h2>
                <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${mov.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${mov.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${mov.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${mov.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${mov.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${mov.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${mov.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                ${mov.Plot}
                <hr>
                <a href="http://imdb.com/title/${mov.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
        </div>
        <span class="close-btn">&times;</span>
    </div>
    </div>
    `;
}




let movieId = sessionStorage.getItem('movieId');
console.log(movieId);
function getMovie(movieId){
    const movInfo = `http://www.omdbapi.com/?i=${movieId}&apikey=a506ace3`;

    fetch(movInfo)
        .then((response) => {
            return response.json();
        })
        .then((respMov) => {
            console.log(respMov);
            showMovie(respMov);
            $('#movieInfo').html(output);
        })
        .catch(function(error) {
            console.log("error!!");
            swal({
                title: "(ಠ_ಠ)",
                text: "I can't find it. So... it doesn't exist. \n And yeah, I'm sure.",
                icon: "warning",
                dangerMode: true,
              });
        })
 
    };

let modal = $('.modal');
let modalBtn = $('.movie-card__btn');
let closeBtn = $('.close-btn');
modalBtn.on('click', function(){
    modal.style.display = "block";
});
closeBtn.on('click', function(){
    modal.style.display = "none";
});
$(window).on('click', function(e){
    if(e.target == modal){
    modal.style.display = "none";
}
})




// }
// let switcherCheck;
// $('input').change(function(){
// if ($('#mov').is(':checked')==true){
//     alert("penis");
//     $(".movie-btn").css("background-color", "rgb(253, 13, 53)").css("width", "120px");
// }else if ($('#mov').is(':checked')==false){
//     $(".movie-btn").removeProp.css("background-color", "rgb(253, 13, 53)").css("width", "120px");
// }
// if($('#ser').is(':checked')){
//     $(".series-btn").css("background-color", "rgb(253, 13, 53)").css("width", "120px");
// }
// else if($('#ep').is(':checked')){
//     $(".episode-btn").css("background-color", "rgb(253, 13, 53)").css("width", "120px");
// }
// // else if($('input').not(':checked'))
// });
//                                                  NEEDED ATTR
// Poster link img
// Title
// Type (movie)
//year
// imdbID: "tt0088247"
// let convertData = function(respData) {
//     for (let i = 0; i < respData.Search.length; i++) {
//         console.log(respData.Search[i]);
//      };
    
// }