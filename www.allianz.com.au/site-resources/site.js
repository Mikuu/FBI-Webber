
/**************************************************************/
/*** Functions for displaying the product conditions ***/
/**************************************************************/
function showConditionsForSelector( selector, scrollToConditions ) {
    $(selector + " .panel-heading").each(function(index) {
        if( $(this).hasClass("panel-heading") ) {
            $(this).trigger( "click" );
        }
    });
    if( scrollToConditions ) {
        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, 800);
    }
    return false;
}
function showConditions() { return showConditionsForSelector(".conditions-apply", true); }
/***************************/
/*** Launch functions ***/
/***************************/
$(function(){

    // Initialise the mobile menu
    $('#mobile-main-navbar-collapse').alzMobileMenu();

    // Load the get a quote template # moved into the homepage.banner.mobile content component
    //$('#get-quote-mobile:visible').loadBGCarousel({backgroundImages: ['images/allianz-mobile-home-carousel-car.jpg', 'images/allianz-mobile-home-carousel-travel.jpg']});

    // Initialise the search box component
    $('.nav-top-strap').alzSearchBox();

/*
    // Load the mega menu template
    $(".mega-menu").load("partials/mega-menu.html", function() {
        // Initialise the desktop top navigation
        $('#main-nav').alzMenu({ menuCloser: $('.main-menu-closer') });
    });
*/
    // Initialise the desktop top navigation
    $('#main-nav').alzMenu({ menuCloser: $('.main-menu-closer') });

    // Initialise the desktop carousel
    //$("#carousel-desktop").load("partials/carousel-desktop.html", function() { $(this).loadCarousel(); });
    $("#carousel-desktop:visible").loadCarousel();
    var url = document.location.href;
    if( url.indexOf( '?utm_' ) > 0 || url.indexOf( '&utm_' ) > 0 ) {
        showConditionsForSelector("#conditions", false);
    } else if( url.indexOf( '#conditions' ) > 0 ) {
        //showConditionsForSelector(".footer .panel-collapse", true);
        showConditionsForSelector("#conditions", true);
    }
});
/***************************/
/*** Search functions ***/
/***************************/
