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

## henscript functions
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

### <a name="henscript_for"></a> henscript.for([condition_callback],[update],[])
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
### <a name="henscript_equals"></a> henscript.equals(a,b,[callback])
Basically a shorter way of using [henscript.if](#henscript_if), if a==b than the
callback is called, returns a [ConditionResponse](#ConditionResponse). 

```js
var henscript = require('henscript');
henscript.equals(test,3,function(){
	console.log('test is equal to 3');
}).else(function(){
	console.log('test is not equal to 3');
});
```
### henscript.greater(a,b,[callback]);
just like above but with a > b
### henscript.greater_equal(a,b,[callback]);
just like above but with a >= b
### henscript.less(a,b,[callback]);
just like above but with a < b
### henscript.less_equal(a,b,[callback]);
just like above but with a <= b

## <a name="ConditionResponse"></a> ConditionResponse functions
### condition.else(condition,[callback])
when the previous operation that returned this ConditionResponse
resulted in a false then the callback will be called
```js
var condition = new ConditionResponse(false);
condition.else(function(){
	// this would be called sinse the original condition
	// was false
});
```
### condition.elseif(condition,[callback])
when the given condition is true and the previous operation that returned this ConditionResponse
resulted in a false then the callback will be called.
```js
var condition = new ConditionResponse(false);
condition.elseif(true,function(){
	// this would be called sinse the original condition
	// was false and this one is true
});
```

