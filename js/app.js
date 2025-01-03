jQuery(document).ready(function($) {

  "use strict";

  $(document).foundation();


  if($('form#mc-embedded-subscribe-form').length > 0) {
    $('form#mc-embedded-subscribe-form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          type: 'GET',
          url: 'https://zealia.us8.list-manage.com/subscribe/post-json?u=2bcbe4257b3ebaafaa749f0d3&amp;id=49560e7237&amp;f_id=002b10e1f0"&c=?',
          data: $(form).serialize(),
          cache: false,
          dataType: 'json',
          contentType: "application/json; charset=utp-8",
          success: function(data) {
            if (data.result != "success") {
                // Something went wrong, do something to notify the user. maybe alert(data.msg);
              $(form).trigger('reset');
              document.getElementById("error").innerHTML = data.msg;
              $('#error').show().fadeOut(11000);
            } else {
              $(form).trigger('reset');
              $('#subscribed').show().fadeOut(7000);
            }
          }
        });
        return false;
      }
    });
  }

  if($('form#contact_form').length > 0) {
    $('form#contact_form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          method: 'POST',
          url: 'https://formspree.io/xjvelpyb',
          data: $(form).serialize(),
          dataType: "json",
          success: function(data) {
            if(data.ok == true) {
              $(form).trigger('reset');
              $('#thanks').show().fadeOut(7000);
            }
          }
        });
        return false;
      }
    });
  }

  $('#menu-toggler').on('click', function() {
    $('.top-bar-section').toggle();
    return false;
  });

  if ($('#slides').length > 0) {
    $('#slides').on('init.slides', function() {
      var that = this;
      setTimeout(function() {
        $('.slides-container', that).children().eq(0).addClass('active');
      }, 300);
    });

    $('#slides').superslides({
      animation: 'fade',
      hashchange: false,
      play: 5000
    });

    $('#slides').on('animated.slides', function() {
      $('.slides-container', this).children().removeClass('active');

      var index = $(this).superslides('current');
      var that = this;

      setTimeout(function() {
        $('.slides-container', that).children().eq(index).addClass('active');
      }, 300);

    });
  }

  if ($('.slides').length > 0) {
    // $('.boxed').on('init.slides', function() {
    //   var that = this;
    //   setTimeout(function() {
    //     $('.slick-active', that).addClass('active');
    //   }, 300);
    // });
    $('.slides').slick({
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      speed: 1000,
      arrows: false
    });
  }

  new WOW().init();


  var bars = $(".bars");

  for(var i = 0; i < bars.length; i++) {
    var bar = bars[i];
    var highlights = $('> li > .highlighted', $(bar));

    for ( var j = 0; j < highlights.length; j++ ) {

      var highlight = highlights[j];

      $(highlight).appear(function() {
        var percent = $(this).attr("data-percent");
        // $bar.html('<p class="highlighted"><span class="tip">'+percent+'%</span></p>');
        // http://stackoverflow.com/questions/3363035/jquery-animate-forces-style-overflowhidden
        $(this).animate({
          'width': percent + '%'
        }, 1700, function() { $(highlight).css('overflow', 'visible'); });
      });

    }
  }


  $(".milestone").appear(function() {
    $('.number', $(this)).countTo({
      speed: 1400
    });
  });

  // var width_1 = $(this).width();
  // var width_2 = $(".work img").width();
  // var margin_left = (width_1 - width_2) / 2 + 20 + 'px';
  // $('.info').css('margin-left', 'margin_left');

  if ($('.clients').length > 0) {
    $('.clients').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  $('.back-to-top').on('click', function() {
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
  });

  var masonryGallery = function(sel) {

    var $ctx = $(sel);
    var items = $('.gallery li', $ctx);
    var gutter = $ctx.data('gutter');

    if ( !gutter ) { gutter = 0 };

    for( var i = 0; i < items.length; i++ ) {
      var item = items[i];
      $(item).data('masonry-id', i);
    }

    var msnry = new Masonry($('.gallery', $ctx)[0], { itemSelector: 'li', gutter: gutter, isInitLayout: false, columnWidth: ".gallery li:not(.wide)" });

    window.msnry = msnry;

    $('.gallery', $ctx).imagesLoaded( function() {
      msnry.layout();
    });

    $('.gallery-nav ul li a', $ctx).on('click', function() {

      // disable filter
      // if( $('.gallery-nav', $ctx).hasClass('disabled') ) return false;

      // $('.gallery-nav', $ctx).addClass('disabled');

      $('.gallery-nav ul li').removeClass('current');
      $(this).closest('li').addClass('current');

      var cat = $(this).attr('data-cat');

      var gallery = $('.gallery-nav').closest('.masonry-gallery').find('ul.gallery');

      if (cat === 'all') {
        var exists = $('.gallery li', $ctx);
        var elems = [];

        for( var i = 0; i < items.length; i++ ) {
          var item = items[i];
          var skip = false;

          for(var j = 0; j < exists.length; j++ ) {
            var exist = exists[j];
            if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
              skip = true;
            }
          }

          if (!skip) {
            ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
            elems.push($(item)[0]);
          }
        }
        msnry.prepended(elems);

      } else {
        var lis = $('li', gallery);

        for(var i = 0; i < lis.length; i++) {
          var li = lis[i];

          if (!$(li).hasClass(cat)) {
            msnry.remove($(li));
          }
        }

        var exists = $('.gallery li', $ctx);
        var elems = [];

        for( var i = 0; i < items.length; i++) {
          var item = items[i];
          var skip = false;

          for( var j = 0; j < exists.length; j++) {
            var exist = exists[j];

            if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
              skip = true;
            }
          }


          if ( $(item).hasClass(cat) && !skip) {
            ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
            elems.push($(item)[0]);
          }
        }

        msnry.appended(elems);

      }

      msnry.layout();


      // enable filter
      // setTimeout(function() {
      //   $('.gallery-nav', $ctx).removeClass('disabled');
      // }, 500);

      return false;

    });

  }

});
