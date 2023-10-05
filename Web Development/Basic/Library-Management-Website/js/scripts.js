$(document).ready(function() {
    $("#mySearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#filt tr").filter(function() {
            $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
        });
    });
});

$(document).ready(function () {   
   
    $(function () {
        $('#mySearch').datepicker({
            format: 'DD-MM-YYYY',
        });
      });

    $('#mySearch').on('dp.change', function (e) {
     var rex = new RegExp($(this).val(), "i");
    $("#books tr").hide();
    $("#books tr").filter(function () {
        return rex.test($(this).text());
    }).show();
    $(".noResults").hide();
    if ($("#books tr:visible").length == 0) {
        $(".noResults").show();
    }
    });  
});
