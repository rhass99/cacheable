$( document ).ready(function() {
  console.log('Ready!');
  $('.like').on ('click', function (e) {
    $(this).toggleClass('liked');
  });
});