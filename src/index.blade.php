---
title: Metrics — Wikimedia Performance
wmui_subnav:
- href: "https://grafana.wikimedia.org/d/pKbpxs54Xa/google-web-vitals"
  text: Google Web Vitals
- href: "https://grafana.wikimedia.org/d/pKbpxs54A/navigation-timing-drill-down"
  text: Navigation Timing metrics
- href: "https://grafana.wikimedia.org/d/IvAfnmLMk/page-drilldown"
  text: Synthetic tests drilldown
- href: "https://grafana.wikimedia.org/d/cFMjrb7nz/cpu-benchmark"
  text: CPU benchmark
- href: "https://grafana.wikimedia.org/d/t_bhsNGMk/chrome-user-experience-report"
  text: Chrome user experience report
- href: "https://grafana.wikimedia.org/dashboards/f/0TCEegQiz/performance-team"
  text: All performance dashboards
---

@extends('_layouts.main')

@section('content')
<style>
.perf-metrics {
  margin-top: 40px;
  /* Save reflow from pushing down footer; 4+ graphs x 200px */
  min-height: 800px;
}
.perf-metric {
  margin-top: 28px;
}
.perf-metric-desc {
  padding-right: 15px;
  padding-left: 15px;
}
.mg-header {
  cursor: text;
  font-size: 1.8rem;
}
</style>
<blockquote><p>
  We monitor the performance of <a href="https://www.wikipedia.org/">Wikipedia</a> using <a href="https://wikitech.wikimedia.org/wiki/Performance/Real_user_monitoring">real user monitoring</a> and <a href="https://wikitech.wikimedia.org/wiki/Performance/Synthetic_testing">synthetic testing</a>.  These graphs shows some of the metrics we collect. If you want to dig deeper into our metrics, check out our <a href="https://grafana.wikimedia.org/dashboards/f/0TCEegQiz/performance-team">Grafana graphs</a>.
</p>
<p>
  <a href="https://www.mediawiki.org/wiki/Wikimedia_Performance_Team">– Wikimedia Performance Team</a>
</p>
</blockquote>
<h2>Dashboards</h2>
<div id="perf-metrics" class="perf-metrics">
<p class="perf-metric-graph">
The <a href="https://grafana.wikimedia.org/d/pKbpxs54Xa/google-web-vitals
">Google Web Vitals dashboard</a> show us user experience metrics collected by us and categorized by Google thresholds. Here you can see how many of our users that gets a good, need improvement or poor user experience per country/continent. In this example we look at time to first byte and first contentful paint for users in India.
  <iframe src="https://grafana.wikimedia.org/d-solo/pKbpxs54Xa/google-web-vitals?forceLogin=&orgId=1&var-geo_country=India&var-geo_continent=All&var-mw_skin=All&var-mw_context=anonymous_mainspace_view&from=1680690291057&to=1681295091058&panelId=81" width="100%" height="300" frameborder="0"></iframe>
</p>
<p class="perf-metric-graph">
<iframe src="https://grafana.wikimedia.org/d-solo/pKbpxs54Xa/google-web-vitals?forceLogin=&orgId=1&var-geo_country=India&var-geo_continent=All&var-mw_skin=All&var-mw_context=anonymous_mainspace_view&from=1680690333891&to=1681295133891&panelId=63" width="100%" height="300" frameborder="0"></iframe>
</p>

<p class="perf-metric-graph">
  The <a href="https://grafana.wikimedia.org/d/pKbpxs54A/navigation-timing-drill-down">Navigation Timing drill down dashboard</a> lets you inspect some of our most important metrics. Below you can see how many of our users have a largest contentful paint faster than 2 seconds and compare it to what it looked one week back.
  <iframe src="https://grafana.wikimedia.org/d-solo/pKbpxs54A/navigation-timing-drill-down?orgId=1&var-metric=painttiming_largestcontentfulpaint&var-geo_country=All&var-geo_continent=All&var-ua_family=All&var-mw_skin=All&var-mw_group=All&var-mw_context=anonymous_mainspace_view&var-percentile=0.75&from=1680690803782&to=1681295603782&panelId=50" width="100%" height="300" frameborder="0"></iframe>
</p>

<p class="perf-metric-graph">
  The <a href="https://grafana.wikimedia.org/d/IvAfnmLMk/page-drilldown">synthetic tests drilldown dashboard</a> show all the metrics we collect from our synthetic tests (desktop and Android phones). Together with the real user measurements this is our performance defence against performance regressions. Below you can see the time it takes to render the Barack Obama page on an Moto G5 phone using Chrome.
  <iframe src="https://grafana.wikimedia.org/d-solo/IvAfnmLMk/page-drilldown?orgId=1&var-base=sitespeed_io&var-path=android&var-testtype=firstView&var-group=en_m_wikipedia_org&var-page=_wiki_Barack_Obama&var-browser=chrome&var-connectivity=4g&var-function=median&var-s3path=https%3A%2F%2Fsynthetic-tests-result-wikimedia.s3.amazonaws.com&from=1681123075455&to=1681295875455&panelId=302" width="100%" height="300" frameborder="0"></iframe>
</p>

<p class="perf-metric-graph">
    The <a href="https://grafana.wikimedia.org/d/cFMjrb7nz/cpu-benchmark">CPU benchmark dashboard</a> shine a light on what kind of devices the users of Wikpedia use. Here we look at the device speed for mobile phones in India compared to a couple of benchmark phones.
    <iframe src="https://grafana.wikimedia.org/d-solo/cFMjrb7nz/cpu-benchmark?orgId=1&from=1680691374189&to=1681296174189&panelId=15" width="100%" height="500" frameborder="0"></iframe>
</p>
<p class="perf-metric-desc">
  We have <a href="https://grafana.wikimedia.org/dashboards/f/0TCEegQiz/performance-team">many more dashboards</a> that helps us track the performance of Wikipedia in Grafana.
</p>
</div>
@endsection
