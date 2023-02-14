<?php

$data = file_get_contents( "php://stdin" );
$dom = new DOMDocument();
$dom->loadXML( $data );

    // Reduce blog.json to only the relevant subset.
    // This reduces noise from unrelated meta data changes.
    $entry = [];
    foreach ( $dom->getElementsByTagName( 'item' ) as $item ) {
        $link = $item->getElementsByTagName( 'link' )[0]->textContent;
        $title = $item->getElementsByTagName( 'title' )[0]->textContent;
        $entry[] = [
            'link' => $link,
            'title' => $title,
        ];
    }
    $blog = [ 'feed' => [ 'entry' => $entry ] ];

    print json_encode( $blog, JSON_PRETTY_PRINT |  JSON_UNESCAPED_SLASHES ) . "\n";
