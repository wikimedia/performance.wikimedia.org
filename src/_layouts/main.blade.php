<!DOCTYPE html>
<html lang="en" class="client-nojs">
<meta charset=utf-8>
<title>{{ $page->title }}</title>
<script>CLIENTJS = 'CSS' in window && 'classList' in document.documentElement; if (CLIENTJS) document.documentElement.className = 'client-js';</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/lib/codex-design-tokens/theme-wikimedia-ui-1.0.0.css">
<link rel="stylesheet" href="/lib/main.css">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="alternate" type="application/atom+xml" href="https://phabricator.wikimedia.org/phame/blog/feed/7/" title="Wikimedia Performance Team">

<header><div class="wm-container">
 <a role="banner" href="/" title="Navigate to the home page">Wikimedia Performance</a>
 <span class="wm-header-caption">
@foreach ($page->extnav as $i => $item)
  {!! $i > 0 ? '&bull; ' : '' !!}<a href="{{ $item['href'] }}">{{ $item['text'] }}</a>
@endforeach
  </span>
</div></header>
<main role="main"><div class="wm-container">
  <nav class="wm-site-nav"><ul class="wm-nav">
  @foreach ($page->sitenav as $item)
    <li><a {!! $page->getUrl() === $item['href'] ? 'class="wm-nav-item-active"' : '' !!} href="{{ $item['href'] }}">{{ $item['text'] }}</a>
    @if ($page->getUrl() === $item['href'] && $page->wmui_subnav ?? false )
    <ul>
    @foreach ($page->wmui_subnav as $sub)
      <li><a href="{{ $sub->href }}">{{ $sub->text }}</a></li>
@endforeach
    @if ($page->getUrl() === '/asreport') @foreach ($page->asreportCountries as $country)
      <li><a href="#@slugify( $country )">{{ $country }}</a></li>
    @endforeach @endif
    </ul>
    @endif
    </li>
  @endforeach
  </ul></nav>
<article>
@yield('content')

</article>
</div></main>

<footer role="contentinfo"><div class="wm-container perf-footer-cols">
  <div>
    <p>
    @foreach ($page->extnav as $i => $item)
      {!! $i > 0 ? '&bull; ' : '' !!}<a href="{{ $item['href'] }}">{{ $item['text'] }}</a>
    @endforeach
    </p>
    <p>Made with <a href="https://wikitech.wikimedia.org/wiki/Performance">♥ by Wikimedia Performance</a> at <a href="https://www.wikimedia.org">Wikimedia Foundation</a>.</p>
  </div>
  <div>
    <h3>Latest blog posts</h3>
    <ul>
      <li><a href="{{ $page->blog->feed->entry[0]->link }}">{{ $page->blog->feed->entry[0]->title }}</a></li>
      <li><a href="{{ $page->blog->feed->entry[1]->link }}">{{ $page->blog->feed->entry[1]->title }}</a></li>
      <li><a href="{{ $page->blog->feed->entry[2]->link }}">{{ $page->blog->feed->entry[2]->title }}</a></li>
    </ul>
  </div>
</footer>
