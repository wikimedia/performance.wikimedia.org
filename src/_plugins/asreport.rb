# Plugin to add environment variables to the `site` object for templates
module Jekyll
  class ASGenerator < Generator
    def generate(site)
      # The command in package.json uses `curl -R` to set the file mtime
      # to the Last-Modified header from analytics.wikimedia.org.
      site.config['AS_REPORT_TIME'] = File.mtime('src/_data/asreport.tsv')
    end
  end
end
