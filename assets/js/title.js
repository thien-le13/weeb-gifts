var searchSection = document.querySelector("#search-results");
var searchContainer = document.querySelector("#result-container");
var searchInputText = document.querySelector("#search-title");
var searchButton = document.querySelector("#search-title-btn");

// Retrieves anime information based on user search.
function getAnime(animeCriteria) {
  var animeTitleAPI = "https://api.jikan.moe/v4/anime?q=TITLE&sfw";
  var animeTitle = animeCriteria;
  fetch(animeTitleAPI.replace("TITLE", animeTitle))
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getSearchData(data.data);
    });
}

// Takes retrieved information and selects specific data.
function getSearchData(data) {
  var searchResults = [];
  CleanSearchResults();

  for (var i = 0; i < animeReturnCount; i++) {
    var anime = {
      title: data[i].title,
      image: data[i].images.jpg.image_url,
      synopsis: data[i].synopsis,
    };

    searchResults.push(anime);
  }
  DisplayResults(searchResults);
  return searchResults;
}

function DisplayResults(searchResults){
  console.log("im here");
  console.log(searchResults);
  console.log(searchResults.length);
  for (var i =0; i < searchResults.length; i++)
  {
    var animeNode = searchContainer.cloneNode(true);
    animeNode.id = animeNode.id + "-" + i;
    var animeTitle = animeNode.querySelector("#anime-title");
    var animeSynopsis = animeNode.querySelector("#anime-synopsis");
    var animeImg = animeNode.querySelector("#sauce");

    var animeCollapse = animeNode.querySelector("#result-header");
    animeCollapse.setAttribute("aria-controls", "id"+i);
    animeCollapse.setAttribute("href","#id" + i);
    var collapseContent = animeCollapse.nextElementSibling;
    collapseContent.id = "id"+i;

    animeTitle.innerHTML = searchResults[i].title;
    animeSynopsis.innerHTML = searchResults[i].synopsis;
    animeImg.src = searchResults[i].image;
    
    /////////////
    // Add changes to amazon items

    ////////////
    searchSection.append(animeNode);
  }
  
}

function handleTitleSearch() {
  console.log(searchInputText.value);
  var searchValue = searchInputText.value;
  return searchValue;
}

// Searches for anime after title is entered and search button is clicked.
searchButton.addEventListener("click", function (event) {
  var anime = handleTitleSearch();
  getAnime(anime);
});

function CleanSearchResults()
{
  var count = searchSection.children.length;

  for (var i =0 ; i < count; i++){
    searchSection.removeChild(searchSection.children[0]);
  }
}

CleanSearchResults();
