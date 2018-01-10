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


        if( window.pageYOffset > offset && window.innerWidth > 767){
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

    //------------------------------------------------
    $(window).on('resize',function(){
        if($('.dropdown-menu').hasClass('show')){
            $('.dropdown-menu').removeClass('show');
            $('.dropdown-toggle').removeClass('active');
        }
    });

    $('.dropdown-menu a.dropdown-toggle').on('click ', function(e) {
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
          $(this).parents('.dropdown-menu').first().find('.active').removeClass("active");
        }
        $(this).toggleClass('active');
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');
        if($subMenu.offset().left <= 0){
            let css= {
                right : 'auto',
                left : '98%'
            }
            $subMenu.css(css)
        }
      
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
          $('.dropdown-submenu .show').removeClass("show");
        });
      
      
        return false;
      });


      $('.increasefont').on('click', function(e){
        var currentsize = parseInt($("#postContent").css('font-size'));
		if(currentsize < 24){ 
		currentsize++;
		$("#postContent").css({'font-size':currentsize+'px'});
		 
		}
	});

	$('.decreasefont').on('click', function(e){
        var currentsize = parseInt($("#postContent").css('font-size'));
		if(currentsize > 14){
		currentsize--;
		$("#postContent").css({'font-size':currentsize+'px'});
		}
    });
    
});   

 