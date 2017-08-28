
(function() {
    "use strict";
    var timer;
    var isTouchscreen = false;
    if (("ontouchstart" in window)) {
        // if  touch we do not use the timer
        isTouchscreen = true;
    }
    jQuery.fn.alzMenu = function(options) {
        var defaults = {
            menuCloser: {}
        };
        var opts = $.extend(defaults, options);
        return this.each(function() {
            var _menu = $(this);
            var _mainMenu = $('.navbar-main ul', _menu);
            var _subMenus = $('.navbar-main-sub', _menu);
            var _megaMenus = $('.mega-menu', _menu);
            // On mouse out of menu area, close all menus back to default state
            opts.menuCloser.mouseenter(function() {
                $(this).addClass("hidden").delay(300).queue(function(next) {
                    _menu.resetMenu();
                    next();
                });
            });
            // Add mouse over event for main menu
            $('li > a', _mainMenu).each(function() {
                var _mainMenuItem = $(this);
                if (!(isTouchscreen)) {
                    _mainMenuItem.mouseenter(function() {
                        timer = setTimeout(function() {
                            _menu.clearAllSubMenus();
                            _menu.closeAllMegaMenus();
                            _menu.showChildMenu(_mainMenuItem, _mainMenu, _subMenus);
                        }, 300, true)
                    }).mouseleave(function() {
                        clearTimeout(timer);
                    });
                } else {
                    _mainMenuItem.mouseenter(function() {                    
                        _menu.clearAllSubMenus();
                        _menu.closeAllMegaMenus();
                        _menu.showChildMenu(_mainMenuItem, _mainMenu, _subMenus);
                    });
                }
            });
            // Add mouse over events for sub menus
            $('ul.navbar-nav', _subMenus).each(function() {
                var _subMenu = $(this);
                $('li > a', _subMenu).each(function() {
                    var _subMenuItem = $(this);
                    if (!(isTouchscreen)) {
                        _subMenuItem.mouseenter(function() {
                            timer = setTimeout(function() {
                                _menu.showChildMenu(_subMenuItem, _subMenu, _megaMenus);
                            }, 300)
                        }).mouseleave(function() {
                            clearTimeout(timer);
                        });
                    } else {
                        _subMenuItem.mouseenter(function() {                            
                            _menu.showChildMenu(_subMenuItem, _subMenu, _megaMenus);
                        });
                    }
                });
            });
            _menu.addMenuCloser = function() {
                opts.menuCloser.removeClass('hidden');
            };
            _menu.showChildMenu = function(menuItem, menuItems, childMenus) {
                _menu.addMenuCloser();
                // Close all other child menus
                $('li > a', menuItems).each(function() {
                    var _menuItem = $(this);
                    $(_menuItem).attr('aria-expanded', 'false');
                    $('[aria-labelledby="' + _menuItem.attr('id') + '"]', childMenus).addClass('hidden');
                });
                // Show the child menu
                var _childMenu = $('[aria-labelledby="' + menuItem.attr('id') + '"]');
                if (! isTouchscreen) {
                    _childMenu.addClass('fade-in');
                }
                _childMenu.removeClass('hidden');
                // highlight this menu item
                menuItem.attr('aria-expanded', 'true');
            };
            _menu.closeAllMegaMenus = function() {
                $('.mega-menu-content', _megaMenus).each(function() {
                    $(this).addClass('hidden');
                });
            };
            _menu.clearAllSubMenus = function() {
                $('ul.navbar-nav', _subMenus).each(function() {
                    var _subMenu = $(this);
                    _subMenu.addClass('hidden');
                    $('li > a', _subMenu).each(function() {
                        $(this).attr('aria-expanded', 'false');
                    });
                });
            };
            _menu.clearAllMenus = function() {
                $('li > a', _mainMenu).attr('aria-expanded', 'false');
            };
            _menu.resetMenu = function() {
                _menu.closeAllMegaMenus();
                _menu.clearAllSubMenus();
                _menu.clearAllMenus();
                // find a selected menu item
                var _selectedMenu = $('.selected', _mainMenu);
                _selectedMenu.attr('aria-expanded', 'true');
                $('[aria-labelledby="' + _selectedMenu.attr('id') + '"]', _subMenus).removeClass('hidden');
            };
            _menu.resetMenu();
        });
    };
})();
