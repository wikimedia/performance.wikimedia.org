<?php

function slashit( $string ) {
	// https://github.com/tighten/jigsaw/issues/679
	return str_ends_with( $string, '/' ) ? $string : "$string/";
}

return [
	'slugify' => function ( $string ) {
		return "<?php
			\$tmp = strtolower( $string );
			\$tmp = preg_replace( '/[^a-z]+/', '-', \$tmp );
			print \$tmp;
		?>";
	}
];
