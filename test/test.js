'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	dims = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-dims', function tests() {

	it( 'should export a function', function test() {
		expect( dims ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				dims( value );
			};
		}
	});

	it( 'should throw an error if provided a `max` option which is not a positive integer', function test() {
		var values = [
			'5',
			-5,
			0,
			null,
			undefined,
			NaN,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				dims( [], value );
			};
		}
	});

	it( 'should compute array dimensions', function test() {
		var data, expected, actual;

		data = [ 1, 2 ];
		expected = [ 2 ];
		actual = dims( data );

		assert.deepEqual( actual, expected );

		data = [ [1], [2] ];
		expected = [ 2, 1 ];
		actual = dims( data );

		assert.deepEqual( actual, expected );

		data = [ [1,2], [3,4] ];
		expected = [ 2, 2 ];
		actual = dims( data );

		assert.deepEqual( actual, expected );

		data = [[[[[[1,2,3,4,5],[1,2,3,4,5]]]]]];
		expected = [ 1,1,1,1,2,5 ];
		actual = dims( data );

		assert.deepEqual( actual, expected );
	});

	it( 'should return null if provided an array with inconsistent dimensions', function test() {
		var data;

		data = [ [1,2], [3,4], [5,6,7], [8,9] ];

		assert.isNull( dims( data ) );
	});

	it( 'should base dimensions only on arrays', function test() {
		var data;

		function foo(a,b){
			console.log( a, b );
		}

		data = [ [[1,2]], ['12'] ];

		assert.isNull( dims( data ) );

		data = [ [[1,2]], [foo] ];

		assert.isNull( dims( data ) );
	});

	it( 'should limit the number of dimensions returned', function test() {
		var data, expected, actual;

		data = [ [[1,2], [3,4]] ];
		expected = [ 1, 2 ];
		actual = dims( data, 2 );

		assert.deepEqual( actual, expected );

		data = [ [[1,2], [3,4,5,6,7,8]] ];
		expected = [ 1, 2 ];
		actual = dims( data, 2 );

		assert.deepEqual( actual, expected );
	});

});
