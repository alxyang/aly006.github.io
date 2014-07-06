
	var _scrollSpeed			= 1000,
		_slider_delay			= 0;
		// set header height!
		window.navHeight 		= jQuery("#header").height();


/**	01. SCROLL TO
*************************************************** **/
	jQuery("a.scrollTo").bind("click", function(e) {
		e.preventDefault();

		var href = jQuery(this).attr('href');
		if(href != '#') {
			jQuery('html,body').stop().animate({scrollTop: jQuery(href).offset().top - window.navHeight}, _scrollSpeed, 'easeInOutExpo');
		}
	});

	jQuery("a.toTop").bind("click", function(e) {
		e.preventDefault();
		jQuery('html,body').stop().animate({scrollTop: 0}, 1000, 'easeInOutExpo');
	});

/**	02. BACKSTRETCH BACKGROUND [STATIC LOGO - NOSLIDER]
*************************************************** **/
	if(jQuery().backstretch && jQuery("#static-logo").length > 0) {
		var background_image = jQuery("#static-logo").attr('data-background');

		if(background_image) {
			jQuery("#slider").backstretch(background_image, {speed: 150});
			jQuery("#slider").css({"background":"none"});
		}
	}

/**	03. STICKY TOP NAV
*************************************************** **/
	// -----------------------------------------------------------------------------------
		// Fullscreen Height - keep it here to avoid sticky menu bug!
		if(jQuery(".full-screen").length > 0) {
			_fullscreen();

			jQuery(window).resize(function() {
				_fullscreen();
			});
		}
		function _fullscreen() {

			var _screenHeight = jQuery(window).height();
			jQuery(".full-screen, .full-screen ul, .full-screen li").height(_screenHeight);

		}
	// -----------------------------------------------------------------------------------

	if(jQuery("#home").length > 0) {

		window.isOnTop 		= true;
		window.homeHeight 	= jQuery("#home").height() - window.navHeight;
		 /*
			window.isOnTop = avoid bad actions on each scroll
			Benefits: no unseen jquery actions, faster rendering
		 */
		jQuery(window).scroll(function() {
			if(jQuery(document).scrollTop() > window.homeHeight) {
				if(window.isOnTop === true) {
					jQuery('#header').addClass('fixed');
					window.isOnTop = false;
				}
			} else {
				if(window.isOnTop === false) {
					jQuery('#header').removeClass('fixed');
					window.isOnTop = true;
				}
			}
		});

		jQuery(window).resize(function() {
			window.homeHeight = jQuery("#home").height() - window.navHeight;
		});

	}

	// mobile - hide on click!
	jQuery(document).bind("click", function() {
		if(jQuery("div.navbar-collapse").hasClass('in')) {
			jQuery("#mobileMenu").trigger('click');
		}
	});


	// easing - only needed
	jQuery.extend( jQuery.easing,{
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
	});

	// Hover Effect - opacity effect
	jQuery('#portfolio li, #quick-blog .quick-hover').hover(function(){
		jQuery(this).siblings().addClass('faded');
	}, function(){
		jQuery(this).siblings().removeClass('faded');
	});