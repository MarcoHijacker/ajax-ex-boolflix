// Esercizio Boolflix JS

// Milestone 1: COMPLETA!
// Milestone 2: COMPLETA!

// Area init

function init() {
  addSearchBtnListener();
}

$(document).ready(init);

// Area funzioni

function addSearchBtnListener() {
  $('#search-btn').click(function() {
    filmSearch();
    serieSearch();
  });
  $('#query-search').keydown(function() {
    var key = event.which;
    if (key == 13) {
      filmSearch();
      serieSearch();
    }
  })
}

// Funzione di ricerca film
function filmSearch() {
  var inputValue = $('#query-search').val();

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

      target.html('');

      if(success != false) {
        for (var i = 0; i < dataResults.length; i++) {
          var filmTitle = dataResults[i].title;
          var origTitle = dataResults[i].original_title;
          var filmRate = Math.ceil(dataResults[i].vote_average / 2);
          var filmLanguage = dataResults[i].original_language;
          var starRate = '';
          var filmFlag = '';

          starRate = getStarsRate(filmRate);
          filmFlag = getFlag(filmLanguage);

          var filmHTML = compiled({
            'filmId': i,
            'filmTitle': filmTitle,
            'origTitle': origTitle,
            'starRate': starRate,
            'filmRate': filmRate,
            'filmFlag': filmFlag
          });

          target.append(filmHTML);

        }

      } else {
        console.log('error');
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
function serieSearch() {
  var inputValue = $('#query-search').val();

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

      target.html('');

      if(success != false) {
        for (var i = 0; i < dataResults.length; i++) {
          var serieTitle = dataResults[i].name;
          var serieOrigTitle = dataResults[i].original_name;
          var serieRate = Math.ceil(dataResults[i].vote_average / 2);
          var serieLanguage = dataResults[i].original_language;
          var starRate = '';
          var serieFlag = '';

          starRate = getStarsRate(serieRate);
          serieFlag = getFlag(serieLanguage);

          var serieHTML = compiled({
            'serieId': i,
            'serieTitle': serieTitle,
            'serieOrigTitle': serieOrigTitle,
            'starRate': starRate,
            'serieRate': serieRate,
            'serieFlag': serieFlag
          });

          target.append(serieHTML);
        }

      } else {
        console.log('error');
      }
    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });
  // Elimino l'input solo dopo la fine della funzione serieSearch() che avviene dopo filmSearch()
  $('#query-search').val('');
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
    flag = `<img src="img/${language}.png">`;
    break;
    case 'en':
    flag = `<img src="img/${language}.png">`;
    break;
    case 'ja':
    flag = `<img src="img/${language}.png">`;
    break;
    default:
    flag = `<img src="img/unknown.png">`;
  }
  return flag;
}
