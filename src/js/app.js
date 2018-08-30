jQuery(document).ready(function ($) {

    $('.tabs-top li').on('click', function(e){
        e.preventDefault();
        var elem = $(this).index();
        $('.tabs-top li').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.tabs-top').next('.tabs-content').find('.tab').addClass('hidden');
        $(this).closest('.tabs-top').next('.tabs-content').find('.tab').eq(elem).removeClass('hidden');
    });

    $('.hamburger').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('#menu-mob').toggleClass('active');
        if($('#menu-mob').hasClass('active')){
            $('body, html').css({
                'overflow-y':'hidden',
                'height':$(window).height()
            })
        }else{
            $('body, html').removeAttr('style')
        }
    });

    if($(window).width() > 992){
        $('#map').css('width',$(window).width()/2 - 10 +'px');
    }else{
        $('#map').removeAttr('style')
    }


    $('.desc__circle').each(function () {
        var val = parseInt($(this).attr('data-num'));
        var circle = $(this).find('.desc__value');
        var r = circle.attr('r');
        var c = Math.PI * (r * 2);
        if (val < 0) { val = 0; }
        if (val > 100) { val = 100; }
        var pct = ((100 - val) / 100) * c;
        circle.css({ strokeDashoffset: pct });
    });

    $('.icon-share2').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        // setTimeout(function () {
        //     $(this).parent().addClass('delay')
        // },400)
    });

    $('.icon-heart, .icon-compare').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    $('.filter-update').text($('.icon-heart-fill').length);

    $('.icon-heart-fill').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.col-xs-12').remove();
        __Map();
        if($('.icon-heart-fill').length === 0){
            $('#map').remove()
        }
        $('.filter-update').text($('.icon-heart-fill').length)
    });

    $('.filter-close').on('click', function (e) {
        e.preventDefault();
        var closeFilter = $(this).parent();
        var closeData = closeFilter.data('filter');
        $('[data-filter="'+closeData+'"]').remove();
        __Map();
        if($('.icon-heart-fill').length === 0){
            $('#map').remove()
        };
        $('.filter-update').text($('.icon-heart-fill').length)

    });


    // $('#home-filter-bottom').css('width',$('#home-filter-top').width());
    $('.open-filter-home').on('click', function (e) {
        e.preventDefault();
        $('.filter-full__top, .filter-full__bottom').slideToggle().toggleClass('open');
        // $('#home-filter-bottom').animate({width:'toggle'});
    });

    $('.open-filter').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.filter-full__top, .filter-full__bottom').slideToggle().toggleClass('open');
    });

    $('.close').on('click', function () {
       $(this).closest('.map-alert__wrap').addClass('hide-alert');
    });

    $('.tabs a').on('click', function (e) {
        e.preventDefault();
        var active = $(this).attr('href');
        $('.tabs a').removeClass('active');
        $(this).addClass('active');
        $('.tab-block').addClass('hidden');
        $(active).removeClass('hidden')
    });


    // INIT
    __Video();

    __Map();

    // __Comare();


    // ON SCROLL
    $(window).scroll(function () {
        __Map();
    });


    if($('#counts').length !== 0){
        __Increase();
    }
});

    // ON LOAD
window.onload = function () {
    $('.hero-filter__more a').width($('.hero-filter__more').height());
};

    // ON RESIZE
$(window).resize( function () {
    if($('#counts').length !== 0){
        __Increase();
    }
    __Map();
    __Video();
    __Compare();
});

function __Compare() {
    $('.section-compare .col-md-9').css('height', $('.compare-col').height());
    $('.compare-col').css('width',($(window).width() - $('.container').width())/2 + $('.compare-col').parent().width());

    // $('.params-right').each(function(){
    //     var compare = $(this).index();
    //     var compare_next = $(this).next().index();
    //     console.log($('.params-right:eq('+compare+')').text(), $('.params-right:eq('+compare_next+')').text())
    // })
}

function __Increase() {
    $('.spincrement').spincrement({
        from:0,
        to:false,
        decimalPlaces:null
    });
    var show = true;
    var countbox = "#counts";
    $(window).on("scroll load resize", function(){

        if(!show) return false;

        var w_top = $(window).scrollTop();
        var e_top = $(countbox).offset().top;

        var w_height = $(window).height();
        var d_height = $(document).height();

        var e_height = $(countbox).outerHeight();

        if(w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
            $(".spincrement").spincrement({
                from: 0,
                thousandSeparator: "",
                duration: 3000
            });

            show = false;
        }
    });
}

function __Map(){
    if($('#map').length!== 0){
        if($(window).width() > 767){
            var fixed = ($(window).width() > 767 && $(window).width() <= 991) ? $('.fixed-till-mob') : $('.fixed-js');
            $('#map').css('width',$(window).width()/2 - 10 +'px');
            $('.col-right__inner').css('width',$('.col-right__inner').parent().width());
            fixed.each(function () {
                var scrollPage = $(window).scrollTop();
                var colR = $(this).find('.col-right');
                var colRInner = $(this).find('.col-right > div');
                var colL = $(this).find('.col-left');
                console.log(colL.height(), $('#map').height());
                if(colL.height() > colRInner.height()){
                    if(colR.offset().top <= scrollPage && colL.offset().top + colL.height() > scrollPage + colRInner.height()){
                        colR.addClass('fixed');
                        colRInner.css({'position':'fixed','bottom':'auto','top':'0'})
                    }else if(colL.offset().top + colL.height() <= scrollPage + colRInner.height()){
                        colR.removeClass('fixed');
                        colRInner.css({'position':'absolute','bottom':'0','top':'auto'})
                    }else{
                        colR.removeClass('fixed');
                        colRInner.css({'position':'absolute','bottom':'auto','top':'0'})
                    }
                }else{
                    colR.removeClass('fixed');
                    colRInner.css({'position':'relative','bottom':'auto','top':'0'})
                }
            });
            if($(window).width() < 991){
                $('#map').removeAttr('style')
            }
        }else{
            $('.col-right > div').removeAttr('style')
        }
    }
}

function __Video() {
    var videoP = $('.video');
    var w = videoP.width();
    // var h = w*0.56;
    var h = $(window).width()>767 && !videoP.hasClass('video-only') ? videoP.parent().next('div').height() : w*0.56;
    $('.video iframe').attr({'height':h, 'width':w});

    $('.video iframe').each(function () {
        var src = $(this).data('src');
        src=src.replace('?','/').split('/')[4];
        $(this).parent().append('<img class="poster-img" src="//img.youtube.com/vi/'+ src +'/maxresdefault.jpg">');
        $(this).find('iframe').removeAttr('src');
        // $(this)[0].src = src+'&autoplay=0';
    });
    videoP.on('click', function () {
        var $src = $(this).find('iframe').data('src');
        $src += '&autoplay=1';
        $(this).addClass("playing");
        $(this).find('iframe').attr('src',$src);
    });
}

