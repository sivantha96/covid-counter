// ;(function(a){a.fn.rwdImageMaps=function(){var c=this;var b=function(){c.each(function(){if(typeof(a(this).attr("usemap"))=="undefined"){return}var e=this,d=a(e);a("<img />").on('load',function(){var g="width",m="height",n=d.attr(g),j=d.attr(m);if(!n||!j){var o=new Image();o.src=d.attr("src");if(!n){n=o.width}if(!j){j=o.height}}var f=d.width()/100,k=d.height()/100,i=d.attr("usemap").replace("#",""),l="coords";a('map[name="'+i+'"]').find("area").each(function(){var r=a(this);if(!r.data(l)){r.data(l,r.attr(l))}var q=r.data(l).split(","),p=new Array(q.length);for(var h=0;h<p.length;++h){if(h%2===0){p[h]=parseInt(((q[h]/n)*100)*f)}else{p[h]=parseInt(((q[h]/j)*100)*k)}}r.attr(l,p.toString())})}).attr("src",d.attr("src"))})};a(window).resize(b).trigger("resize");return this}})(jQuery);
!function(){"use strict";function r(){function e(){var r={width:u.width/u.naturalWidth,height:u.height/u.naturalHeight},a={width:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-left"),10),height:parseInt(window.getComputedStyle(u,null).getPropertyValue("padding-top"),10)};i.forEach(function(e,t){var n=0;o[t].coords=e.split(",").map(function(e){var t=1==(n=1-n)?"width":"height";return a[t]+Math.floor(Number(e)*r[t])}).join(",")})}function t(e){return e.coords.replace(/ *, */g,",").replace(/ +/g,",")}function n(){clearTimeout(d),d=setTimeout(e,250)}function r(e){return document.querySelector('img[usemap="'+e+'"]')}var a=this,o=null,i=null,u=null,d=null;"function"!=typeof a._resize?(o=a.getElementsByTagName("area"),i=Array.prototype.map.call(o,t),u=r("#"+a.name)||r(a.name),a._resize=e,u.addEventListener("load",e,!1),window.addEventListener("focus",e,!1),window.addEventListener("resize",n,!1),window.addEventListener("readystatechange",e,!1),document.addEventListener("fullscreenchange",e,!1),u.width===u.naturalWidth&&u.height===u.naturalHeight||e()):a._resize()}function e(){function t(e){e&&(!function(e){if(!e.tagName)throw new TypeError("Object is not a valid DOM element");if("MAP"!==e.tagName.toUpperCase())throw new TypeError("Expected <MAP> tag, found <"+e.tagName+">.")}(e),r.call(e),n.push(e))}var n;return function(e){switch(n=[],typeof e){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(e||"map"),t);break;case"object":t(e);break;default:throw new TypeError("Unexpected data type ("+typeof e+").")}return n}}"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e():window.imageMapResize=e(),"jQuery"in window&&(window.jQuery.fn.imageMapResize=function(){return this.filter("map").each(r).end()})}();

// jQuery(document).ready(function ($) {

//     var selectedItems = []
//     $('#selections').html(selectedItems.length > 0 ? "<b>Selected body Parts: </b>" + selectedItems : "<b>Please select a body part</b>");
//     var defaultDipTooltip = '<b><u>Spine</u></b>';

//     $('#house').mapster({

//         fillOpacity: 0.4,
//         fillColor: "d42e16",
//         // strokeColor: "3320FF",
//         // strokeOpacity: 0.8,
//         // strokeWidth: 2,
//         // stroke: true,
//         isSelectable: true,
//         singleSelect: false,
//         mapKey: 'name',
//         fillOpacity: 0.6,
//         fillColor: 'FF0000',

//         onMouseover: function (evt) {
//             var parts = evt.key.split('-');
//             var part = parts[1];
//             highlightArea(part);
//         },

//         onMouseout: function (evt) {
//             var parts = evt.key.split('-');
//             var part = parts[1];
//             highlightAreaX(part);
//         },

//         onClick: function (e) {
//             console.log("clicked!!")
//             var newToolTip = defaultDipTooltip;
//             if ($.inArray(e.key, selectedItems) >= 0) {
//                 selectedItems.splice($.inArray(e.key, selectedItems), 1);
//             } else {
//                 selectedItems.push(e.key);
//             }
//             $('#selections').html(selectedItems.length > 0 ? "<b>Selected body Parts: </b>" + selectedItems.toString().replace(new RegExp('_', 'g'), " ").replace(new RegExp(',', 'g'), ", ") : "<b>Please select a body part</b>");
//         },
//     });

//     $('a').hover(function () {
//         var parts = $(this).closest('li').attr('class').split('-');
//         var part = parts[2];
//         highlightArea(part);
//     });

//     $('a').mouseleave(function () {
//         var parts = $(this).closest('li').attr('class').split('-');
//         var part = parts[2];
//         highlightAreaX(part);
//     });

// });

// function highlightArea(key) {
//     $('area[name=part-' + key + ']').mouseenter();
//     $('a').removeClass('hover');
//     $('li.menu-item-' + key + ' a').addClass('hover');
// }

// function highlightAreaX(key) {
//     $('area[name=part-' + key + ']').mouseout();
//     $('li.menu-item-' + key + ' a').removeClass('hover');
// }