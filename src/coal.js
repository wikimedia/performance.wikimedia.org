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

	var defaultPeriod = 'day',
		descriptions = {
			domInteractive: 'When the browser has parsed the main HTML document.',
			loadEventEnd: 'When the load event fired in the browser and the current document is complete.',
			responseStart: 'The time it takes for the client to receive a response from the server (TTFB).',
			saveTiming: 'The time it takes to submit and save an edit on an article.',
			firstPaint: 'The moment something is first painted on the screen (currently only collected in Chrome and IE/Edge).'
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
		d3.json( 'https://performance.wikimedia.org/coal/v1/metrics?period=' + period, function ( data ) {
			var charts = d3.select( '#metrics' )
			.selectAll( 'div' )
			.data( d3.keys( data.points ) );

			charts.enter()
			.append( 'div' )
			.attr( 'class', 'metric' )
			.attr( 'id', identity );

			charts.each( function ( metric ) {

				var values = [], points = d3.values( data.points[ metric ] ).map( function ( value, idx ) {
						var epochSeconds = data.start + idx * data.step;
						values.push( value );
						return { date: new Date( 1000 * epochSeconds ), value: value };
					} );

				MG.data_graphic( {
					title: metric + ' – ' + median( values ) + ' ms',
					/* eslint-disable camelcase */
					x_label: metric + ': ' + descriptions[ metric ],
					/* eslint-enable camelcase */
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

	function selectTab( tab ) {
		if ( d3.select( tab ).classed( 'active' ) ) {
			return;
		}
		d3.select( '.perf-nav li.active' ).classed( 'active', false );
		tab.className = 'active';
		drawCharts( tab.id );
	}

	d3.selectAll( '.perf-nav li' ).on( 'click', function () {
		selectTab( this );
	} );

	function init() {
		var id, navItem;
		// Handle permalink
		if ( /^#!\/./.test( location.hash ) ) {
			id = location.hash.slice( 3 );
			// In case of default, call drawCharts() directly.
			// Callling selectTab() would return early without drawing.
			if ( id !== defaultPeriod ) {
				navItem = document.getElementById( id );
				if ( navItem ) {
					selectTab( navItem );
					return;
				}
			}
		}

		// Default
		drawCharts( defaultPeriod );
	}

	init();
}() );
