(function() {
    "use strict";

    // shows the top search panel when user clicks on the search icon
    jQuery.fn.alzSearchBox = function(options) {
        var defaults = {
        };
        var opts = $.extend(defaults, options);

        return this.each(function () {
            var $this = $(this);
            // Desktop search bar events
            $('.search-icon', $this).on('click', function(e) {
                $('.search-box', $this).show();
                $('.search-box .search-text', $this).focus();
            });

            $('.search-text', $this).blur(function() {
                 $('.search-box', $this).css('display', 'none');
            });

            $('.search-btn', $this).on('mousedown',  function(e) {
                e.preventDefault();
            }).on('click', function() {
                 $('.search-box', $this).css('display', 'none');
                submitSearch();
            });

            $('.search-text', $this).keyup( function(e) {
                if (e.keyCode==13) {
                    submitSearch();                   
                }
            });

            $('a.search-btn, a.search-icon', $this).click(function(evt){
                return false; // avoid jump to '#'
            });

            function submitSearch() {
                var searchString = $('.search-text', $this).val();
                if (searchString.length>0) {
                    window.location.href = '/site-map/search-results?open=&q=' + encodeURI(searchString);
                }
            }
        });
    };

})();