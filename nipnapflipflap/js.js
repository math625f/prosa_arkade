let step = 1;
let animationDuration = 350;

$(document).ready(() => {
    $(".top, .north, .south, .west, .east").on('click', (el) => {
        if(step == 1){
            $("#container").removeClass('base');
        }
        
        if(step == 4){
            if(!el.target.classList.contains('top')){
                alert($(el.target).attr('data-reward'));
            }
        }else{
            if(el.target.classList.contains('top')){
                doStep(Number(el.target.innerText));
            }else{
                doStep(el.target.innerText.length);
            }
        }
    })
});

function toggle(){
    var old = $("#container").hasClass('horizontal') ? 'horizontal' : 'vertical';
    var now = (old == 'horizontal' ? 'vertical' : 'horizontal');

    $("#container").removeClass(old);
    setTimeout(() => {
        $("#container").addClass(now);
    }, animationDuration);
}

function doStep(n){
    for(let i = 0; i < n; i++){
        setTimeout(toggle, i * animationDuration * 2);
    }
    step++;
}