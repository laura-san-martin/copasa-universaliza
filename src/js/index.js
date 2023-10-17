import $ from '../../node_modules/jquery';
global.$ = $;
global.jQuery = $;
jQuery = $;
import AOS from '../../node_modules/aos';
import slick from '../../node_modules/slick-carousel';

$("document").ready(function () {

    AOS.init();

    setElementsByScroll($(window).scrollTop());

    $('.copasa__galeria').slick({
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: '<img src="./dist/img/icons/next.png" />',
        prevArrow: '<img src="./dist/img/icons/prev.png" />',
      });

    $('.navigation__icon').click(function(){
		$('.navigation__menu').toggleClass('navigation__menu--open');
	});
    
    $('.navigation__sections a').click(function(){
		$('.navigation__menu').removeClass('navigation__menu--open');
	});
 
    $(window).scroll(function(event){
        setElementsByScroll($(this).scrollTop());

        $('.animate-num').each(function () {
            if ($(this).isInViewport() && $(this).text() === "0") {
                var max = parseInt($(this).attr("num"));
                var delay = 0;

                if ($(this).attr("delay")) { 
                    delay = parseInt($(this).attr("delay"));
                }

                $(this).animateNumbers(max, false, 1000, delay);
            }
        });
    });
    
    

    $(".scroll-to").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
});



function setElementsByScroll(current){
            
    if (current >= $(window).height()*0.13+85){
        $('.navigation').addClass('navigation--fix-top');
    }
    else {
        $('.navigation').removeClass('navigation--fix-top');
    }


   if($(window).width() > 992)
    {
        if (current > 800){
            $('#social-menu').addClass('navigation__social--fix-top');
            $('#social-menu').find('.navigation__social__icon').addClass('animated bounceIn');
            $('#social-menu').attr('style','');
            $('#social-menu').removeClass('wow fadeInDown');
        }
        else {
            $('#social-menu').removeClass('navigation__social--fix-top');
            $('#social-menu').find('.navigation__social__icon').removeClass('animated bounceIn');
        }

        if (current > 1100){           
            $('#content-menu').addClass('navigation__content--fix-top');
            $('#content-menu').attr('style','');
            $('.navigation__content__icon').addClass('animated bounceIn'); 
            $('#content-menu').removeClass('wow fadeInUp');    
        }
        else {
            $('#content-menu').removeClass('navigation__content--fix-top');
            $('.navigation__content__icon').removeClass('animated bounceIn');
        }
    }else{
        $('#social-menu').removeClass('navigation__social--fix-top');
        $('#content-menu').removeClass('navigation__content--fix-top');
    } 
}

(function ($) {
    $.fn.animateNumbers = function (stop, commas, duration, delay) {

        return this.each(function () {
            var $this = $(this);
            var start = parseInt($this.text().replace(/,/g, ""));
            commas = (commas === undefined) ? true : commas;

            var time = window.setTimeout(
                function () {
                    $({ value: start }).animate({ value: stop }, {
                        duration: duration == undefined ? 1000 : duration,
                        easing: "swing",
                        step: function () {
                            $this.text(Math.floor(this.value));
                            if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")); }
                        },
                        complete: function () {
                            if (parseInt($this.text()) !== stop) {
                                $this.text(stop);
                                if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")); }
                            }
                        }
                    });

                    clearTimeout(time);
                }, delay);
        });

    };
})(jQuery);


(function ($) {
    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
})(jQuery);
