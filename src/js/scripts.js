var wow = new WOW({
    boxClass: 'animate',
    animateClass: 'animated',
    offset: 10,
    mobile: true, 
    live: true, 

}); 
wow.init();
 
$(document).ready(function(){
    $('[data-toggle="popover"]').popover(); 


    $(document).on('click','.btn-share',function(event){
        event.preventDefault();
        var width      = 650,
            height     = 450,
            windowSRC  = $(this).attr('href'),
            windowTitle =$(this).parent('span').data('title');
        window.open(
           windowSRC,windowTitle,
          'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2)
        );
    });

    //-------------------------------------------------------------
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