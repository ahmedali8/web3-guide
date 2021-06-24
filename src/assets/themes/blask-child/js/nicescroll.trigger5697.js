var nicescroll = '';
jQuery(function ($) {

    if(is_touch_device()){
        return;
    }

    $("html").css('overflow-y', 'hidden');

    nicescroll = $("body").niceScroll({
        cursorcolor: "#333333",
        cursorwidth: "6px",
        cursorborder: "0px solid #000",
        scrollspeed: 80,
        autohidemode: true,
        background: '#ddd',
        hidecursordelay: 1400,
        cursorfixedheight: false,
        cursorminheight: 20,
        enablekeyboard: true,
        horizrailenabled: false,
        bouncescroll: false,
        smoothscroll: true,
        iframeautoresize: true,
        touchbehavior: false,
        zindex: 100
    });




});


jQuery(window).on('load',function(){
    if(nicescroll){
        nicescroll.resize();
    }

});
