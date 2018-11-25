require './lib/openapiing'

MAX_SUBMISSION_LENGTH = 25

# only need to extend if you want special configuration!
class MyApp < OpenAPIing
  self.configure do |config|
    config.api_version = '1.0' 
  end
end

# include the api files
Dir["./api/*.rb"].each { |file|
  require file
}
