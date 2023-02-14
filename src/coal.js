/**
 * Dashboard for Coal metrics.
 *
 * See <https://wikitech.wikimedia.org/wiki/performance.wikimedia.org>.
 *
 * Copyright 2015 Ori Livneh <ori@wikimedia.org>
 * Copyright 2015 Timo Tijhof <krinklemail@gmail.com>
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
/* global d3, MG */
( function () {
	'use strict';

	var defaultHash = '#!/day',
		importantEvents = {
			firstPaint: [
				{ date: new Date( '2016-11-17' ),
					label: 'Don\'t report stats when page visibility changes during page load',
					click: function () {
						window.open( 'https://phabricator.wikimedia.org/T146510#2804827', '_blank' );
					} }
			]
		};

	function identity( x ) {
		return x;
	}

	function median( values ) {
		var middle;
		values.sort( function ( a, b ) { return a - b; } );
		middle = Math.floor( values.length / 2 );

		if ( values.length % 2 ) {
			return values[ middle ];
		} else {
			return Math.round( ( values[ middle - 1 ] + values[ middle ] ) / 2 );
		}
	}

	function drawCharts( period ) {
		// Specify full URL to use it even during local development
		d3.json( 'https://performance.wikimedia.org/coal/v1/metrics?period=' + period, function ( data ) {
			var charts = d3.select( '#perf-metrics' )
				.selectAll( 'div' )
				.data( d3.keys( data.points ) );

			charts.enter()
				.append( 'div' )
				.attr( 'class', 'perf-metric' )
				.attr( 'id', identity );

			charts.each( function ( metric ) {

				var values = [], points = d3.values( data.points[ metric ] ).map( function ( value, idx ) {
					var epochSeconds = data.start + idx * data.step;
					values.push( value );
					return { date: new Date( 1000 * epochSeconds ), value: value };
				} );

				MG.data_graphic( {
					title: metric + ' – ' + median( values ) + ' ms',
					markers: importantEvents[ metric ],
					target: this,
					area: false,
					data: points,
					/* eslint-disable camelcase */
					full_width: true,
					full_height: false,
					/* eslint-enable camelcase */
					height: 280,
					left: 60,
					/* eslint-disable camelcase */
					min_y_from_data: true,
					show_rollover_text: true
					/* eslint-enable camelcase */
				} );
			} );
		} );
	}

	function onHash( hash ) {
		var period, query, link, others;
		if ( !/^#!\/./.test( hash ) ) {
			return false;
		}
		period = hash.slice( 3 );
		query = '.wm-site-nav a[href="' + CSS.escape( hash ) + '"]';
		link = document.querySelector( query );
		if ( !link || link.classList.contains( 'wm-nav-item-active' ) ) {
			return false;
		}

		others = link.closest( 'ul' ).querySelectorAll( 'a.wm-nav-item-active' );
		[].forEach.call( others, function ( other ) {
			other.classList.remove( 'wm-nav-item-active' );
		} );
		link.classList.add( 'wm-nav-item-active' );
		drawCharts( period );
		return true;
	}

	window.addEventListener( 'hashchange', function () {
		onHash( location.hash );
	} );

	function init() {
		if ( !onHash( location.hash ) ) {
			// In case of no (valid) hash, draw the default.
			onHash( defaultHash );
		}
	}

	if ( 'classList' in document.body && 'CSS' in window && CSS.escape ) {
		init();
	}
}() );
