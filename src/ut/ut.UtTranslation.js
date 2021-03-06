/**
* Translations class. 
* 
* @class FM.UtTranslations
* @extends FM.Object
* @param {object} opt Options
*/    
FM.UtTranslations = function() {
    this._init.apply(this, arguments); // new poziva _init()
}
FM.extendClass(FM.UtTranslations,FM.Object); 

// properties
FM.UtTranslations.prototype.objectSubClass = "";
FM.UtTranslations.translationsLoaded = false;
FM.UtTranslations.loadedTranslations = {};

FM.UtTranslations.missingTranslations = {};

FM.UtTranslations.prototype._init = function(attrs) {
    this._super("_init",attrs);
    this.objectSubClass = "UtTranslations";
}


    
FM.UtTranslations.fetchTranslations = function(app,cbfn) {
    var callbackFn = FM.isset(cbfn) && FM.isFunction(cbfn) ? cbfn : function() {};
    var dmlist = new FM.DmList({},'getTranslations',app);     
    var lstnr = {
        onListEnd: function(sender,data) {
            FM.UtTranslations.translationsLoaded = true;
            
            FM.forEach(data.Added,function(id, obj) {
                // obj is generic value
                var dataid = FM.md5(obj.getAttr('value.text',''));
                
                FM.UtTranslations.loadedTranslations[dataid] = {
                    id: dataid,
                    text: obj.getAttr('value.text',''),
                    translation: obj.getAttr('value.translation','')
                };
                return true;
            });
            dmlist.removeListener(lstnr);
            dmlist.dispose();
            callbackFn(true);
            return true;
        },
        onListError: function(sender,data) {
            FM.UtTranslations.translationsLoaded = true;
            
            dmlist.removeListener(lstnr);
            dmlist.dispose();
            callbackFn(false,new FM.DmGenericError({
                messageId: -1,
                text: data
            }));
            return true;
        }
    };
    dmlist.addListener(lstnr);
    dmlist.getData();    
}
    
_T = function() { // text,app, params
    if(arguments.length < 2) return('');

    // nadji hash i prevedeni string
    var hash = FM.md5(arguments[0]);
    var str;
    
    if(FM.isset(FM.UtTranslations.loadedTranslations[hash])) {
        str = FM.UtTranslations.loadedTranslations[hash].translation;
    } else {
        str = arguments[0];
        console.log("Missing translation:" + arguments[0]);
        FM.UtTranslations.missingTranslations[hash]=arguments[0];
    }

    // ubaci podatke
    for(var i = 2; i < arguments.length; i++)  {
        str = str.replace("[:" + i + "]", arguments[i]);
    }

    // kraj
    return(str);    
}




