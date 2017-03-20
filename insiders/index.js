var fs = require('fs');
var path = require('path');
var dialogs = require('./insiders/util/dialog.js');
var cryptaes = require('./insiders/util/aes.js');
var cryptmr = require('./insiders/util/crypt.js');

var current_page = null;

var BUTTONS = {
    NEW_NOTE    : 0,
    ALL_NOTES   : 1,
    LAST_NOTE   : 2,
    SETTINGS    : 3,
    QUIT        : 4
}

var PAGES = {
    NEW_NOTE    : 0,
    ALL_NOTES   : 1,
    LAST_NOTE   : 2,
    SETTINGS    : 3
}

var CRYPT = {
    NONE        : 0,
    MR          : 1,
    AES         : 2
}

var public_key = "encryption";

function init(){
    if(current_page === null){
        init_page(PAGES.NEW_NOTE);
    }
}

function init_page(pid){
    if(current_page != null && current_page.id == pid)
        return;

    var page = get_page_by_id(pid);
    if(page == null)
        return;
    if(current_page != null){
        var parent = document.getElementById("page-content");
        while (parent.firstChild) 
            parent.removeChild(parent.firstChild);
    }

    current_page = page;

    document.getElementById("page-title").innerHTML = current_page.title;

    document.getElementById("page-content").appendChild(current_page.content);
}

function get_page_by_id(id){

    if      (id == PAGES.NEW_NOTE)  return new page_NewNote();
    else if (id == PAGES.ALL_NOTES) return new page_AllNotes();
    else if (id == PAGES.SETTINGS)  return new page_Settings();
    else                            return null;

}

function try_open_file(){
    var p = path.join(__dirname,"notes","note0.json");

    var f = fs.readFileSync(p, 'utf8');

    var data = JSON.parse(f);

    if(data.hasOwnProperty("name") && data.hasOwnProperty("data")){
        console.log("Correct note.");
        console.log(data.name +":");
        console.log(data.data);
    }
    else{
        console.log("Corrupted note.");
    }
}

function button_activator(button_id){
    switch(button_id){
        case BUTTONS.NEW_NOTE: {
            init_page(PAGES.NEW_NOTE);
            break;
        }
        case BUTTONS.ALL_NOTES: {
            init_page(PAGES.ALL_NOTES);
            break;
        }
        case BUTTONS.LAST_NOTE: {
            init_page(PAGES.LAST_NOTE);
            break;
        }
        case BUTTONS.SETTINGS: {
            init_page(PAGES.SETTINGS);
            break;
        }
        case BUTTONS.QUIT: {
            dialogs.confirm("Are you sure?",
                ()=>{
                    window.close();
                }
            );
            break;
        }
    }

}

window.onload = init;

window.onresize = function(){
    var pages_width = window.outerWidth - (document.getElementById("menu").offsetWidth);
    document.getElementById("page").style.width = pages_width+"px";
}
