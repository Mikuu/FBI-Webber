
/**
 * Created by sdolier on 5/11/15.
 * Updated by allianz on 30/11/15
 */
(function() {
    "use strict";
    jQuery.fn.alzMobileMenu = function (options) {
        var defaults = {
        };
        var opts = $.extend(defaults, options);
        return this.each(function () {
            var _menus = $(this);
            // Reset the nav on show
            _menus.on('show.bs.collapse', function() {
                $(':not([aria-labelledby])').removeClass('hidden');
                $('[aria-labelledby]:not([aria-labelledby=""])').addClass('hidden');
            });
            $('ul', _menus).each(function() {
                var _menu = $(this);
                // bind click to each menu item
                $('li > a', _menu).each(function() {
                    var _menuItem = $(this);
                    _menuItem.click(function(e) {
                        if (_menuItem.hasClass('back')) {
                            e.preventDefault();
                            $(_menu).addClass('hidden');
                            $('#' +  _menu.attr('aria-labelledby'), _menus).parent().parent().removeClass('hidden');
                        }
                        else if (_menuItem.attr("href") == "#") {
                            e.preventDefault();
                            $(_menu).addClass('hidden');
                            $('[aria-labelledby="' + _menuItem.attr('id') + '"]', _menus).removeClass('hidden');                            
                        }
                        else {
                            // do the standard click
                        }
                    });
                });
            });
        });
    };
})();
