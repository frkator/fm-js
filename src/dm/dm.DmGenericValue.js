/**
* Generic value DM class.
* 
* @class FM.DmGenericValue
* @extends FM.DmObject
* @memberOf FM
* @param {object} attrs list of attribute name and values
*/    

FM.DmGenericValue = function() {
    this._init.apply(this, arguments); 
}
FM.extendClass(FM.DmGenericValue, FM.DmObject); 
FM.DmGenericValue.className = "DmGenericValue";

// methods
FM.DmGenericValue.prototype._init = function(attrs) {
    this._super("_init",attrs, {
        value: ""
    });
    this.objectSubClass = "GenericValue";
}
        
FM.DmGenericValue.prototype.getDataID = function() {
    return this.getID();
}

FM.DmObject.addSubClassType('GenericValue',FM.DmGenericValue,'GLOBAL');
