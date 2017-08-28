(function ($) {
    "use strict";

    $('.collapse-content').hide();
    $('.collapse-header').on('click',function() {
        var $this = $(this);
        var $target =  $this.next();

        if(!$target.hasClass('active')){
            $target.addClass('active').slideDown();
            $this.addClass('active');
        }else{
            $target.removeClass('active').stop().slideUp();
            $this.removeClass('active');
        }

        return false;
    });

})(jQuery);