# Plugin to add environment variables to the `site` object for templates
module Jekyll
  class EnvGenerator < Generator
    def generate(site)
      if site.config['destination'] == 'public_html/'
        # Ignore ENV when building for deployment
        # In the deployment we use a relative path so that production
        # and Beta Cluster naturally use their respective local Coal instances.
        site.config['COAL_WEB_SERVER'] = '/coal'
      else
        # During development, default to the production one to ease testing
        # But allow overriding to something local on a different port.
        site.config['COAL_WEB_SERVER'] = ENV['COAL_WEB_SERVER'] || 'https://performance.wikimedia.org/coal'
      end
    end
  end
end
