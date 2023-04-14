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
	if ( !window.CLIENTJS ) {
		return;
	}

	function createUrl( file ) {
		return 'https://performance.wikimedia.org/arclamp/svgs/daily/' + file;
	}

	const form = document.querySelector( '.perf-flamegraph-nav' );
	const dateField = form.elements.date;
	const dateOtherField = form.elements.dateOther;
	const dateOtherBlock = dateOtherField.closest( '.wm-fieldset-block' );
	const sourceField = form.elements.source;
	const entrypointField = form.elements.entrypoint;
	const formatField = form.elements.format;
	const openButton = form.querySelector( '.perf-flamegraph-open' );
	const openLink = document.querySelector( '#perf-flamegraph-link' );
	const openImage = document.querySelector( '#perf-flamegraph-image' );

	// Populate date menu
	const RECENT_DAYS = 8;
	const options = {
		'0': { suffix: ' (incomplete)' },
		'1': { suffix: ' (yesterday)', selected: true }
	};
	for ( let i = 0; i <= RECENT_DAYS; i++ ) {
		const d = new Date();
		d.setDate( d.getDate() - i );
		const isoDate = d.toISOString().split( 'T' )[ 0 ];

		let option = document.createElement( 'option' );
		option.selected = (options[i]?.suffix || false);
		option.value = isoDate;
		option.textContent = isoDate
			+ ' '
			+ d.toLocaleDateString( 'en-US', { weekday: 'short', timeZone: 'UTC' } )
			+ (options[i]?.suffix || '');

		dateField.append(option);
	}

	const otherOption = document.createElement( 'option' );
	otherOption.value = 'other';
	otherOption.textContent = 'Other';
	dateField.append( otherOption );

	dateOtherField.max = ( new Date() ).toISOString().split( 'T' )[ 0 ];
	dateOtherField.value = dateField.value;

	function formatFilename() {
		return ( dateOtherField.disabled ? dateField.value : dateOtherField.value ) +
			'.' + sourceField.value +
			'.' + entrypointField.value +
			( formatField.value === 'reversed' ? '.reversed' : '' ) +
			'.svgz';
	}

	function renderLink() {
		const filename = formatFilename();
		openImage.href = openLink.href = createUrl( filename );
		openImage.title = openLink.title = 'Open flame graph';
		openLink.textContent = filename;
	}

	form.addEventListener( 'change', function () {
		dateOtherField.disabled = ( dateField.value !== 'other' );
		dateOtherBlock.hidden = ( dateField.value !== 'other' );
		if ( dateField.value === 'other' ) {
			dateOtherField.focus();
		}
		renderLink();
	} );
	renderLink();

	form.addEventListener( 'submit', function ( e ) {
		location.href = openLink.href;
		e.preventDefault();
	} );
	openButton.addEventListener( 'click', function () {
		location.href = openLink.href;
	} );
	openButton.disabled = false;

}() );
