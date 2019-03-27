$(function() {

  function nameDateHtml(message) {
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

  function messageHtml(message) {
    var html2 = `
      <div class='low-content'>
        <p class="low-content__message">
          ${ message.content }
        </p>
      </div>`
    return html2
  }

  function imageHtml(message) {
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
      var html1 = nameDateHtml(data);
      if ((data.content) && (data.image.url)){
        var html = nameDateHtml(data) + messageHtml(data) + imageHtml(data)
      }
      else if (data.content){
        var html =  nameDateHtml(data) + messageHtml(data)
      }
      else if (data.image.url){
        var html = nameDateHtml(data) + imageHtml(data)
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




