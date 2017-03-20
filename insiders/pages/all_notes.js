function page_AllNotes(){
    this.id         = 1;
    this.title      = "All Notes";
    this.content    = document.createElement("div");
    this.all_notes  = [];

    
    this.reload     = function(){
        while (this.content.firstChild) {
            this.content.removeChild(this.content.firstChild);
        }
        this.init();
    };
    this.init       = function(){
        
        var self        = this;
        
        var all_note_files = (()=>{
            var p       = path.join(__dirname,"notes");
            var notes   = fs.readdirSync(p);
            return notes;
        })();

        var link_note = (note)=>{

            if(note.enc == null){
                var button_delete       = note.dom.querySelector("#delete");
                var button_edit         = note.dom.querySelector("#edit");
                var button_fullscreen   = note.dom.querySelector("#fullscreen");

                button_delete.addEventListener("click", ()=>{
                    dialogs.confirm(
                        "Are you sure you want to delete this note?", 
                        ()=>{
                            delete_note_file(note.filepath);
                            self.reload();
                        }
                    );
                },true);

                button_fullscreen.addEventListener("click", ()=>{
                    var fullscreen = fullscreen_note(note);
                    while (self.content.firstChild) {
                        self.content.removeChild(self.content.firstChild);
                    }
                    self.content.parentElement.appendChild(fullscreen);
                },true);
                note.dom.addEventListener("dblclick",()=>{
                    var fullscreen = fullscreen_note(note);
                    while (self.content.firstChild) {
                        self.content.removeChild(self.content.firstChild);
                    }
                    self.content.parentElement.appendChild(fullscreen);
                },true);
            }
            else{
                var button_lock   = note.dom.querySelector("#lock");

                var self_level2 = self;

                button_lock.addEventListener("click", ()=>{
                    dialogs.input("Input key.",(key)=>{
                        var success = false;
                        var content = "";
                        if(note.enc == CRYPT.MR){
                            success = cryptmr.decrypt(note.public_key,key) == public_key;
                            content = cryptmr.decrypt(note.content,key);
                        }
                        else if(note.enc == CRYPT.AES){
                            success = cryptaes.AES.decrypt(note.public_key, key).toString(cryptaes.enc.Utf8) == public_key;
                            content = cryptaes.AES.decrypt(note.content,key).toString(cryptaes.enc.Utf8);
                        }

                        if(success){
                            note.content = content;
                            note.key = key;
                            var fullscreen = fullscreen_note(note);
                            while (self_level2.content.firstChild) {
                                self_level2.content.removeChild(self.content.firstChild);
                            }
                            self_level2.content.parentElement.appendChild(fullscreen);
                        }else{
                            dialogs.alert("Incorrect key.");
                        }
                    });
                },true);
            }
        };

        for(i in all_note_files){
            var note_full       = new note(all_note_files[i]);
            note_full.dom       = create_note_div(note_full);

            link_note(note_full);

            this.content.appendChild(note_full.dom);

            this.all_notes.push(note_full);
        }
    }

    this.init();
}