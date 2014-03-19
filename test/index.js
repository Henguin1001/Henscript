var henscript = require('../');

var word = 'foo';
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

var foo = 5;
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

foo = 10;
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

var test = 4;
test.equals(3,function(){
	console.log('test');
});

henscript.equals(test,3,function(){
	console.log('test is equal to 3');
}).else(function(){
	console.log('test is not equal to 3');
});
