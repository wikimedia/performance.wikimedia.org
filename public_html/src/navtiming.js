/**
 * Dashboard for Navigation Timing metrics from Graphite.
 *
 * See <https://wikitech.wikimedia.org/wiki/performance.wikimedia.org>.
 *
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
/*global $ */
( function () {
	var conf, state, ui;
	conf = {
		// Input variables
		range: {
			'24h': 'last day',
			'1week': 'last week',
			'1month': 'last month',
			'1year': 'last year'
		},
		step: {
			1: '(none)',
			10: '10 data points',
			100: '100 data points',
			'1h': '1 hour',
			'12h': '12 hours',
			'24h': '24 hours'
		},
		// Graphite metrics
		metric: {
			totalPageLoadTime: 'navigationStart to loadEventEnd ',
			mediaWikiLoadComplete: 'mediaWikiLoadStart to document.onload',
			dnsLookup: 'dnsLookup'
		},
		platform: [
			'desktop',
			'mobile'
		],
		prop: {
			// colors: p95=dark, median=bright
			// (Note, in Graphite "green" is dark, and "darkgreen" is bright)
			'overall.p95': 'green',
			'overall.median': 'yellow',
			'anonymous.p95': 'blue',
			'anonymous.median': 'cyan',
			'authenticated.p95': 'red',
			'authenticated.median': 'magenta'
		}
	};

	// Current state
	state = {
		platform: conf.platform[0],
		range: '1month',
		step: '12h'
	};

	ui = {
		init: function () {
			var params, $select,
				$output = $( '#output' ),
				$surface = $( '<div>' );

			function renderSurface() {
				if ( history.replaceState ) {
					// Provide permalink
					history.replaceState( null, document.title, './?' + $.param( state ) + location.hash );
				}
				$surface.empty().append( ui.buildSurface() );
			}

			// Read query parameters
			params = location.search.slice( 1 ).split( '&' );
			$.each( params, function ( i, param ) {
				var parts = param.split( '=' ),
					key = parts[0],
					value = decodeURIComponent( parts[1] );
				if ( key in state && value in conf[key] ) {
					state[key] = value;
				}
			} );

			// Create drodown menus
			$select = ui.createSelect( conf.metric )
				.on( 'change', function () {
					var node;
					if ( history.replaceState ) {
						history.replaceState( null, document.title, '#m-' + this.value );
					}
					node = document.getElementById( 'm-' + this.value );
					if ( node && node.scrollIntoView ) {
						node.scrollIntoView( { block: 'start', behavior: 'smooth' } );
					}
				} );
			$output.append( $( '<label class="pull-right">Metrics: </label>' ).append( $select ) );

			$select = ui.createSelect( conf.platform, state.platform )
				.on( 'change', function () {
					state.platform = this.value;
					renderSurface();
				} );
			$output.append( $( '<label>Platform: </label>' ).append( $select ) );

			$select = ui.createSelect( conf.range, state.range )
				.on( 'change', function () {
					state.range = this.value;
					renderSurface();
				} );
			$output.append( $( '<label>Range: </label>' ).append( $select ) );

			$select = ui.createSelect( conf.step, state.step )
				.on( 'change', function () {
					state.step = this.value;
					renderSurface();
				} );
			$output.append( $( '<label>Moving median: </label>' ).append( $select ) );

			// Initial rendering
			renderSurface();
			$output.append( $surface );
		},

		/**
		 * @param {Array|Object} options
		 * @param {string} [selected]
		 * @return {jQuery} Select widget
		 */
		createSelect: function ( options, selected ) {
			var mapped;
			if ( $.isArray( options ) ) {
				mapped = {};
				$.each( options, function ( i, option ) {
					mapped[option] = option;
				} );
			} else {
				mapped = options;
			}
			return $( '<select>' ).append( $.map( mapped, function ( label, option ) {
				return $( '<option>' )
					.val( option )
					.text( label )
					.prop( 'selected', option === selected )
					.get( 0 );
			} ) );
		},

		/**
		 * @return {DocumentFragment} Surface
		 */
		buildSurface: function () {
			var fragment = document.createDocumentFragment();
			$.each( conf.metric, function ( metric, label ) {
				var target, graph;
				fragment.appendChild(
					$( '<h3>' ).attr( 'id', 'm-' + metric ).text( label ).get( 0 )
				);
				target = $.map( conf.prop, function ( color, prop ) {
					var step = $.isNumeric( state.step ) ? state.step : ( '"' + state.step + '"' );
					return $.param( {
						target: 'aliasByNode(color(movingMedian(frontend.navtiming.' +
							metric + '.' + state.platform + '.' + prop + ',' + step +
							'),"' + color + '"),-2,-1)'
					} );
				} );
				graph = $( '<img>' ).prop( {
					src: 'https://graphite.wikimedia.org/render/?' + target.join( '&' ) + '&' + $.param( {
						title: metric + ' on ' + state.platform + ', last ' + state.range,
						from: '-' + state.range,
						width: 1024,
						height: 400,
						hideLegend: 'false'
					} ),
					width: 1024,
					height: 400
				} ).get( 0 );
				fragment.appendChild( graph );
			} );
			return fragment;
		}
	};

	$( ui.init );
}() );
