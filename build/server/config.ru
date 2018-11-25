gem 'rack-rewrite', '~> 1.5'
require 'rack/rewrite'

require './my_app'

use Rack::Rewrite do
  rewrite %r{^/wall/(\w+)/?$}, '/wall/$1.html'
  rewrite %r{^/kiosk/(\w+)/?$}, '/kiosk/$1.html'
end

use Rack::Static, urls: ['/wall', '/kiosk'], root: 'public'

run MyApp
