/**
 * Create recent date links for PHP Profiling page.
 *
 * Copyright 2017 Timo Tijhof <krinklemail@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
( function () {
	var span, i, d, isoDate;

	// Feature test
	if ( !Date.prototype.toISOString ) {
		return;
	}

	function createUrl( file ) {
		return '/xenon/svgs/daily/' + file;
	}

	function appendLinks( parent, date, endpoint, label ) {
		var link;

		link = document.createElement( 'a' );
		link.href = createUrl( date + '.' + endpoint + '.svgz' );
		link.textContent = endpoint;
		link.title = 'Flame graph for ' + date + ' of ' + label;
		parent.appendChild( link );

		link = document.createElement( 'a' );
		link.href = createUrl( date + '.' + endpoint + '.reversed.svgz' );
		link.textContent = 'rev';
		link.title = 'Reversed flame graph for ' + date + ' of ' + label;
		parent.appendChild( document.createTextNode( ' (' ) );
		parent.appendChild( link );
		parent.appendChild( document.createTextNode( ')' ) );
	}

	span = document.getElementById( 'flamegraph-current' );
	span.textContent = 'Recent flame graphs by endpoint: ';

	i = 1;
	while ( i <= 5 ) {
		d = new Date();
		d.setDate( d.getDate() - i );
		isoDate = d.toISOString().split( 'T' )[ 0 ];

		span.appendChild( document.createElement( 'br' ) );
		span.appendChild( document.createTextNode( '• ' + isoDate + ': ' ) );
		appendLinks( span, isoDate, 'all', 'all MediaWiki requests' );
		span.appendChild( document.createTextNode( ' • ' ) );
		appendLinks( span, isoDate, 'index', 'index.php requests' );
		span.appendChild( document.createTextNode( ' • ' ) );
		appendLinks( span, isoDate, 'api', 'api.php requests' );
		span.appendChild( document.createTextNode( ' • ' ) );
		appendLinks( span, isoDate, 'load', 'load.php requests' );

		i++;
	}

}() );
