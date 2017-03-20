function note(file){
    
    var p = path.join(__dirname,"notes",file);
    var f = fs.readFileSync(p, 'utf8');

    var data = JSON.parse(f);

    this.title      = "";
    this.content    = "";
    this.dom        = null;
    this.filename   = file;
    this.filepath   = p;
    this.enc        = data.enc;
    this.public_key = data.public_key;

    if(data.hasOwnProperty("title") && data.hasOwnProperty("content")){

        this.title = data.title;
        this.content = data.content;
    }
    else{
        this.title = "Corrupted Note.";
        this.content = "This note is corrupted. Either edit it manually or delete it. Note filename : ("+file+")";
    }

}

function create_note_div(note){
    
    const max_title_length = 20;
    const max_content_length = 200;
    const max_content_lines = 6;

    var el              = document.createElement("div");
    var content         = document.createElement("div");
    var title           = document.createElement("div");
    var delete_ico      = document.createElement("div");
    var fullscreen_ico  = document.createElement("div");
    var lock_overlay    = document.createElement("div");

    el.className = "note";

    title.className="title";

    content.className="content";

    if(note.enc != null){
        title.innerHTML = "Encrypted";
        content.innerHTML = "Note is encrypted.<br>Note title:<br>"+note.title;

        lock_overlay.className = "lock_overlay";
        lock_overlay.id = "lock";

        el.appendChild(lock_overlay);
    }
    else{
        content.innerHTML = normalize_note_content(note.content, max_content_length,max_content_lines);
        title.innerHTML = (note.title.length <= max_title_length ?
            note.title :
            note.title.substring(0,max_title_length-3) + "..."
        );

        delete_ico.className="note_button note_button_delete";
        delete_ico.id = "delete";

        fullscreen_ico.className = "note_button note_button_fullscreen";
        fullscreen_ico.id = "fullscreen";

        el.appendChild(delete_ico);
        el.appendChild(fullscreen_ico);
    }
    
    el.appendChild(title);
    el.appendChild(content);
    

    return el;
}

