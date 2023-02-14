---
title: Wikimedia Autonomous Systems performance report
wmui_subnav:
- href: "#methodology"
  text: Methodology
- href: "#results"
  text: Results
---

@extends('_layouts.main')

@section('content')
<style>
.perf-asreport-table th:first-child {
	width: 40%;
}
</style>

<h1>Autonomous Systems performance report</h1>

<p>This report is generated from sampled visits to Wikipedia and other Wikimedia Foundation sites.</p>

<h2 id="methodology">Methodology</h2>

<p>Performance metrics are collected from web browsers via the Navigation Timing API. Our CPU microbenchmark is run in a Web Worker thread, and assesses the overall performance of the device. The report focusses on a common range of CPU scores by country. We then compile medians for that device range for each <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)">autonomous system</a>, based on the visitors' IP addresses.<p>

<p>We separate mobile and desktop experiences, as they have significantly different median page weights. As such, scores aren't comparable between mobile and desktop for a given country. Just as they are not comparable between countries either.</p>

<p>Only autonomous systems and countries from which we sampled sufficient data are reported.</p>

<p>To learn more, refer to the <a href="https://wikitech.wikimedia.org/wiki/Performance/AS_Report">Wikitech docs</a> or the <a href="https://techblog.wikimedia.org/2019/03/27/autonomous-systems-performance-report/
">introductory blog post</a>.</p>

<h2 id="results">Results</h2>

<p>Report generated on {{ gmdate( 'Y-m-d', $page->asreportMtime ) }}. Data available in <a href="https://analytics.wikimedia.org/datasets/performance/autonomoussystems/">TSV format</a>.</p>
<p>
<i>TTFB stands for "Time to first byte", defined as responseStart - connectStart.</i><br>
<i>PLT stands for "Page load time", defined as loadEventStart - responseStart.</i>
</p>
@php
	$lastType = false;
	$lastCountry = false;
@endphp
@foreach ($page->asreport as $row)
	@if ($lastType !== false && $row['Type'] !== $lastType)
	</table>
	<br>
	@endif
	@if ($row['Country'] !== $lastCountry)<h3 id="@slugify( $row['Country'] )">{{ $row['Country'] }}</h3>
@endif
	@if ($row['Type'] !== $lastType)
	{{ $row['Type'] }}<br>
	<table class="wm-table perf-asreport-table">
	<tr><th>Autonomous System Organization</th><th>Median TTFB</th><th>Median PLT</th><th>Sample size</th></tr>
	@endif
	<tr><td>{{ $row['ASO'] }}</td><td>{{ $row['TTFB'] }}</td><td>{{ $row['PLT'] }}</td><td>{{ $row['Sample size'] }}</td></tr>
	@php
		$lastType = $row['Type'];
		$lastCountry = $row['Country'];
	@endphp
@endforeach
</table>

@endsection
