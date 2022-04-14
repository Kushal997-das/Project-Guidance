function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');
    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
        document.getElementById("cardheader").style.display = "none";
    }
    else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        window.setTimeout(function () {
            document.getElementById("cardheader").style.display = "block";
        }, 400);
    }

}