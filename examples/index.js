'use strict';

var dims = require( './../lib' ),
	data,
	d;

// Simple array:
data = [ 1, 2 ];
d = dims( data );

console.log( data );
console.log( d.join( 'x' ) + '\n' );

// Nested array (2-levels):
data = [ [1,2], [3,4] ];
d = dims( data );

console.log( data );
console.log( d.join( 'x' ) + '\n' );

// Nested array (3-levels):
data = [ [[1,2]], [[3,4]] ];
d = dims( data );

console.log( data );
console.log( d.join( 'x' ) + '\n' );

// Inconsistent dimensions:
data = [ [[1,2]], [[3,4,5]] ];
d = dims( data );

console.log( data );
console.log( d + '\n' );

// Only considers arrays in dimension calculation:
data = [ [[1,2]], ['34'] ];
d = dims( data );

console.log( data );
console.log( d + '\n' );

// Deeply nested (6-levels):
data = [[[[[[[1,2,3,4,5,6]]]]]]];
d = dims( data );

console.log( JSON.stringify( data ) );
console.log( d.join( 'x' ) + '\n' );

// Limit the number of dimensions returned:
data = [ [[1,2], [3,4]] ];
d = dims( data, 2 );

console.log( data );
console.log( d.join( 'x' ) + '\n' );

// Any dimension inconsistency beyond the dimension limit is ignored:
data = [ [[1,2], [3,4,5,6,7,8]] ];
d = dims( data, 2 );

console.log( data );
console.log( d.join( 'x' ) + '\n' );
