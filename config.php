<?php

const ASREPORT_FILE = __DIR__ . '/src/_data/asreport.tsv';
const BLOG_FILE = __DIR__ . '/src/_data/blog.json';

function getAsreportData( string $tsvFile ): array {
    $asreportTsv = array_map(
        fn ( $line ) => str_getcsv( $line, "\t" ),
        file( $tsvFile )
    );
    $header = array_shift( $asreportTsv );
    $asreportData = [];
    foreach ( $asreportTsv as $row ) {
      $asreportData[] = array_combine( $header, $row );
    }
    $asreportCountries = [];
    foreach ( $asreportData as $row ) {
        $asreportCountries[] = $row['Country'];
    }
    $asreportCountries = array_values( array_unique( $asreportCountries ) );
    return [
        'asreport' => $asreportData,
        'asreportMtime' => filemtime( $tsvFile ),
        'asreportCountries' => $asreportCountries,
    ];
}

function getBlogData( string $jsonFile ): array {
    $blog = json_decode( file_get_contents( $jsonFile ) );
    return [
        'blog' => $blog,
    ];
}

return [
    'baseUrl' => '/',
    'build' => [
        'source' => 'src',
        'destination' => 'build_{env}',
    ],

    'sitenav' => [
        [
            'href' => '/',
            'text' => 'Metrics',
        ],
        [
            'href' => '/php-profiling',
            'text' => 'Flame Graphs',
        ],
        [
            'href' => '/asreport',
            'text' => 'Autonomous Systems',
        ],
    ],
    'extnav' => [
        [
            'href' => '/blog/',
            'text' => 'Blog',
        ],
        [
            'href' => '/xhgui/',
            'text' => 'XHGui',
        ],
        [
            'href' => 'https://grafana.wikimedia.org/d/000000050/performance-metrics',
            'text' => 'Grafana'
        ],
    ],
    ...getAsreportData( ASREPORT_FILE ),
    ...getBlogData( BLOG_FILE ),
];
