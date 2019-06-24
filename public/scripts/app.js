$( document ).ready(function() {
  console.log('Ready!');
  $('.like').on ('click', function (e) {
    $(this).toggleClass('liked');
  });

  $('.rate1').on ('click', function (e) {
    $(this).toggleClass('checked');
    $(this).siblings('.rate2').removeClass('checked');
    $(this).siblings('.rate3').removeClass('checked');
    $(this).siblings('.rate4').removeClass('checked');
    $(this).siblings('.rate5').removeClass('checked');
  });

  $('.rate2').on ('click', function (e) {
    $(this).siblings('.rate1').addClass('checked');
    $(this).toggleClass('checked');
    $(this).siblings('.rate3').removeClass('checked');
    $(this).siblings('.rate4').removeClass('checked');
    $(this).siblings('.rate5').removeClass('checked');
  });

  $('.rate3').on ('click', function (e) {
    $(this).siblings('.rate1').addClass('checked');
    $(this).siblings('.rate2').addClass('checked');
    $(this).toggleClass('checked');
    $(this).siblings('.rate4').removeClass('checked');
    $(this).siblings('.rate5').removeClass('checked');
  });

  $('.rate4').on ('click', function (e) {
    $(this).siblings('.rate1').addClass('checked');
    $(this).siblings('.rate2').addClass('checked');
    $(this).siblings('.rate3').addClass('checked');
    $(this).toggleClass('checked');
    $(this).siblings('.rate5').removeClass('checked');
  });

  $('.rate5').on ('click', function (e) {
    $(this).siblings('.rate1').addClass('checked');
    $(this).siblings('.rate2').addClass('checked');
    $(this).siblings('.rate3').addClass('checked');
    $(this).siblings('.rate4').addClass('checked');
    $(this).toggleClass('checked');
  });

  $(`#all`).on ('click', function (e) {
    $(`article`).show();
  });

  $(`#angular`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='angular']`).show();
  });

  $(`#bootstrap`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='bootstrap']`).show();
  });

  $(`#css`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='css']`).show();
  });

  $(`#html`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='html']`).show();
  });

  $(`#js`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='js']`).show();
  });

  $(`#ruby`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='ruby']`).show();
  });

  $(`#sql`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='sql']`).show();
  });

  $(`#jquery`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='jquery']`).show();
  });

  $(`#react`).on ('click', function (e) {
    $(`article`).hide();
    $(`[data-tag='react']`).show();
  });
  // for (let like of likes) {
  //   if (like.user_id === user_id) {
  //     $(`*[data-post-id=${like.post_id}]`).addClass('liked');
  //   }
  // }
});