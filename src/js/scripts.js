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
});  