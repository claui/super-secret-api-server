gem 'rack-rewrite', '~> 1.5'
require 'rack/rewrite'

require './my_app'

use Rack::Rewrite do
  rewrite %r{^/kiosk/(\w+)/?$}, '/kiosk/$1.html'
end

use Rack::Static, urls: ['/kiosk'], root: 'public'

run MyApp
