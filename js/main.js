$(document).ready(() => {
  const $topicsContainer = $('.topics-container');
  $.ajax({
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
    contentType: 'application/json',
    method: 'GET',
    success: function(response) {
      console.log(response.length);
      // console.log(response[el]);
      $.each(response, function(el) {
        let topic = response[el];
        $topicsContainer.append('<row class="topic-row"></row>');
        if ($('.topics-container').children('.topic-row').length <= response.length) {
          let $divContainer = $('<div class="col-sm-12 col-md-12 col-lg-12 div-container"></div>'); 
          $topicsContainer.find('.topic-row').append($divContainer);
          $divContainer.html(`<div class="topic-content"><span>${response[el].content} -</span><span> Por:${response[el].author_name}</span></div><span>Respuestas:${response[el].responses_count}</span>`);
        }
      });
    }, 
    fail: function(request) { 
      if (request) {
        console.log(request.message);
      }
    }
  });
});