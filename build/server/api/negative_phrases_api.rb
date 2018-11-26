require 'json'

require './lib/backend'

MyApp.add_route('POST', '/api/kiosk/v1/negative/phrases', {
  "resourcePath" => "/NegativePhrases",
  "summary" => "Creates a negative phrase",
  "nickname" => "create_negative_phrase",
  "responseClass" => "Phrase",
  "endpoint" => "/negative/phrases",
  "notes" => "Creates a negative phrase.",
  "parameters" => [
    ]}) do
  cross_origin

  error(405)
end

MyApp.add_route('GET', '/api/wall/v1/negative/phrases/{id}', {
  "resourcePath" => "/NegativePhrases",
  "summary" => "Returns the negative phrase with the given ID",
  "nickname" => "get_negative_phrase_by_id",
  "responseClass" => "Phrase",
  "endpoint" => "/negative/phrases/{id}",
  "notes" => "",
  "parameters" => [
    {
      "name" => "id",
      "description" => "ID of the phrase",
      "dataType" => "Integer",
      "paramType" => "path",
    },
    ]}) do
  cross_origin

  id_int = begin
    Integer(params["id"])
  rescue ArgumentError
    error(400)
  end

  phrase = Backend::Phrases.get_by_id(:negative, id_int)

  if phrase.nil?
    error(404)
  else
    phrase.to_json
  end
end

MyApp.add_route('GET', '/api/wall/v1/negative/phrases', {
  "resourcePath" => "/NegativePhrases",
  "summary" => "Returns a list of negative phrases",
  "nickname" => "get_negative_phrases",
  "responseClass" => "Array<Phrase>",
  "endpoint" => "/negative/phrases",
  "notes" => "Returns a list of negative phrases in no particular order.",
  "parameters" => [
    ]}) do
  cross_origin

  phrases = Backend::Phrases.get(:negative)

  if phrases.nil?
    error(404)
  else
    content_type 'application/json'
    phrases.to_json
  end
end
