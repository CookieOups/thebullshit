
$(document).ready(function(){
  $(".nav_botton").click(function(){
    if ($(this).hasClass('on')) {
            $(this).removeClass('on').addClass('off');
            $('.content_anonymous').removeClass('content_on').addClass('content_off');
            $('nav').removeClass('nav_on').addClass('nav_off');
             
        } else{
            $(this).addClass('on').removeClass('off');
            $('.content_anonymous').removeClass('content_off').addClass('content_on');
            $('nav').removeClass('nav_off').addClass('nav_on');
        }
  });
});








