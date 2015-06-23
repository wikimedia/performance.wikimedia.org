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
/*global d3, MG */
( function () {
	'use strict';

	function identity( x ) {
		return x;
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
				var points = d3.values( data.points[metric] ).map( function ( value, idx ) {
					var epochSeconds = data.start + idx * data.step;
					return { date: new Date( 1000 * epochSeconds ), value: value };
				} );

				MG.data_graphic( {
					title: metric,
					target: this,
					data: points,
					width: 680,
					height: 200,
					left: 60,
					show_tooltips: false,
					show_rollover_text: true
				} );
			} );
		} );
	}

	function selectTab( tab ) {
		if ( d3.select( tab ).classed( 'active' ) ) {
			return;
		}
		d3.select( 'li.active' ).classed( 'active', false );
		tab.className = 'active';
		drawCharts( tab.id );
	}

	d3.selectAll( '.nav li' ).on( 'click', function () {
		selectTab( this );
	} );

	function init() {
		var id, navItem;
		if ( /^#!\/./.test( location.hash ) ) {
			// Handle permalink
			id = location.hash.slice( 3 );
			navItem = document.getElementById( id );
			if ( navItem ) {
				selectTab( navItem );
			}
		} else {
			// Default
			drawCharts( 'hour' );
		}
	}

	init();
}() );
