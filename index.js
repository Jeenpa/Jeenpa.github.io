$(document).ready(function(){
    var $nav = $('#menu');
    var previousScroll = 0;
    $(window).scroll(function(event){
       var scroll = $(this).scrollTop();
       if (scroll > 200){
           $nav.addClass('bgcolor');
       } else {
           $nav.removeClass('bgcolor');
       }
       previousScroll = scroll;    }); 
  });