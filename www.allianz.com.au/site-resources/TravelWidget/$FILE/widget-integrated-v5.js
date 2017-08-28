// =============================================================================
// ALLIANZ TRAVEL QUOTE WIDGET - CUSTOM JS
// =============================================================================

$(document).ready(function(){
    Site.init();
    Site.LoadCountries();
    Site.travelOptions();
    Site.travellerAges();
    Site.datepickerSingle();
    Site.datepickerSingleMobile();
    Site.datepickerMulti();
    Site.datepickerMultiVertical();
    Site.validationRules();
});

//Implementing the Country panel
var $example = $("#select-countries").select2();
var countryArray = [];
$('#select-countries').on('select2:unselecting', function (evt) {
    $('#country-panel').attr('style', "display: block");
    var removedCountry = evt.params.args.data.id;
    countryArray.sort();
    for (var i = 0; i < countryArray.length ; i++) {
        if (countryArray[i] === removedCountry) {
            countryArray.splice(i, 1);
        }
    }
});
$('#select-countries').parent().on("click", function () {
    // leave it for AB Tasty for now
    //$('#country-panel').toggle();
});
$('#select-countries').on('select2:open', function () {
    $('#country-panel').attr('style', "display: none");
});
$('#select-countries').on('select2:select', function (evt) {
    countryArray.push(evt.params.data.id);
});
$('#country-panel dd a').each(function () {
    $(this).on("click", function () {
        countryArray.push($(this).attr('value'));
        $example.val(countryArray).trigger("change");
        $('#country-panel').attr('style', "display: none");
    });
});
$('#country-panel .close-panel').click(function () {
    $('#country-panel').attr('style', "display: none");
})
//end of Country panel

