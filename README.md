# performance.wikimedia.org

The static site is generated by [Jigsaw](https://jigsaw.tighten.com/docs/building-and-previewing/) with [Blade templates](https://laravel.com/docs/9.x/blade).

## Prerequisites

* PHP 7.3 or later, with [Composer](https://getcomposer.org/).

## Development

* Install or update dependencies:
  ```
  composer install
  ```

* Start a web server for local development at <http://localhost:4000/>:
  ```
  composer serve
  ```

* Build the site to `public_html/` for deployment, to then stage and commit with Git:
  ```
  composer build
  ```

* Automatically rebuild the local site in the background (run in a separate tab
  from `composer serve`):
  ```
  composer run watch
```

* Renew external information (e.g. AS Report, and blog posts):
  ```
  composer run renew
  ```

## See also

* [Coal](https://gerrit.wikimedia.org/g/performance/coal/)
