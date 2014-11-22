'use strict';

var dims = require( './../lib' ),
	data,
	d;

data = [ 1, 2 ];
d = dims( data );
console.log( d.join( 'x' ) + '\n' );

data = [ [1,2], [3,4] ];
d = dims( data );
console.log( d.join( 'x' ) + '\n' );

data = [ [[1,2]], [[3,4]] ];
d = dims( data );
console.log( d.join( 'x' ) + '\n' );

data = [ [[1,2]], [[3,4,5]] ];
d = dims( data );
console.log( d + '\n' );

data = [ [[1,2]], ['34'] ];
d = dims( data );
console.log( d + '\n' );

data = [[[[[[[1,2,3,4,5,6]]]]]]];
d = dims( data );
console.log( d.join( 'x' ) + '\n' );
