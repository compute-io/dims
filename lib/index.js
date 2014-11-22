/**
*
*	COMPUTE: dims
*
*
*	DESCRIPTION:
*		- Computes array dimensions.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// DIMS //

/**
* FUNCTION: dims( arr, d, max )
*	Computes array dimensions.
*
* @private
* @param {Array} arr - input array
* @param {Array} d - dimensions array
* @param {Number} max - max number of dimensions
* @returns {Array} dimensions array
*/
function dims( arr, d, max ) {
	if ( max && d.length === max ) {
		return;
	}
	if ( !Array.isArray( arr[0] ) ) {
		return;
	}
	d.push( arr[0].length );
	dims( arr[ 0 ], d, max );
} // end FUNCTION dims()

/**
* FUNCTION: check( arr, d )
*	Checks that all array elements have the same dimensions.
*
* @private
* @param {Array} arr - input array
* @param {Array} d - dimensions array
* @returns {Boolean} boolean indicating if all array elements have the same dimensions
*/
function check( arr, d ) {
	var len = arr.length,
		dim = d.shift(),
		nDims = d.length,
		val,
		flg;

	for ( var i = 0; i < len; i++ ) {
		val = arr[ i ];
		if ( !Array.isArray( val ) || val.length !== dim ) {
			return false;
		}
		if ( nDims ) {
			flg = check( val, d.slice() );
			if ( !flg ) {
				return false;
			}
		}
	}
	return true;
} // end FUNCTION check()

/**
* FUNCTION: compute( arr[, max] )
*	Computes array dimensions.
*
* @param {Array} arr - input array
* @param {Number} [max] - limits the number of dimensions returned
* @returns {Array|null} array of dimensions or null
*/
function compute( arr, max ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'dims()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isInteger( max ) || max < 1 ) {
			throw new TypeError( 'dims()::invalid input argument. `max` option must be a positive integer.' );
		}
	}
	var d, flg;

	// [0] Initialize the dimensions array:
	d = [ arr.length ];

	// [1] Recursively determine array dimensions:
	dims( arr, d, max );

	// [2] Check that all array element dimensions are consistent...
	if ( d.length > 1 ) {
		flg = check( arr, d.slice( 1 ) );
		if ( !flg ) {
			return null;
		}
	}
	return d;
} // end FUNCTION compute()


// EXPORTS //

module.exports = compute;
