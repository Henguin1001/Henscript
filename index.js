//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Author: Henry Troutman, henguin1001@gmail.com, henrytroutman.com, hen.ventures                               //
// Henscript, a redefinition of javascript                                                                      //
// It may not be practical, but it is certainly existant                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
// Here are all the global redefinitions (may cause conflict) //
////////////////////////////////////////////////////////////////

// Add a map function to an object
Object.prototype.map = function(callback){
	var outcome = {}, key;
	for(key in this) {
	    if(this.hasOwnProperty(key)) {
	        var callbackReturn = callback(this[key],key,this);
	        if(callbackReturn) outcome[key] = callbackReturn;

	    }
	}
	return outcome;
};

// get the number of properties/fields in an object
Object.prototype.size = function() {
	var size = 0,
		key;
	for (key in this) {
		if (this.hasOwnProperty(key)) size++;
	}
	return size;
};
/**
 * gets whether an object is equal to the contained object
 * @param  {object}   object   the object to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Object.prototype.equals = function(object, callback) {
	if (callback && this == object) return callback();
	else return this == object;
};
/**
 * gets whether an object is greater than the contained object
 * @param  {object}   object   the object to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Object.prototype.greater = function(object, callback) {
	if (callback && this > object) return callback();
	else return this > object;
};
/**
 * gets whether an object is greater than or equal to the contained object
 * @param  {object}   object   the object to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Object.prototype.greater_equal = function(object, callback) {
	if (callback && this >= object) return callback();
	else return this >= object;
};
/**
 * gets whether an object is less than the contained object
 * @param  {object}   object   the object to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Object.prototype.less = function(object, callback) {
	if (callback && this < object) return callback();
	else return this < object;
};
/**
 * gets whether an object is less than or equal to the contained object
 * @param  {object}   object   the object to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Object.prototype.less_equal = function(object, callback) {
	if (callback && this <= object) return callback();
	else return this <= object;
};


/////////////////////////////////////////////////////////////
// Here all the henscript functions                        //
// (Attatched to an object so there should be no conflict) //
/////////////////////////////////////////////////////////////

function Henscript() {

}
/**
 * when passed true the callback is called
 * @param  {boolean}   condition whether the condition is met
 * @param  {Function}  callback  called when the condition is met
 * @return {ConditionResponse}             A condition response object
 */
Henscript.prototype.if = function(condition, callback) {
	if (condition) callback();
	return new ConditionResponse(condition);
};

// relies upon object redefinitions
Henscript.prototype.switch = function(value,callbacks){
	var conditionMet = callbacks.map(function(element,index){
		if(index==value){
			element(index);	
			return element;
		} 
	}).size() > 0;
	return new ConditionResponse(conditionMet);
}
Henscript.prototype.while = function(condition_loop,callback_loop){
	if(!condition_loop()) return new ConditionResponse(false);
	while(condition_loop())callback_loop();
	return new ConditionResponse(true);
}

Henscript.prototype.for = function(condition_loop,callback_loop,callback_sequence){
	if(!condition_loop()) return new ConditionResponse(false);
	while(condition_loop()){
		callback_loop();
		callback_sequence();
	}
	return new ConditionResponse(true);
}

// Very similar to the ones attatched to Object,
// However they will return a condition response

Henscript.prototype.equals = function(a, b, callback) {
	if (callback && a == b) callback();
	return new ConditionResponse(a == b);
};
Henscript.prototype.greater = function(a, b, callback) {
	if (callback && a > b) callback();
	return new ConditionResponse(a > b);
};
Henscript.prototype.greater_equal = function(a, b, callback) {
	if (callback && a >= b) callback();
	return new ConditionResponse(a >= b);
};
Henscript.prototype.less = function(a, b, callback) {
	if (callback && a < b) callback();
	return new ConditionResponse(a < b);
};
Henscript.prototype.less_equal = function(a, b, callback) {
	if (callback && a <= b) callback();
	return new ConditionResponse(a <= b);
};

/**
 * An object that holds all sorts of functions usefull after a condition has been tested
 * @param {boolean} condition the value of the previous operation
 */
function ConditionResponse(condition) {
	this.value = condition;
}
ConditionResponse.prototype.elseif = function(condition,callback){
	if(!this.value) return Henscript.prototype.if(condition, callback);
};
ConditionResponse.prototype.else = function(callback) {

	if(!this.value) callback();
	return this.value;
}

// Check if browser or nodejs
if(typeof exports === 'undefined'){
	this['henscript'] = new Henscript();	
} else {
	module.exports = new Henscript();
}
