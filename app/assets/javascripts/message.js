$(function() {

  function buildHTML1(message) {
    var html1 = `
      <div class='up-content'>
        <div class='up-content__user-name'>
          ${ message.user_name }
        </div>
        <div class='up-content__date'>
          ${ message.created_at }
        </div>
      </div>`
    return html1
  }

  function buildHTML2(message) {
    var html2 = `
      <div class='low-content'>
        <p class="low-content__message">
          ${ message.content }
        </p>
      </div>`
    return html2
  }

  function buildHTML3(message) {
    var html3 = `
      <div class='low-content'>
        <p class="low-content__image">
          <img src="${ message.image.url } ">
        </p>
      </div>`
    return html3
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var form = $('#new_message');
    var $this = $(this)
    var fd = new FormData($this.get(0));

    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data: fd,
      dataType: 'json',
      contentType : false,
      processData : false
    })

    .done(function(data) {
      var html1 = buildHTML1(data);
      if ((data.content) && (data.image.url)){
        var html = buildHTML1(data) + buildHTML2(data) + buildHTML3(data)
      }
      else if (data.content){
        var html =  buildHTML1(data) + buildHTML2(data)
      }
      else if (data.image.url){
        var html = buildHTML1(data) + buildHTML3(data)
      }

      var html =
        '<div class="content">' +
          html +
        '</div>';

      $('.contents').append(html);

      $this.get(0).reset();

      $('.contents').animate({
         scrollTop: $('.contents').prop('scrollHeight')
      }, 500);
    })


    .fail(function() {
      alert('非同期通信に失敗しました');
    })

    .always(function() {
    $(".footer__submit").prop("disabled", false);
    });
  });
});




