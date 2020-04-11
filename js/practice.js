$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let userText = $('#searchText').val();
        films(userText)
        e.preventDefault();
    });
  });
  


let convertData = function(respData) {
    for (let i = 0; i < respData.Search.length; i++) {
        console.log(respData.Search[i]);
     };
    
}
// let movieName;
function films(userText) {
    const apiUrl = `http://www.omdbapi.com/?apikey=a506ace3&s=${userText}`;

    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((respData) => {
            convertData(respData);

        })
        .catch(function(error) {
            console.log("error!!");
            // alert("I can't find it. So... it doesn't exist. And yeah, I'm sure.   (ಠ_ಠ)")
            swal({
                title: "(ಠ_ಠ)",
                text: "I can't find it. So... it doesn't exist. And yeah, I'm sure.",
                icon: "warning",
                dangerMode: true,
              });
        })

};


// NEEDED ATTR
// Poster link
// Title
// Type (movie)
//year
// let convertData = function(respData) {
//     for (let i = 0; i < respData.Search.length; i++) {
//         console.log(respData.Search[i]);
//      };
    
// }