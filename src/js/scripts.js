var wow = new WOW({
    boxClass: 'animate',
    animateClass: 'animated',
    offset: 10,
    mobile: true, 
    live: true, 

}); 
wow.init();
 
$(document).ready(function(){
    var offset = 350;
    var duration = 300;

    $('<a href="#" class="back-to-top"><i class="fa fa-angle-up"></i></a> ').appendTo('body');
    $(window).scroll(function () {


        if( window.pageYOffset > offset){
            $('.mainnavbar').addClass('fixed-top');
            $('body').css('padding-top',$('.mainnavbar').height()+'px');
      }else{
          $('body').css('padding-top','0');
          $('.mainnavbar').removeClass('fixed-top');
      } 

        if ($(this).scrollTop() > offset) {
            $(".back-to-top").fadeIn(duration);
        }else{
            $(".back-to-top").fadeOut(duration);
        }
    })
    $(".back-to-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ 
            scrollTop: 0
        }, duration);
        return false;
    })
    

    $('#btn-search').click(function(e){
        e.preventDefault();
        $('.search-box').addClass('search--open');
        $('.search__input').focus();
    })
    $('#btn-search-close').click(function(e){
        e.preventDefault();
        $('.search-box').removeClass('search--open');
        $('.search__input').blur().val('');
    })
});  