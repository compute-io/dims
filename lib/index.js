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

// DIMS //

/**
* FUNCTION: dims( arr, d )
*	Computes array dimensions.
*
* @private
* @param {Array} arr - input array
* @param {Array} d - dimensions array
* @returns {Array} dimensions array
*/
function dims( arr, d ) {
	if ( !Array.isArray( arr[0] ) ) {
		return;
	}
	d.push( arr[0].length );
	dims( arr[ 0 ], d );
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
* FUNCTION: compute( arr )
*	Computes array dimensions.
*
* @param {Array} arr - input array
* @returns {Array|null} array of dimensions or null
*/
function compute( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'dims()::invalid input argument. Must provide an array.' );
	}
	var d, flg;

	// [0] Initialize the dimensions array:
	d = [ arr.length ];

	// [1] Recursively determine array dimensions:
	dims( arr, d );

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
