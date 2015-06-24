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
		this.drawAsInfinite = factory( 'drawAsInfinite' );

		this.alias = function ( newName ) {
			call( 'alias', quote( newName ) );
			return this;
		};

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

	function getDeployTargets() {
		return [
			new GraphiteTarget( 'deploy.sync-file.count' )
				.drawAsInfinite()
				.color( 'gold' )
				.dashed()
				.aliasByNode( -2 ),
			new GraphiteTarget( 'deploy.sync-dir.count' )
				.drawAsInfinite()
				.color( 'rose' )
				.dashed()
				.aliasByNode( -2 ),
			new GraphiteTarget( 'deploy.scap.count' )
				.drawAsInfinite()
				.color( 'black' )
				.aliasByNode( -2 )
		];
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
		deploys: [
			1,
			0
		],
		prop: {
			// Dark colors for p95, bright colors for median
			'overall.p95': {
				color: 'brown',
				alias: 'All users (95th percentile)'
			},
			'overall.median': {
				color: 'orange',
				alias: 'All users (median)'
			},
			'anonymous.p95': {
				color: 'blue',
				alias: 'Anonymous (95th precentile)'
			},
			'anonymous.median': {
				color: 'cyan',
				alias: 'Anonymous (median)'
			},
			'authenticated.p95': {
				color: 'red',
				alias: 'Logged-in (95th precentile)'
			},
			'authenticated.median': {
				color: 'magenta',
				alias: 'Logged-in (median)'
			}
			// Note: In Graphite, "green" is dark, and "darkgreen" is bright
		}
	};

	// Current state
	state = {
		platform: conf.platform[0],
		range: '1h',
		step: '1',
		user: 0,
		deploys: 0
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

			inputs.deploys = $( '<input type="checkbox" />' )
				.prop( 'checked', state.deploys )
				.on( 'change', function () {
					state.deploys = Number( this.checked );
					renderSurface();
				} );
			$output.append( $( '<label>Show deployments: </label>' ).append( inputs.deploys ) );

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
				targets = $.map( conf.prop, function ( meta, prop ) {
					var target = new GraphiteTarget( 'frontend.navtiming', metric, state.platform, prop )
						.movingMedian( state.step );

					if ( meta.color ) {
						target.color( meta.color );
					}

					if ( prop.indexOf( 'overall' ) > -1 ) {
						if ( state.user ) {
							target.lineWidth( 3 );
						}
					} else if ( !state.user ) {
						// Omit anonymous/authenticated properties
						return;
					}

					if ( meta.alias ) {
						target.alias( meta.alias );
					} else {
						target.aliasByNode( -2, -1 );
					}

					return target;
				} );
				if ( state.deploys ) {
					// Prepend instead of append so that deploys render behind other metrics.
					// This way both remain legible (one vertical, the other horizontal).
					// FIXME: This is still quite messy. A frontend like Grafana would allow
					// this data to be displayed in a more intuitive mannner.
					targets.unshift.apply( targets, getDeployTargets() );
				}
				// Convert to query strings
				targets = $.map( targets, function ( target ) {
					return $.param( { target: target.toString() } );
				} );
				graph = $( '<img>' ).prop( {
					src: 'https://graphite.wikimedia.org/render/?' + $.param( {
						title: label + ' on ' + state.platform + ', ' + conf.range[state.range],
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
