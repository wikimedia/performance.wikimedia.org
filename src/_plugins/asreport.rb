# Plugin to add environment variables to the `site` object for templates
module Jekyll
  class ASGenerator < Generator
    def generate(site)
      site.config['AS_REPORT_TIME'] = File.mtime('src/_data/asreport.tsv')
    end
  end
end
