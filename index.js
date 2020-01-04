function ajaxCall() {
  $('#search').val() === ''
    ? $('#update').empty()
    : $.ajax({
        type: 'GET',
        url:
          'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=' +
          $('#search').val(),
        success: function(data) {
          console.log(data);
          $('#update').empty();
          // loop through data and output
          var output = '';
          data.query.search.forEach(function(data) {
            var title = '<h2>' + data.title + '</h2>' + '<br>';
            var snippet = '<p>' + data.snippet + '</P>';
            var url =
              '<a href="https://en.wikipedia.org/wiki/' +
              data.title +
              '" target="_blank">';
            var endUrl = '</a>';
            output += url + title + endUrl + snippet + '<hr>';
          });
          $('#update').append(output);
        }
      });
}

function randomFunction() {
  $('#update').empty();
  $('#serach').empty();
  $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function() {
  $('#search').focus();
  $('#search').off('keyup');
  $('#search').on('keyup', function() {
    ajaxCall();
    $('iframe').attr('src', '');
  });
  // show random wiki article
  $('.random').on('click', function() {
    randomFunction();
    $(this).text('Show me another random article!');
  });
});
