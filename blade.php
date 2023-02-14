<?php
return [
	'slugify' => function ( $string ) {
		return "<?php
			\$tmp = strtolower( $string );
			\$tmp = preg_replace( '/[^a-z]+/', '-', \$tmp );
			print \$tmp;
		?>";
	}
];
