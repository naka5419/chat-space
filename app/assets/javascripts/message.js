$(function() {

  function buildDate(date_data) {
    var baseYear = date_data.substr(0,4);
    var baseMonth = date_data.substr(5,2);
    var baseDay = date_data.substr(8,2);
    var baseHour = date_data.substr(11,2);
    var baseMin = date_data.substr(14,2);

    var numBaseHour = +baseHour
    var jpBaseHour = String(numBaseHour + 9)
    var changeDate = baseYear + "/" + baseMonth + "/" + baseDay + " " + jpBaseHour + ":" + baseMin;

    return changeDate
  }

  function buildHTML1(message) {
    var html1 = `
      <div class='up-content'>
        <div class='up-content__user-name'>
          ${ message.user_name }
        </div>
        <div class='up-content__date'>
          ${ createDate }
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

  function buildHTML(html1,html2,html3) {
    var html =
      '<div class="content">' +
        'html1' +
        'html2' +
        'html3' +
      '</div>'
    return html
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
      createDate = buildDate(data.created_at);
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




