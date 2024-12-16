require 'time'
require 'sqlite3'

require './lib/model/phrase'

module Backend
  class Phrases
    PROFILE_ID = 2
    PHRASE_TTL_SECONDS = 5 * 60

    ALLOWED_NAMESPACES = %i[negative positive].freeze

    QUERY_ALL = <<-SQL
      SELECT phrase.id, phrase.content, phrase.expiration_time
      FROM phrase
      WHERE phrase.profile_id = :profile_id
      AND phrase.namespace_id = :is_positive
    SQL

    QUERY_SINGLE = <<-SQL
      SELECT phrase.id, phrase.content, phrase.expiration_time
      FROM phrase
      WHERE phrase.id = :id
      AND phrase.namespace_id = :is_positive
    SQL

    INSERT = <<-SQL
      INSERT INTO phrase (profile_id, namespace_id, content, expiration_time)
      VALUES (:profile_id, :is_positive, :content, :expiration_time)
    SQL

    unless SQLite3.threadsafe?
      raise 'This backend requires thread-safe SQLite'
    end
    @db = SQLite3::Database.new '/var/lib/led-wall/db.sqlite3'

    def self.get(namespace)
      validate_namespace!(namespace)

      @db.query(QUERY_ALL,
        'profile_id' => PROFILE_ID,
        'is_positive' => ALLOWED_NAMESPACES.find_index(namespace.to_sym)
      )
        .map { |row| phrase_from(row) }
        .compact
    end

    def self.post(namespace, phrase_text)
      validate_namespace!(namespace)

      @db.execute(INSERT,
        'profile_id' => PROFILE_ID,
        'is_positive' => ALLOWED_NAMESPACES.find_index(namespace.to_sym),
        'content' => phrase_text,
        'expiration_time' =>
          (Time.now.utc + PHRASE_TTL_SECONDS).xmlschema(3),
      )
      @db.last_insert_row_id
    end

    def self.get_by_id(namespace, id)
      validate_namespace!(namespace)

      @db.query(QUERY_SINGLE,
        'id' => id,
        'is_positive' => ALLOWED_NAMESPACES.find_index(namespace.to_sym)
      )
        .map { |row| phrase_from(row) }
        .first
    end

    def self.validate_namespace!(namespace)
      unless ALLOWED_NAMESPACES.include?(namespace)
        raise "#{namespace} is not a supported namespace"
      end
    end

    def self.phrase_from(row)
      expires = if row[2]
        (Time.parse(row[2]) - Time.now.utc).floor
      end

      if !expires || expires > 0
        Model::Phrase.new(row[0], row[1], expires)
      end
    end
  end
end
