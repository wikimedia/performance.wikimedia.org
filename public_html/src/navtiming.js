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

	/**
	 * @param {string...} Target property
	 */
	function GraphiteTarget() {
		var target = [].join.call( arguments, '.' );

		function quote( str ) {
			return '"' + str + '"';
		}

		function apply( funcName, args ) {
			args = args.length ? ',' + [].join.call( args, ',' ) : '';
			target = funcName + '(' + target + args + ')';
		}

		function call( funcName ) {
			apply( funcName, [].slice.call( arguments, 1 ) );
		}

		function factory( funcName ) {
			return function () {
				apply( funcName, arguments );
				return this;
			};
		}

		this.aliasByNode = factory( 'aliasByNode' );
		this.dashed = factory( 'dashed' );
		this.lineWidth = factory( 'lineWidth' );

		this.movingMedian = function ( windowSize ) {
			windowSize = $.isNumeric( windowSize ) ? windowSize : quote( windowSize );
			call( 'movingMedian', windowSize );
			return this;
		};

		this.color = function ( theColor ) {
			call( 'color', quote( theColor ) );
			return this;
		};

		this.toString = function () {
			return target;
		};
	}

	conf = {
		// Input variables
		range: {
			'1h': 'last hour',
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
		user: [
			1,
			0
		],
		prop: {
			// Dark colors for p95, bright colors for median
			'overall.p95': 'brown',
			'overall.median': 'orange',
			'anonymous.p95': 'blue',
			'anonymous.median': 'cyan',
			'authenticated.p95': 'red',
			'authenticated.median': 'magenta'
			// Note: In Graphite, "green" is dark, and "darkgreen" is bright
		}
	};

	// Current state
	state = {
		platform: conf.platform[0],
		range: '1h',
		step: '1',
		user: 0
	};

	ui = {
		init: function () {
			var params,
				inputs = {},
				$output = $( '#output' ),
				$surface = $( '<div>' );

			function renderSurface( mode ) {
				if ( mode !== 'initial' && history.replaceState ) {
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
				if ( key in state && conf[key] ) {
					// Cast values to appropiate type (string, number)
					value = state[key].constructor( value );
					if (
						// Validate as array value or object key
						( $.isArray( conf[key] ) && $.inArray( value, conf[key] ) > -1 ) ||
						value in conf[key]
					) {
						state[key] = value;
					}
				}
			} );

			// Create drodown menus
			inputs.metric = ui.createSelect( conf.metric, location.hash.slice( 3 ) )
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
			$output.append( $( '<label class="pull-right">Metrics: </label>' ).append( inputs.metric ) );

			inputs.platform = ui.createSelect( conf.platform, state.platform )
				.on( 'change', function () {
					state.platform = this.value;
					renderSurface();
				} );
			$output.append( $( '<label>Platform: </label>' ).append( inputs.platform ) );

			inputs.range = ui.createSelect( conf.range, state.range )
				.on( 'change', function () {
					state.range = this.value;
					if ( state.range === '1month' || state.range === '1year' ) {
						state.step = '24h';
						inputs.step.val( '24h' );
					}
					renderSurface();
				} );
			$output.append( $( '<label>Range: </label>' ).append( inputs.range ) );

			inputs.step = ui.createSelect( conf.step, state.step )
				.on( 'change', function () {
					state.step = this.value;
					renderSurface();
				} );
			$output.append( $( '<label>Moving median: </label>' ).append( inputs.step ) );

			inputs.user = $( '<input type="checkbox" />' )
				.prop( 'checked', state.user )
				.on( 'change', function () {
					// Use number instead of boolean because boolean doesn't roundtrip
					// in string form as query parameter ('false' => Boolean => true)
					state.user = Number( this.checked );
					renderSurface();
				} );
			$output.append( $( '<label>Display user groups: </label>' ).append( inputs.user ) );

			// Initial rendering
			renderSurface( 'initial' );
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
				var targets, graph;
				fragment.appendChild(
					$( '<h3>' ).attr( 'id', 'm-' + metric ).text( label ).get( 0 )
				);
				targets = $.map( conf.prop, function ( color, prop ) {
					var gtarget = new GraphiteTarget( 'frontend.navtiming', metric, state.platform, prop )
						.movingMedian( state.step )
						.color( color );
					if ( prop.indexOf( 'overall' ) > -1 ) {
						if ( state.user ) {
							gtarget.lineWidth( 3 );
						}
					} else if ( !state.user ) {
						// Omit anonymous/authenticated properties
						return;
					}

					gtarget.aliasByNode( -2, -1 );
					return $.param( { target: gtarget.toString() } );
				} );
				graph = $( '<img>' ).prop( {
					src: 'https://graphite.wikimedia.org/render/?' + $.param( {
						title: metric + ' on ' + state.platform + ', last ' + state.range,
						from: '-' + state.range,
						width: 1024,
						height: 400,
						hideLegend: 'false',
						vtitle: 'milliseconds',
						lineMode: 'connected'
					} ) + '&' + targets.join( '&' ),
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
