function page_Settings(){
    this.title      = "Settings";
    this.content    = document.createElement("div");
    this.id         = 2;

    this.init       = function(){
        
        var p = path.join(__dirname,"settings.json");
        var f = fs.readFileSync(p, 'utf8');

        var data = JSON.parse(f);

        console.log(data);

        this.content.innerHTML = "Version: "+data.version + "<br>" + "No settings yet. Don't really know if any needed.";

        this.content.style.color = "#FFFFFF";
        this.content.style.textAlign = "center";
        this.content.style.verticalAlign = "middle";
        this.content.style.lineHeight = "20px";
        this.content.style.fontFamily = "titilium-light";
        this.content.style.fontSize = "20px";
    };

    this.init();
}