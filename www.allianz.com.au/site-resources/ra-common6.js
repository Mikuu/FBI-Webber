
function checkIfPreview() {
    var url = location.href;
    url = url.toLowerCase();
    if (url.match("preview") == "preview") {
        return true
    } else {
        return false
    }
}
function loadPage() {
    if (checkIfPreview()) {
        loadMenu("/aalaus/aalaus.nsf/resources/navpreview.xml")
    } else {
        loadMenu("/aalaus/aalaus.nsf/resources/navpublish.xml")
    }
}
function go() {
    window.location = document.getElementById("productmenu").value
}
function Redirect(sRedirectPage) {
    var reg = /\s+/;
    sRedirectPage = sRedirectPage.replace(reg, "+");
    if (sRedirectPage.toLowerCase() == "/travel-insurance") {
        window.location = "https://www.allianz.com.au/travel-insurance"
    } else {
        window.location = sRedirectPage
    }
}
function goToURL(sURL) {
    window.location = sURL
}
function openCalc(calcName) {
    var width = 700;
    var height = 550;
    var x = Math.round((screen.width - width) / 2);
    var y = Math.round((screen.height - height) / 4);
    if (calcName == "building") {
        url = "http://www.allianz.com.au/redirect/allianz-homecalc-building"
    } else {
        url = "http://www.allianz.com.au/redirect/allianz-homecalc-contents"
    }
    window.open(url, "", "menu=no,width=" + width + ",height=" + height + ",left=" + x + ",top=" + y + ",scrollbars=yes")
}
function printPage() {
    window.open(location.href + "?var=Print", "Print", "width=615, height=800, scrollbars=1")
}
var min = 8;
var max = 18;
function increaseFontSize() {
    var p = document.getElementsByTagName("p");
    var s = 12;
    for (i = 0; i < p.length; i++) {
        if (p[i].style.fontSize) {
            s = parseInt(p[i].style.fontSize.replace("px", ""), 10)
        } else {
            s = 12
        }
        if (s != max) {
            s += 1
        }
        p[i].style.fontSize = s + "px"
    }
}
function decreaseFontSize() {
    var p = document.getElementsByTagName("p");
    var s = 12;
    for (i = 0; i < p.length; i++) {
        if (p[i].style.fontSize) {
            s = parseInt(p[i].style.fontSize.replace("px", ""), 10)
        } else {
            s = 12
        }
        if (s != min) {
            s -= 1
        }
        p[i].style.fontSize = s + "px"
    }
}
function openConditions() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=ConditionsApply-Common", "", "width=500,height=780,menu=no,scrollbars=yes");
    return false
}
function openCarConditions() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=ConditionsApply-Car", "", "width=500,height=780,menu=no,scrollbars=yes");
    return false
}
function openCTPConditions() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=CTP+Conditions", "", "width=490,height=460,menu=no");
    return false
}
function openCTPQLDConditions() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=CTP+QLD+Conditions", "", "width=900,height=580,menu=no");
    return false
}
function openSBDConditions() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=SBD+Conditions", "", "width=500,height=375,menu=no");
    return false
}
function openFindOutMore() {
    window.open("http://allianz.acrobat.com/newallianzwebsite/", "", "width=800,height=600,");
    return false
}
function openLifeInsuranceDisclaimer() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=Life+Insurance+Disclaimer", "", "width=250,height=195,menu=no");
    return false
}
function openTravelInsuranceConditions() {
    window.open("/aalaus/aalaus.nsf/File?Open&v=docs&s=ConditionsApply-Travel", "", "width=500,height=360,menu=no");
    return false
}
function openVirtualAssistant(siteContext, startContext) {
    var siteContextParam = "";
    var startContextParam = "";
    var URL = "http://askallie.allianz.com.au/bot.htm?isJSEnabled=1";
    if (siteContext !== "") {
        siteContextParam = "&SiteContext=" + siteContext
    }
    if (startContext !== "") {
        startContextParam = "&StartContext=" + startContext
    }
    var VA = window.open(URL + siteContextParam + startContextParam, "VirtualAssistant", "width=580,height=500");
    if (VA) {
        return false
    }
}
function openVirtualAssistantByRedirect(shortKey) {
    var siteContextParam = "";
    var startContextParam = "";
    var URL = "/redirect/" + shortKey;
    var VA = window.open(URL + siteContextParam + startContextParam, "VirtualAssistant", "width=580,height=500");
    if (VA) {
        return false
    }
}
function applyRedirectWithTracking(destinationUrl, targetWindow, isOutage) {
	var finalUrl = destinationUrl;
	if (isOutage != "true") {
		try {
			if (typeof ga != "undefined") {
				var linkerParam='';
				var tracker = ga.getAll()[0]; // get first GA Tracker
	
				linkerParam = tracker.get('linkerParam'); // get linkerParam from Tracker
				if (finalUrl.indexOf('?') > -1 ) {
					// if ? exists - add a param
					finalUrl = finalUrl + "&";
				} else {
					// no ? in final url - add it
					finalUrl = finalUrl + "?";
				}
				finalUrl = finalUrl + linkerParam;
			} else {
				// No GA - can't append tracker
			}
		finalUrl = applyRedirectWithTracking_IBM_DA(finalUrl);
		// check if there is a '&' in the URL, but no '?'
		if (finalUrl.length > 0 ) {
			var iPosQ = finalUrl.indexOf('?');
			var iPosA = finalUrl.indexOf('&');
			if ((iPosQ == -1) && (iPosA > 0)) {
				// need to swap the first '&' for a '?'
				finalUrl = finalUrl.substr(0,iPosA) + '?' + finalUrl.substr(iPosA+1, finalUrl.length - iPosA);
			}
		}
	  
		} catch (e) {
			// console.log('ERROR :' +e.message);
		}
	}
    if (targetWindow == null || targetWindow.closed) {
        targetWindow.location = finalUrl;
    } else {
        targetWindow.location = finalUrl;
        targetWindow.focus()
    }
    return false;
}
// new function 19/1 to support IBM DA Cookie Migration
function getCookieString(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift()
}
// new function 19/1 to support IBM DA Cookie Migration
function applyRedirectWithTracking_IBM_DA(redirectDestinationUrl) {
    var sCoreID6Cookie = getCookieString('CoreID6');
    if (typeof sCoreID6Cookie !== "undefined") {
        var iPos = sCoreID6Cookie.indexOf('&');
        if (iPos > -1) {
            var sUid = sCoreID6Cookie.substring(0, iPos);
            iPos = sCoreID6Cookie.indexOf('&ci=');
            if (iPos > -1) {
                var sId = sCoreID6Cookie.substring(iPos + 4);
                iPos = sId.indexOf('|');
                if (iPos > -1) {
                    sId = sId.substring(0, iPos);
                    sId_cloginCookie = getCookieString(sId + '_clogin');
                    if (typeof sId_cloginCookie !== "undefined") {
                        iPos = sId_cloginCookie.indexOf('l=');
                        if (iPos > -1) {
                            sLValue = sId_cloginCookie.substring(iPos + 2);
                            iPos = sLValue.indexOf('&');
                            if (iPos > -1) {
					sLValue = sLValue.substring(0, iPos);
					var sParams = '&cm_mc_uid=' + sUid + '&cm_mc_sid_' + sId + '=' + sLValue;
					redirectDestinationUrl = redirectDestinationUrl + sParams;
                            }
                        }
                    }
                }
            }
        }
    }
    return redirectDestinationUrl;
}
function getRedirectDestinationAndApply(linkObj, appWindow, redirectShortLink) {
    var sRetrievalAgentUrl = "/internet/redirect.nsf/r-json?openagent&URL=" + redirectShortLink;
    jQuery.ajax({
        url: sRetrievalAgentUrl,
        async: true,
        dataType: "json",
        context: document.body,
        success: function(responseData) {
            redirectDestinationUrl = responseData.targetUrl.replace(/"/g, "");
            isOutage = responseData.isOutage;
            applyRedirectWithTracking(redirectDestinationUrl, appWindow, isOutage);
        },
        error: function(msg) {
            alert("error: " + msg.statusText)
        }
    })
}
function openAppWindow(name, shortLink) {
    if (shortLink.substr(0, 11) == "motor-quote") {
        if (DetectUagent("ipad") || DetectUagent("android")) {
            shortLink = "motor-quote-mobile"
        }
    }
    var url = "";
    var width = 1024;
    var height = 700;
    var replaceOption = false;
    if (typeof openAppWindow.winRefs == "undefined") {
        openAppWindow.winRefs = {}
    }
    if (typeof openAppWindow.winRefs[name] == "undefined" || openAppWindow.winRefs[name].closed) {
        if (shortLink.indexOf("/") > 0) {
            url = shortLink
        } else {
            url = "/redirect/" + shortLink;
            var sAllianzDomain = document.domain;
            var sEinsureDomain = "https://www.einsure.com.au/wb";
            var sRedirectDomain = "";
            if (sAllianzDomain.toLowerCase().indexOf(".uat.") > -1) {
                sEinsureDomain = "https://wwwuat.einsure.com.au/wb"
            }
            if (sAllianzDomain.toLowerCase().indexOf(".dev.") > -1) {
                sEinsureDomain = "https://wwwasm.einsure.com.au/wb"
            }
            var redirectExceptionList = new Array();
            redirectExceptionList[0] = "home_quote";
            redirectExceptionList[1] = "home-quote";
            redirectExceptionList[2] = "landlord-quote";
            redirectExceptionList[3] = "motor-quote";
            redirectExceptionList[4] = "retrieve-quote";
            for (var i = 0; i < redirectExceptionList.length; i++) {
                if (url.toLowerCase().indexOf(redirectExceptionList[i].toLowerCase()) > -1) {
                    sRedirectDomain = sEinsureDomain
                }
            }
            url = sRedirectDomain + url
        }
        if (height < 0) {
            var h = Math.round(screen.height - (screen.height * 0.15))
        } else {
            var h = height
        }
        var x = Math.round((screen.width - width) / 2);
        var y = Math.round((screen.height - h) / 4);
        var winOptions = "width=" + width + ",height=" + h + ",top=" + y + ",left=" + x + ",scrollbars=yes,menu=no,toolbar=no,status=yes,resizable=yes";
        if (window.location.toString().indexOf("/wb/") > 0) {
            url = "/wb" + url
        }
        if (!DetectUagent("ipad") && !DetectUagent("iphone")) {
            openAppWindow.winRefs[name] = window.open("", name, winOptions, replaceOption);
            self.focus();
            getRedirectDestinationAndApply(null, openAppWindow.winRefs[name], shortLink)
        } else {
            getRedirectDestinationAndApply(null, self, shortLink)
        }
    } else {
        openAppWindow.winRefs[name].focus()
    }
    return false
}
function popapp(name, url) {
    var h = screen.height - (screen.height * 0.1);
    var x = (screen.width / 2) - 395;
    var y = 0;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var q = window.open(url, name, "width=790,height=" + h + ",top=" + y + ",left=" + x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function popapp_custwidth(name, url, width) {
    var h = screen.height - (screen.height * 0.1);
    var x = (screen.width - width) / 2;
    var y = (screen.height - h) / 2;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var q = window.open(url, name, "width=" + width + ",height=" + h + ",top=" + y + ",left=" + x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function popapp_maxheight(name, url, width, maxheight) {
    var h = screen.height - (screen.height * 0.1);
    if (h > maxheight) {
        h = maxheight
    }
    var x = (screen.width - width) / 2;
    var y = (screen.height - h) / 2;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var q = window.open(url, name, "width=" + width + ",height=" + h + ",top=" + y + ",left=" + x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function popapp_life(name, url) {
    var life_h = screen.height - (screen.height * 0.1);
    var life_x = (screen.width / 2) - 395;
    var life_y = 0;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var life_q = window.open(url, name, "width=860,height=" + life_h + ",top=" + life_y + ",left=" + life_x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function popapp_home(name, url) {
    var home_h = screen.height - (screen.height * 0.1);
    var home_x = (screen.width / 2) - 395;
    var home_y = 0;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var life_q = window.open(url, name, "width=870,height=" + home_h + ",top=" + home_y + ",left=" + home_x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function popapp_payment(name, url) {
    var pay_h = screen.height - (screen.height * 0.1);
    var pay_x = (screen.width / 2) - 395;
    var pay_y = 0;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var pay_q = window.open(url, name, "width=860,height=" + pay_h + ",top=" + pay_y + ",left=" + pay_x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function popapp_payment2(name, url) {
    var pay_h = screen.height - (screen.height * 0.3);
    var pay_x = (screen.width / 2) - 395;
    var pay_y = 0;
    if (window.location.toString().indexOf("/wb/") > 0) {
        url = "/wb" + url
    }
    var pay_q = window.open(url, name, "width=900,height=" + pay_h + ",top=" + pay_y + ",left=" + pay_x + ",scrollbars=yes,menu=no,toolbar=no,status=yes");
    return false
}
function openEmailFriend() {
    var sPathname = escape(window.location.pathname);
    window.open("/s/email_friend?open&url=" + sPathname, "", "width=440,height=490,menu=no")
}
function getVariableContent(sItemKey) {
    $.ajax({
        url: "/aalaus/aalaus.nsf/getVariableContent?openAgent&key=" + escape(sItemKey),
        async: false,
        dataType: "html",
        success: function(sVariableContent) {
            displayVariableContent(sVariableContent)
        },
        error: function(msg) {
            alert("Error: " + msg)
        }
    })
}
function displayVariableContent(sVariableContent) {
    document.write(sVariableContent)
}
function getQueryParam(param) {
    var startPos = 0;
    var endPos = 0;
    var queryString = location.href;
    if (queryString) {
        startPos = queryString.indexOf(param + "=");
        if (queryString.indexOf("&", startPos) > -1) {
            endPos = queryString.indexOf("&", startPos)
        } else {
            endPos = queryString.length
        }
        if (queryString.length > 1 && startPos > -1) {
            return queryString.substring(queryString.indexOf("=", startPos) + 1, endPos)
        }
    }
    return ""
}
function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "")
}
function getCookie(check_name) {
    var a_all_cookies = document.cookie.split(";");
    var a_temp_cookie = "";
    var cookie_name = "";
    var cookie_value = "";
    var b_cookie_found = false;
    for (i = 0; i < a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split("=");
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, "");
        if (cookie_name == check_name) {
            b_cookie_found = true;
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ""))
            }
            return cookie_value
        }
        a_temp_cookie = null;
        cookie_name = ""
    }
    if (!b_cookie_found) {
        return null
    }
}
function linkTracker(currentObj, linkType, ignore1, ignore2) {
    if (typeof sitracker != "undefined") {
        switch (linkType) {
            case "untagged":
                sitracker.trackLinkToUntagged(currentObj);
                break;
            case "external":
                sitracker.trackExternalLink(currentObj);
                break;
            case "migrate":
                sitracker.migrateCookie(currentObj);
                break;
            default:
                sitracker.trackLink(currentObj);
                break
        }
    }
    return true
}
function toggle_faq(id) {
    var e = document.getElementById(id);
    if (e.style.display == "block") {
        e.style.display = "none"
    } else {
        e.style.display = "block"
    }
}
var sAllianzDomain = document.domain;
var mobileURL = "http://m.allianz.com.au";
if (sAllianzDomain.toLowerCase().indexOf(".uat.") > -1) {
    mobileURL = "http://m.allianz.uat.corp.aal.au"
}
if (sAllianzDomain.toLowerCase().indexOf(".dev.") > -1) {
    mobileURL = "http://m.allianz.dev.corp.aal.au"
}
function GetQueryValue(ji) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1]
        }
    }
}
function IsSmartphone() {
    if (DetectUagent("android")) {
        return true
    } else {
        if (DetectUagent("ipad")) {
            return false
        } else {
            if (DetectUagent("iphone")) {
                return true
            } else {
                if (DetectUagent("ipod")) {
                    return true
                } else {
                    if (DetectUagent("symbian")) {
                        return true
                    } else {
                        if (DetectUagent("symbianos")) {
                            return true
                        } else {
                            if (DetectUagent("windows ce")) {
                                return true
                            } else {
                                if (DetectUagent("blackberry")) {
                                    return true
                                } else {
                                    if (DetectUagent("opera mini")) {
                                        return true
                                    } else {
                                        if (DetectUagent("mobile")) {
                                            return true
                                        } else {
                                            if (DetectUagent("palm")) {
                                                return true
                                            } else {
                                                if (DetectUagent("windows phone")) {
                                                    return true
                                                } else {
                                                    if (DetectUagent("portable")) {
                                                        return true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}
function DetectUagent(name) {
    var uagent = navigator.userAgent.toLowerCase();
    if (uagent.search(name) > -1) {
        return true
    } else {
        return false
    }
}
function RedirectSmartphone(url) {
    if (url && url.length > 0 && IsSmartphone()) {
        window.location = url
    }
}
var c_available = 1;
var c_unavailable = 0;
var debug = false;
var data = [];
var xmlobj = null;
var xhr = [];
var xhrRequestAvailability = [];
var xhrRequestTarget = [];
xhrRequestAvailability[0] = c_available;
function displayData(dataText, xmlWriteTarget) {
    if (document.getElementById(xmlWriteTarget)) {
        document.getElementById(xmlWriteTarget).innerHTML = dataText
    }
}
function stateChecker(xhrsend) {
    if (xhr[xhrsend].readyState == 4) {
        if (xhr[xhrsend].status == 200) {
            displayData(xhr[xhrsend].responseText, xhrRequestTarget[xhrsend])
        } else {
            displayData("We could not find a match for your search criteria. (" + xhr[xhrsend].statusText + ")<br /><br />", xhrRequestTarget[xhrsend])
        }
    }
}
function sendRequest(doc, targetDivId) {
    var xhrsend = xhrRequestAvailability.length;
    for (var i = 0; i < xhrRequestAvailability.length; i++) {
        if (xhrRequestAvailability[i] == c_available) {
            xhrRequestAvailability[i] = c_unavailable;
            xhrsend = i;
            break
        }
    }
    xhrRequestAvailability[xhrsend] = 0;
    xhrRequestTarget[xhrsend] = targetDivId;
    try {
        xhr[xhrsend] = new XMLHttpRequest()
    } catch (err1) {
        try {
            xhr[xhrsend] = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (err2) {
            return false
        }
    }
    xhr[xhrsend].onreadystatechange = function() {
        stateChecker(xhrsend)
    };
    xhr[xhrsend].open("GET", doc, true);
    try {
        xhr[xhrsend].send(null)
    } catch (e) {
        alert("error")
    }
}
function initXMLRequest(xmlLocation, divId) {
    if (document.getElementById && document.getElementsByTagName && document.createElement) {
        sendRequest(xmlLocation, divId)
    }
}
function initOnloadXMLRequest(origLoad, xmlUrl) {
    origLoad();
    initXMLRequest(xmlUrl)
}
$(document).ready(function() {
    InitialiseSubNavigation()
});
function InitialiseSubNavigation() {
    $(".SubNavigation > ul > li").has("ul").children("a").addClass("HasNextLevel");
    $(".SubNavigation > ul > li > a[href*='#']").click(function() {
        $(this).parent().children("ul").slideToggle(1000);
        $(this).toggleClass("HasNextLevelSelected");
        return false
    })
}
function InitialiseSearch() {
    alert("Init Search")
}
function Search() {
    var SearchAddress = "http://www.allianz.com.au/allianz/Search.html?Open=&q=";
    var SearchTerm = $("#TextSearch").val().trim().replace(/ /g, "+");
    window.location = SearchAddress + SearchTerm
}
jQuery(function($) {
    if (isTablet()) {
        $("a[href='/redirect/motor-quote']").each(function() {
            $(this).attr("href", "/redirect/motor-quote-mobile");
            $(this).prop("onclick", null);
            $(this).click(function() {
                _gaq.push(["_trackEvent", "Content", "Get a Quote", "Mobile Car Insurance"]);
                return openAppWindow("", "motor-quote-mobile")
            })
        })
    }
    if (isTablet()) {
        $("a[href='/redirect/travel-quote-mobile']").each(function() {
            $(this).attr("href", "/redirect/travel-quote")
        })
    }
});
function isTablet() {
    if (is_iPad() || isAndroidTablet()) {
        return true
    } else {
        return false
    }
}
function isAndroidTablet() {
    if (DetectUagent("android") && !DetectUagent("mobile")) {
        return true
    } else {
        return false
    }
}
function is_iPad() {
    if (DetectUagent("ipad")) {
        return true
    } else {
        return false
    }
};
// convert home-quote to home-quote-mobile for iPads and other select tablets
if (isTablet()) {
    $("a[href='/redirect/home-quote']").each(function() {
        $(this).attr('href', '/redirect/home-quote-mobile'); // switch the quote link to home quote mobile
        $(this).prop("onclick", null); //remove the click action - http://api.jquery.com/removeAttr/
        //-- add the new click action for the quote link
        $(this).click(function() {
            _gaq.push(['_trackEvent', 'Content', 'Get a Quote', 'Home Insurance']);
            return openAppWindow('', 'home-quote-mobile');
        });
    });
}
// create Datalayer object
if (typeof allianzDL == "undefined") { var allianzDL = new Object;}
jQuery(function($) {
    //enable "top of page" links
    $(".tp").click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 0);
    });
	var sPageView = $("link[rel='canonical']").attr("href");
	if (typeof sPageView != "undefined") {
		sPageView= sPageView.replace(/^.*\/\/[^\/]+/, '');
	} else {
		sPageView = '';
	}
	//changed on 11/05/2016 - to make a pathname rather than full url. Also handles home page by checking for '/' and returning the full href
	//	if (typeof sPageView == "undefined" || sPageView == '') {sPageView = location.href}
	if (typeof sPageView == "undefined" || sPageView == '') {sPageView = window.location.pathname}
	else if (sPageView =='/') {sPageView = ''}
	allianzDL.pageView = sPageView;
});
