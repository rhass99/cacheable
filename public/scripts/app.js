$( document ).ready(function() {
  console.log('Ready!');
  $('.like').on ('click', function (e) {
    $(this).toggleClass('liked');
  });

  $(`#all`).on ('click', function (e) {
    $(`article`).show();
  });

  $(`#bootstrap`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='bootstrap']`).show();
  });
  // for (let like of likes) {
  //   if (like.user_id === user_id) {
  //     $(`*[data-post-id=${like.post_id}]`).addClass('liked');
  //   }
  // }
});