function fullscreen_note(note){
    
    var hider       = document.createElement("div");
    var display     = document.createElement("div");

    var but_close   = document.createElement("div");
    var but_delete  = document.createElement("div");
    var but_edit    = document.createElement("div");
    var but_cancel  = document.createElement("div");
    var but_confirm = document.createElement("div");

    var ins_title   = document.createElement("div");
    var ins_content = document.createElement("div");
    var edit_title  = document.createElement("textarea");
    var edit_content= document.createElement("textarea");

    var edit_note   = ()=>{
        display.removeChild(ins_title);
        display.removeChild(ins_content);
        display.removeChild(but_edit);

        display.appendChild(edit_title);
        display.appendChild(edit_content);
        display.appendChild(but_confirm);
        display.appendChild(but_cancel);

        edit_content.value = note.content;
        edit_title.value = note.title;
    };

    {// init hider
        hider.style.width = "100%";
        hider.style.height = "100%";
        hider.style.top = "0";
        hider.style.left = "0";
        hider.style.background = "#303F9F";
        hider.style.zIndex = "2";
        hider.style.position = "absolute";
    }

    {// init display
        display.style.width = "90%";
        display.style.height = "90%";
        display.style.position = "relative";
        display.style.top = "5%";
        display.style.left = "5%";
        display.style.background = "#C5CAE9";
        display.style.boxShadow = "3px 3px 3px #101010";
    }

    {// button close init
        but_close.className = "note_button";
        but_close.style.top = "4px";
        but_close.style.right = "4px";
        but_close.style.backgroundImage = "url(icons/fullscreen_exit.png)";
        but_close.style.zIndex = "1";

        but_close.addEventListener("click", ()=>{
            hider.parentElement.removeChild(hider);
            current_page.reload();
        },true);
    }

    {// button edit init
        but_edit.className="note_button note_button_edit";
        but_edit.id = "edit";

        but_edit.addEventListener("click", edit_note,true);
    }

    {// button confirm init
        but_confirm.className = "note_button";
        but_confirm.id = "confirm";
        
        but_confirm.style.backgroundImage = "url(icons/confirm.png)";
        but_confirm.style.bottom = "6px";
        but_confirm.style.right = "66px";

        but_confirm.addEventListener("click",()=>{

            note.content = edit_content.value;
            note.title = edit_title.value;

            ins_title.innerHTML = note.title;
            ins_content.innerHTML = (()=>{
                return (note.content.split('<').join('&#60;').split('>').join('&#62;'));
            })();

            
            display.appendChild(ins_title);
            display.appendChild(ins_content);
            display.appendChild(but_edit);

            display.removeChild(edit_title);
            display.removeChild(edit_content);
            display.removeChild(but_confirm);
            display.removeChild(but_cancel);

            update_note_file(note);
            current_page.reload();
        },true);
    }

    {// button cancel init
    
        but_cancel.className = "note_button";
        but_cancel.id = "cancel";
        
        but_cancel.style.backgroundImage = "url(icons/cancel.png)";
        but_cancel.style.bottom = "6px";
        but_cancel.style.right = "36px";

        but_cancel.addEventListener("click",()=>{
            
            display.appendChild(ins_title);
            display.appendChild(ins_content);
            display.appendChild(but_edit);

            display.removeChild(edit_title);
            display.removeChild(edit_content);
            display.removeChild(but_confirm);
            display.removeChild(but_cancel);
        },true);
    }
    
    {// button delete init
        but_delete.className="note_button note_button_delete";
        but_delete.id = "delete";
        but_delete.addEventListener("click", ()=>{
                dialogs.confirm(
                    "Are you sure you want to delete this note?", 
                    ()=>{
                        delete_note_file(note.filepath);
                        hider.parentElement.removeChild(hider);
                        current_page.reload();
                    }
                );
            },true);
    }

    {// inside title init
        ins_title.style.width = "80%";
        ins_title.style.height = "60px";
        ins_title.style.marginLeft = "auto";
        ins_title.style.marginRight = "auto";
        ins_title.style.display = "block";
        ins_title.style.top = "30px";
        ins_title.style.position = "relative";
        ins_title.style.wordBreak = "break-all";

        ins_title.style.color = "#000000";
        ins_title.style.textAlign = "center";
        ins_title.style.fontFamily = "titilium-light";
        ins_title.style.fontSize = "20px";

        ins_title.style.borderBottom = "1px solid #FFFFFF";

        ins_title.style.overflowY = "auto";

        ins_title.innerHTML = note.title;

        ins_title.addEventListener("dblclick", edit_note, true);
    }

    {// inside content init
        
        ins_content.style.width = "80%";
        ins_content.style.height = "75%";
        ins_content.style.marginLeft = "auto";
        ins_content.style.marginRight = "auto";
        ins_content.style.display = "block";
        ins_content.style.top = "45px";
        ins_content.style.position = "relative";
        ins_content.style.wordBreak = "break-all";

        ins_content.style.color = "#000000";
        ins_content.style.fontFamily = "titilium-light";
        ins_content.style.fontSize = "15px";
        
        ins_content.style.overflowY = "auto";

        ins_content.innerHTML = normalize_note_content_nomaxlength(note.content);

        ins_content.addEventListener("dblclick", edit_note, true);
    }

    {// edit title init
        edit_title.className = "fs_edit";

        edit_title.style.resize = "none";
        edit_title.style.width = "80%";
        edit_title.style.height = "60px";
        edit_title.style.marginLeft = "auto";
        edit_title.style.marginRight = "auto";
        edit_title.style.display = "block";
        edit_title.style.top = "30px";
        edit_title.style.position = "relative";

        edit_title.style.color = "#000000";
        edit_title.style.textAlign = "center";
        edit_title.style.fontFamily = "titilium-light";
        edit_title.style.fontSize = "20px";

        edit_title.style.borderTop = "0";
        edit_title.style.borderLeft = "0";
        edit_title.style.borderRight = "0";
        edit_title.style.borderBottom = "1px solid #FFFFFF";
    }

    {// edit content init
        
        edit_content.className = "fs_edit";

        edit_content.style.resize = "none";

        edit_content.style.width = "80%";
        edit_content.style.height = "75%";
        edit_content.style.marginLeft = "auto";
        edit_content.style.marginRight = "auto";
        edit_content.style.display = "block";
        edit_content.style.top = "45px";
        edit_content.style.position = "relative";
        edit_content.style.wordBreak = "break-all";

        edit_content.style.color = "#000000";
        edit_content.style.fontFamily = "titilium-light";
        edit_content.style.fontSize = "15px";

        edit_content.style.borderLeft = "1px solid #FFFFFF";
        edit_content.style.borderRight = "1px solid #FFFFFF";
        edit_content.style.borderTop = "0";
        edit_content.style.borderBottom = "0";
        
        edit_content.style.overflowY = "auto";
    }

    display.appendChild(but_close);
    display.appendChild(but_delete);
    display.appendChild(but_edit);
    display.appendChild(ins_title);
    display.appendChild(ins_content);
    hider.appendChild(display);

    return hider;
}

