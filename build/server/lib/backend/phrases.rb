require 'digest/sha2'
require 'google/cloud/datastore'

require './lib/model/phrase'

module Backend
  module Phrases
    PROJECT_ID = 'ted-merck-wall'
    PHRASE_QUERY_SOFT_LIMIT = 1000

    ALLOWED_NAMESPACES = %i[negative positive].freeze

    def self.get(namespace)
      validate_namespace!(namespace)

      datastore = Google::Cloud::Datastore.new(
        project_id: PROJECT_ID
      )

      query = datastore
        .query('Phrase')
        .limit(PHRASE_QUERY_SOFT_LIMIT)

      phrases = datastore.run(query, namespace: namespace.to_s)
      phrases.map { |entity| phrase_from(entity) }
    end

    def self.get_by_id(namespace, id)
      validate_namespace!(namespace)

      datastore = Google::Cloud::Datastore.new(
        project_id: PROJECT_ID
      )

      key = datastore.key('Phrase', id)
      key.namespace = namespace.to_s

      entity = datastore.find(key)
      phrase_from(entity) unless entity.nil?
    end

    def self.validate_namespace!(namespace)
      unless ALLOWED_NAMESPACES.include?(namespace)
        raise "#{namespace} is not a supported namespace"
      end
    end

    def self.phrase_from(entity)
      expires = unless entity['expiration_time'].nil?
        30 # FIXME
      end
      Model::Phrase.new(entity.key.id, entity['text'], expires)
    end
  end
end
