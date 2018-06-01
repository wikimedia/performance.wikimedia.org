# Plugin to add environment variables to the `site` object for templates
module Jekyll
  class EnvGenerator < Generator
    def generate(site)
      site.config['COAL_WEB_SERVER'] = ENV['COAL_WEB_SERVER'] || 'https://performance.wikimedia.org/coal'
    end
  end
end
