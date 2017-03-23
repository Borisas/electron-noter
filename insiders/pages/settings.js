function page_Settings(){
    this.title      = "Settings";
    this.content    = document.createElement("div");
    this.id         = 2;

    this.init       = function(){
        
        var p = path.join(__dirname,"settings.json");
        var f = fs.readFileSync(p, 'utf8');

        var data = JSON.parse(f);

        console.log(data);

        this.content.innerHTML = "Version: "+data.version;

        this.content.style.color = "#FFFFFF";
        this.content.style.textAlign = "center";
        this.content.style.verticalAlign = "middle";
        this.content.style.lineHeight = "20px";
        this.content.style.fontFamily = "titilium-light";
        this.content.style.fontSize = "20px";

        var devtools_button = document.createElement("div");

        {// init devtools_button
            devtools_button.className = "settings_devtools_button dark_hover";
            devtools_button.innerHTML = "Open DevTools";
            devtools_button.addEventListener('click',()=>{
			    electron.remote.getCurrentWindow().openDevTools();
            },true);
        }

        this.content.appendChild(devtools_button);
    };

    this.init();
}