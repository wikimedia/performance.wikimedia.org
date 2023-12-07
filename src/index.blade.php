---
title: Wikimedia Performance
wmui_subnav:
- href: "#frontend"
  text: Frontend
- href: "#backend"
  text: Backend
- href: "https://grafana.wikimedia.org/dashboards/?tag=performance"
  text: Grafana dashboards
---

@extends('_layouts.main')

@section('content')
<h1>Wikimedia Performance</h1>
<p>
  <strong>Wikimedia Performance</strong> provides tools to analyze and improve the site performance of Wikipedia.
</p>
<p>
  We do this through a combination of live instrumentation, continuous monitoring, and debug profiling.
</p>
<h2 id="frontend">Frontend</h2>
<ul class="wm-cards">
  <li>
    <a href="https://wikitech.wikimedia.org/wiki/Performance/Real_user_monitoring">
      <h3>Navigation Timing</h3>
      <span class="wm-card-desc">We collect real-user monitoring (RUM) metrics from page views such as page load time, network latency, and first paint. Sliced by region and device&nbsp;type.</span>
    </a>
  </li>
  <li>
    <a href="https://grafana.wikimedia.org/d/pKbpxs54Xa/google-web-vitals?orgId=1">
      <h3>Google Web Vitals</h3>
      <span class="wm-card-desc">RUM metrics collected by us and categorized using Google's thresholds for "Good", "Need&nbsp;improvement", and "Poor".</span>
    </a>
  </li>
  <li>
    <a href="https://grafana.wikimedia.org/d/cFMjrb7nz/cpu-benchmark?orgId=1">
      <h3>CPU Benchmark</h3>
      <span class="wm-card-desc">Shine a light on what kind of devices Wikpedia readers use. Compare device speed of mobile phones and desktop between different countries.</span>
    </a>
  </li>
  <li>
    <a href="https://grafana.wikimedia.org/d/IvAfnmLMk/page-drilldown?orgId=1">
      <h3>Synthetic tests</h3>
      <span class="wm-card-desc">Monitor frontend performance from a controlled lab environment using WebPageReplay and Browsertime. Provides a high level of detail in recording and profiling.</span>
    </a>
  </li>
  <li>
    <a href="https://grafana.wikimedia.org/d/t_bhsNGMk/chrome-user-experience-report?orgId=1">
      <h3>CruX Report</h3>
      <span class="wm-card-desc">Keep track of how Wikipedia is doing from the point of view of Google&nbsp;Search, through metrics Google collects from Chrome users.</span>
    </a>
  </li>
  <li>
    <a href="/asreport/">
      <h3>AS Report</h3>
      <span class="wm-card-desc">Insights into the effective performance of Internet providers around the world.</span>
    </a>
  </li>
</ul>
<p>You can find a <a href="https://grafana.wikimedia.org/dashboards/?tag=performance">full list of dashboards</a> in Grafana that plot other aspects of frontend performance.</p>
<h2 id="backend">Backend</h2>
<ul class="wm-cards">
  <li>
    <a href="/php-profiling/">
      <h3>Flame Graphs</h3>
      <span class="wm-card-desc">Aggregate flame graphs of sampled stack traces from live MediaWiki requests. Reported daily and hourly, sliced by entry&nbsp;point.</span>
    </a>
  </li>
  <li>
    <a href="https://wikitech.wikimedia.org/wiki/WikimediaDebug#Request_profiling">
      <h3>Request profiling</h3>
      <span class="wm-card-desc">High-resolution flame graphs on a per-request basis with Excimer&nbsp;UI. Accessible via the WikimediaDebug browser extension.</span>
    </a>
  </li>
  <li>
    <a href="https://wikitech.wikimedia.org/wiki/WikimediaDebug#XHGui_profiling">
      <h3>XHGui profiling</h3>
      <span class="wm-card-desc">Analyze a given request with XHGui to obtain an accurate call tree, call count, and memory usage. Accessible via the WikimediaDebug browser extension.</span>
    </a>
  </li>
  <li>
    <a href="https://grafana.wikimedia.org/d/QLtC93rMz/backend-pageview-timing?orgId=1">
      <h3>Pageview Timing</h3>
      <span class="wm-card-desc">Backend latency from the MediaWiki application when responding to page views.</span>
    </a>
  </li>
  <li>
    <a href="https://grafana.wikimedia.org/d/000000085/save-timing?orgId=1">
      <h3>Save Timing</h3>
      <span class="wm-card-desc">The overall time to process an edit in MediaWiki, with a break down by entry point, page type, and user type.</span>
    </a>
  </li>
</ul>
<p>Refer to <a href="https://wikitech.wikimedia.org/wiki/Performance#Tools">Wikitech</a> for more tools and lower-level statistics of backend application performance.</p>
@endsection
