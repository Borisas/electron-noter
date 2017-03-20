
function animation_module(delta, obj, start, end, time){
    if(time === undefined){
        time = 0;
        obj.id = "active";
    }

    var delay = 1000/60;
    var current = (start + ((end-start)/delta)*time);
    obj.style.width = current + "px";

    if(current == end || Math.abs(current-end) < 0.1){
        obj.id = "";
        return;
    }

    setTimeout( ()=>{
        animation_module(delta,obj,start,end, time+delay);
    }, delay);
}