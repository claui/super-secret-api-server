require 'time'
require 'digest/sha2'
require 'google/cloud/datastore'

require './lib/model/phrase'

module Backend
  module Phrases
    PROJECT_ID = 'ted-merck-wall'
    PHRASE_QUERY_SOFT_LIMIT = 1000
    PHRASE_TTL_SECONDS = 5 * 60

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
      phrases
        .map { |entity| phrase_from(entity) }
        .compact
    end

    def self.post(namespace, phrase_text)
      validate_namespace!(namespace)

      datastore = Google::Cloud::Datastore.new(
        project_id: PROJECT_ID
      )

      phrase = datastore.entity(
        'Phrase', namespace: namespace.to_s) do |entity|
        entity['text'] = phrase_text
        entity['expiration_time'] =
          (Time.now.utc + PHRASE_TTL_SECONDS).xmlschema(3)
      end

      datastore.insert phrase
      phrase.key.id
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
      expires = if entity['expiration_time']
        (Time.parse(entity['expiration_time']) - Time.now.utc).floor
      end

      if !expires || expires > 0
        Model::Phrase.new(entity.key.id, entity['text'], expires)
      end
    end
  end
end
