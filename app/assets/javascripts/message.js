$(function(){
  function buildHTML(message){

    var input_image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">` : ``

    var html = `<div class="message" data-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">${ message.user_name }</div>
                    <div class="upper-message__date">${ message.created_at }</div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">${ message.content }</p>
                    ${ input_image }
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    // 非同期通信に必要なオプションの設定

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .always(function(data){
    if (data.length == 0){
      alert('メッセージを入力してください');
      location.reload();
    } else {
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.form__submit').prop("disabled", false)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function(){
      alert('error');
    })
  })

    自動更新機能設定
  $(function(){
    setInterval(update, 5000);
  });

  function update(){
    if($('.message')[0]){
      var message_id = $('.message:last').data('id')
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { message: { id: message_id } },
      dataType: 'json'
    })
    .always(function(data){
      $.each(data, function(i, data){
        var html = buildHTML(data);
        $('.messages').append(html)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
    })
  }
})
