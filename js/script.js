// Esercizio Boolflix JS

// Milestone 1: COMPLETA!
// Milestone 2: COMPLETA!
// Milestone 3: COMPLETA!
// Milestone 4: COMPLETA!

// Area init

function init() {
  addSearchBtnListener();
  addFiltersListener()
}

$(document).ready(init);

// Area funzioni

function addFiltersListener() {
  $('#allresults').click(function functionName() {
    $('#results-list').show();
    $('.films-title').show();
    $('#results-serie').show();
    $('.series-title').show();
  });
  $('#onlyfilms').click(function functionName() {
    $('#results-list').show();
    $('.films-title').show();
    $('#results-serie').hide();
    $('.series-title').hide();
  });
  $('#onlyseries').click(function functionName() {
    $('#results-serie').show();
    $('.series-title').show();
    $('#results-list').hide();
    $('.films-title').hide();
  });
}

function addSearchBtnListener() {
  $('#search-btn').click(function() {
    var inputValue = $('#query-search').val();
    $('#query-search').val('');

    filmSearch(inputValue);
    serieSearch(inputValue);
  });
  $('#query-search').keydown(function() {
    var key = event.which;
    if (key == 13) {
      var inputValue = $('#query-search').val();
      $('#query-search').val('');

      filmSearch(inputValue);
      serieSearch(inputValue);
    }
  })
}

// Funzione di ricerca film
function filmSearch(inputValue) {

  // Chiamata AJAX per i film
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      'api_key': 'd6c46515c238258071e0cac478212d4b',
      'query': inputValue,
      'language': 'it-IT'
    },
    success: function(data) {
      var success = data['success'];
      var dataResults = data['results'];
      var numResults = data['total_results'];

      var template = $('#film-template').html();
      var compiled = Handlebars.compile(template);
      var target = $('#results-list');

      $('.empty-films').hide();
      target.html('');

      if(data['results'].length == 0) {
        $('.empty-films').show();
      }

      for (var i = 0; i < dataResults.length; i++) {
        var filmTitle = dataResults[i].title;
        var origTitle = dataResults[i].original_title;
        var filmRate = Math.ceil(dataResults[i].vote_average / 2);
        var filmLanguage = dataResults[i].original_language;
        var coverApi = dataResults[i].poster_path;
        var filmStory = dataResults[i].overview;
        var coverUrl = '';
        var starRate = '';
        var filmFlag = '';

        starRate = getStarsRate(filmRate);
        filmFlag = getFlag(filmLanguage);
        coverUrl = getCover(coverApi);

        var filmHTML = compiled({
          'filmId': i,
          'filmTitle': filmTitle,
          'origTitle': origTitle,
          'starRate': starRate,
          'filmRate': filmRate,
          'filmFlag': filmFlag,
          'coverUrl': coverUrl,
          'filmStory': filmStory
        });

        target.append(filmHTML);
      }
    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });

}

// Funzione di ricerca serie TV
function serieSearch(inputValue) {

  // Chiamata AJAX per le serie
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv',
    method: 'GET',
    data: {
      'api_key': 'd6c46515c238258071e0cac478212d4b',
      'query': inputValue,
      'language': 'it-IT'
    },
    success: function(data) {
      var success = data['success'];
      var dataResults = data['results'];
      var numResults = data['total_results'];

      var template = $('#serie-template').html();
      var compiled = Handlebars.compile(template);
      var target = $('#results-serie');

      $('.empty-series').hide();
      target.html('');

      if(data['results'].length == 0) {
        $('.empty-series').show();
      }

      for (var i = 0; i < dataResults.length; i++) {
        var serieTitle = dataResults[i].name;
        var serieOrigTitle = dataResults[i].original_name;
        var serieRate = Math.ceil(dataResults[i].vote_average / 2);
        var serieLanguage = dataResults[i].original_language;
        var coverApi = dataResults[i].poster_path;
        var serieStory = dataResults[i].overview;
        var coverUrl = '';
        var starRate = '';
        var serieFlag = '';

        starRate = getStarsRate(serieRate);
        serieFlag = getFlag(serieLanguage);
        coverUrl = getCover(coverApi);

        var serieHTML = compiled({
          'serieId': i,
          'serieTitle': serieTitle,
          'serieOrigTitle': serieOrigTitle,
          'starRate': starRate,
          'serieRate': serieRate,
          'serieFlag': serieFlag,
          'coverUrl': coverUrl,
          'serieStory': serieStory
        });

        target.append(serieHTML);
      }
    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });
}

// Dato un valore da 0 a 5 (rate) restituisco una stringa HTML con la valutazione a stelle
function getStarsRate(rate) {
  var starRate = '';
  var fullStar = '<i class="fas fa-star"></i>';
  var emptyStar = '<i class="far fa-star"></i>';

  for (var j = 0; j < 5; j++) {
    if(j < rate) {
      starRate += fullStar;
    } else {
      starRate += emptyStar;
    }
  }
  return starRate;
}

// Data una stringa lingua (it, en, ja), restituisco l'html dell'img relativa alla nazionalità
function getFlag(language) {
  var flag = '';

  switch (language) {
    case 'it':
    flag = `<img class="flag" src="img/${language}.png">`;
    break;
    case 'en':
    flag = `<img class="flag" src="img/${language}.png">`;
    break;
    case 'ja':
    flag = `<img class="flag" src="img/${language}.png">`;
    break;
    default:
    flag = `<img class="flag" src="img/unknown.png">`;
  }
  return flag;
}

// Fornisce l'url della copertina, dato il nome del file immagine restituito dall'API
function getCover(itemPath) {
  var cover = '';
    if(itemPath) {
    cover = `https://image.tmdb.org/t/p/w342${itemPath}`;
  } else {
    cover = 'img/notfound.png';
  }
  return cover;
}
