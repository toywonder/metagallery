// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require mixitup
//= require materialize-sprockets
//= require serviceworker-companion
//= require_tree .

$(function() {
  return $('#request_ajax_update').on('ajax:complete', function(event) {
    var response;
    response = event.detail[0].response;
    return $('#example_ogp').html(response);
  });
});


$(function() {
  $("#data_text").on("keydown keyup keypress change", function() {
    if (isUrlValid($(this).val())) {
      $(".search_btn").prop("disabled", false);
    } else {
      $(".search_btn").prop("disabled", true);
    }
  });
});

$(function(){
  if(isPC()==true){
    $("#fixed_header .header_text_block .fa-columns").hide();
    $("#fixed_header .header_text_block .fa-square").hide();
    $("#fixed_header h2").css("margin-left","1rem");
  }
});

$(function(){
  $('#service_index').mixItUp();
});

$(function(){
  var isTwoColumn = JSON.parse(localStorage.getItem("two_column_gallery"));
  if(isPC()==false){
    if(isTwoColumn != false){
      $("#fixed_header .header_text_block .fa-columns").show();
      $("#fixed_header .header_text_block .fa-square").hide();
    }else{
      $(".fa-columns").hide();
      $("#fixed_header .header_text_block .fa-square").show();
      $("#service_index").css('column-count','1');
    }
  }
});


$(function() {
  var fixed_header_if_line = $("#keywords").offset().top;
  var scrolling_increment = $(document).scrollTop();
  isFixedHeader(scrolling_increment,fixed_header_if_line);
  $(window).on('scroll' , function(){
    var scrolling_increment = $(document).scrollTop();
    isFixedHeader(scrolling_increment,fixed_header_if_line);
  });

  $(".fa-columns").on('click',function(){
    $("#service_index").css('column-count','1');
    $(this).hide();
    $(".fa-square").show();
    localStorage.setItem('two_column_gallery', false);
  });

  $(".fa-square").on('click',function(){
    $("#service_index").css('column-count','2');
    $(this).hide();
    $(".fa-columns").show();
    localStorage.setItem('two_column_gallery', true);
  });

  $(".sort_top_btn").on('click',function(){
    $('body, html').animate({ scrollTop: 0 }, 500);
  });

  $(".form_to_appear").on('click',function(){
    $('.service_search_form_block').show();
    $('.header_text_block').hide();
  });

  $(".form_to_close").on('click',function(){
    $('.service_search_form_block').hide();
    $('.header_text_block').show();
  });

  $(".chip").on('click',function(){
    $(this).addClass("active");
    $('.form_to_close').trigger('click');
    $("#service_search_input").val("");
    if($(this).attr('data-filter')=="all"){
      $(".gallery").text("ギャラリー");
    }else{
      $(".gallery").text($(this).text());
    }
  });
});

$(function () {
  searchWord = function(){
    var all_service= $("#service_index").find(".mix").length;
    var searchText = $("#service_search_input").val();
    $(".chip").removeClass("active");
    if(searchText.length){
      $(".gallery").text(searchText);
    }else{
      $(".gallery").text("ギャラリー");
    }
    var hidden_service = 0;
    $('#service_index .service').each(function() {
      targetText = $(this).text();
      if(targetText.indexOf(searchText) != -1) {
        $(this).show();
      } else {
        $(this).hide();
        hidden_service++;
        if(hidden_service == all_service){
          $(".no_service_msg").show();
        }else{
          $(".no_service_msg").hide();
        }
      }
    });
  };
  $('#service_search_input').on('input', searchWord);
});

function isPC() {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
      return false;
        // スマートフォン用コード
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      return false;
        // タブレット用コード
    } else {
      return true;
        // PC用コード
    }
};

function isFixedHeader(scrolling_increment,fixed_header_if_line) {
  if(scrolling_increment > fixed_header_if_line - 70) {
    // $("#fixed_header").show();
    $(".sort_top_btn").show();
  }else{
    // $("#fixed_header").hide();
    $(".sort_top_btn").hide();
  }
}



function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

// $(function() {
//   $("#keywords_scroll").simplyScroll();
// });