function create_note_file(title, content, enc){

    var note_data = {
        "title" : title,
        "content" : content,
        "date" : new Date().toLocaleString(),
        "enc" : null,
        "public_key" : null
    };

    if(enc.type != 0){
        note_data.enc = enc.type;
        var encrypted_content = null;
        var encrypted_public_key = "";

        if (enc.type == CRYPT.MR){
            encrypted_content = cryptmr.encrypt(content,enc.key);
            encrypted_public_key = cryptmr.encrypt(public_key,enc.key);
        }
        else if (enc.type == CRYPT.AES){
            encrypted_content = cryptaes.AES.encrypt(content, enc.key).toString();
            encrypted_public_key = cryptaes.AES.encrypt(public_key, enc.key).toString();
        }

        note_data.content = encrypted_content;
        note_data.public_key = encrypted_public_key;
    }
    

    var save = JSON.stringify(note_data);

    var filename = uniqid();

    var p = path.join(__dirname,"notes",filename);

    fs.writeFileSync(p, save);
}

function delete_note_file(path){
    fs.unlinkSync(path);
}

function update_note_file(note){
    var note_data = {
        "title" : note.title,
        "content" : note.content,
        "date" : new Date().toLocaleString(),
        "enc" : null
    };

    if(note.enc != 0){
        note_data.enc = note.enc;
        var encrypted_content = null;
        var encrypted_public_key = "";

        if (note.enc == CRYPT.MR){
            encrypted_content = cryptmr.encrypt(note.content,note.key);
        }
        else if (note.enc == CRYPT.AES){
            encrypted_content = cryptaes.AES.encrypt(note.content, note.key).toString();
        }

        note_data.content = encrypted_content;
        note_data.public_key = note.public_key;
    }

    var save = JSON.stringify(note_data);

    var p = path.join(__dirname,"notes",note.filename);

    fs.writeFileSync(p, save);
}

function normalize_note_content(content,max,maxlines){
    var c = content;
    
    // ** NO HTML ALLOWED LUL
    c = c.split('<').join('&#60;');
    c = c.split('>').join('&#62;');
    // **

    c = c.split('\n').join('<br>');
    
    c = (c.length <= max ?
        c :
        c.substring(0,max-3) + "..."
    );

    var n = 0;
    var last = 0;
    while((last = c.indexOf('<br>', last+1)) != -1){
        n++;

        if(n > maxlines){
            c = c.substring(0,last) + "...";
        }
    }

    return c;
}

function normalize_note_content_nomaxlength(content,max,maxlines){
    var c = content;
    
    // ** NO HTML ALLOWED LUL
    c = c.split('<').join('&#60;');
    c = c.split('>').join('&#62;');
    // **

    c = c.split('\n').join('<br>');
    

    return c;
}