module.exports = {

    confirm:function(msg, yes){

        var hider       = document.createElement("div");
        var button_yes  = document.createElement("div");
        var dialog      = document.createElement("div");
        var button_no   = document.createElement("div");
        var message     = document.createElement("div");

        var dialog_width = 400;
        var dialog_height = 150;

        { // HIDER INIT
            hider.style.width = "100%";
            hider.style.height = "100%";
            hider.style.position = "absolute";
            hider.style.top = "0";
            hider.style.left = "0";
            hider.style.background = "rgba(0,0,0,0.2)";
            hider.style.zIndex = "100";

            hider.addEventListener("click",  (ev)=>{
                if(ev.target == hider){
                    ev.stopPropagation();
                    document.body.removeChild(hider);
                }
            }, true);
        }

        { //DIALOG INIT
            dialog.style.height = dialog_height + "px";
            dialog.style.width = dialog_width + "px";
            dialog.style.background = "#3F51B5";
            dialog.style.margin = (-dialog_height/2) +"px 0 0 "+(-dialog_width/2)+"px";
            dialog.style.top = "50%";
            dialog.style.left = "50%";
            dialog.style.position = "absolute";
            dialog.style.border = "1px solid #BDBDBD";
            dialog.style.cursor = "default";
            dialog.style.zIndex = 101;
        }

        { // BUTTON_YES INIT
            button_yes.className = "dark_hover";
            button_yes.style.width = ((dialog_width*0.5))+"px";
            button_yes.style.height = (dialog_height/4)+"px";
            button_yes.style.position = "absolute";
            button_yes.style.bottom =  "0";
            button_yes.style.left = "0";
            // button_yes.style.borderTop = "1px solid white";
            // button_yes.style.borderRight = "1px solid white";
            button_yes.style.color = "#FFFFFF";
            button_yes.style.textAlign = "center";
            button_yes.style.lineHeight = "37px";
            button_yes.style.fontFamily = "titilium-light";
            button_yes.style.fontSize = "25px";
            button_yes.style.cursor = "default";
            button_yes.style.userSelect = "none";
            
            button_yes.addEventListener("click", (ev)=>{
                if(ev.target == button_yes){
                    yes();
                    document.body.removeChild(hider);
                }
            }, true);

            button_yes.innerHTML = "YES";
        }

        { // BUTTON_NO INIT
            button_no.className = "dark_hover";
            button_no.style.width = ((dialog_width*0.5))+"px";
            button_no.style.height = (dialog_height/4)+"px";
            button_no.style.position = "absolute";
            button_no.style.bottom =  "0";
            button_no.style.right = "0";
            // button_no.style.borderTop = "1px solid white";
            // button_no.style.borderLeft = "1px solid white";
            button_no.style.color = "#FFFFFF";
            button_no.style.textAlign = "center";
            button_no.style.lineHeight = "37px";
            button_no.style.fontFamily = "titilium-light";
            button_no.style.fontSize = "25px";
            button_no.style.cursor = "default";
            button_no.style.userSelect = "none";

            button_no.innerHTML = "NO";

            button_no.addEventListener("click", (ev)=>{
                if(ev.target == button_no){
                    document.body.removeChild(hider);
                }
            }, true);
        }

        { // MESSAGE INIT
            message.style.width = dialog_width +"px";
            message.style.height = (dialog_height*2/3) + "px";
            message.style.color = "#FFFFFF";
            message.style.textAlign = "center";
            message.style.fontFamily = "titilium-light";
            // message.style.lineHeight = (dialog_height*2/3) + "px";
            message.style.fontSize = "25px";
            message.style.userSelect = "none";

            message.innerHTML = msg;
        }
        
        dialog.appendChild(button_yes);
        dialog.appendChild(button_no);
        dialog.appendChild(message);
        hider.appendChild(dialog);
        document.body.appendChild(hider);

    },

    input:function(msg,on_ok){

        var hider       = document.createElement("div");
        var dialog      = document.createElement("div");
        var dialog_title= document.createElement("div");
        var dialog_input= document.createElement("div");
        var dialog_click= document.createElement("div");
        var input_block = document.createElement("input");
        
        var dialog_width = 500;
        var dialog_height = 150;

        { // HIDER INIT
            hider.style.width = "100%";
            hider.style.height = "100%";
            hider.style.position = "absolute";
            hider.style.top = "0";
            hider.style.left = "0";
            hider.style.background = "rgba(0,0,0,0.2)";
            hider.style.zIndex = "100";

            hider.addEventListener("click",  (ev)=>{
                if(ev.target == hider){
                    ev.stopPropagation();
                    document.body.removeChild(hider);
                }
            }, true);
        }
        { //DIALOG INIT
            dialog.style.height = dialog_height + "px";
            dialog.style.width = dialog_width + "px";
            dialog.style.background = "#3F51B5";
            dialog.style.margin = (-dialog_height/2) +"px 0 0 "+(-dialog_width/2)+"px";
            dialog.style.top = "50%";
            dialog.style.left = "50%";
            dialog.style.position = "absolute";
            dialog.style.border = "1px solid #BDBDBD";
            dialog.style.cursor = "default";
            dialog.style.zIndex = 101;
        }
        { // DIALOG TITLE INIT
            dialog_title.style.width = dialog_width*1+"px";
            dialog_title.style.height= dialog_height*0.5+"px";
            dialog_title.style.color = "#FFFFFF";
            dialog_title.style.textAlign = "center";
            dialog_title.style.fontFamily = "titilium-light";
            dialog_title.style.fontSize = "25px";
            dialog_title.style.userSelect = "none";

            dialog_title.innerHTML = msg;
        }
        { // DIALOG INPUT INIT
            dialog_input.style.width = dialog_width*0.8+"px";
            dialog_input.style.height= dialog_height*0.2+"px";
            dialog_input.style.margin = "auto";
            dialog_input.style.backgroundColor = "green";

            input_block.style.width = "100%";
            input_block.style.height = "100%";
            input_block.style.background = "#3F51B5";
            input_block.style.borderBottom = "2px solid white";
            input_block.style.borderTop = "0";
            input_block.style.borderLeft = "0";
            input_block.style.borderRight = "0";
            input_block.style.color = "#FFFFFF";
            input_block.style.textAlign = "center";
            input_block.style.fontFamily = "titilium-light";
            input_block.style.fontSize = "25px";

            input_block.addEventListener("focus", ()=>{
                input_block.style.outlineWidth = "0";
                input_block.style.backgroundColor = "#5566c3";
            });
            input_block.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    button_ok.click();
                }
            });

            dialog_input.appendChild(input_block);
        }
        { // DIALOG CLICK INIT
            dialog_click.style.width = "100%";
            dialog_click.style.height= "25%";
            dialog_click.style.bottom = "0";
            dialog_click.style.position = "absolute";

            var button_ok = document.createElement("div");
            button_ok.className = "dark_hover";
            button_ok.style.width = "50%";
            button_ok.style.height = "100%";
            button_ok.style.display = "inline-block";
            button_ok.style.color = "#FFFFFF";
            button_ok.style.textAlign = "center";
            button_ok.style.fontFamily = "titilium-light";
            button_ok.style.fontSize = "25px";
            button_ok.style.userSelect = "none";
            button_ok.innerHTML = "OK";
            button_ok.addEventListener("click",  (ev)=>{
                if(ev.target == button_ok){
                    if(on_ok != null)
                        on_ok(input_block.value);
                    ev.stopPropagation();
                    document.body.removeChild(hider);
                }
            }, true);

            var button_cancel = document.createElement("div");
            button_cancel.className = "dark_hover";
            button_cancel.style.width = "50%";
            button_cancel.style.height = "100%";
            button_cancel.style.display = "inline-block";
            button_cancel.style.color = "#FFFFFF";
            button_cancel.style.textAlign = "center";
            button_cancel.style.fontFamily = "titilium-light";
            button_cancel.style.fontSize = "25px";
            button_cancel.style.userSelect = "none";
            button_cancel.innerHTML = "Cancel";
            button_cancel.addEventListener("click",  (ev)=>{
                if(ev.target == button_cancel){
                    ev.stopPropagation();
                    document.body.removeChild(hider);
                }
            }, true);

            dialog_click.appendChild(button_cancel);
            dialog_click.appendChild(button_ok);

        }

        hider.appendChild(dialog);

        dialog.appendChild(dialog_title);
        dialog.appendChild(dialog_input);
        dialog.appendChild(dialog_click);

        document.body.appendChild(hider);

        input_block.focus();
    },

    alert:function(msg){
        var hider       = document.createElement("div");
        var button_ok  = document.createElement("div");
        var dialog      = document.createElement("div");
        var message     = document.createElement("div");

        var dialog_width = 400;
        var dialog_height = 150;

        { // HIDER INIT
            hider.style.width = "100%";
            hider.style.height = "100%";
            hider.style.position = "absolute";
            hider.style.top = "0";
            hider.style.left = "0";
            hider.style.background = "rgba(0,0,0,0.2)";
            hider.style.zIndex = "100";

            hider.addEventListener("click",  (ev)=>{
                if(ev.target == hider){
                    ev.stopPropagation();
                    document.body.removeChild(hider);
                }
            }, true);
        }

        { //DIALOG INIT
            dialog.style.height = dialog_height + "px";
            dialog.style.width = dialog_width + "px";
            dialog.style.background = "#3F51B5";
            dialog.style.margin = (-dialog_height/2) +"px 0 0 "+(-dialog_width/2)+"px";
            dialog.style.top = "50%";
            dialog.style.left = "50%";
            dialog.style.position = "absolute";
            dialog.style.border = "1px solid #BDBDBD";
            dialog.style.cursor = "default";
            dialog.style.zIndex = 101;
        }

        { // BUTTON_YES INIT
            button_ok.className = "dark_hover";
            button_ok.style.width = ((dialog_width*1))+"px";
            button_ok.style.height = (dialog_height/4)+"px";
            button_ok.style.position = "absolute";
            button_ok.style.bottom =  "0";
            button_ok.style.left = "0";
            // button_yes.style.borderTop = "1px solid white";
            // button_yes.style.borderRight = "1px solid white";
            button_ok.style.color = "#FFFFFF";
            button_ok.style.textAlign = "center";
            button_ok.style.lineHeight = "37px";
            button_ok.style.fontFamily = "titilium-light";
            button_ok.style.fontSize = "25px";
            button_ok.style.cursor = "default";
            button_ok.style.userSelect = "none";
            
            button_ok.addEventListener("click", (ev)=>{
                if(ev.target == button_ok){
                    document.body.removeChild(hider);
                }
            }, true);

            button_ok.innerHTML = "OK";
        }

        { // MESSAGE INIT
            message.style.width = dialog_width +"px";
            message.style.height = (dialog_height*2/3) + "px";
            message.style.color = "#FFFFFF";
            message.style.textAlign = "center";
            message.style.fontFamily = "titilium-light";
            // message.style.lineHeight = (dialog_height*2/3) + "px";
            message.style.fontSize = "25px";
            message.style.userSelect = "none";

            message.innerHTML = msg;
        }
        
        dialog.appendChild(button_ok);
        dialog.appendChild(message);
        hider.appendChild(dialog);
        document.body.appendChild(hider);

    }
};