$( document ).ready(function() {
  console.log('Ready!');
  $('.like').on ('click', function (e) {
    $(this).toggleClass('liked');
  });
  // for (let like of likes) {
  //   if (like.user_id === user_id) {
  //     $(`*[data-post-id=${like.post_id}]`).addClass('liked');
  //   }
  // }
});