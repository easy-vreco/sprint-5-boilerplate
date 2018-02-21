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
        $topicsContainer.append('<div class="row topic-row"></div>');
        if ($('.topics-container').children('.topic-row').length <= response.length) {
          let $divContainer = $('<div class="container text-center container-answer-update"></div>'); 
          $topicsContainer.find('.topic-row').append($divContainer);
          $divContainer.html(`<div class="topic-content"><span class="col-10">${response[el].content}</span>
                              </div>
                              <div class="topic-content">
                              <span class="col-5 float-left"> Por: ${response[el].author_name}</span>
                              <span class="col-5 float-right">Respuestas: ${response[el].responses_count}</span>
                              </div>`);
        }
      });
    }, 
    fail: function(request) { 
      if (request) {
        console.log(request.message);
      }
    }
  });

  const searchTopics = function(topics) {
    let arrayTopics = topics.map((val) => val.content);
    $('#input-search').autocomplete({
      source: arrayTopics
    });
  };

  $('#btn-save').on('click', () => {
    let nameAuthor = ('#input-name').val();
    let responseMessage = ('#input-messages').val();
    $.post("http://examen-laboratoria-sprint-5.herokuapp.com/topics",
    {
      author_name: nameAuthor,
      content: responseMessage
    },
    function(data, status){
      let sectionTopics = $('box-topics').eq[0];
      sectionTopics.html(`<div col-6 float-left">${data.author_name}</div><div class="col-6 float-right"><p>${data.content}</p></div>`);
      // alert("Data: " + data + "\nStatus: " + status);
    });
  });
});