---
title: Web Performance ⚡ FOSDEM 2020
extends: _layouts.main
---

<style>
img.speaker {
  border-radius: 250px 15px 220px 15px/15px 220px 15px 250px;
  border: solid 4px #333;
}
@media (min-width: 1030px) {
  .session {
    display: grid;
    column-gap: 1em;
    grid-template-columns: 1fr 3fr;
  }
}
</style>

# Web Performance ⚡ FOSDEM 2020

## An afternoon of awesome web performance talks

The Wikimedia Foundation Performance team proudly hosted the first-ever [Web Performance devroom](https://fosdem.org/2020/schedule/track/web_performance/) at [FOSDEM](https://fosdem.org/2020/).

All talks were live-streamed on February 1st 2020 from Brussels, Belgium by FOSDEM, and [published](https://video.fosdem.org/2020/H.1309/), under a [Creative Commons license](https://creativecommons.org/licenses/by/2.0/be/deed.en).

### [Nic Jansma - Check Yourself Before You Wreck Yourself](https://fosdem.org/2020/schedule/event/webperf_boomerang_optimisation/)

<div class="session">
  <div class="session-speaker">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/nic_jansma/68dbe48424f9ca23a1a03bad4aec643c9f69a0085fafe6909fe70f5b6838308a.jpg" width="220" height="180">
  </div>
  <div class="session-details">
    <i>Auditing and Improving the Performance of Boomerang</i><br><br>
Boomerang is an open-source Real User Monitoring (RUM) JavaScript library used by thousands of websites to measure their visitor's experiences. The developers behind Boomerang take pride in building a reliable and performant third-party library that everyone can use without being concerned about its measurements affecting their site. We recently performed and shared an audit of Boomerang's performance, to help communicate its "cost of doing business", and in doing so we found several areas of code that we wanted to improve. We'll discuss how we performed the audit, some of the improvements we've made, how we're testing and validating our changes, and the real-time telemetry we capture for our library to ensure we're having as little of an impact as possible on the sites we're included on.<br><br>
    <i>Nic is a software developer at Akamai building high-performance websites, apps and open-source tools.</i><br>
    <video preload="none" controls="controls" poster="/assets/fosdem20webperf_boomerang_optimisation.jpg" width="512" height="288">
      <source src="https://video.fosdem.org/2020/H.1309/webperf_boomerang_optimisation.webm" type='video/webm; codecs="vp9, opus"'>
      <source src="https://video.fosdem.org/2020/H.1309/webperf_boomerang_optimisation.mp4" type='video/mp4'>
    </video>
  </div>
</div>

### [Dario Rossi - Metrics and models for Web performance evaluation](https://fosdem.org/2020/schedule/event/webperf_qoe_research/)

<div class="session">
  <div class="session-details">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/dario_rossi/aff2fa895211a17ad83ee0094e845dbad0ef45da80f6ff903b9a6dd2b1e87903.png" width="220" height="180">
  </div>
  <div class="session-speaker">
    <i>How to measure SpeedIndex from raw encrypted packets, and why it matters</i><br><br>
The World Wide Web is still among the most prominent Internet applications. While the Web landscape has been in perpetual movement since the very beginning, these last few years have witnessed some noteworthy proposals such as SPDY, HTTP/2 and QUIC, which profoundly reshape the application-layer protocols family. To measure the impact of such changes, going beyond the classic W3C notion of page load time, a number of Web performance metrics has been proposed (such as SpeedIndex, Above-The-Fold and variants). At the same time, there is still a limited amount of understanding on how these metrics correlate with the user perception (e.g., such as user ratings, user-perceived page load time, etc.). In this talk, we discuss the state of the art in metrics and models for Web performance evaluation, and their correlation with user experience through several real-world studies.<br><br>
    <i>Dario Rossi is a Chief Expert on Network AI at Huawei Technologies, co. Ltd.</i><br>
    <video preload="none" controls="controls" poster="/assets/fosdem20webperf_qoe_research.jpg" width="512" height="288">
      <source src="https://video.fosdem.org/2020/H.1309/webperf_qoe_research.webm" type='video/webm; codecs="vp9, opus"'>
      <source src="https://video.fosdem.org/2020/H.1309/webperf_qoe_research.mp4" type='video/mp4'>
    </video>
</div>
</div>

### [Sia Karamalegos - Hint, Hint, Font Loading Matters!](https://fosdem.org/2020/schedule/event/webperf_font_loading/)

<div class="session">
  <div class="session-speaker">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/sia_karamalegos/311e566ba03f332d8846ca2e790996152a00cad783e6f30151ccf76327239b59.jpg" width="220" height="180">
  </div>
  <div class="session-details">
    <i>Fonts are lovely but can slow down our loads. How can we make them faster?</i><br><br>
We all love fonts. From Google Fonts to Typekit, Hoefler&Co and more, they give character and tone to our websites. The down side of fonts is that they can really slow down our loads. In this talk we'll learn about common pitfalls like critical requests depth and how to use resource hints to play tricks with latency to load web applications faster. We'll walk through a network profile to understand what's going on in the browser and how to make it faster.<br><br>
    <i>Sia Karamalegos is a performance engineer, developer, international conference speaker, and writer.</i><br>
    <video preload="none" controls="controls" poster="/assets/fosdem20webperf_font_loading.jpg" width="512" height="288">
      <source src="https://video.fosdem.org/2020/H.1309/webperf_font_loading.webm" type='video/webm; codecs="vp9, opus"'>
      <source src="https://video.fosdem.org/2020/H.1309/webperf_font_loading.mp4" type='video/mp4'>
    </video>
  </div>
</div>

### [Robin Marx - The ultimate guide to HTTP resource prioritization](https://fosdem.org/2020/schedule/event/webperf_http_prioritization/)

<div class="session">
  <div class="session-details">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/robin_marx/ce4ed33a1749a05bbd20d2aded1f58a03331379c4c664ae82b57cded6e534b01.jpg" width="220" height="180">
  </div>
  <div class="session-speaker">
    <i>How to make sure your data arrives at the browser in the optimal order</i><br><br>
Come learn about how browsers try to guess in what order web page resources should be loaded and how servers use that information to often (accidentally) make your web page slower instead. We look at what resource prioritization is, how it's often implemented terribly in modern HTTP/2 stacks and how we're trying to fix it in QUIC and HTTP/3. We use clear visualizations and images to help explain the nuances in this complex topic and also muse a bit on whether prioritization actually has that large an impact on web performance.<br><br>
    <i>Robin Marx is a web performance researcher at Hasselt University, Belgium.</i><br>
    <video preload="none" controls="controls" poster="/assets/fosdem20webperf_http_prioritization.jpg" width="512" height="288">
      <source src="https://video.fosdem.org/2020/H.1309/webperf_http_prioritization.webm" type='video/webm; codecs="vp9, opus"'>
      <source src="https://video.fosdem.org/2020/H.1309/webperf_http_prioritization.mp4" type='video/mp4'>
    </video>
  </div>
</div>

### [Nicolás Peña Moreno - Shipping a performance API on Chromium](https://fosdem.org/2020/schedule/event/webperf_chromium_development/)

<div class="session">
  <div class="session-speaker">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/nicolas_pena_moreno/006184ec9949d754db6df8c52a00a032d8bd3b688a94d7f6a44cc9c5569b544d.png">
  </div>
  <div class="session-details">
    <i>Experiences from shipping the Element Timing API</i><br><br>
Adding new web performance APIs to the web is a complex process. In this talk, I'll go over the steps we went through to ship the Element Timing API in Chromium, which enables measuring rendering timing of image and text content. You'll learn about the process to ship an API exposing performance information to web developers. There were many steps involved in the process: engaging with developers and other browser vendors, brainstorming, privacy and security reviews, Origin Trials, posting an Intent, and addressing questions and ideas after the API has shipped.<br><br>
    <i>Nicolás is a software engineer of the Google Chrome team who works on web performance APIs.</i><br>
    <video preload="none" controls="controls" poster="/assets/fosdem20webperf_chromium_development.jpg" width="512" height="288">
      <source src="https://video.fosdem.org/2020/H.1309/webperf_chromium_development.webm" type='video/webm; codecs="vp9, opus"'>
      <source src="https://video.fosdem.org/2020/H.1309/webperf_chromium_development.mp4" type='video/mp4'>
    </video>
  </div>
</div>

### [Stefan Burnicki & Nils Kuhn - The journey of building OpenSpeedMonitor](https://fosdem.org/2020/schedule/event/webperf_building_openspeedmonitor/)

<div class="session">
  <div class="session-details">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/stefan_burnicki/27e1e68ce2b17a7101bafe6e95702c6b2cf1c24787529d0426ad8916af4a77cc.jpg" width="220" height="180">
    <img class="speaker" src="https://fosdem.org/2020/schedule/speaker/nils_kuhn/e7c878dd63c6549c10ac1d14a57c6d0d4848bbf86d5b6155275e08c57efec778.jpg" width="220" height="180">
  </div>
  <div class="session-speaker">
    <i>Learnings from unexpectedly finding ourselves developing a FLOSS project</i><br><br>
Keeping track caring about web performance is hard with constantly changing standards, improving browsers, frameworks and devices. It gets even harder when you develop a tool meeting these changing requirements. Eight years ago, as an IT service provider, we were faced with the task of permanently monitoring the performance of one of the largest e-commerce platforms. After the initial use of WebPagetest, we quickly needed to develop our own features. What started as minor extensions became a separate project over time. In this talk, we would like to take you on the journey we have taken developing OpenSpeedMonitor. You will hear about some unexpected challenges, what we learned the hard way and why we would have failed years ago, if we didn't decide to develop FLOSS.<br><br>
    <i>Stefan is a full-stack developer who came into contact with open source software as a child, which strongly influenced his career choice. </i><br>
    <video preload="none" controls="controls" poster="/assets/fosdem20webperf_building_openspeedmonitor.jpg" width="512" height="288">
      <source src="https://video.fosdem.org/2020/H.1309/webperf_building_openspeedmonitor.webm" type='video/webm; codecs="vp9, opus"'>
      <source src="https://video.fosdem.org/2020/H.1309/webperf_building_openspeedmonitor.mp4" type='video/mp4'>
    </video>
  </div>
</div>

## See also

* [FOSDEM 2020 Call for Participation](https://wikitech.wikimedia.org/wiki/Performance/FOSDEM_2020_Call_for_Participation)
