/* eslint-env node */
var fs, xml2js,
	data, parser;

fs = require( 'fs' );
xml2js = require( 'xml2js' );

data = fs.readFileSync( process.argv[ 2 ], 'utf-8' );
parser = new xml2js.Parser();
parser.parseString( data, function ( err, result ) {
	if ( err ) {
		throw err;
	}
	process.stdout.write( JSON.stringify( result, null, 4 ) + '\n' );
} );
