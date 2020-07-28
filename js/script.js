// Esercizio Boolflix JS

// Milestone 1: COMPLETA
// Milestone 2: Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
// piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
// crubs

// Area init

function init() {
  addSearchBtnListener();
}

$(document).ready(init);

// Area funzioni

function addSearchBtnListener() {
  $('#search-btn').click(performSearch);
  $('#film-search').keydown(function() {
    var key = event.which;
    if (key == 13) {
      performSearch();
    }
  })
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
      var fullStar = '<i class="fas fa-star"></i>';
      var emptyStar = '<i class="far fa-star"></i>';
      var tempStar = '';

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
          var filmHTML = compiled({
            'filmId': i,
            'filmTitle': filmTitle,
            'origTitle': origTitle,
            // 'filmLanguage': filmLanguage,
            // 'filmRate': filmRate
          });

          target.append(filmHTML);

          switch (filmRate) {
            case 1:
              tempStar= '<span>Voto in stelle: ' + fullStar + emptyStar + emptyStar + emptyStar + emptyStar + '</span><br>';
              break;
            case 2:
              tempStar= '<span>Voto in stelle: ' + fullStar + fullStar + emptyStar + emptyStar + emptyStar + '</span><br>';
              break;
            case 3:
              tempStar= '<span>Voto in stelle: ' + fullStar + fullStar + fullStar + emptyStar + emptyStar + '</span><br>';
              break;
            case 4:
              tempStar= '<span>Voto in stelle: ' + fullStar + fullStar + fullStar + fullStar + emptyStar + '</span><br>';
              break;
            case 5:
              tempStar= '<span>Voto in stelle: ' + fullStar + fullStar + fullStar + fullStar + fullStar + '</span><br>';
              break;
            default:
              tempStar= '<span>Voto in stelle: ' + emptyStar + emptyStar + emptyStar + emptyStar + emptyStar + '</span><br>';
          }

          var starTarget = $('li[data-film="' + i + '"]');

          starTarget.append(tempStar);

          switch (filmLanguage) {
            case 'it':
              starTarget.append('<span>Lingua film: <img src="img/italy.png"></span>');
              break;
            case 'en':
              starTarget.append('<span>Lingua film: <img src="img/england.png"></span>');
              break;
            case 'ja':
              starTarget.append('<span>Lingua film: <img src="img/japan.png"></span>');
              break;
            default:
              starTarget.append('<span>Lingua film: <img src="img/unknown.png"></span>');
          }

          console.log(filmLanguage);
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

  $('#film-search').val('');
}
