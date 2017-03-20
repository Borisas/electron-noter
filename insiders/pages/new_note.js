function page_NewNote(){
    this.title      = "New Note";
    this.content    = document.createElement("div");
    this.id         = 0;

    this.init       = function(){

        var self = this;

        var button_reset        = document.createElement("div");
        var button_save         = document.createElement("div");
        var entry_title         = document.createElement("input");
        var entry_content       = document.createElement("textarea");
        var select_encryption   = document.createElement("div");
        // Initialised in box encryption init:
        var keyentry_encryption = document.createElement("div");
        var key_input_encrypt   = document.createElement("input");
        var title_encryption    = document.createElement("div");
        // ----

        {// entry title init
            entry_title.type = "text";
            entry_title.className = "title";
            entry_title.placeholder = "Note Title Here";
        }

        {// entry content init
            entry_content.className = "content";
            entry_content.placeholder = "Note Content Here";
        }

        {// button save init
            button_save.className = "save newnotebutton";
            button_save.innerHTML = "Save";
            button_save.addEventListener("click", ()=>{
                if(entry_title.value == "" || entry_content.value == "")
                    return;
                    
                create_note_file(
                    entry_title.value, 
                    entry_content.value,
                    { type: select_encryption.dataset.enc, key : key_input_encrypt.value }
                );
                entry_content.value = "";
                entry_title.value = "";

                var c_selected = document.getElementById("enc_selected");
                if(c_selected != select_0){
                    c_selected.id = "";
                    select_0.id = "enc_selected";
                    select_encryption.dataset.enc = 0;
                }
                key_input_encrypt.value = "";

                keyentry_encryption.style.display = "none";
                title_encryption.style.display = "block";
            },true);
        }
        
        {// button reset init
            button_reset.className = "reset newnotebutton";
            button_reset.innerHTML = "Reset";
            button_reset.addEventListener("click", ()=>{
                content_entry.value = "";
                title_entry.value = "";
            },true);
        }

        {// box encryption init
            select_encryption.className = "crypto";

            var select_0    = document.createElement("div");
            var select_1    = document.createElement("div");
            var select_2    = document.createElement("div");
            var wrapper     = document.createElement("div");

            title_encryption.className = "title";
            title_encryption.innerHTML = "Encryption";

            wrapper.className = "select_wrapper";

            select_0.className = "select";
            select_0.innerHTML = "None";
            select_0.id = "enc_selected";
            select_0.addEventListener("click", ()=>{
                var c_selected = document.getElementById("enc_selected");
                if(c_selected != select_0){
                    c_selected.id = "";
                    select_0.id = "enc_selected";
                    select_encryption.dataset.enc = 0;

                    keyentry_encryption.style.display = "none";
                    title_encryption.style.display = "block";
                }
            },true);

            select_1.className = "select";
            select_1.innerHTML = "MR";
            select_1.addEventListener("click", ()=>{
                var c_selected = document.getElementById("enc_selected");
                if(c_selected != select_1){
                    c_selected.id = "";
                    select_1.id = "enc_selected";
                    select_encryption.dataset.enc = 1;

                    keyentry_encryption.style.display = "table";
                    title_encryption.style.display = "none";
                }
            },true);

            select_2.className = "select";
            select_2.innerHTML = "AES";
            select_2.addEventListener("click", ()=>{
                var c_selected = document.getElementById("enc_selected");
                if(c_selected != select_2){
                    c_selected.id = "";
                    select_2.id = "enc_selected";
                    select_encryption.dataset.enc = 2;

                    keyentry_encryption.style.display = "table";
                    title_encryption.style.display = "none";
                }
            },true);

            select_encryption.dataset.enc = 0;
            
            keyentry_encryption.className = "key_entry_block";

            var text = document.createElement("span");
            text.innerHTML = "Key: ";
            
            key_input_encrypt.className   = "key_entry_input";

            keyentry_encryption.appendChild(text);
            keyentry_encryption.appendChild(key_input_encrypt);
            wrapper.appendChild(select_0);
            wrapper.appendChild(select_1);
            wrapper.appendChild(select_2);
            select_encryption.appendChild(title_encryption);
            select_encryption.appendChild(wrapper);
            select_encryption.appendChild(keyentry_encryption);
        }

        this.content.appendChild(select_encryption);
        this.content.appendChild(entry_content);
        this.content.appendChild(entry_title);
        this.content.appendChild(button_save);
        this.content.appendChild(button_reset);
    };

    this.init();
}