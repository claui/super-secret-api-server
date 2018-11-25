gem 'rack-rewrite', '~> 1.5'
require 'rack/rewrite'

require './my_app'

use Rack::Rewrite do
  rewrite %r{^/wall/(\w+)/?$}, '/wall/$1.html'
end

use Rack::Static, urls: ['/wall'], root: 'public'

run MyApp
