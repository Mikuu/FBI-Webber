(function ($) {
    "use strict";
	
	// initialise the carousel header
	if( $('#carousel-desktop .item.active').length ) {
		$('.header.global').css('background-image', 'url(' + $('#carousel-desktop .item.active').attr('data-background-desktop') +  ')');
	}
	
    // starts a bootstrap carousel on the selected element
    jQuery.fn.loadCarousel = function (options) {
		//console.log("loadCarousel");
        var defaults = {
            interval: 7500,
            bgAttribute: 'data-background-desktop',
            bgParent: '.header.global'
        };
        var opts = $.extend(defaults, options);

        return this.each(function () {
            var $this = $(this);

            $this.carousel({
                interval: opts.interval,
                cycle: true
            });

            $this.on('slide.bs.carousel', function (e) {
                if (e.relatedTarget) {
                    var bgImage = $(e.relatedTarget).attr(opts.bgAttribute);
                    if (bgImage) {
                        //$(opts.bgParent).css('background', '#292b2f url(' + bgImage + ') no-repeat no-repeat top center');
						//$(opts.bgParent).css('background', '#f8f8f8 url(' + bgImage + ') no-repeat no-repeat top center');
						
						$(opts.bgParent).fadeIn(1000).css('background', '#f8f8f8 url(' + bgImage + ') no-repeat no-repeat top center');
                    }
                }
            });
        });
    };

    // uses simple 'setInterval' function to change background image at a specified time interval
    jQuery.fn.loadBGCarousel = function (options) {
		//console.log("loadBGCarousel");
        var defaults = {
            interval: 7500,
            container: '.container-header-bg',
            backgroundImages: []
        };
        var opts = $.extend(defaults, options);

        return this.each(function () {
            var $this = $(this);

			setInterval(function(){
                // work out current slide index
                var container = $(opts.container, $this);
                var index = container.attr('data-current-bg-index') || 0;
                index++;
                if (index >= opts.backgroundImages.length) {
                    index = 0;
                }
                container.attr('data-current-bg-index', index);

                // change the background
                container.css('background', '#292b2f url(' + opts.backgroundImages[index] + ') no-repeat no-repeat top center');
            }, opts.interval);
        });
    };
})(jQuery);