$(window).resize(function() {
    Site.resize();
});
$(window).scroll(function() {
    //Site.scroll();
});
var Site = {
    $validator: null,
    SortCountriesAlphabetically:function(a, b) {
        var aName = a.text.toLowerCase();
        var bName = b.text.toLowerCase();
        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    },
    ParseValidDate:function(input_date) {
        var selDate = moment(new Date());
        if(moment(input_date, 'DD/MM/YYYY').isValid() && moment(input_date, 'DD/MM/YYYY').isAfter(selDate)) {
            selDate = moment(input_date, "DD/MM/YYYY");
        }
        return selDate;
    },
    LoadCountries:function() {
        $.ajax({
            type: 'GET',
            url: '/site-resources/AGA-PricingOptions.js',
            contentType:'application/json',
            timeout: 8000
        }).fail(function(xhr, err){
            alert( 'There was an error loading the page please refresh the page and try again' );
        }).done(function(data){
            // load out quote settings from API
            Site.MaxAdultAge = data.MaxAdultAge;
            Site.MinAdultAge = data.MinAdultAge;
            Site.MinAdults = data.MinAdults;
            Site.MaxAdults = data.MaxAdults;
            Site.MinDependantAge = data.MinDependantAge;
            Site.MaxDependantAge = data.MaxDependantAge;
            Site.MinDurationDays = data.MinDurationDays;
            Site.MaxDurationDays = data.MaxDurationDays;
            $countries = [];
            var $id = 0;
            $countries.push({
                id: 0,
                text: '',
                searchTerm: ''
            });
            // create array of just country names in format for Select2
            $.each(data.Destinations, function (i) {
                var regionCode = this.BriefCode;
                var countryCode = "";
                $.each(this.Countries, function (key, value) {
                    countryCode = this.BriefCode;
                    $id++;
                    $countries.push({
                        id: $id,
                        text: value.Description,
                        searchTerm: value.Description,
                        regionCode: regionCode,
                        countryCode: countryCode
                    });
                    if(value.Locations != undefined) {
                        $.each(value.Locations,function(k,v){
                            $id++;
                            $countries.push({
                                id: $id,
                                text: v.Description + ' ('+value.Description+')',
                                searchTerm: v.Description,
                                regionCode: regionCode,
                                countryCode: countryCode,
                                locationCode: this.BriefCode
                            });
                        })
                    }
                });
            });
            if( $countries.length > 0) {
                // sort array of countries in alphabetical order
                $countries.sort(Site.SortCountriesAlphabetically);
                // condition to load select2 without a placeholder in IE 6-11
                if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0){
                    // instantiate Select2 field
                    $("#select-countries").select2({
                        //placeholder: "Eg: Brazil, Thailand",
                        data: $countries,
                        multiple: true,
                        openOnEnter: false,
                        matcher: function(term, text) {
                            if (text.text.toUpperCase().indexOf(term.term.toUpperCase()) == 0) {
                                return text;
                            }
                            return null;
                        }
                    })
                } else {
                    // instantiate Select2 field
                    $("#select-countries").select2({
                        placeholder: "Eg: Brazil, Thailand",
                        data: $countries,
                        multiple: true,
                        openOnEnter: true,
                        matcher: function(term, text) {
                            if (text.text.toUpperCase().indexOf(term.term.toUpperCase()) == 0) {
                                return text;
                            }
                            return null;
                        }
                    })
                }
                $("#select-countries").on('select2:unselect',function(){$(this).select2("close")});
                $("#select-countries").on('select2:select',function(){$validator.element("#select-countries")});
                $('#select-countries').on('change', function(){$validator.element("#select-countries")});
                $('.select-countries').on("change", function(e) {
                    $container = $('.select2').width();
                    $width = 0;
                    $('.select2-selection__choice').each(function(index) {
                        $width += parseInt($(this).outerWidth() + 5, 10);
                    });
                    if ($width > $container) {
                        $width = $width - $container;
                    } else {
                        $width = $container - $width;
                    }
                    if ($width < 100) {
                        $width = 460;
                    }
                    $('.select2-search__field valid, .select2-search--inline').width($width - 50);
                });
                $('.select-countries').on("change", function(e) {
                    $('.select2-search__field').focus();
                });
            } else {
                alert( 'There was an error loading the page please refresh the page and try again' );
            }
        }); //- end of $.ajax
    },
    CleanseAgeString:function($ages) {
        var $ageArray = [];
        var $cleanAgeString = $ages.trim().replace(/\./g, ',').replace(/\s+/g, ',').replace(/\//g, ',').replace(/\|/g, ',').replace(/\D/g, ','); // remove all instances of chars: '.', ' ', '/', '|'
        $ageArray = $cleanAgeString.split(',');
        $ageArray = $ageArray.filter(function(v){return v!==''}); // filter array and remove empty entries caused by 2 commas in a row
        return $ageArray
    },


    init:function() {

        var MaxAdultAge, MinAdultAge, MaxAdultAge, MinAdults, MaxAdults, MinDependantAge, MaxDependantAge, MinDurationDays, MaxDurationDays;
        var $murf = null;
        var $murfm = null;
        var $multical = null;
        var $multical_vert = null;
        var $multicalmob = null;
        $(window).setBreakpoints({
            // use only largest available vs use all available
            distinct: true,
            // array of widths in pixels where breakpoints
            // should be triggered
            breakpoints: [
                320,
                480,
                640,
                768,
                992
            ]
        });

        //$(window).bind('exitBreakpoint640',function() {
        //console.log('desktop')
        //});
        /*
         isMobile = {
         Android: function() {
         return navigator.userAgent.match(/Android/i);
         },
         BlackBerry: function() {
         return navigator.userAgent.match(/BlackBerry/i);
         },
         iOS: function() {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
         },
         Opera: function() {
         return navigator.userAgent.match(/Opera Mini/i);
         },
         Windows: function() {
         return navigator.userAgent.match(/IEMobile/i);
         },
         any: function() {
         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
         }
         };
         */
        // initialise all datepicker field values
        $('#date-range-picker-start').val('');
        $('#date-range-picker-end').val('');
        $('#date-range-picker-start-mobile').val('');
        $('#date-range-picker-end-mobile').val('');
        $('#date-range-picker-multi').val('');
        $('#date-range-picker-multi-vertical').val('');
        // instantiate of popover tooltip
        $('[data-toggle="popover"]').popover({
            trigger: 'focus hover',
            html: true
        });
        // Calendar icons interactions
        $(".cal-icon-depart").on('click',function(){
            var cal = $(this).parent().find('input:visible').attr('id');
            $('#' + cal).focus();
            $(".daterangepicker").toggleClass('rightMonth',false);
        })
        $(".cal-icon-return").on('click',function(){
            var cal = $(this).parent().find('input:visible').attr('id');
            $('#' + cal).focus();
            $(".daterangepicker").toggleClass('rightMonth',true);
        })
        $(".cal-icon-multi").on('click',function(){
            var cal = $(this).parent().find('input:visible').attr('id');
            $('#' + cal).focus();
        })
    }, //end init function
    travelOptions:function() {
        // click toggle of travel options buttons
        $('ul.travel-options label').on('click', function() {
            $('ul.travel-options label').removeClass('is-checked').removeClass('is-selected');
            $(this).addClass('is-checked').addClass('is-selected');
            // show and hide the single and multi date selectors
            switch ($(this).attr('rel')) {
                case 'single-opt':
                    $('.single-trip').fadeIn('fast');
                    $('.multi-trip').fadeOut(0);
                    if($('.single-trip label.error').length) {
                        $validator.element("#date-range-picker-start");
                        $validator.element("#date-range-picker-end");
                        $validator.element("#date-range-picker-start-mobile");
                        $validator.element("#date-range-picker-end-mobile");
                    }
                    break;
                case 'multi-opt':
                    $('.single-trip').fadeOut(0);
                    $('.multi-trip').fadeIn('fast');
                    if($('.multi-trip label.error').length) {
                        $validator.element("#date-range-picker-multi");
                        $validator.element("#date-range-picker-multi-vertical");
                    }
                    break;
            }
        });
        // when radion buttons are tabbed/highlighted the click event is triggered to select
        $('ul.travel-options input').on('focus', function() {
            //$validator.element("#select-countries")
            $(this).next('label').click();
        });
    },
    travellerAges:function() {
        $("#adult-ages").on('blur',function(e){
            var $cleansedAges = Site.CleanseAgeString($(this).val());
            // validate adult ages entered
            $validator.element("#adult-ages");
            // format the array of ages with commas and put back into input field
            $(this).val($cleansedAges.join(", "));
        });
        $("#child-ages").blur(function(e) {
            if($(this).val()) {
                var $cleansedAges = Site.CleanseAgeString($(this).val());
                // validate child ages entered
                $validator.element("#child-ages");
                // format the array of ages with commas and put back into input field
                $(this).val($cleansedAges.join(", "));
            }
        });
        $('#adult-ages').on('focus',function(){
            if ($murf.data('daterangepicker')) $murf.data('daterangepicker').hide();
            if ($multical.data('daterangepicker')) $multical.data('daterangepicker').hide();
        });
        // function to restrict characters that can be entered into the age fields
        $.fn.blockInput = function (options) {
            this.filter('input')
                .keypress(function (e) {
                    var char = String.fromCharCode(e.which),
                        regex = new RegExp(options.regex);
                    // Don't validate the input if below arrow, delete and backspace keys were pressed
                    if(e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40 || e.which == 8 || e.which == 46 || e.which == 0) { // Left / Up / Right / Down Arrow, Backspace, Delete keys
                        return this;
                    }
                    //console.log(e.which);
                    return regex.test(char);
                });
            return this;
        };
        $("#adult-ages, #child-ages").blockInput({ regex: '[0-9]|[\,./| ]'});
        $('#adult-ages, #child-ages, .select2-search__field').on('paste',function(){
            e.preventDefault();
        });
        // validation so only numbers and commas can be entered into age fields - this method had issues in Android Chrome
        /*
         $("#adult-ages, #child-ages").keydown(function(e) {
         //alert(e.keyCode);
         console.log(e.keyCode);
         // Allow: backspace, delete, tab, escape, enter and .
         if ($.inArray(e.keyCode, [46, 44, 8, 9, 27, 13, 110, 188, 32, 190, 191, 220, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]) !== -1 ||
         // Allow: Ctrl+A, Command+A
         (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
         // Allow: home, end, left, right, down, up
         (e.keyCode >= 35 && e.keyCode <= 40)) {
         // let it happen, don't do anything
         return;
         } else {
         e.preventDefault();
         }
         // Ensure that it is a number and stop the keypress
         //if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
         //    e.preventDefault();
         //}
         });
         */
    },
    datepickerSingle:function() {
        // =============================================================================
        // Single trip date picker
        // =============================================================================
        $murf = $('#date-range-picker-start').daterangepicker({
            autoApply: true,
            autoUpdateInput: false,
            //linkedCalendars: false,
            locale: {
                format: 'DD MMM YYYY'
            },
            minDate: moment(),
            maxDate: moment().add(1, 'y'),
        });
        $('#date-range-picker-start').on('startDateChosen.daterangepicker',function(ev, picker){
            var startDate = picker.startDate.clone();
            var startDateTwo = picker.startDate.clone();
            var startDateMobile = picker.startDate.clone();
            $(this).val(startDate.format($murf.data('daterangepicker').locale.format));
            $murf.data('daterangepicker').maxDate = startDate.add(1, 'y');
            // update mobile version
            $('#date-range-picker-start-mobile').val(startDateMobile.format($murfm.data('daterangepicker').locale.format));
            $murfm.data('daterangepicker').startDate = Site.ParseValidDate($(this).val());
            $murfm.data('daterangepicker').maxDate = startDateMobile.add(1, 'y');
            // end - update mobile version
            // condition to make sure if start date is greater than end date then (end date equals start date)
            if($('#date-range-picker-start').val() && $('#date-range-picker-end').val()) {

                var startObj = moment(Date.parse($('#date-range-picker-start').val()));
                var endObj = moment(Date.parse($('#date-range-picker-end').val()));
                if(moment(startObj).isAfter(endObj)) {
                    $murf.data('daterangepicker').endDate = startDateTwo;
                    $('#date-range-picker-end').val(startDateTwo.format($murf.data('daterangepicker').locale.format));
                }
                if(endObj.diff(startObj, 'years') > 0) {
                    $murf.data('daterangepicker').endDate = startDateTwo.add(1, 'y');
                    $('#date-range-picker-end').val(startDateTwo.format($murf.data('daterangepicker').locale.format));
                }
            }
            if($('#date-range-picker-end').val() == '') {
                $('#date-range-picker-end').trigger('focus');
            }
            $validator.element("#date-range-picker-start");
        })
        $('#date-range-picker-start').on('endDateChosen.daterangepicker',function(ev, picker){
            $murf.data('daterangepicker').endDate = picker.endDate;
            $('#date-range-picker-end').val(picker.endDate.format($murf.data('daterangepicker').locale.format));

            // UPDATE MOBILE VERSION - START
            $murfm.data('daterangepicker').startDate = picker.startDate;
            $('#date-range-picker-start-mobile').val(picker.startDate.format($murfm.data('daterangepicker').locale.format));
            $murfm.data('daterangepicker').endDate = picker.endDate;
            $('#date-range-picker-end-mobile').val(picker.endDate.format($murfm.data('daterangepicker').locale.format));
            // UPDATE MOBILE VERSION - END

            if($('#date-range-picker-start').val() == '') {
                $murf.data('daterangepicker').startDate = picker.startDate;
                $('#date-range-picker-start').val(picker.startDate.format($murf.data('daterangepicker').locale.format));
                $('#date-range-picker-start').trigger('focus');
            }
            $murf.data('daterangepicker').bothActivated = true;
            $validator.element("#date-range-picker-end");
        })
        $('#date-range-picker-start').on('focus',function(){
            $(this).attr('placeholder','DD/MM/YYYY')
            if($(this).val()) {
                $(this).val($murf.data('daterangepicker').startDate.format('DD/MM/YYYY'))
            }
            $(".daterangepicker").toggleClass('rightMonth',false)
            $murf.data('daterangepicker').minDate = moment(new Date());
            $murf.data('daterangepicker').updateView();
            $murf.data('daterangepicker').activeCalendar = 1;
        })
        $('#date-range-picker-end').on('focus',function(){
            $(this).attr('placeholder','DD/MM/YYYY')
            if($(this).val()) {
                $(this).val($murf.data('daterangepicker').endDate.format('DD/MM/YYYY'));
                $murf.data('daterangepicker').startDate = moment(Date.parse($('#date-range-picker-start').val()))
            }
            $(".daterangepicker").toggleClass('rightMonth',true)
            if($('#date-range-picker-start').val() == '') {
                $murf.data('daterangepicker').minDate = moment(new Date());
            } else {
                var pickerStartVal = $('#date-range-picker-start').val();
                var pickerStartMomentObject = moment(Date.parse(pickerStartVal));
                $murf.data('daterangepicker').minDate = pickerStartMomentObject;
            }
            $murf.data('daterangepicker').updateView();
            $murf.data('daterangepicker').show();
            $murf.data('daterangepicker').activeCalendar = 2;
        })
        // Change format when leaving input
        $('#date-range-picker-start').on('blur', function(){
            if($(this).val()) {
                $murf.data('daterangepicker').startDate = Site.ParseValidDate($(this).val());
                $(this).val($murf.data('daterangepicker').startDate.format($murf.data('daterangepicker').locale.format));
            }
        })
        $('#date-range-picker-end').on('blur', function(){
            if($(this).val()) {
                $murf.data('daterangepicker').endDate = Site.ParseValidDate($(this).val());
                $(this).val($murf.data('daterangepicker').endDate.format($murf.data('daterangepicker').locale.format));
            }
        })
    },
    datepickerSingleMobile:function() {
        // =============================================================================
        // Single (Mobile) trip date picker
        // =============================================================================
        $murfm = $('.toucherStart').daterangepicker({
            autoApply: true,
            autoUpdateInput: false,
            linkedCalendars: false,
            locale: {
                format: 'DD MMM YYYY'
            },
            minDate: moment(),
            maxDate: moment().add(1, 'y'),
        });
        $('.toucherStart').on('startDateChosen.daterangepicker',function(ev, picker){
            var startDate = picker.startDate.clone();
            var startDateTwo = picker.startDate.clone();
            var startDateMobile = picker.startDate.clone();
            $('#date-range-picker-start').val(startDate.format($murf.data('daterangepicker').locale.format));
            $murf.data('daterangepicker').maxDate = startDate.add(1, 'y'); // update desktop version
            $('#date-range-picker-start-mobile').val(startDateMobile.format($murfm.data('daterangepicker').locale.format));
            $murfm.data('daterangepicker').maxDate = startDateMobile.add(1, 'y');
            // condition to make sure if start date is greater than end date then (end date equals start date)
            if($('#date-range-picker-start-mobile').val() && $('#date-range-picker-end-mobile').val()) {

                var startObj = moment(Date.parse($('#date-range-picker-start-mobile').val()));
                var endObj = moment(Date.parse($('#date-range-picker-end-mobile').val()));
                if(moment(startObj).isAfter(endObj)) {
                    $murfm.data('daterangepicker').endDate = startDateTwo;
                    $('#date-range-picker-end-mobile').val(startDateTwo.format($murfm.data('daterangepicker').locale.format));
                }
                if(endObj.diff(startObj, 'years') > 0) {
                    $murfm.data('daterangepicker').endDate = startDateTwo.add(1, 'y');
                    $('#date-range-picker-end-mobile').val(startDateTwo.format($murfm.data('daterangepicker').locale.format));
                }
            }
            if($('#date-range-picker-end-mobile').val() == '') {
                $('.toucherEnd').trigger('click');
            }
            $validator.element("#date-range-picker-start-mobile");
        })
        $('.toucherStart').on('endDateChosen.daterangepicker',function(ev, picker){
            $murfm.data('daterangepicker').endDate = picker.endDate;
            $('#date-range-picker-end-mobile').val(picker.endDate.format($murfm.data('daterangepicker').locale.format));

            // UPDATE DESKTOP VERSION - START
            $murf.data('daterangepicker').startDate = picker.startDate;
            $('#date-range-picker-start').val(picker.startDate.format($murf.data('daterangepicker').locale.format));
            $murf.data('daterangepicker').endDate = picker.endDate;
            $('#date-range-picker-end').val(picker.endDate.format($murf.data('daterangepicker').locale.format));
            // UPDATE DESKTOP VERSION - END

            if($('#date-range-picker-start-mobile').val() == '') {
                $murfm.data('daterangepicker').startDate = picker.startDate;
                $('#date-range-picker-start-mobile').val(picker.startDate.format($murfm.data('daterangepicker').locale.format));
                $('.toucherStart').trigger('click');
            }
            $murfm.data('daterangepicker').bothActivated = true;
            $validator.element("#date-range-picker-end-mobile");
        })
        $('.toucherStart').on('click',function(){
            if( !$('#date-range-picker-start-mobile').val() ) {
                $('html, body').animate({
                    scrollTop: $(".second").offset().top
                }, 800);
            }
            if($('#date-range-picker-start-mobile').val()) {
                $('#date-range-picker-start-mobile').val($murfm.data('daterangepicker').startDate.format('DD/MM/YYYY'))
            } else {
                $('#date-range-picker-start-mobile').attr('placeholder','DD/MM/YYYY')
            }
            if($('#date-range-picker-end-mobile').val()) {
                $('#date-range-picker-end-mobile').val($murfm.data('daterangepicker').endDate.format('DD MMM YYYY'))
            }
            $(".daterangepicker").toggleClass('rightMonth',false)
            $murfm.data('daterangepicker').minDate = moment(new Date());
            $murfm.data('daterangepicker').updateView();
            $murfm.data('daterangepicker').show();
            $murfm.data('daterangepicker').activeCalendar = 1;
        })
        $('.toucherEnd').on('click',function(){
            if( !$('#date-range-picker-start-end').val() ) {
                $('html, body').animate({
                    scrollTop: $(".second").offset().top
                }, 800);
            }
            if($('#date-range-picker-end-mobile').val()) {
                $('#date-range-picker-end-mobile').val($murfm.data('daterangepicker').endDate.format('DD/MM/YYYY'))
            } else {
                $('#date-range-picker-end-mobile').attr('placeholder','DD/MM/YYYY')
                $murfm.data('daterangepicker').minDate = moment(new Date());
            }
            if($('#date-range-picker-start-mobile').val()) {
                $('#date-range-picker-start-mobile').val($murfm.data('daterangepicker').startDate.format('DD MMM YYYY'))
            }
            if($('#date-range-picker-start-mobile').val() == '') {
                $murfm.data('daterangepicker').minDate = moment(new Date());
            } else {
                $murfm.data('daterangepicker').minDate = moment(Date.parse($('#date-range-picker-start-mobile').val()))
            }
            $(".daterangepicker").toggleClass('rightMonth',true)
            $murfm.data('daterangepicker').updateView();
            $murfm.data('daterangepicker').show();
            $murfm.data('daterangepicker').activeCalendar = 2;
        })
        $('#date-range-picker-start-mobile').on('focus',function(){
            if($('#date-range-picker-start-mobile').val()) {
                $('#date-range-picker-start-mobile').val($murfm.data('daterangepicker').startDate.format('DD/MM/YYYY'))
            } else {
                $('#date-range-picker-start-mobile').attr('placeholder','DD/MM/YYYY')
            }
            $(".daterangepicker").toggleClass('rightMonth',false)
            $murfm.data('daterangepicker').minDate = moment(new Date());
            $murfm.data('daterangepicker').updateView();
            $murfm.data('daterangepicker').show();
            $murfm.data('daterangepicker').activeCalendar = 1;
        })
        $('#date-range-picker-end-mobile').on('focus',function(){
            if($('#date-range-picker-end-mobile').val()) {
                $('#date-range-picker-end-mobile').val($murfm.data('daterangepicker').endDate.format('DD/MM/YYYY'))
            } else {
                $('#date-range-picker-end-mobile').attr('placeholder','DD/MM/YYYY')
                $murfm.data('daterangepicker').minDate = moment(new Date());
            }
            if($('#date-range-picker-start-mobile').val() == '') {
                $murfm.data('daterangepicker').minDate = moment(new Date());
            } else {
                $murfm.data('daterangepicker').minDate = moment(Date.parse($('#date-range-picker-start-mobile').val()))
            }
            $(".daterangepicker").toggleClass('rightMonth',true)
            $murfm.data('daterangepicker').updateView();
            $murfm.data('daterangepicker').show();
            $murfm.data('daterangepicker').activeCalendar = 2;
        })
        // Change format when leaving input
        $('#date-range-picker-start-mobile').on('blur', function(){
            if($(this).val()) {
                $murfm.data('daterangepicker').startDate = Site.ParseValidDate($(this).val());
                $(this).val($murfm.data('daterangepicker').startDate.format($murfm.data('daterangepicker').locale.format))
            }
            $murfm.data('daterangepicker').hide();
        })
        $('#date-range-picker-end-mobile').on('blur', function(){
            if($(this).val()) {
                $murfm.data('daterangepicker').endDate = Site.ParseValidDate($(this).val());
                $(this).val($murf.data('daterangepicker').endDate.format($murfm.data('daterangepicker').locale.format));
            }
            $murfm.data('daterangepicker').hide();
        })
    },
    datepickerMulti:function() {
        // =============================================================================
        // Multi trip date picker
        // =============================================================================
        $multical = $('#date-range-picker-multi').daterangepicker({
            autoApply: true,
            autoUpdateInput: false,
            singleDatePicker: true,
            locale: {
                format: 'DD MMM YYYY'
            },
            minDate: moment(),
            maxDate: moment().add(1, 'y'),
        });
        $('#date-range-picker-multi').on('startDateChosenMulti.daterangepicker',function(ev, picker){
            var startDate = picker.startDate.clone();
            $(this).val(startDate.format($multical.data('daterangepicker').locale.format));
            $validator.element("#date-range-picker-multi");
            $('#date-range-picker-multi-vertical').val(startDate.format($multical_vert.data('daterangepicker').locale.format));
        })
        $('#date-range-picker-multi').on('focus',function(){
            $(this).attr('placeholder','DD/MM/YYYY')
            if($(this).val()) {
                $(this).val($multical.data('daterangepicker').startDate.format('DD/MM/YYYY'))
            }
            $(".daterangepicker").toggleClass('rightMonth',false)
            $multical.data('daterangepicker').activeCalendar = 3;
        })
        $('#date-range-picker-multi').on('blur',function(){
            if($(this).val()) {
                $multical.data('daterangepicker').startDate = Site.ParseValidDate($(this).val());
                $(this).val($multical.data('daterangepicker').startDate.format($multical.data('daterangepicker').locale.format));
            }
        })
    },
    datepickerMultiVertical:function() {
        // =============================================================================
        // Multi (Vertical) trip date picker
        // =============================================================================
        $multical_vert = $('#date-range-picker-multi-vertical').daterangepicker({
            autoApply: true,
            autoUpdateInput: false,
            linkedCalendars: false,
            singleDatePicker: true,
            locale: {
                format: 'DD MMM YYYY'
            },
            minDate: moment(),
            maxDate: moment().add(1, 'y'),
        });
        $('#date-range-picker-multi-vertical').on('startDateChosenMulti.daterangepicker',function(ev, picker){
            var startDate = picker.startDate.clone();
            $(this).val(startDate.format($multical_vert.data('daterangepicker').locale.format));
            $validator.element("#date-range-picker-multi-vertical");
            $('#date-range-picker-multi').val(startDate.format($multical.data('daterangepicker').locale.format));
        })
        $('#date-range-picker-multi-vertical').on('focus',function(){
            $(this).attr('placeholder','DD/MM/YYYY')
            if($(this).val()) {
                $(this).val($multical_vert.data('daterangepicker').startDate.format('DD/MM/YYYY'))
            }
            //$multical_vert.data('daterangepicker').updateView();
            $multical_vert.data('daterangepicker').activeCalendar = 3;
        })
        $('#date-range-picker-multi-vertical').on('blur',function(){
            if($(this).val()) {
                $multical_vert.data('daterangepicker').startDate = Site.ParseValidDate($(this).val());
                $(this).val($multical_vert.data('daterangepicker').startDate.format($multical_vert.data('daterangepicker').locale.format));
                //$multical_vert.data('daterangepicker').hide();
            }
            //$validator.element("#date-range-picker-multi-vertical");
        })
        $multicalmob = $('.toucherMulti').daterangepicker({
            autoApply: true,
            autoUpdateInput: false,
            linkedCalendars: false,
            singleDatePicker: true,
            locale: {
                format: 'DD MMM YYYY'
            },
            minDate: moment(),
            maxDate: moment().add(1, 'y'),
        });
        $('.toucherMulti').on('startDateChosenMulti.daterangepicker',function(ev, picker){
            var startDate = picker.startDate.clone();
            $('#date-range-picker-multi-vertical').val(startDate.format($multicalmob.data('daterangepicker').locale.format));
            $validator.element("#date-range-picker-multi-vertical");
        })
        $('.toucherMulti').on('click',function(){
            $('html, body').animate({
                scrollTop: $(".second").offset().top
            }, 800);
            if($('#date-range-picker-multi-vertical').val()) {
                $('#date-range-picker-multi-vertical').val($multicalmob.data('daterangepicker').startDate.locale.format)
            } else {
                $('#date-range-picker-multi-vertical').attr('placeholder','DD/MM/YYYY')
            }
            //$multical.data('daterangepicker').updateView();
            $multicalmob.data('daterangepicker').activeCalendar = 3;
        })
    },
    validationRules:function() {
        // initialise validation script
        $validator = $("#quote-form").validate({
            focusInvalid: false,
            rules: {
                'select-countries': {
                    required: true,
                },
                'date-range-picker-start': {
                    required: true,
                },
                'date-range-picker-end': {
                    required: true,
                },
                'date-range-picker-start-mobile': {
                    required: true,
                },
                'date-range-picker-end-mobile': {
                    required: true,
                },
                'date-range-picker-multi': {
                    required: true,
                },
                'date-range-picker-multi-vertical': {
                    required: true,
                },
                'adult-ages': {
                    required: true,
                    entryLimitAdult: true,
                },
                'child-ages': {
                    entryLimitChild: true,
                },
                'agree-disclaimer': {
                    required: true,
                }
            },
            messages: {
                'select-countries': {
                    required: "Please enter a Country",
                },
                'date-range-picker-start': {
                    required: "Please select a Depart date",
                },
                'date-range-picker-end': {
                    required: "Please select a Return date",
                },
                'date-range-picker-start-mobile': {
                    required: "Please select a Depart date",
                },
                'date-range-picker-end-mobile': {
                    required: "Please select a Return date",
                },
                'date-range-picker-multi': {
                    required: "Please select a cover Start date",
                },
                'date-range-picker-multi-vertical': {
                    required: "Please select a cover Start date",
                },
                'adult-ages': {
                    required: "Please ensure an age from 0 to 120 is entered, we can provide a quote for a maximum of two adults.",
                    entryLimitAdult: "Please ensure an age from 0 to 120 is entered, we can provide a quote for a maximum of two adults.",
                },
                'child-ages': {
                    entryLimitChild: "A child must be under 25. Please update the entered age.",
                },
                'agree-disclaimer': {
                    required: "Please confirm you have read and understood the Product Disclosure Statement, Duty of Disclosure, Privacy Notice and Financial Services Guide.",
                }
            },
            errorPlacement: function (error, element) {
                switch (element.attr("name")) {
                    case 'select-countries':
                        error.insertAfter($(".select2"));
                        break;
                    case 'agree-disclaimer':
                        error.insertAfter($(".quote-note"));
                        break;
                    default:
                        error.insertAfter(element);
                }
            },

            highlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
                } else if (element.id === "agreeDisclaimer") {
                    $('.quote-note').addClass("error");
                } else {
                    $( element ).addClass( errorClass ).removeClass( validClass );
                }
            },

            unhighlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
                } else if (element.id === "agreeDisclaimer") {
                    $('.quote-note').removeClass("error");
                } else {
                    $( element ).removeClass( errorClass ).addClass( validClass );
                }
            },

            submitHandler: function(form) {
                $("#submit-btn").attr("disabled", true).parent().addClass('loading'); // set button disabled and loading
                var countries = '';
                var post_variables = $("#quote-form").serializeArray();
                $.each( post_variables, function( index, value ){
                    if (value.name == 'select-countries') {
                        countries += value.value + ', ';
                    }
                    if (value.name == 'rdo_TO_single') {
                        $('input[name="trip_type"]').val('single');
                    }
                    if (value.name == 'rdo_TO_multi') {
                        $('input[name="trip_type"]').val('multi');
                    }
                    if (value.name == 'date-range-picker-start' || value.name == 'date-range-picker-start-mobile' || value.name == 'date-range-picker-multi' || value.name == 'date-range-picker-multi-vertical') {
                        $('input[name="start_date"]').val(value.value);
                    }
                    if (value.name == 'date-range-picker-end' || value.name == 'date-range-picker-end-mobile') {
                        $('input[name="end_date"]').val(value.value);
                    }
                    if (value.name == 'adult-ages') {
                        $('input[name="adult_ages"]').val(value.value);
                    }
                    if (value.name == 'child-ages') {
                        $('input[name="child_ages"]').val(value.value);
                    }
                    if (value.name == 'agree-disclaimer') {
                        $('input[name="agreeDisclaimer"]').val(value.value);
                    }
                });
                $('input[name="countries"]').val(countries.trim().replace(/^,|,$/g,''));
                $('#quote-form input, #quote-form select').attr("disabled", true);
                $('#quote-form .travel-options-disable').show();
                $('#quote-form .select2-selection--multiple').addClass("disabled");
                $('#quote-form .travel-dates .toucherStart').addClass("disabled");
                $('#quote-form .travel-dates .toucherEnd').addClass("disabled");
                $('#quote-form .travel-dates .toucherMulti').addClass("disabled");
                $('#quote-form input[name="countries"]').attr("disabled", false);
                $('#quote-form input[name="trip_type"]').attr("disabled", false);
                $('#quote-form input[name="start_date"]').attr("disabled", false);
                $('#quote-form input[name="end_date"]').attr("disabled", false);
                $('#quote-form input[name="adult_ages"]').attr("disabled", false);
                $('#quote-form input[name="child_ages"]').attr("disabled", false);
                $('#quote-form input[name="agreeDisclaimer"]').attr("disabled", false);
                $('#quote-form input[name="id"]').attr("disabled", false);
                $('#quote-form input[name="accessCode"]').attr("disabled", false);
                $('#quote-form input[name="affid"]').attr("disabled", false);
                var jsonText = JSON.stringify(Site.getQuoteDetailsFromForm());
                $.ajax({
                    type: "POST",
                    url: "/aalaus/aalaus.nsf/posttravelquotedata",
                    data: jsonText,
                    contentType: "application/json; charset=utf-8",
                    timeout: 60000
                })
                    .done(Site.callbackSubmission)
                    .fail(Site.processFailure);
            }
        });
        $.validator.addMethod("entryLimitAdult", function(value, element) {
            var $cleansedAges = Site.CleanseAgeString($("#adult-ages").val());
            // loop through each age in array and check they are all under max age
            var $flag = true;
            $.each( $cleansedAges, function( index, value ){
                if (value > Site.MaxAdultAge) {
                    $flag = false;
                }
            });
            // check array of ages, check validation conditions and generate any errors
            if ($cleansedAges.length > 0) {
                if ($cleansedAges.length >= Site.MinAdults && $cleansedAges.length <= Site.MaxAdults) {
                    if ($flag == false) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
        $.validator.addMethod("entryLimitChild", function(value, element) {
            var $cleansedAges = Site.CleanseAgeString($("#child-ages").val());
            // loop through each age in array and check they are all under max age
            var $flag = true;
            $.each( $cleansedAges, function( index, value ){
                if (value > Site.MaxDependantAge) {
                    $flag = false;
                }
            });
            // check array of ages, check validation conditions and generate any errors
            if ($cleansedAges.length > 0) {
                if ($cleansedAges.length >= 1 && $cleansedAges.length <= 10) {
                    if ($flag == false) {
                        return false
                    } else {
                        return true;
                    }
                } else {
                    return false
                }
            } else {
                return true;
            }
        });
    },
    scroll:function() {
    }, //end scroll function
    resize:function() {
        setTimeout(function(){
            $w = $( document ).width() - 80;
            $('.daterangepicker').css('width', $w);
            $('.breakpoint-992 .daterangepicker').css('width', 'auto');
            $('.daterangepicker').hide();
        }, 400);
    }, //end resize function
    // ************ Start Allianz Integration Code ************
    disableButton: function() {
        $("#submit-btn").attr("disabled", true).parent().addClass('loading'); // set button disabled and loading
        $('form > input:hidden').attr("disabled", true); // set all hidden fields to disabled so they are not submitted
    }, // end disableButton function
    enableButton: function() {
        $("#submit-btn").attr("disabled", false).parent().removeClass('loading');
    }, // end enableButton function
    callbackSubmission: function( data, textStatus, jqXHR ) {
        // write access code and id to form and submit it to AGA
        if (data.Id && data.AccessCode) {
            $('#id').val( data.Id );
            $('#accessCode').val( data.AccessCode );
            $('form[name="quote-form"]').unbind().submit();                         // http://stackoverflow.com/questions/9812876/infinite-loop-of-form-submit-using-jquery-event
        } else {
            Site.actionResponseCode( data.responseCode );
        }
    }, // end callbackSubmission function
    processFailure: function() {
        if( textStatus === "timeout" ) {
            Site.actionResponseCode( "500" );
        } else {
            Site.actionResponseCode( "400" );
        }
    }, // end processFailure function
    actionResponseCode: function ( responseCode ) {
        Site.enableButton();
        if (responseCode) {
            //redirect to outage page, based on either a error code 400 or error code 500
            if(responseCode=="400" || responseCode=="401" || responseCode=="404" || responseCode=="405" || responseCode=="422") {
                window.location.href="/system/travel-quote-error";
            } else {
                window.location.href="/system/travel-quote-unavailable";
            }
        }
    }, // end actionResponseCode function
    getQuoteDetailsFromForm: function() {
        // A. Destinations
        var destinations = [];
        var selectedCountries = $('#select-countries').val();
        var selectedCountriesLength = selectedCountries.length;
        var allCountriesLength = $countries.length;
        for( var j = 0; j < allCountriesLength; j++) {
            for (var i = 0; i < selectedCountriesLength; i++) {
                if ( '' + $countries[j].id  == selectedCountries[i]) {
                    destinations.push( {"RegionCode": $countries[j].regionCode, "CountryCode": $countries[j].countryCode, "LocationCode": $countries[j].locationCode});
                }
            }
        }
        // B. Travellers
        var travellers = [];
        if($.trim($('#quote-form input[name="adult_ages"]').val()).length > 0) {
            var adultAges = $('#quote-form input[name="adult_ages"]').val().split(", ");
            var adultAgesLength = adultAges.length;
            for (var i = 0; i < adultAgesLength; i++) {
                travellers.push( {"Type": "ADULT", "DateOfBirth": (((new Date).getFullYear() - parseInt(adultAges[i])) + "-01-01") });
            }
        }

        if($.trim($('#quote-form input[name="child_ages"]').val()).length > 0) {
            var childAges = $('#quote-form input[name="child_ages"]').val().split(", ");
            var childAgesLength = childAges.length;
            for (var i = 0; i < childAgesLength; i++) {
                travellers.push( {"Type": "CHILD", "DateOfBirth": (((new Date).getFullYear() - parseInt(childAges[i])) + "-01-01") });
            }
        }
        // C. Dates
        // dates are stored in $murf (single trip) or $multical (multi trip)
        var coverStartDate;
        var coverEndDate;
        if ( $('#quote-form input[name="trip_type"]').val() == "multi" ) {
            coverStartDate = $multical.data('daterangepicker').startDate.format('YYYY-MM-DD');
            coverEndDate = $multical.data('daterangepicker').endDate.format('YYYY-MM-DD');
        } else {
            coverStartDate = $murf.data('daterangepicker').startDate.format('YYYY-MM-DD');
            coverEndDate = $murf.data('daterangepicker').endDate.format('YYYY-MM-DD');
        }
        // D. Trip type
        var tripType = "SGL";
        if ( $('#quote-form input[name="trip_type"]').val() == "multi" ) {
            tripType = "MULTI";
        }
        // return object
        return {
            "ClientCode": "ALIAU",
            "QuoteType": tripType,
            "CoverStartDate": coverStartDate,
            "CoverEndDate": coverEndDate,
            "Destinations": destinations,
            "Travellers": travellers,
            "PromoCode": $("#PromoCode").val()
        }
    } // end getQuoteDetailsFromForm
};
