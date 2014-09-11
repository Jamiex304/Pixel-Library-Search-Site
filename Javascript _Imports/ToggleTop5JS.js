//Javascript to phase between box office list and popular list
window.switchIn = function () {
    $('#TopListWrapperMovie').fadeToggle(function() {
        $('#TopListWrapperTV').fadeToggle(function() {
            setTimeout(function() {window.switchOut();}, 3500);
        });
    });
    
}

window.switchOut = function () {
    $('#TopListWrapperTV').fadeToggle(function() {
        $('#TopListWrapperMovie').fadeToggle(function() {
            setTimeout(function() {window.switchIn();}, 3500);
        });
    });

}

setTimeout(function() {window.switchIn();}, 500)
