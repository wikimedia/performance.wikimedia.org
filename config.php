<?php

const ASREPORT_FILE = __DIR__ . '/src/_data/asreport.tsv';
const ASREPORT_DATE_FILE = __DIR__ . '/src/_data/asreport_date.txt';
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
        'asreportDate' => trim( file_get_contents( ASREPORT_DATE_FILE ) ),
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
            'text' => 'Home',
        ],
        [
            'href' => '/php-profiling/',
            'text' => 'Flame Graphs',
        ],
        [
            'href' => '/asreport/',
            'text' => 'Autonomous Systems',
        ],
    ],
    'extnav' => [
        [
            'href' => 'https://wikitech.wikimedia.org/wiki/Performance',
            'text' => 'Documentation',
        ],
        [
            'href' => '/blog/',
            'text' => 'Blog',
        ],
        [
            'href' => 'https://grafana.wikimedia.org/dashboards/?tag=performance',
            'text' => 'Grafana'
        ],
    ],
    ...getAsreportData( ASREPORT_FILE ),
    ...getBlogData( BLOG_FILE ),
];
