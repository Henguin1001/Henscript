//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Author: Henry Troutman, henguin1001@gmail.com, henrytroutman.com, hen.ventures                               //
// Henscript, a redefinition of javascript                                                                      //
// It may not be practical, but it is certainly existant                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
// Here are all the global definitions (may cause conflict) //
//////////////////////////////////////////////////////////////

////////////////////////
// Object definitions //
////////////////////////

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

Object.prototype.size = function() {
	var size = 0,
		key;
	for (key in this) {
		if (this.hasOwnProperty(key)) size++;
	}
	return size;
};

Object.prototype.equals = function(obj, callback) {
	if(!callback) return this==obj; 
	else if (this == obj) callback();
	return new ConditionResponse(this == obj);
};
Object.prototype.equal = Object.prototype.equals;

Object.prototype.not_equal = function(obj, callback) {
	if(!callback) return this!=obj; 
	else if (this != obj) callback();
	return new ConditionResponse(this != obj);
};


/////////////////////////
// Boolean definitions //
/////////////////////////

Boolean.prototype.and = function(that){
	return this && that;
};
Boolean.prototype.or = function(that){
	return this || that;
};
Boolean.prototype.not = function(){
	return !this;
};
Boolean.prototype.bang = Boolean.prototype.not;
Boolean.prototype.condition = function(callback_or_value_true, callback_or_value_false) {
	// have to have equals since it would normally return true
	// since it is a non-null value
	if (this==true) {
		if (typeof callback_or_value_true == 'function') return callback_or_value_true();
		else return callback_or_value_true;
	} else {
		if (typeof callback_or_value_false == 'function') return callback_or_value_false();
		else return callback_or_value_false;
	}
};

////////////////////////
// Number definitions //
////////////////////////

/**
 * gets whether an object is not equal to the contained object
 * @param  {object}   object   the object to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Number.prototype.greater = function(number, callback) {
	if (callback && this > obj) callback();
	return new ConditionResponse(this > obj);
};

/**
 * gets whether an number is greater than the contained number
 * @param  {number}   number   the number to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Number.prototype.greater_equal = function(number, callback) {
	if (callback && this >= obj) callback();
	return new ConditionResponse(this >= obj);
};
/**
 * gets whether an number is greater than or equal to the contained number
 * @param  {number}   number   the number to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Number.prototype.less = function(number, callback) {
	if (callback && this < obj) callback();
	return new ConditionResponse(this < obj);
};
/**
 * gets whether an number is less than the contained number
 * @param  {number}   number   the number to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Number.prototype.less = function(number, callback) {
	if (callback && this < number) return callback();
	else return this < number;
};
/**
 * gets whether an number is less than or equal to the contained number
 * @param  {number}   number   the number to compare to
 * @param  {Function} callback when it is true this is called
 * @return {boolean}            the outcome of the comparison
 */
Number.prototype.less_equal = function(number, callback) {
	if (callback && this <= obj) callback();
	return new ConditionResponse(this <= obj);
};

Number.prototype.add = function(b){
	return (this+b);
};
Number.prototype.plus = Number.prototype.add;

Number.prototype.subtract = function(b){
	return (this-b);
};
Number.prototype.minus = Number.prototype.subtract;

Number.prototype.multiply = function(b){
	return (this*b);
};
Number.prototype.times = Number.prototype.multiply;

Number.prototype.divide = function(b){
	return (this/b);
};
Number.prototype.over = Number.prototype.divide;

Number.prototype.modulus = function(b){
	return (this%b);
}
Number.prototype.mod = Number.prototype.modulus;

Number.prototype.power = function(b){
	return Math.pow(this,b);
}
Number.prototype.squared = function(){
	return (this*this);
};
Number.prototype.negate = function(){
	return -this;
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



/**
 * An object that holds all sorts of functions usefull after a condition has been tested
 * @param {boolean} condition the value of the previous operation
 */

function ConditionResponse(condition) {
	this.value = condition;
}
ConditionResponse.prototype.elseif = function(condition,callback){
	if(!this.value) return Henscript.prototype.if(condition, callback);
	else return new ConditionResponse(this.value);
};
ConditionResponse.prototype.else = function(callback) {
	if(!this.value && callback) callback();
	return this.value;
}
Henscript.prototype.ConditionResponse = ConditionResponse;

// Check if browser or nodejs
if(typeof exports === 'undefined'){
	this['henscript'] = new Henscript();	
} else {
	module.exports = new Henscript();
}
