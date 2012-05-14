var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
 
document.addEventListener('DOMContentLoaded', scroll, false);

function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
        fromPage.removeClass("current fade out");
        toPage.removeClass("fade in")
    });
    fromPage.addClass("fade out");
}