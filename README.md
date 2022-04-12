# performance.wikimedia.org

## Prerequisites

* Node.js 10 or later.
* [Ruby](https://www.ruby-lang.org/) (tested with Ruby 2.7)
* [Bundler](https://bundler.io/) (if missing, install with `gem install bundler`)

## Development

* Install or update Jekyll and plugins:
  ```
  bundle update
  ```

* Start a Jekyll server for local development at at <http://127.0.0.1:4000/> (automatically watches for changes and updates in real-time):
  ```
  bundle exec jekyll serve
  ```
  Environment variables:
  * `COAL_WEB_SERVER`: (Optional) Override the address of a `coal-web` server.
    For example, set `COAL_WEB_SERVER=http://127.0.0.1:5000` for the address that
    Flask would use if you run coal-web locally. Defaults to the production version.

* Let Jekyll build the site to `public_html/` for deployment, to then stage and commit with Git:
  ```
  bundle exec jekyll build -d public_html/
  ```

* Install npm dependencies (only needed for recompiling stylesheets or renewing external info)
  ```
  npm ci
  ```

* Recompile the stylesheet (keeps running to watch for updates)
  ```
  npm run less:watch
  ```

* Renew external information (e.g. AS Report, and blog posts):
  ```
  npm run renew
  ```

## See also

* [Coal](https://gerrit.wikimedia.org/g/performance/coal/)
