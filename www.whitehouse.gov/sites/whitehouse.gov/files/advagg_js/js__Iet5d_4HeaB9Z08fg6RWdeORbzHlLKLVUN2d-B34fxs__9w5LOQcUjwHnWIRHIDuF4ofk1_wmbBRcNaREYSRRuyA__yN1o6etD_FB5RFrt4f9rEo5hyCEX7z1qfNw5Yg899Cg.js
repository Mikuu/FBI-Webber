/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/navbar/js/debounce.js. */
var Drupal=Drupal||{};Drupal.debounce=function(callback,wait){"use strict";var timeout,result;return function(){var context=this,args=arguments,later=function(){timeout=null;result=callback.apply(context,args)};window.clearTimeout(timeout);timeout=window.setTimeout(later,wait);return result}};
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/navbar/js/debounce.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/navbar/js/displace.js. */
(function($,Drupal,debounce){"use strict";var offsets={top:0,right:0,bottom:0,left:0};Drupal.behaviors.drupalDisplace={attach:function(){if(parent.Drupal.overlay&&parent.Drupal.overlay.iframeWindow===window)return;if(this.displaceProcessed)return;this.displaceProcessed=true;$(window).bind('resize.drupalDisplace',debounce(displace,200))}}
function displace(broadcast){offsets=Drupal.displace.offsets=calculateOffsets();if(typeof broadcast==='undefined'||broadcast)$(document).trigger('drupalViewportOffsetChange',offsets);return offsets}
function calculateOffsets(){return{top:calculateOffset('top'),right:calculateOffset('right'),bottom:calculateOffset('bottom'),left:calculateOffset('left')}}
function calculateOffset(edge){var edgeOffset=0,displacingElements=document.querySelectorAll('[data-offset-'+edge+']');for(var i=0,n=displacingElements.length;i<n;i++){var el=displacingElements[i];if(el.style.display==='none')continue;var displacement=parseInt(el.getAttribute('data-offset-'+edge),10);if(isNaN(displacement))displacement=getRawOffset(el,edge);edgeOffset=Math.max(edgeOffset,displacement)};return edgeOffset}
function getRawOffset(el,edge){var $el=$(el),documentElement=document.documentElement,displacement=0,horizontal=(edge==='left'||edge==='right'),placement=$el.offset()[horizontal?'left':'top'];placement-=window['scroll'+(horizontal?'X':'Y')]||document.documentElement['scroll'+horizontal?'Left':'Top']||0;switch(edge){case'top':displacement=placement+$el.outerHeight();break;case'left':displacement=placement+$el.outerWidth();break;case'bottom':displacement=documentElement.clientHeight-placement;break;case'right':displacement=documentElement.clientWidth-placement;break;default:displacement=0};return displacement};Drupal.displace=displace;$.extend(Drupal.displace,{offsets:offsets,calculateOffset:calculateOffset})})(jQuery,Drupal,Drupal.debounce);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/navbar/js/displace.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/misc/ajax.js. */
(function($){Drupal.ajax=Drupal.ajax||{};Drupal.settings.urlIsAjaxTrusted=Drupal.settings.urlIsAjaxTrusted||{};Drupal.behaviors.AJAX={attach:function(context,settings){for(var base in settings.ajax)if(!$('#'+base+'.ajax-processed').length){var element_settings=settings.ajax[base];if(typeof element_settings.selector=='undefined')element_settings.selector='#'+base;$(element_settings.selector).each(function(){element_settings.element=this;Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)});$('#'+base).addClass('ajax-processed')};$('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function(){var element_settings={};element_settings.progress={type:'throbber'};if($(this).attr('href')){element_settings.url=$(this).attr('href');element_settings.event='click'};var base=$(this).attr('id');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)});$('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function(){var element_settings={};element_settings.url=$(this.form).attr('action');element_settings.setClick=true;element_settings.event='click';element_settings.progress={type:'throbber'};var base=$(this).attr('id');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)})}};Drupal.ajax=function(base,element,element_settings){var defaults={url:'system/ajax',event:'mousedown',keypress:true,selector:'#'+base,effect:'none',speed:'none',method:'replaceWith',progress:{type:'throbber',message:Drupal.t('Please wait...')},submit:{js:true}};$.extend(this,defaults,element_settings);this.element=element;this.element_settings=element_settings;this.url=element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g,'/ajax$1');if(Drupal.settings.urlIsAjaxTrusted[element_settings.url])Drupal.settings.urlIsAjaxTrusted[this.url]=true;this.wrapper='#'+element_settings.wrapper;if(this.element.form)this.form=$(this.element.form);var ajax=this;ajax.options={url:ajax.url,data:ajax.submit,beforeSerialize:function(element_settings,options){return ajax.beforeSerialize(element_settings,options)},beforeSubmit:function(form_values,element_settings,options){ajax.ajaxing=true;return ajax.beforeSubmit(form_values,element_settings,options)},beforeSend:function(xmlhttprequest,options){ajax.ajaxing=true;return ajax.beforeSend(xmlhttprequest,options)},success:function(response,status,xmlhttprequest){if(typeof response=='string')response=$.parseJSON(response);if(response!==null&&!Drupal.settings.urlIsAjaxTrusted[ajax.url])if(xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token')!=='1'){var customMessage=Drupal.t("The response failed verification so will not be processed.");return ajax.error(xmlhttprequest,ajax.url,customMessage)};return ajax.success(response,status)},complete:function(xmlhttprequest,status){ajax.ajaxing=false;if(status=='error'||status=='parsererror')return ajax.error(xmlhttprequest,ajax.url)},dataType:'json',type:'POST'};$(ajax.element).bind(element_settings.event,function(event){if(!Drupal.settings.urlIsAjaxTrusted[ajax.url]&&!Drupal.urlIsLocal(ajax.url))throw new Error(Drupal.t('The callback URL is not local and not trusted: !url',{'!url':ajax.url}));return ajax.eventResponse(this,event)});if(element_settings.keypress)$(ajax.element).keypress(function(event){return ajax.keypressResponse(this,event)});if(element_settings.prevent)$(ajax.element).bind(element_settings.prevent,false)};Drupal.ajax.prototype.keypressResponse=function(element,event){var ajax=this;if(event.which==13||(event.which==32&&element.type!='text'&&element.type!='textarea')){$(ajax.element_settings.element).trigger(ajax.element_settings.event);return false}};Drupal.ajax.prototype.eventResponse=function(element,event){var ajax=this;if(ajax.ajaxing)return false;try{if(ajax.form){if(ajax.setClick)element.form.clk=element;ajax.form.ajaxSubmit(ajax.options)}else{ajax.beforeSerialize(ajax.element,ajax.options);$.ajax(ajax.options)}}catch(e){ajax.ajaxing=false;alert("An error occurred while attempting to process "+ajax.options.url+": "+e.message)};if(typeof element.type!='undefined'&&(element.type=='checkbox'||element.type=='radio')){return true}else return false};Drupal.ajax.prototype.beforeSerialize=function(element,options){if(this.form){var settings=this.settings||Drupal.settings;Drupal.detachBehaviors(this.form,settings,'serialize')};options.data['ajax_html_ids[]']=[];$('[id]').each(function(){options.data['ajax_html_ids[]'].push(this.id)});options.data['ajax_page_state[theme]']=Drupal.settings.ajaxPageState.theme;options.data['ajax_page_state[theme_token]']=Drupal.settings.ajaxPageState.theme_token;for(var key in Drupal.settings.ajaxPageState.css)options.data['ajax_page_state[css]['+key+']']=1;for(var key in Drupal.settings.ajaxPageState.js)options.data['ajax_page_state[js]['+key+']']=1};Drupal.ajax.prototype.beforeSubmit=function(form_values,element,options){};Drupal.ajax.prototype.beforeSend=function(xmlhttprequest,options){if(this.form){options.extraData=options.extraData||{};options.extraData.ajax_iframe_upload='1';var v=$.fieldValue(this.element);if(v!==null)options.extraData[this.element.name]=Drupal.checkPlain(v)};$(this.element).addClass('progress-disabled').attr('disabled',true);if(this.progress.type=='bar'){var progressBar=new Drupal.progressBar('ajax-progress-'+this.element.id,eval(this.progress.update_callback),this.progress.method,eval(this.progress.error_callback));if(this.progress.message)progressBar.setProgress(-1,this.progress.message);if(this.progress.url)progressBar.startMonitoring(this.progress.url,this.progress.interval||1500);this.progress.element=$(progressBar.element).addClass('ajax-progress ajax-progress-bar');this.progress.object=progressBar;$(this.element).after(this.progress.element)}else if(this.progress.type=='throbber'){this.progress.element=$('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');if(this.progress.message)$('.throbber',this.progress.element).after('<div class="message">'+this.progress.message+'</div>');$(this.element).after(this.progress.element)}};Drupal.ajax.prototype.success=function(response,status){if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.element).removeClass('progress-disabled').removeAttr('disabled');Drupal.freezeHeight();for(var i in response)if(response.hasOwnProperty(i)&&response[i]['command']&&this.commands[response[i]['command']])this.commands[response[i]['command']](this,response[i],status);if(this.form){var settings=this.settings||Drupal.settings;Drupal.attachBehaviors(this.form,settings)};Drupal.unfreezeHeight();this.settings=null};Drupal.ajax.prototype.getEffect=function(response){var type=response.effect||this.effect,speed=response.speed||this.speed,effect={};if(type=='none'){effect.showEffect='show';effect.hideEffect='hide';effect.showSpeed=''}else if(type=='fade'){effect.showEffect='fadeIn';effect.hideEffect='fadeOut';effect.showSpeed=speed}else{effect.showEffect=type+'Toggle';effect.hideEffect=type+'Toggle';effect.showSpeed=speed};return effect};Drupal.ajax.prototype.error=function(xmlhttprequest,uri,customMessage){Drupal.displayAjaxError(Drupal.ajaxError(xmlhttprequest,uri,customMessage));if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.wrapper).show();$(this.element).removeClass('progress-disabled').removeAttr('disabled');if(this.form){var settings=this.settings||Drupal.settings;Drupal.attachBehaviors(this.form,settings)}};Drupal.ajax.prototype.commands={insert:function(ajax,response,status){var wrapper=response.selector?$(response.selector):$(ajax.wrapper),method=response.method||ajax.method,effect=ajax.getEffect(response),new_content_wrapped=$('<div></div>').html(response.data),new_content=new_content_wrapped.contents();if(new_content.length!=1||new_content.get(0).nodeType!=1)new_content=new_content_wrapped;switch(method){case'html':case'replaceWith':case'replaceAll':case'empty':case'remove':var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors(wrapper,settings)};wrapper[method](new_content);if(effect.showEffect!='show')new_content.hide();if($('.ajax-new-content',new_content).length>0){$('.ajax-new-content',new_content).hide();new_content.show();$('.ajax-new-content',new_content)[effect.showEffect](effect.showSpeed)}else if(effect.showEffect!='show')new_content[effect.showEffect](effect.showSpeed);if(new_content.parents('html').length>0){var settings=response.settings||ajax.settings||Drupal.settings;Drupal.attachBehaviors(new_content,settings)}},remove:function(ajax,response,status){var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors($(response.selector),settings);$(response.selector).remove()},changed:function(ajax,response,status){if(!$(response.selector).hasClass('ajax-changed')){$(response.selector).addClass('ajax-changed');if(response.asterisk)$(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ')}},alert:function(ajax,response,status){alert(response.text,response.title)},css:function(ajax,response,status){$(response.selector).css(response.argument)},settings:function(ajax,response,status){if(response.merge){$.extend(true,Drupal.settings,response.settings)}else ajax.settings=response.settings},data:function(ajax,response,status){$(response.selector).data(response.name,response.value)},invoke:function(ajax,response,status){var $element=$(response.selector);$element[response.method].apply($element,response.arguments)},restripe:function(ajax,response,status){$('> tbody > tr:visible, > tr:visible',$(response.selector)).removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even')},add_css:function(ajax,response,status){$('head').prepend(response.data);var match,importMatch=/^@import url\("(.*)"\);$/igm;if(document.styleSheets[0].addImport&&importMatch.test(response.data)){importMatch.lastIndex=0;while(match=importMatch.exec(response.data))document.styleSheets[0].addImport(match[1])}},updateBuildId:function(ajax,response,status){$('input[name="form_build_id"][value="'+response.old+'"]').val(response['new'])}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/misc/ajax.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/jquery_update/js/jquery_update.js. */
(function(D){var beforeSerialize=D.ajax.prototype.beforeSerialize;D.ajax.prototype.beforeSerialize=function(element,options){beforeSerialize.call(this,element,options);options.data['ajax_page_state[jquery_version]']=D.settings.ajaxPageState.jquery_version}})(Drupal);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/jquery_update/js/jquery_update.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/navbar/js/navbar-tableheader.js. */
(function($,Drupal,displace){"use strict";Drupal.navbar=Drupal.navbar||{};$.extend(Drupal.navbar,{height:function(){return displace().top}})}(jQuery,Drupal,Drupal.displace));;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/navbar/js/navbar-tableheader.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/custom/fb_instant_articles/modules/fb_instant_articles_display/js/admin.js. */
(function($){'use strict';Drupal.fieldUIDisplayOverview=Drupal.fieldUIDisplayOverview||{};Drupal.fieldUIDisplayOverview.facebookInstantArticlesDisplay=function(row,data){this.row=row;this.name=data.name;this.region=data.region;this.tableDrag=data.tableDrag;this.$regionSelect=$('select.ds-field-region',row);this.$regionSelect.change(Drupal.fieldUIOverview.onChange);this.$formatSelect=$('select.field-formatter-type',row);this.$formatSelect.change(Drupal.fieldUIOverview.onChange);return this};Drupal.fieldUIDisplayOverview.facebookInstantArticlesDisplay.prototype={getRegion:function(){return this.$regionSelect.val()},regionChange:function(region){region=region.replace(/-/g,'_');this.$regionSelect.val(region);var refreshRows={};refreshRows[this.name]=this.$regionSelect.get(0);if($(this.row).hasClass('field-group')&&$.isFunction(Drupal.fieldUIDisplayOverview.group.prototype.regionChangeFields))Drupal.fieldUIDisplayOverview.group.prototype.regionChangeFields(region,this,refreshRows);return refreshRows}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/custom/fb_instant_articles/modules/fb_instant_articles_display/js/admin.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/keyboard_navigation/js/keyboard_navigation.js. */
(function($,Drupal,window,document,undefined){Drupal.behaviors.keyboard_navigation={attach:function(context,settings){var breakpoint=850,viewingSize=widthCheck(),linkPosition=0;$(window).resize(function(){viewingSize=widthCheck()});$('#block-menu-block-sixteenhundrednav-main').keydown(function(e){if([27,37,38,39,40,13].indexOf(e.keyCode)==-1)return;if($(document.activeElement).attr('id')=='main-menu-toggle'){$(document.activeElement).click();$('a#ui-accordion-1-header-1').trigger('mouseenter').focus()};var focused=$(document.activeElement).closest('li');switch(e.keyCode){case 27:$(document.activeElement).blur();if(viewingSize=='mobile')$('#main-menu-toggle').click().focus();break;case 37:if(viewingSize=='desktop'){if(focused.hasClass('depth-1')){prevListItem(focused)}else{linkPosition=focused.attr('data-position');if(focused.parents('li.depth-2').prev().length)if(focused.parents('li.depth-2').prev().find("ul:first li[data-position="+linkPosition+"] a").first().length){focused.parents('li.depth-2').prev().find("ul:first li[data-position="+linkPosition+"] a").first().trigger('mouseenter').focus()}else focused.parents('li.depth-2').prev().find("ul:first li:last > a").trigger('mouseenter').focus()}}else{$('#block-menu-block-sixteenhundrednav-main').find('.menu-block-wrapper > ul.menu').accordion("option","active",false);topParent(focused)};e.preventDefault();e.stopPropagation();break;case 38:if(!focused.prev().length&&focused.parents('ul.menu-featured__column').length)if(focused.parent('ul.menu-featured__column').first().prev().length)focused.parent('ul.menu-featured__column').first().prev().find('li:last a').first().trigger('mouseenter').focus();if(viewingSize=='desktop'){if(focused.hasClass('depth-1')){return}else if(focused.hasClass('first')){topParent(focused)}else prevListItem(focused)}else if(focused.hasClass('depth-1')){prevListItem(focused)}else if(focused.hasClass('first')){if(focused.parents('li.depth-2').prev().length!=0){focused.parents('li.depth-2').prev().find('li.depth-3.last a').first().trigger('mouseenter').focus()}else topParent(focused)}else prevListItem(focused);e.preventDefault();e.stopPropagation();break;case 39:if(viewingSize=='desktop'){if(focused.hasClass('depth-1')||focused.hasClass('depth-2')){nextListItem(focused)}else{linkPosition=focused.attr('data-position');if(focused.parents('li.depth-2').next().length)if(focused.parents('li.depth-2').next().find("ul:first li[data-position="+linkPosition+"] > a").length){focused.parents('li.depth-2').next().find("ul:first li[data-position="+linkPosition+"] > a").trigger('mouseenter').focus()}else focused.parents('li.depth-2').next().find("ul:first li:last > a").trigger('mouseenter').focus()}}else{if(focused.hasClass('depth-1')){var position=(focused.attr('data-position'))-1;$('#block-menu-block-sixteenhundrednav-main').find('.menu-block-wrapper > ul.menu').accordion("option","active",position)};focused.find('li.depth-2.first li.depth-3.first a').trigger('mouseenter').focus()};e.preventDefault();e.stopPropagation();break;case 40:if(!focused.next().length&&focused.parents('ul.menu-featured__column').length)if(focused.parent('ul.menu-featured__column').first().next().length)focused.parent('ul.menu-featured__column').first().next().find('li:first a').first().trigger('mouseenter').focus();if(viewingSize=='desktop'){if(focused.hasClass('depth-1')||focused.hasClass('depth-2')){listDescend(focused)}else nextListItem(focused)}else if(focused.hasClass('depth-1')){nextListItem(focused)}else if(focused.hasClass('last')){if(focused.parents('li.depth-2').next().length!=0)focused.parents('li.depth-2').next().find('li.depth-3.first > a').trigger('mouseenter').focus()}else nextListItem(focused);e.preventDefault();e.stopPropagation();break}})
function prevListItem(focused){focused.prev().find('a').first().trigger('mouseenter').focus()}
function nextListItem(focused){focused.next().find('a').first().trigger('mouseenter').focus()}
function listDescend(focused){if(focused.children('ul').length)focused.find('ul:first li:first a:first').trigger('mouseenter').focus()}
function listAscend(focused){if(focused.parent('ul').length)focused.parent('ul').siblings('a').trigger('mouseenter').focus()}
function topParent(focused){focused.parents('li.depth-1').children('a').trigger('mouseenter').focus()}
function widthCheck(){if(document.documentElement.clientWidth>=breakpoint){return'desktop'}else return'mobile'}}}})(jQuery,Drupal,this,this.document);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/keyboard_navigation/js/keyboard_navigation.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/media_preview_slider/js/slider.js. */
(function($){Drupal.behaviors.media_preview_sizer={attach:function(context,settings){$(".media-browser-wrapper .views-exposed-form .views-exposed-widgets").once('media_preview_sizer').append("<div class='views-exposed-widget slide-widget'><label>Image Size</label><div class='slide-image'></div></div>");var valued=(!localStorage.getItem("slideWidth"))?200:localStorage.getItem("slideWidth");$('#media-browser-library-list li').css('width',localStorage.getItem('slideWidth')+'px');$('.slide-image').once('media_preview_sizer').slider({value:valued,min:100,max:300,step:2,slide:function(event,ui){localStorage.setItem('slideWidth',ui.value);$('#media-browser-library-list li').css('width',localStorage.getItem('slideWidth')+'px')}})}}}(jQuery));;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/media_preview_slider/js/slider.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/panopoly_magic/panopoly-magic.js. */
(function($){Drupal.behaviors.panopolyMagic={attach:function(context,settings){if($.trim($('.pane-node-title .pane-content').html())==$.trim($('h1.title').html())){$('.pane-node-title .pane-content').html('');$('h1.title').hide().clone().prependTo('.pane-node-title .pane-content');$('.pane-node-title h1.title').show()}}}})(jQuery);(function($){var timer,wrappedWysiwygAttach=false
function triggerSubmit(form,timeout){var $form=$(form),preview_widget=$('#panopoly-form-widget-preview'),submit;if(!preview_widget.hasClass('panopoly-magic-loading')){preview_widget.addClass('panopoly-magic-loading');submit=function(){$form.find('.ctools-auto-submit-click').click()};if(typeof timeout==='number'){return setTimeout(submit,timeout)}else submit()}}
function cancelSubmit(form,timer){var $form=$(form),preview_widget=$('#panopoly-form-widget-preview');preview_widget.removeClass('panopoly-magic-loading');clearTimeout(timer)}
function onWysiwygChangeFactory(editorId){return function(){var textarea=$('#'+editorId),form=textarea.get(0).form;if(textarea.hasClass('panopoly-textarea-autosubmit')){cancelSubmit(form,timer);timer=triggerSubmit(form,1e3)}}}
function beforeWysiwygAttach(context,params){var editorId=params.field,editorType=params.editor,format=params.format;if(Drupal.settings.wysiwyg.configs[editorType]&&Drupal.settings.wysiwyg.configs[editorType][format])wysiwygConfigAlter(params,Drupal.settings.wysiwyg.configs[editorType][format])}
function wysiwygConfigAlter(params,config){var editorId=params.field,editorType=params.editor,onWysiwygChange=onWysiwygChangeFactory(editorId);switch(editorType){case'markitup':$.each(['afterInsert','onEnter'],function(index,funcName){config[funcName]=onWysiwygChange});break;case'tinymce':config.setup=function(editor){editor.onChange.add(onWysiwygChange);editor.onKeyUp.add(onWysiwygChange)};break}}
function wrapFunctionBefore(parent,name,beforeFunc){var originalFunc=parent[name];parent[name]=function(){beforeFunc.apply(this,arguments);return originalFunc.apply(this,arguments)}};Drupal.behaviors.panopolyMagicAutosubmit={attach:function(context,settings){$('.ctools-auto-submit-click',context).filter(function(){return $(this).closest('form').attr('id').indexOf('panels-edit-style-type-form')!==0}).click(function(event){if($(this).hasClass('ajax-processed')){event.stopImmediatePropagation();$(this).trigger('mousedown');return false}});var discardKeyCode=[16,17,18,20,33,34,35,36,37,38,39,40,9,13,27];$('.field-widget-link-field input:text',context).addClass('panopoly-textfield-autosubmit').addClass('ctools-auto-submit-exclude');$('.panopoly-textfield-autosubmit, .panopoly-textarea-autosubmit',context).once('ctools-auto-submit').bind('keyup blur',function(e){var $element;$element=$('.widget-preview .pane-title',context);cancelSubmit(e.target.form,timer);if(e.type!=='blur'&&$.inArray(e.keyCode,discardKeyCode)>0)return;timer=triggerSubmit(e.target.form,1e3)});if(!wrappedWysiwygAttach&&typeof Drupal.wysiwygAttach=='function'){wrapFunctionBefore(Drupal,'wysiwygAttach',beforeWysiwygAttach);wrappedWysiwygAttach=true;$('.panopoly-textarea-autosubmit',context).once('panopoly-magic-wysiwyg').each(function(){var editorId=this.id,instance=Drupal.wysiwyg.instances[editorId],format=instance?instance.format:null,trigger=instance?instance.trigger:null;if(instance&&instance.editor!='none'){params=Drupal.settings.wysiwyg.triggers[trigger];if(params){Drupal.wysiwygDetach(context,params[format]);Drupal.wysiwygAttach(context,params[format])}}})};$('.panopoly-autocomplete-autosubmit',context).once('ctools-auto-submit').bind('keyup blur',function(e){if(e.type==='blur'||e.keyCode===13)triggerSubmit(e.target.form,0)});$(':input.filter-list').addClass('ctools-auto-submit-exclude')}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/panopoly_magic/panopoly-magic.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/panopoly_theme/js/panopoly-accordion.js. */
(function($){Drupal.behaviors.PanelsAccordionStyle={attach:function(context,settings){for(region_id in Drupal.settings.accordion){var accordion=Drupal.settings.accordion[region_id];jQuery('#'+region_id).accordion(accordion.options)}}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/panopoly_theme/js/panopoly-accordion.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/linkit/js/linkit.js. */
(function($){Drupal.linkit=Drupal.linkit||{};Drupal.linkit.currentInstance=Drupal.linkit.currentInstance||{};Drupal.linkit.dialogHelper=Drupal.linkit.dialogHelper||{};Drupal.linkit.insertPlugins=Drupal.linkit.insertPlugins||{};Drupal.linkit.createModal=function(){Drupal.linkit.createModalElement().dialog(Drupal.linkit.modalOptions()).siblings(".ui-dialog-titlebar").hide();$(window).bind("scroll resize",function(){$('#linkit-modal').dialog('option','position',['center',50])});Drupal.linkit.getDashboard()};Drupal.linkit.createModalElement=function(){var linkitModal=$('<div id="linkit-modal"></div>');$('body').append(linkitModal);return linkitModal};Drupal.linkit.modalOptions=function(){return{dialogClass:'linkit-wrapper',modal:true,draggable:false,resizable:false,width:520,position:['center',50],minHeight:0,zIndex:21e4,close:Drupal.linkit.modalClose,open:function(event,ui){$('.ui-widget-overlay').css({opacity:0.5,filter:'Alpha(Opacity=50)',backgroundColor:'#FFFFFF'})},title:'Linkit'}};Drupal.linkit.modalClose=function(e){$('#linkit-modal').dialog('destroy').remove();Drupal.settings.linkit.currentInstance={};if(e&&e.preventDefault){e.preventDefault()}else return false};Drupal.linkit.getDashboard=function(){var ajax_settings={};ajax_settings.event='LinkitDashboard';ajax_settings.url=Drupal.settings.linkit.dashboardPath+Drupal.settings.linkit.currentInstance.profile;ajax_settings.progress={type:'throbber',message:Drupal.t('Loading Linkit dashboard...')};Drupal.ajax['linkit-modal']=new Drupal.ajax('linkit-modal',$('#linkit-modal')[0],ajax_settings);Drupal.ajax['linkit-modal'].options.success=function(response,status){if(typeof response=='string')response=$.parseJSON(response);Drupal.ajax['linkit-modal'].success(response,status);var helper=Drupal.settings.linkit.currentInstance.helper;Drupal.linkit.getDialogHelper(helper).afterInit();$('#linkit-modal .linkit-search-element').focus()};Drupal.settings.linkit.currentInstance.autocompletePathParsed=Drupal.settings.linkit.autocompletePath.replace('___profile___',Drupal.settings.linkit.currentInstance.profile);$('#linkit-modal').trigger('LinkitDashboard')};Drupal.linkit.registerDialogHelper=function(name,helper){Drupal.linkit.dialogHelper[name]=helper};Drupal.linkit.getDialogHelper=function(name){return Drupal.linkit.dialogHelper[name]};Drupal.linkit.registerInsertPlugin=function(name,plugin){Drupal.linkit.insertPlugins[name]=plugin};Drupal.linkit.getInsertPlugin=function(name){return Drupal.linkit.insertPlugins[name]}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/linkit/js/linkit.js. */
/*
 * jQuery Superfish Menu Plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// iOS clicks only bubble as far as body children
					$(window).load(function () {
						$('body').children().on('click', $.noop);
					});
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);
					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				o.onBeforeShow.call($ul);
				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);
;/**/
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/sixteenhundrednav/sixteenhundrednav.js. */
(function($,Drupal,window,document,undefined){Drupal.behaviors.sixteenhundrednav={attach:function(context,settings){$('#main-menu-header',context).once('navigation-behaviors',function(){var menu_header=$(this),menu_content=$('#main-menu-content'),search=menu_header.parent().siblings('.sitewide-header--search-form'),superfishMenu=$('#block-menu-block-sixteenhundrednav-main').find('.menu-block-wrapper > ul.menu'),overlay=$('#nav-overlay');if(!(overlay.length>0))$('#page').prepend('<div id="nav-overlay"></div>');superfishMenu.superfish({speed:0,delay:200,onBeforeShow:function(){_sixteenhundred_nav_megamenu_reposition(this)},onBeforeHide:function(){this.removeAttr('style');this.css({display:'none'})}});sfSwitch();$(window).resize(function(){window.setTimeout(sfSwitch,0)});menu_header.click(function(){menu_content.toggleClass('is-open');search.toggleClass('is-open');if(menu_header.hasClass('menu-active')){menu_header.removeClass('menu-active');$('#nav-overlay').fadeOut(200);menu_content.slideUp();search.removeClass('is-open')}else{$(this).addClass('menu-active');$('#nav-overlay').fadeIn(200);menu_content.slideDown();search.addClass('is-open')}})
function sfSwitch(){if($('.pane-page-logo').css('position')=='static'){if(superfishMenu.hasClass('ui-accordion')){menu_header.hide();superfishMenu.accordion('destroy');superfishMenu.superfish({speed:0,delay:200,onBeforeShow:function(){_sixteenhundred_nav_megamenu_reposition(this)},onBeforeHide:function(){this.removeAttr('style');this.css({display:'none'})}});superfishMenu.superfish();menu_header.removeClass('menu-active');search.removeClass('is-open');menu_content.removeClass('is-open');$('#nav-overlay').hide();menu_content.show()}}else if(!superfishMenu.hasClass('ui-accordion')){superfishMenu.superfish('destroy');superfishMenu.accordion({header:'li.depth-1 > a',collapsible:'false',active:0,heightStyle:'content'});delete($.ui.accordion.prototype._keydown);menu_header.show();menu_content.removeClass('is-open')}}})}}
function _sixteenhundred_nav_megamenu_reposition(ul){ul.css({visibility:'hidden',display:'block'});var client_width=document.documentElement.clientWidth,menu_level_2_width=ul.outerWidth(),menu_level_2_pos=ul.position(),menu_pos_and_width=menu_level_2_pos.left+menu_level_2_width,menu_level_2_left_padding=25;if(menu_pos_and_width>client_width){var difference=menu_pos_and_width-client_width;if(difference>menu_level_2_pos.left){var menu_level_2_items=ul.find('li.depth-2'),menu_level_2_item_width=Math.floor((client_width-menu_level_2_left_padding)/(menu_level_2_items.length));menu_level_2_items.find('li').css({width:menu_level_2_item_width-(menu_level_2_left_padding*2)});ul.find('.depth-2-wrapper').css({width:(client_width-menu_level_2_left_padding)});ul.css({left:'0px'})}else ul.css({left:(difference*-1)+menu_level_2_pos.left})};ul.css({visibility:'inherit',display:'none'})}})(jQuery,Drupal,this,this.document);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/sixteenhundrednav/sixteenhundrednav.js. */
/*!
	Colorbox v1.5.13 - 2014-08-04
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(z+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in y[0]&&!y[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),y.focus())}function c(t){c.str!==t&&(y.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){z=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),z=W.index(_.el),-1===z&&(W=W.add(_.el),z=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),y.css({visibility:"hidden",display:"block",opacity:""}),L=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(L),D=T.height()+k.height()+b.outerHeight(!0)-b.height(),j=C.width()+H.width()+b.outerWidth(!0)-b.width(),A=L.outerHeight(!0),N=L.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-N-j,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-A-D,L.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(I).hide(),y.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){!y&&e.body&&(V=!1,E=t(i),y=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),S=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),x=n(se,"Wrapper"),b=n(se,"Content").append(I=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),F=n("button","Slideshow"),S),B=t('<button type="button"/>').attr({id:Z+"Close"}),x.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(F),t(e.body).append(v,y.append(x,M)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return y?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if(q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-A-D:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-N-j:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-N-j,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-A-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){S.show()},100),_.get("inline")){var c=t(e);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=new Image,t(U).addClass(Z+"Photo").bind("error",function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;t.each(["alt","longdesc","aria-describedby"],function(e,i){var n=t(_.el).attr(i)||t(_.el).attr("data-"+i);n&&U.setAttribute(i,n)}),_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[z+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,y,x,b,T,C,H,k,W,E,L,M,S,I,R,F,K,P,B,O,_,D,j,A,N,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[z+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){F.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),y.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),F.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),y.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,F.hide(),t(),ae.unbind(ne,e).unbind(ie,t),y.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),F.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;if(e=e||{},t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;return o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(y[0].style.width,10)-j+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(y[0].style.height,10)-D+"px"}var r,h,s,l=0,d=0,c=y.offset();if(E.unbind("resize."+Z),y.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,y.css({position:"fixed"})):(l=h,d=s,y.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-N-j-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-N-j,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-A-D-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-A-D,0)/2),y.css({top:c.top,left:c.left,visibility:"visible"}),x[0].style.width=x[0].style.height="9999px",r={width:_.w+N+j,height:_.h+A+D,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||y.css(r),y.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,x[0].style.width=_.w+N+j+"px",x[0].style.height=_.h+A+D+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),i&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-N-j),t.innerWidth&&(_.w=a(t.innerWidth,"x")),L.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-A-D),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=L.scrollTop(),L.css({height:"auto"}),_.h=L.height()),L.css({height:_.h}),e&&L.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||L.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||L.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");L.remove(),L=n(se,"LoadedContent").append(i),L.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&y[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),S.hide(),u(ne),_.get("onComplete")},I.html(_.get("title")).show(),L.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",z+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>z?"show":"hide"]().html(_.get("next")),P[_.get("loop")||z?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=e.createElement("iframe"),"frameBorder"in n&&(n.frameBorder=0),"allowTransparency"in n&&(n.allowTransparency="true"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0}).one("load",o).appendTo(L),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?y.fadeTo(g,1,i):i())},"fade"===_.get("transition")?y.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[z+1])&&(z=h(1),f(W[z]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||z)&&(z=h(-1),f(W[z]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),y.stop().fadeTo(_.get("fadeOut")||0,0,function(){y.hide(),v.hide(),u(he),L.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){y&&(y.stop(),t[Y].close(),y.stop(!1,!0).remove(),v.remove(),G=!1,y=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);;/**/
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/colorbox/js/colorbox.js. */
(function($){Drupal.behaviors.initColorbox={attach:function(context,settings){if(!$.isFunction($.colorbox)||typeof settings.colorbox==='undefined')return;if(settings.colorbox.mobiledetect&&window.matchMedia){var mq=window.matchMedia("(max-device-width: "+settings.colorbox.mobiledevicewidth+")");if(mq.matches)return};$('.colorbox',context).once('init-colorbox').colorbox(settings.colorbox);$(context).bind('cbox_complete',function(){Drupal.attachBehaviors('#cboxLoadedContent')})}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/sites/whitehouse.gov/modules/contrib/colorbox/js/colorbox.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/forall_checklist_fieldable_panels_pane/js/forall_checklist_fieldable_panels_pane.js. */
(function($){var pageTitle=$(document).prop('title');Drupal.behaviors.forall_checklist_fieldable_panels_pane={attach:function(context,settings){if(!($('.pane-bundle-forall-checklist').length))return;$(document).ready(function(){setActiveInitial()});$(window).resize(function(){var activeItems=$('.checklist-item-list-content.active');$(activeItems).each(function(){var objectParent=$(this).parents('.field-name-field-checklist-items .field-item');if(activeHeightNotClipped(objectParent))superposition(objectParent)})});var checklistItems=$('.pane-bundle-forall-checklist .field-item'),checklistTriggers=$(checklistItems).find('.checklist-item-list-content, .checklist-item-checkmark-button');$(checklistTriggers,context).once('checklist-trigger',function(){$(this).click(function(event){event.preventDefault;validateChange(this)})});var checklistLinks=$('.pane-bundle-forall-checklist .checklist-item-active-content :focusable');$(checklistLinks,context).once('checklist-focus',function(){$(this).focus(function(event){var trigger=$(this).closest('.node-checklist-item').find('.checklist-item-checkmark-button');validateChange(trigger)})})}}
function activeHeightNotClipped(object){if($(object).find('.checklist-item-active-content').height()>1)return true;return false}
function setActiveInitial(){var firstItems=Array();$('.pane-bundle-forall-checklist').each(function(){var firstItem=$(this).find('.field-name-field-checklist-items .field-item').first();firstItems.push(firstItem)});$(firstItems).each(function(){if(activeHeightNotClipped($(this)))superposition($(this));$(this).find('.checklist-item-list-content').addClass('active')})}
function validateChange(clickedItem){var objectParent=$(clickedItem).parents('.field-item'),objectIsActive=$(clickedItem).hasClass('active')||$(clickedItem).parent('.checklist-item-list-content').hasClass('active'),objectIsButton=$(clickedItem).hasClass('checklist-item-checkmark-button');if(!objectIsButton&&!(activeHeightNotClipped(objectParent)))return;if(!objectIsActive){if(activeHeightNotClipped(objectParent))superposition(objectParent);changeActive(objectParent);checklistClickEventToGoogleAnalytics(objectParent)}}
function changeActive(object){$(object).siblings('.field-item').find('.checklist-item-list-content').removeClass('active');$(object).find('.checklist-item-list-content').addClass('active')}
function superposition(object){var thisPane=$(object).parents('.pane-bundle-forall-checklist'),activeContent=$(object).find('.checklist-item-active-content'),thisPaneTitle=$(thisPane).find('h2.pane-title');if($(thisPane).css("paddingBottom")!=0)$(thisPane).css({paddingBottom:0});var listTop=Math.floor($(object).position().top),paneTitleDisplacement=$(thisPaneTitle).outerHeight(true)+parseInt($(thisPane).css('paddingTop'),10),paneHeight=$(thisPane).height()-paneTitleDisplacement+11,activeHeight=$(activeContent).height();if(paneHeight<activeHeight){$(thisPane).css({paddingBottom:(activeHeight-paneHeight)+'px'});paneHeight=activeHeight};var contentDisplacement=(paneHeight+paneTitleDisplacement)-(activeHeight+listTop);if(contentDisplacement<0)$(activeContent).css({top:contentDisplacement+'px'})}
function checklistClickEventToGoogleAnalytics(item){var checklistTitle=item.find('h3.checklist-item-title.checklist-item-primary-point').text(),paneTitle=item.closest('.pane-bundle-forall-checklist').find('h2.pane-title').text();ga('send','event','Achievement Page','Click Checklist Item',"Page: "+pageTitle+", Pane: "+paneTitle+", Checklist Item: "+checklistTitle)}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/forall_checklist_fieldable_panels_pane/js/forall_checklist_fieldable_panels_pane.js. */
/* Source and licensing information for the line(s) below can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/shareables/shareables.js. */
function social_share_modal(showHide,shareId,nid){if(showHide){jQuery("#social-share-modal-"+shareId).show();jQuery("#social-share-this-button-wrapper-"+shareId).hide();ga('send','event','Share Button','Open','node/'+nid)}else{jQuery("#social-share-modal-"+shareId).hide();jQuery("#social-share-this-button-wrapper-"+shareId).show();ga('send','event','Share Button','Close','node/'+nid)}};(function($){Drupal.behaviors.shareables={attach:function(context,settings){$('article.shareable',context).once('shareables-tracking',function(){var nodePath='node/'+$(this).attr('id').replace('modal-nid-','');$(this).find('a.social-share-mailto').click(function(){ga('send','event','Social Share Links','MailTo',nodePath)});$(this).find('a.social-share-facebook').click(function(){ga('send','event','Social Share Links','Facebook',nodePath)});$(this).find('a.social-share-twitter').click(function(){ga('send','event','Social Share Links','Twitter',nodePath)});$(this).find('.modal-trigger a').click(function(){ga('send','event','ROC Modal','Open',nodePath)})});$('#cboxClose').once('shareables-tracking',function(){$(this).click(function(){var nodePath=$('#cboxLoadedContent').find('article').attr('data-shareables-node-path');ga('send','event','ROC Modal','Close',nodePath)})});if(typeof(Drupal.NodeBroadcastSubscription)!='undefined')Drupal.NodeBroadcastSubscription.riverView.ev.on('render:done',function(){Drupal.behaviors.shareables.attach()})}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.whitehouse.gov/profiles/forall/modules/custom/shareables/shareables.js. */
(function(){function C(){var a="{}";if("userDataBehavior"==f){g.load("jStorage");try{a=g.getAttribute("jStorage")}catch(b){}try{r=g.getAttribute("jStorage_update")}catch(c){}h.jStorage=a}D();x();E()}function u(){var a;clearTimeout(F);F=setTimeout(function(){if("localStorage"==f||"globalStorage"==f)a=h.jStorage_update;else if("userDataBehavior"==f){g.load("jStorage");try{a=g.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=r){r=a;var l=p.parse(p.stringify(c.__jstorage_meta.CRC32)),k;C();k=p.parse(p.stringify(c.__jstorage_meta.CRC32));
var d,n=[],e=[];for(d in l)l.hasOwnProperty(d)&&(k[d]?l[d]!=k[d]&&"2."==String(l[d]).substr(0,2)&&n.push(d):e.push(d));for(d in k)k.hasOwnProperty(d)&&(l[d]||n.push(d));s(n,"updated");s(e,"deleted")}},25)}function s(a,b){a=[].concat(a||[]);var c,k,d,n;if("flushed"==b){a=[];for(c in m)m.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(d=a.length;c<d;c++){if(m[a[c]])for(k=0,n=m[a[c]].length;k<n;k++)m[a[c]][k](a[c],b);if(m["*"])for(k=0,n=m["*"].length;k<n;k++)m["*"][k](a[c],b)}}function v(){var a=(+new Date).toString();
if("localStorage"==f||"globalStorage"==f)try{h.jStorage_update=a}catch(b){f=!1}else"userDataBehavior"==f&&(g.setAttribute("jStorage_update",a),g.save("jStorage"));u()}function D(){if(h.jStorage)try{c=p.parse(String(h.jStorage))}catch(a){h.jStorage="{}"}else h.jStorage="{}";z=h.jStorage?String(h.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function w(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,l=c.__jstorage_meta.PubSub.length;b<
l;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{h.jStorage=p.stringify(c),g&&(g.setAttribute("jStorage",h.jStorage),g.save("jStorage")),z=h.jStorage?String(h.jStorage).length:0}catch(k){}}function q(a){if("string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
return!0}function x(){var a,b,l,k,d=Infinity,n=!1,e=[];clearTimeout(G);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;l=c.__jstorage_meta.TTL;k=c.__jstorage_meta.CRC32;for(b in l)l.hasOwnProperty(b)&&(l[b]<=a?(delete l[b],delete k[b],delete c[b],n=!0,e.push(b)):l[b]<d&&(d=l[b]));Infinity!=d&&(G=setTimeout(x,Math.min(d-a,2147483647)));n&&(w(),v(),s(e,"deleted"))}}function E(){var a;if(c.__jstorage_meta.PubSub){var b,l=A,k=[];for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)b=
c.__jstorage_meta.PubSub[a],b[0]>A&&(l=b[0],k.unshift(b));for(a=k.length-1;0<=a;a--){b=k[a][1];var d=k[a][2];if(t[b])for(var n=0,e=t[b].length;n<e;n++)try{t[b][n](b,p.parse(p.stringify(d)))}catch(g){}}A=l}}var y=window.jQuery||window.$||(window.$={}),p={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||y.parseJSON||y.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||y.toJSON};if("function"!==
typeof p.parse||"function"!==typeof p.stringify)throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");var c={__jstorage_meta:{CRC32:{}}},h={jStorage:"{}"},g=null,z=0,f=!1,m={},F=!1,r=0,t={},A=+new Date,G,B={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},
decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};y.jStorage={version:"0.4.12",set:function(a,b,l){q(a);l=l||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(B.isXML(b))b={_is_xml:!0,xml:B.encode(b)};else{if("function"==typeof b)return;
b&&"object"==typeof b&&(b=p.parse(p.stringify(b)))}c[a]=b;for(var k=c.__jstorage_meta.CRC32,d=p.stringify(b),g=d.length,e=2538058380^g,h=0,f;4<=g;)f=d.charCodeAt(h)&255|(d.charCodeAt(++h)&255)<<8|(d.charCodeAt(++h)&255)<<16|(d.charCodeAt(++h)&255)<<24,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16),f^=f>>>24,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16),e=1540483477*(e&65535)+((1540483477*(e>>>16)&65535)<<16)^f,g-=4,++h;switch(g){case 3:e^=(d.charCodeAt(h+2)&255)<<16;case 2:e^=
(d.charCodeAt(h+1)&255)<<8;case 1:e^=d.charCodeAt(h)&255,e=1540483477*(e&65535)+((1540483477*(e>>>16)&65535)<<16)}e^=e>>>13;e=1540483477*(e&65535)+((1540483477*(e>>>16)&65535)<<16);k[a]="2."+((e^e>>>15)>>>0);this.setTTL(a,l.TTL||0);s(a,"updated");return b},get:function(a,b){q(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?B.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){q(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&
delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],w(),v(),s(a,"deleted"),!0):!1},setTTL:function(a,b){var l=+new Date;q(a);b=Number(b)||0;return a in c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=l+b:delete c.__jstorage_meta.TTL[a],w(),x(),v(),!0):!1},getTTL:function(a){var b=+new Date;q(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};w();v();s(null,
"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=b&&a.push(b);return a},storageSize:function(){return z},currentBackend:function(){return f},storageAvailable:function(){return!!f},listenKeyChange:function(a,b){q(a);m[a]||(m[a]=[]);m[a].push(b)},stopListening:function(a,b){q(a);if(m[a])if(b)for(var c=m[a].length-1;0<=c;c--)m[a][c]==b&&m[a].splice(c,1);else delete m[a]},subscribe:function(a,
b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");t[a]||(t[a]=[]);t[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);w();v()},reInit:function(){C()},noConflict:function(a){delete window.$.jStorage;a&&(window.jStorage=this);return this}};(function(){var a=!1;if("localStorage"in
window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(h=window.localStorage,f="localStorage",r=h.jStorage_update)}catch(c){}else if("globalStorage"in window)try{window.globalStorage&&(h="localhost"==window.location.hostname?window.globalStorage["localhost.localdomain"]:window.globalStorage[window.location.hostname],f="globalStorage",r=h.jStorage_update)}catch(k){}else if(g=document.createElement("link"),
g.addBehavior){g.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(g);try{g.load("jStorage")}catch(d){g.setAttribute("jStorage","{}"),g.save("jStorage"),g.load("jStorage")}a="{}";try{a=g.getAttribute("jStorage")}catch(m){}try{r=g.getAttribute("jStorage_update")}catch(e){}h.jStorage=a;f="userDataBehavior"}else{g=null;return}D();x();"localStorage"==f||"globalStorage"==f?"addEventListener"in window?window.addEventListener("storage",u,!1):document.attachEvent("onstorage",
u):"userDataBehavior"==f&&setInterval(u,1E3);E();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&u()},!1)})()})();;/**/
