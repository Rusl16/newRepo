jQuery(document).ready(function ($) {
    $('.select-row select').selectpicker();
    $('.choose-type select').on('changed.bs.select', function(event,clickedIndex){
        var $value = $(this).find('option').eq(clickedIndex).val();
        $('.type-result').addClass('hidden');
        $('[data-id="' + $value+'"]').removeClass('hidden')
    });

    // $('.hero__slider').slick({
    //     prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
    //     nextArrow:'<div class="slide-next icon-arrow_right"></div>',
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     fade:true,
    //     cssEase:'linear'
    //
    // });

    var mySwiper = new Swiper ('.hero__slider',{
        effect: 'cube',
        grabCursor: true,
        navigation: {
            nextEl: '.slide-next',
            prevEl: '.slide-prev',
        },
    });

    if($('.vacancy-modal').length){
        $('.modal').on('show.bs.modal', function () {
            $('body, html').css({'overflow-y':'hidden'});
            $('.vacancy-slick').slick("getSlick").refresh();
        }).on('shown.bs.modal', function () {
            $('.vacancy-slick').slick("getSlick").refresh();
            setTimeout(function () {
                $('.vacancy-slick').addClass('in')
            },200)
        }).on('hide.bs.modal', function () {
            $('body, html').css({'overflow-y':'auto'});
            $('.vacancy-slick').slick("destroy");
            setTimeout(function () {
                $('.vacancy-slick').removeClass('in')
            },100)
        });
    }else{
        $('.modal').on('show.bs.modal', function () {
            $('body, html').css({'overflow-y':'hidden'});
        }).on('shown.bs.modal', function () {
            setTimeout(function () {
                $('.modal-body').addClass('in')
            },200)
        }).on('hide.bs.modal', function () {
            $('body, html').css({'overflow-y':'auto'});
            setTimeout(function () {
                $('.modal-body').removeClass('in')
            },100)
        });
    }

    $('.compare-item .icon-close').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.compare-item').remove()
    });

    $('.tab-compare li').on('click', function (e) {
        $('.tab-compare li').removeClass('active');
       $(this).addClass('active');
       if($(this).hasClass('diff')){
           $('.params:not([data-compare="different"])').hide();
       }else{
           $('.params:not([data-compare="different"])').show();
       }
        __Compare();
    });

    if($(window).width() > 767){
        $('.compare').on("init", function(event, slick) {
            __Compare()
        });

        $('.compare').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            variableWidth: true,
            arrows:false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },{
                    breakpoint: 930,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }else{
        __Compare();
    }

    $('.vacancy-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        // fade:true,
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>',
    });

    $('.gallery-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        autoplay:true,
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>'
    });
    $('.gallery-slider-mod').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        autoplay:true,
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
    });

    $('.receint-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        autoplay:true,
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>',
        responsive: [
            {
                breakpoint: 1224,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })

    //
    //
    // $('.hero__slider').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //     //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    //     var i = (currentSlide ? currentSlide : 0) + 1;
    //     if(i < 10){
    //         $('#curr-slide').text('0' + i);
    //     }else{
    //         $('#curr-slide').text(i);
    //     }
    //
    //     if($('.hero__slider').slick('getSlick').slideCount < 10){
    //         $('#count').text('0' + $('.hero__slider').slick('getSlick').slideCount);
    //     }else{
    //         $('#count').text($('.hero__slider').slick('getSlick').slideCount);
    //     }
    // });
    // if($('.hero__slider').slick('getSlick').slideCount < 10){
    //     $('#count').text('0' + $('.hero__slider').slick('getSlick').slideCount);
    // }else{
    //     $('#count').text($('.hero__slider').slick('getSlick').slideCount);
    // }


    $(".span1,.span2,.span3").bootstrapSlider({
        tooltip:'hide'
    });


    $(".span1").on('slide', function (slideEvt) {
        var min = slideEvt.value[0];
        var max = slideEvt.value[1];
        var parent = $(this).closest('.input-row');
        parent.find('.min-price span').text(min);
        parent.find('.max-price span').text(max);
    });

    $(".span3").on('slide', function (slideEvt) {
        var max = slideEvt.value;
        // console.log(max);
        var parent = $(this).closest('.input-row');
        parent.find('.max-price span').text(max);
    });

    var def_price = $('.calculator-block-type [data-price]').data('price');
    var def_hansel = $('.calculator-block-type [data-hansel]').data('hansel');
    var def_month = $('.calculator-block-type [data-month]').data('month');
    // console.log(def_price, def_hansel, def_month);

    $(".span2").on('slide', function (slideEvt) {
        var v = slideEvt.value;
        var parent = $(this).closest('.slide-one');
        var $price = (parent.find('[data-price]')) ? v : def_price;
        var $hansel = v || def_hansel;
        var $month = v || def_month;
        parent.find('.block-value span').text(v);
    });


    $('.owl-slider').slick({
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>'
    });

    $('.partners').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.plan-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerMode:true,
        centerPadding: '250px',
        prevArrow:'<div class="slide-prev icon-arrow_left"></div>',
        nextArrow:'<div class="slide-next icon-arrow_right"></div>',
        responsive: [
            {
                breakpoint: 1190,
                settings: {
                    centerPadding: '220px'
                }
            },{
                breakpoint: 992,
                settings: {
                    centerPadding: '170px'
                }
            },{
                breakpoint: 767,
                settings: {
                    centerPadding: '100px'
                }
            },{
                breakpoint: 500,
                settings: {
                    centerPadding: '50px'
                }
            }
        ]
    });

    new WOW().init();

    if($('.myChart').length){
        var customTooltips = function(tooltip) {
            var tooltipEl = document.getElementById('line-chart__tooltip');

            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.classList.add('line-chart__tooltip');
                tooltipEl.id = 'line-chart__tooltip';
                tooltipEl.innerHTML = '<div class="line-chart__tooltip-inner"></div>';
                this._chart.canvas.parentNode.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            function getBody(bodyItem) {
                return bodyItem.lines;
            }

            // Set Text
            if (tooltip.body) {
                var titleLines = tooltip.title || [];
                var bodyLines = tooltip.body.map(getBody);

                var innerHtml = '<span class="line-chart__tooltip-title">';
                innerHtml += '</span>';

                bodyLines.forEach(function(body, i) {
                    var value = body.pop().split(':')[1];
                    // console.log(value);
                    // var colors = tooltip.labelColors[i];
                    innerHtml += '<span class="line-chart__tooltip-value">$'+value+' за м2</span>';
                });

                var innerTooltip = tooltipEl.querySelector('.line-chart__tooltip-inner');
                innerTooltip.innerHTML = innerHtml;
            }

            var positionY = this._chart.canvas.offsetTop;
            var positionX = this._chart.canvas.offsetLeft;

            // Display and position
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY - 45 + 'px';
        };

        var ctx = document.getElementById("month").getContext('2d');
        var purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 400);
        purple_orange_gradient.addColorStop(0, 'rgba(209,26,95,.3)');
        purple_orange_gradient.addColorStop(1, 'rgba(209,26,95,.001)');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Июн 2017", "Июл 2017", "Авг 2017", "Сен 2017", "Окт 2017", "Ноя 2017","Дек 2017","Янв 2018","Фев 2018","Мар 2018","Апр 2018"],
                datasets: [{
                    data: [938, 1208, 1138, 1188, 1238, 1400,1388,1350,1100,1180,1200],
                    label: '$',
                    backgroundColor: purple_orange_gradient,
                    borderColor: '#D11A5F',
                    borderWidth: 3,
                    pointBorderColor: "rgba(209,26,95,.8)",
                    pointBackgroundColor: "white",
                    pointRadius: 0,
                    pointHitRadius: 50,
                    hoverRadius:40,
                    hoverBorderWidth:30,
                    lineTension: 0,
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            // beginAtZero:true,
                            suggestedMin: 800,
                            suggestedMax: 1600,
                        }
                    }],
                    xAxes:[{
                        gridLines: {
                            display: false
                        },
                    }],
                    fill:true
                },
                tooltips: {
                    enabled: false,
                    custom: customTooltips
                },
            }
        });

        var ctx2 = document.getElementById("year").getContext('2d');
        var purple_orange_gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
        purple_orange_gradient.addColorStop(0, 'rgba(209,26,95,.3)');
        purple_orange_gradient.addColorStop(1, 'rgba(209,26,95,.001)');
        var myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ["Июн", "Июл", "Авг", "Сен", "Окт", "Ноя","Дек","Янв"],
                datasets: [{
                    data: [938, 1208, 1138, 1188, 1238, 1400,1388,1350],
                    label: '$',
                    backgroundColor: purple_orange_gradient,
                    borderColor: '#D11A5F',
                    borderWidth: 3,
                    pointBorderColor: "rgba(209,26,95,.8)",
                    pointBackgroundColor: "white",
                    pointRadius: 0,
                    pointHitRadius: 50,
                    hoverRadius:40,
                    hoverBorderWidth:30,
                    lineTension: 0,
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            // beginAtZero:true,
                            suggestedMin: 800,
                            suggestedMax: 1600,
                        }
                    }],
                    xAxes:[{
                        gridLines: {
                            display: false
                        },
                    }],
                    fill:true
                },
                tooltips: {
                    enabled: false,
                    custom: customTooltips
                },
            }
        });
    }
});

