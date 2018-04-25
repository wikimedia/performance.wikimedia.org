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

	var defaultPeriod = '1d',
		importantEvents = {
			firstPaint: [
				{ date: new Date( '2016-11-17' ),
					label: 'Don\'t report stats when page visibility changes during page load',
					click: function () {
						window.open( 'https://phabricator.wikimedia.org/T146510#2804827', '_blank' );
					} }
			]
		},
		periodOptions = {
			'1h': {
				summarize: '1min',
				medianPeriods: 1
			},
			'1d': {
				summarize: '15min',
				medianPeriods: 15
			},
			'1w': {
				summarize: '1h',
				medianPeriods: 60
			},
			'1mon': {
				summarize: '4h',
				medianPeriods: 240
			},
			'1y': {
				summarize: '1d',
				medianPeriods: 1440
			}
		};

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
		var charts = d3.select( '#metrics' ).selectAll( 'div' );

		charts.each( function () {
			var metricDiv = this;
			// https://graphite.wikimedia.org/render?target=summarize(movingMedian(coal.domInteractive, 15), "15min", "avg")&from=-1d&format=json
			d3.json( 'https://graphite.wikimedia.org/render?target=summarize(movingMedian(coal.' + metricDiv.id + ', ' +
								periodOptions[ period ].medianPeriods + '), "' + periodOptions[ period ].summarize +
								'", "avg")&from=-' + period + '&format=json',
				function ( error, data ) {
					var points, values = [];
					if ( !error ) {
						points = d3.values( data[ 0 ].datapoints.map( function ( point ) {
							// point is an array in the form [value, timestamp]
							values.push( point[ 0 ] );
							return {
								date: new Date( 1000 * point[ 1 ] ),
								value: point[ 0 ]
							};
						} ) );
						MG.data_graphic( {
							/* eslint-disable camelcase */
							title: metricDiv.id + ' - ' + Math.round( median( values ) ) + ' ms',
							markers: importantEvents[ metricDiv.id ],
							target: metricDiv,
							area: false,
							data: points,
							full_width: true,
							full_height: false,
							height: 280,
							left: 60,
							min_y_from_data: true,
							show_rollover_text: true
							/* eslint-enable camelcase */
						} );
					}
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
