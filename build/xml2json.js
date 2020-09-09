const fs = require( 'fs' );
const xml2js = require( 'xml2js' );

const data = fs.readFileSync( process.argv[ 2 ], 'utf-8' );
const parser = new xml2js.Parser();
parser.parseString( data, function ( err, result ) {
	if ( err ) {
		throw err;
	}

	// Reduce blog.json to only the relevant subset.
	// This reduces noise from unrelated meta data changes.
	const normal = {
		feed: {
			entry: result.rss.channel[ 0 ].item.map( function ( entry ) {
				return {
					link: entry.link[ 0 ],
					title: entry.title[ 0 ]
				};
			} )
		}
	};
	process.stdout.write( JSON.stringify( normal, null, 4 ) + '\n' );
} );
