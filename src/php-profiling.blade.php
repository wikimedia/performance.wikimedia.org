---
title: Flame Graphs — Wikimedia Performance
---
@extends('_layouts.main')

@section('content')
<style>
.perf-figure-right {
  clear: right;
  float: right;
  text-align: right;
  margin: 0 0 10px 10px;
}
.perf-flamegraph-nav fieldset > label {
  display: block;
}
.perf-flamegraph-nav fieldset > label,
.perf-flamegraph-nav fieldset > .wm-fieldset-row {
  clear: both;
  display: grid;
  grid-gap: 4px;
  grid-template-columns: 10rem max-content;
  align-items: baseline;
}
}
.perf-flamegraph-open {
  margin-left: 10rem;
}
.client-nojs .perf-flamegraph-nav {
  display: none;
}
</style>

<h1>PHP Profiling for MediaWiki</h1>
<p>The trace logs and flame graphs are powered by <a href="https://wikitech.wikimedia.org/wiki/Performance/Runbook/Arc_Lamp_service">Arc Lamp</a>.<br>See also <a href="https://www.mediawiki.org/wiki/Excimer">php-excimer</a>, and <a href="https://github.com/brendangregg/FlameGraph">flamegraph.pl</a>.</p>

<h2>Flame graphs</h2>
<figure class="perf-figure-right" style="width: 250px">
  <a href="/arclamp/svgs/daily/" title="Browse flame graphs" id="perf-flamegraph-image"><img src="/lib/flamegraph.png" width="250" height="160" alt=""></a>
  <figcaption><a href="/arclamp/svgs/daily/" id="perf-flamegraph-link"></a></figcaption>
</figure>
<form class="perf-flamegraph-nav" method="post">
  <fieldset>
    <legend>Select a flame graph</legend>
    <div class="wm-fieldset-row">
      <label for="perf-flamegraph-form--date">Date: </label>
      <select name="date" id="perf-flamegraph-form--date"></select>
      <span><!-- indent --></span>
      <span class="wm-fieldset-block" hidden>
        <small>Any date since March 2021 is available.</small><br>
        <label>Other date: <input disabled type="date" name="dateOther" min="2021-03-01"></label>
      </span>
    </div>
    <label>
      <span>Source: </span><select name="source">
        <option>excimer</option>
        <option selected>excimer-wall</option>
        <option value="excimer-k8s">excimer-k8s (Oct 2022 - Apr 2025)</option>
        <option value="excimer-k8s-wall">excimer-k8s-wall (Oct 2022 - Apr 2025)</option>
      </select>
    </label>
    <label>
      <span>Entry point: </span><select name="entrypoint">
        <option value="index" selected>/w/index.php</option>
        <option value="all.fn-EditAction">/w/index.php (focus: EditAction)</option>
        <option value="api">/w/api.php</option>
        <option value="load">/w/load.php</option>
        <option value="rest">/w/rest.php</option>
        <option value="RunSingleJob">/rpc/RunSingleJob.php</option>
        <option value="all">all</option>
        <option value="all.fn-PreSend">all (focus: PreSend)</option>
        <option value="all.fn-PostSend">all (focus: PostSend)</option>
      </select>
    </label>
    <label>
      <span>Format: </span><select name="format">
        <option selected>default</option>
        <option>reversed</option>
      </select>
    </label>
    <div class="wm-fieldset-group">
      <input type="submit" value="Open" class="wm-btn wm-btn--progressive perf-flamegraph-open" disabled>
    </div>
  </fieldset>
</form>
<h2>File browser</h2>
<ul>
  <li><a href="/arclamp/svgs/daily/">Browse flame graphs (daily)</a></li>
  <li><a href="/arclamp/svgs/hourly/">Browse flame graphs (hourly)</a></li>
  <li><a href="/arclamp/logs/daily/">Browse trace logs (daily)</a></li>
  <li><a href="/arclamp/logs/hourly/">Browse trace logs (hourly)</a></li>
</ul>
<script src="/profiling.js" defer></script>
@endsection
