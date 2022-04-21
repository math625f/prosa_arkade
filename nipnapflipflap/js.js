$(document).ready(() => {
    $(document).on('click', () => {
        toggle();
    })
});

function toggle(){
    var old = $("#container").hasClass('horizontal') ? 'horizontal' : 'vertical';
    var now = (old == 'horizontal' ? 'vertical' : 'horizontal');

    $("#container").removeClass(old);
    setTimeout(() => {
        $("#container").addClass(now);
    }, 500);

}