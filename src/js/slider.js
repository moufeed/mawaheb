 $(document).ready(function () {
     $('#main_slider').show().revolution({
         sliderLayout: 'auto',
         delay: 9000,
         gridwidth: 1170,
         gridheight: 600,
         navigation: {
            arrows: {
                enable: true,
                style: 'persephone'
            },
            tabs: {
                enable: true,
                style: 'slidertabs',
                rtl: false,
                width: 265,
                height: 65,
                min_width: 265,
                h_align: 'center',
                v_align: 'bottom',
                h_offset: 0,
                v_offset: 0,
                wrapper_padding: 0,
                wrapper_color: '#FFF',
                wrapper_opacity: '0.65',
                tmp: '<div class="tp-tab-content"><span class="tp-tab-date">{{param1}}</span><span class="tp-tab-title">{{title}}</span></div>',
            }
        }
     });
 });  