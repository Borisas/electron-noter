module.exports = {
    generateModifier    : function (lock){
        var m = 0;
        var s = 0;

        for( var i in lock ){
            if( i % 2 == 0 )    m += lock[i].charCodeAt();
            else                m -= lock[i].charCodeAt();

            s += lock[i].charCodeAt();
        }

        return parseInt((m+s).toString(8));
    },
    encrypt             : function (input,lock){
        var encrypted   = "";
        var mod         = this.generateModifier(lock);
        var j           = 0;

        for( var i in input ){
            var char_val    = input[i].charCodeAt();
            var product     = char_val * mod;

            encrypted       += product.toString(16)
                + (i == input.length-1 ? "" :" ");

            if(i % 2 == 0)  mod += lock[j].charCodeAt();
            else            mod -= lock[j].charCodeAt();

            j++;
            if( j > lock.length -1 ) j = 0;
        }
        return encrypted;
    },
    decrypt             : function (input,lock){
        var decrypted   = "";
        var mod         = this.generateModifier(lock);
        var j           = 0;

        var characters  = input.split(" ");

        for( var i in characters ){
            var char_val = 0;
            var product  = 0;

            product = parseInt(characters[i], 16);
            char_val = product/mod;

            decrypted += String.fromCharCode(char_val);

            if( i % 2 == 0) mod += lock[j].charCodeAt();
            else            mod -= lock[j].charCodeAt();

            j++;
            if( j > lock.length - 1 ) j = 0;
        }

        return decrypted;
    }
};