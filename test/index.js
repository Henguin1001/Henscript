var henscript = require('../');

var assert = require('assert');
describe('Henscript',function(){
	describe('if',function(){
		it('should call the "if" callback',function(done){
			var word = 'foo';
			henscript.if( word == 'foo', 
				function() {
					done();
				}
			).elseif( word == 'bar',
				function() {
					throw new Error('elseif is being called after original "if" is true');
				}
			).else(function() {
				throw new Error('else is being called after original "if" is true');
			});
		});
		it('should call the "elseif" callback',function(done){
			var word = 'bar';
			henscript.if( word == 'foo', 
				function() {
					throw new Error('if is being called when the condition is false');
				}
			).elseif( word == 'bar',
				function() {
					done();
				}
			).else(function() {
				throw new Error('else is being called after elseif is true');
			});
		});
		it('should call the "else" callback',function(done){
			var word = 'foo';
			henscript.if( word == 'bar', 
				function() {
					throw new Error('if is being called when the condition is false');
				}
			).elseif( word == 'bar',
				function() {
					throw new Error('elseif is being called when the condition is false');
				}
			).else(function() {
				done();
			});
		});
	});
	describe('switch',function(){
		it('should match y to the y callback', function(done) {
			var error = function(){
				throw new Error('the value was matched to an innapropriate element');
			};
			henscript.switch ('y', {
				'h': error,
				'e': error,
				'n': error,
				'r': error,
				'y': function(value) {
					if(value=='y') done();
				}

			}).
			else(function() {
				throw new Error('else was called when the original condition matched');
			});
		});
		it('should call else since "x" does not match', function(done) {
			var error = function(){
				throw new Error('the value was matched to an innapropriate element');
			};
			henscript.switch ('x', {
				'h': error,
				'e': error,
				'n': error,
				'r': error,
				'y': error

			}).else(function() {
				done();
			});
		});
	});
	describe('while',function(){
		it('should run till foo equals zero',function(done){
			var foo = 5;
			henscript.while(
				function(){
					return foo > 0;
				},
				function(){
					foo--;
				}
			).else(function(){
				throw new Error('condition should have been met initially however the else was called');
			});
			if(foo == 0) done();
			else throw new Error('ran more or less than the correct number of times')
		});
		it('should not run and call the else since the condition was not met initially',function(done){
			var foo = -3;
			henscript.while(
				function(){
					return foo > 0;
				},
				function(){
					foo--;
				}
			).else(function(){
				done();
			});
		});
	});
	describe('for',function(){
		it('should run till foo is five',function(done){
			foo = 10;
			henscript.for(function(){
					return foo > 5;
				},
				function(){
				},
				function(){
					foo--;
				}
			);
			if(foo==5)done();
			else return new Error('ran more or less than the correct number of times');
		});
	});
	
});


describe('Object',function(){
	describe('map',function(){
		it('should go through each field and return an Object comprised of the results of each callback', function(done){
			var foo = {foobar:'bar',barfoo:'foo'};
			var output = foo.map(function(element){
				return 'foofoo';
			});
			if(output.foobar == 'foofoo') done();
			else throw new Error('not comprised of returned values');
		});
	});
	describe('size',function(){
		it('should return the proper number of fields of the object',function(done){
			var foo = {foobar:'bar',barfoo:'foo'};
			if(foo.size() == 2) done();
			else throw new Error('size is incorrect');
		});
	});
	// equals and equal are the same
	describe('equal',function(){
		var a = 3, b = 4, c = 3;
		it('should return true',function(done){
			if(a.equals(c)) done();
			else throw new Error('returning false when the two are equal');
		});
		it('should return false',function(done){
			if(!a.equals(b)) done();
			else throw new Error('returning true when the two are not equal');
		});
		it('should call the callback',function(done){
			a.equals(c,done);
		});
		
	});
	describe('not_equal',function(){
		var a = 3, b = 3, c = 4;
		it('should return true',function(done){
			if(a.not_equal(c)) done();
			else throw new Error('returning false when the two are not equal');
		});
		it('should return false',function(done){
			if(!a.not_equal(b)) done();
			else throw new Error('returning true when the two are equal');
		});
		it('should call the callback',function(done){
			a.not_equal(c,done);
		});
	});

});
describe('Boolean',function(){
	describe('operators',function(){
		var a = true, b = false, c = true;
		// too tedious to do all operators, they just 
		// wrap the original
		it('should run with no error',function(done){
			var d = a.and(c).or(b).not();
			if(!d) done();
			else throw new Error('something went wrong AHHH');
		});

	});
	describe('condition',function(){
		var a = true, b = false;
		it('should call the first callback since a is true',function(done){
			a.condition(done,function(){
				throw new Error('called second callback');
			});
		});
		it('should call the second callback since b is false',function(done){
			b.condition(function(){
				throw new Error('called first callback');
			},done);
		});
	});

});
var ConditionResponse = henscript.ConditionResponse;
describe('ConditionResponse',function(){
	var a = new ConditionResponse(false), b = new ConditionResponse(true);
	describe('elseif',function(){
		it('should call callback',function(done){
			a.elseif(true,done);
		});
		it('should not call the callback',function(done){
			b.elseif(true,function(){
				throw new Error('elseif is called when original condition is true');
			});
			done();
		});
	});
	describe('else',function(){
		it('should call callback',function(done){
			a.else(done);
		});
		it('should not call the callback',function(done){
			b.else(function(){
				throw new Error('else is called when original condition is true');
			});
			done();
		});
	});
});




