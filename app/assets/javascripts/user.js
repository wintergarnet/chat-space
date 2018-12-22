$(document).on('turbolinks:load', function() {
  // 検索後のリスト
  var search_list = $("#user-search-result");
  // ユーザー登録リスト
  var member_list = $("#chat-group-users");

// インクリメンタルサーチでユーザーがサーチできたときのリスト表示
  function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>`
    search_list.append(html);
  }
// インクリメンタルサーチでユーザーが検索できなかった時の挙動
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <div class='listview__element--right-icon'>${ user }</div>
                </div>`
    search_list.append(html);
  }

  function addUser(information) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ information.id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ information.userId }'>
                  <p class='chat-group-user__name'>${ information.userName }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-name="${ information.userName }">削除</a>
                </div>`
    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        // 配列counts内にuser.nameがあるかどうか調べるメソッド
          var result = ($.inArray(user.name, counts));
          if (result === -1) {
            appendUser(user);
          } else {
            appendNoUser(user.name + "  は登録済みのユーザーです")
          }
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  var counts = [];

// 検索後、追加ボタンを押したときの挙動
  $('#user-search-result').on('click', '.user-search-add.chat-group-user__btn.chat-group-user__btn--add', function(){
    var information = $(this).data();
    // 配列counts内にinformation.userNameと同じnameがあるかどうか調べるメソッド
    var result = ($.inArray(information.userName, counts));
    console.log(result)
    // if (result === -1) {
      addUser(information);
      $(this).parent().remove();
      counts.push(information.userName);
    // } else {
    //   alert("そのユーザーは登録されています")
    // }
  });
// 追加後、削除ボタンを押したときの挙動
  $('#chat-group-users').on('click', '.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn', function(){
    var remove_user = $(this).data();
    $(this).parent().remove();

    counts.some(function(v, i){
      if (v == remove_user.userName) counts.splice(i,1);
    });
  });

  $(".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn").on('click', function(){
    $(this).parent().remove();
  });
});
