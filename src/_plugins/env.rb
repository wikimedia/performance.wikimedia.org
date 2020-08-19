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
        site.config['COAL_WEB_SERVER'] = ENV['COAL_WEB_SERVER'] || '/coal'
      end
    end
  end
end
