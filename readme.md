# Henscript
##It's finally here, sort of
What is it? you may ask, I too ask that question. But the real question is how 
can I make Javascript better, or worse. I present to you Henscript, defining a new
way of using those things we use everyday.

##Use it
### nodejs
install it via npm `npm install henscript`
To use it just require the module. It will return an object that holds all sorts of new functions
as well as modify some already existant objects. 
```js
var henscript = require('henscript');
```

### browser
Just download the index.js file and import it as a js file, there will be a object called henscript floating around
your global namespace
```html
<script type="text/javascript" src="henscript/index.js"></script>
```

## Table of Contents
[henscript functions](#henscript) <br>
[Object functions](#Object) <br>
[Boolean functions](#Boolean) <br>
[Number functions](#Number) <br>
[ConditionResponse functions](#ConditionResponse) <br>


## <a name="henscript"></a> henscript functions 
### <a name="henscript_if"></a> henscript.if(condition,[callback])
When given a boolean that is true the callback is called
```js
var henscript = require('henscript'), word = 'bar';
henscript.if( word == 'bar', 
	function() {
		console.log('test1');
	}
);
```
The overall function will return a ConditionResponse object which 
contains the functions elseif and else. see [ConditionResponse](#ConditionResponse)
```js
var henscript = require('henscript'), word = 'foo';
henscript.if( word == 'bar', 
	function() {
		console.log('test1');
	}
).elseif( word == 'foo',
	function() {
		console.log('test2');
	}
).else(function() {
	console.log('test3');
});
```
###<a name="henscript_switch"></a> henscript.switch(to_be_tested,[matches])
Will test a given value to all the matches, upon finding the match it
will call the corresponding callback. It also will return a ConditionResponse object 
see [ConditionResponse](#ConditionResponse) 
```js
var henscript = require('henscript');
henscript.switch('y',{
	'h':console.log,
	'e':console.log,
	'n':console.log,
	'r':console.log,
	'y':function(value){
		console.log('Henr' + value + ' is the best.');
	}

}).else(function(){
	console.log('he is still pretty cool.');
});
```

### <a name="henscript_while"></a> henscript.while([condition_callback],[update])
While the condition_callback returns true the update call back will be called,
this also will return a ConditionResponse see [ConditionResponse](#conditionResponse).
```js
var henscript = require('henscript'), foo = 5;
henscript.while(function(){
		return foo > 0;
	},
	function(){
		console.log(foo);
		foo--;
	}
).else(function(){
	console.log('the condition was not met initially');
});
```

### <a name="henscript_for"></a> henscript.for([condition_callback],[update],[modify_callback])
Very similar to  [henscript.while](#henscript_while) except with an extra callback for modifying
any variable variable that needs to be. It's not super practical.
```js
var henscript = require('henscript'), foo = 10;
henscript.for(function(){
		return foo > 5;
	},
	function(){
		console.log(foo);
	},
	function(){
		foo--;
	}
);
```
## <a name="Object"></a> Object functions
### <a name="Object_map"></a> Object.prototype.map([callback])
Much like [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 
but for objects, you can go through each field and apply logic to determine the outcome object's properties.
```js
var foo = {foobar:'bar',barfoo:'foo'};
var output = foo.map(function(element){
	return element + 'foo';
});
```
would result in 
```json
{
	'foobar':'barfoo',
	'barfoo':'foofoo'
}
```

### <a name="Object_size"></a> Object.prototype.size()
Will return the number of fields in an object
```js
var foo = {foo:"bar",barbar:"foofoo"};
console.log(foo.size()); // 2
```
### <a name="Object_equal"></a> Object.prototype.equal(obj_b,[callback=]) / Object.prototype.equals(obj_b,[callback=])
Will test whether the given object (obj_b) is equal to the current object, when called without the callback 
parameter it will return a plain boolean, however when passed a callback it will call it if the two are equal
and in turn return a [ConditionResponse](#conditionResponse) to which you could tag an else.

```js
var a = 3, b = 4, c = 3;

console.log(a.equals(c)); // true
console.log(a.equals(b)); // false

a.equals(c,function(){
	// would be called, 3 is equal to 3
});

a.equals(b,function(){
	// wouldn't be called, 3 is not equal to 4
}).else(function(){
	// however this would be called
});
```

### Object.prototype.not_equal(obj_b,[callback=])
Very similar to above [Object.prototype.equal](#Object_equal) just tests whether the two are not equal and follows the same
rules
```js
var a = 3, b = 3, c = 4;

console.log(a.not_equal(c)) // true
console.log(a.not_equal(b)) // false

a.not_equal(c,function(){
	// would be called, 3 is not equal to 4
});

a.not_equal(b,function(){
	// wouldn't be called, 3 is equal to 3
}).else(function(){
	// however this would be called
});

```


## <a name="Boolean"></a> Boolean functions
### operators
* Boolean.prototype.and(bool_2)
* Boolean.prototype.or(bool_2)
* Boolean.prototype.not(bool_2) or Boolean.prototype.bang(bool_2)
<br>
If you are not familiar with these checkout [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Logical_operators). Each will return the 
resulting boolean which will allow for chaining these operators.
```js
var a = true, b = false, c = true;
console.log(a.and(c)) // true
console.log(a.and(b)) // false

console.log(a.or(c)) // true
console.log(a.or(b)) // true
console.log(c.or(b)) // true

console.log(a.not()) // false
console.log(b.not()) // true

```
### Boolean.prototype.condition([callback_true],[callback_false])
Similar to the [condition operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Special_operators) 
but I think this version is alot more readable. It allows for the corresponding callback to be called based on whether or not the boolean is true.
```js
var a = true, b = false;
a.condition(function(){
	// called since a is true
},function(){
	// not called
});

b.condition(function(){
	// not called since b is false
},function(){
	// called
});

```

## <a name="Number"></a> Number functions
### Arithmetic operators

* Number.prototype.add(num_2) or Number.prototype.plus(num_2)
* Number.prototype.subtract(num_2) or Number.prototype.minus(num_2)
* Number.prototype.multiply(num_2) or Number.prototype.times(num_2)
* Number.prototype.divide(num_2) or Number.prototype.over(num_2);
* Number.prototype.modulus(num_2) or Number.prototype.mod(num_2)
* Number.prototype.power(num_2)
* Number.prototype.squared(num_2)
* Number.prototype.negate(num_2)
<br>
Pretty well known things, however heres a 
[resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Arithmetic_operators),
just your basic math operators, you may notice there are no operators that do assignment like `+=` where it will add then
assign the value back to the caller.
```js
var a = 5,b = 10,c = 3;
console.log(a.plus(b)) // 15
console.log(a.minus(c)) // 2

console.log(a.times(c)) // 15
console.log(a.over(b)) // 0.5

var d = a.plus(b).over(c);
// d is now 5, (5 + 10) / 3

d = negate(d); // d is now -5
```
### Comparison Operators
* Number.prototype.greater(num_2,[callback=])
* Number.prototype.greater_equal(num_2,[callback=])
* Number.prototype.less(num_2,[callback=])
* Number.prototype.less_equal(num_2,[callback=])
<br>
Just as [Object.prototype.equals](#Object_equal) works just with 
[operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Comparison_operators) that apply to numbers
or quantities

```js
var a = 30, b = 50, c = 30;
a.greater_equal(c) // true
a.greater(c) // false

a.less(b,function(){
	// would be called
});

a.greater(b,function(){
	// would not be called a is not greater than b
}).else(function(){
	// would be called since the previous condition was not met
});

```

## <a name="ConditionResponse"></a> ConditionResponse functions
### condition.else(condition,[callback])
when the previous operation that returned this ConditionResponse
resulted in a false then the callback will be called
```js
var condition = new henscript.ConditionResponse(false);
condition.else(function(){
	// this would be called sinse the original condition
	// was false
});
```
### condition.elseif(condition,[callback])
when the given condition is true and the previous operation that returned this ConditionResponse
resulted in a false then the callback will be called.
```js
var condition = new henscript.ConditionResponse(false);
condition.elseif(true,function(){
	// this would be called sinse the original condition
	// was false and this one is true
});
```

