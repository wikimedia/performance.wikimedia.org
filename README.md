# performance.wikimedia.org

## Prerequisites

* NodeJS (and npm)
* Ruby (and Bundler)

To install Bundler, run `gem install bundler`.

## Development

To install or update Jekyll and any plugins:

<pre>
bundle install
</pre>

The following starts Jekyll, re-generates `public_html/`, and watches `src/` for changes to automatically regenerate. This makes the site available at <http://127.0.0.1:4000/>.

<pre>
npm run jekyll
</pre>

Options:
* `COAL_WEB_SERVER`: Set this environment to the address of a `coal-web` server.
  For example, set `COAL_WEB_SERVER=http://127.0.0.1:5000` for address that
  Flask would use when running coal-web locally.

## Build

Re-generate `public_html/` from `src/`.

<pre>
npm run generate
</pre>

## Commit/publish
When you commit a change, there's a commit hook that will automatically run `npm run generate` that will setup the correct config for running the code on performance.wikimedia.org.


## See also

* [coal](https://gerrit.wikimedia.org/g/performance/coal/)
