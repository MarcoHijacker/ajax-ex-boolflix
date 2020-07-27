// Esercizio Boolflix JS

// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

// Area init

function init() {
  addSearchBtnListener();
}

$(document).ready(init);

// Area funzioni

function addSearchBtnListener() {
  $('#search-btn').click(performSearch);
}

function performSearch() {
  var inputValue = $('#film-search').val();

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

      console.log('target');

      if(success != false) {
        for (var i = 0; i < dataResults.length; i++) {
          var filmHTML = compiled({
            'filmId': i,
            'filmTitle': dataResults[i].title,
            'origTitle': dataResults[i].original_title,
            'filmLanguage': dataResults[i].original_language,
            'filmRate': dataResults[i].vote_average
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
