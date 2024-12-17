#!/usr/bin/env ruby

# Usage:
#
# sudo mkdir -p /var/lib/led-wall
# sudo chmod 775 /var/lib/led-wall
# sudo chgrp "$(id -g)" /var/lib/led-wall
# rm -f /var/lib/led-wall/db.sqlite3
# bundle exec contrib/db/db_init.rb

require "sqlite3"

db = SQLite3::Database.new "/var/lib/led-wall/db.sqlite3"

db.execute <<-SQL
  CREATE TABLE phrase (
    id INTEGER PRIMARY KEY NOT NULL,
    profile_id INTEGER NOT NULL,
    namespace_id INTEGER NOT NULL CHECK(namespace_id == 0 OR namespace_id == 1),
    content TEXT NOT NULL,
    expiration_time TEXT
  );
SQL

db.execute <<-SQL
  CREATE TABLE profile (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
  );
SQL

db.execute <<-SQL
  INSERT INTO profile (id, name)
  VALUES
    (1, 'Default phrases (2024)'),
    (2, 'Classic phrases (2018)'),
    (3, 'Holidays 2024');
SQL

db.execute <<-SQL
  -- jq -r 'map("(\(.id), 2, 1, '\''\(.text)'\''),")[]' api-dumped/wall/v1/positive/phrases.json
  INSERT INTO phrase (id, profile_id, namespace_id, content)
  VALUES
    (4792528117170176, 2, 1, 'cures'),
    (5067792839606272, 2, 1, 'beyond boundaries'),
    (5070276337336320, 2, 1, 'minimal crime'),
    (5072753191288832, 2, 1, 'cake'),
    (5074003093880832, 2, 1, 'utopia'),
    (5076076959105024, 2, 1, 'everything is ok'),
    (5080222944722944, 2, 1, 'imagination'),
    (5083924199899136, 2, 1, 'friendly AI'),
    (5105650963054592, 2, 1, 'cats'),
    (5138380291571712, 2, 1, 'diversity'),
    (5139217877303296, 2, 1, 'planetary civilization'),
    (5144140178259968, 2, 1, 'deep understanding'),
    (5144752345317376, 2, 1, 'food efficiency'),
    (5147289865682944, 2, 1, 'vertical agriculture'),
    (5629499534213120, 2, 1, 'status quo'),
    (5630742793027584, 2, 1, 'terraforming'),
    (5631986051842048, 2, 1, 'nuclear disarmament'),
    (5633226290757632, 2, 1, 'peace'),
    (5634472569470976, 2, 1, 'the next century'),
    (5635703144710144, 2, 1, 'comfort and safety'),
    (5636953047302144, 2, 1, 'picturesque places'),
    (5638186843766784, 2, 1, 'new professions'),
    (5639026912526336, 2, 1, 'working together'),
    (5639445604728832, 2, 1, 'a chance to survive'),
    (5641497726681088, 2, 1, 'pure water upon clear sky'),
    (5641906755207168, 2, 1, 'lush nature'),
    (5643172898144256, 2, 1, 'living beings out there'),
    (5644406560391168, 2, 1, 'advanced technologies'),
    (5645015573331968, 2, 1, 'vibrant communities'),
    (5646874153320448, 2, 1, 'a pristine state'),
    (5664902681198592, 2, 1, 'ambulance drones'),
    (5667370274127872, 2, 1, 'personalised medicines'),
    (5668600916475904, 2, 1, 'sustainable energy'),
    (5672330625810432, 2, 1, 'equality'),
    (5672749318012928, 2, 1, 'virtual jungles'),
    (5679790782676992, 2, 1, 'machines of loving grace'),
    (5700305828184064, 2, 1, 'a bright green Earth'),
    (5701330244993024, 2, 1, 'leaving Earth'),
    (5702167830724608, 2, 1, 'restored environment'),
    (5705241014042624, 2, 1, 'eco-design'),
    (5706275094528000, 2, 1, 'laughing'),
    (5707090131681280, 2, 1, 'matrioshka brain'),
    (5707702298738688, 2, 1, 'living in harmony'),
    (5709624632147968, 2, 1, 'comfortable existence'),
    (5710239819104256, 2, 1, 'light'),
    (5711673465765888, 2, 1, 'healthy lives'),
    (5712088936742912, 2, 1, 'fewer problems'),
    (5715161717407744, 2, 1, 'ecologically diversified'),
    (6196176244178944, 2, 1, 'plant-based'),
    (6198653098131456, 2, 1, 'smiles'),
    (6199903000723456, 2, 1, 'moving forward'),
    (6265117784145920, 2, 1, 'opportunities'),
    (6270040085102592, 2, 1, 'independence'),
    (6270652252160000, 2, 1, 'space tours');
SQL

db.execute <<-SQL
  -- jq -r 'map("(\(.id), 2, 0, '\''\(.text)'\''),")[]' api-dumped/wall/v1/negative/phrases.json
  INSERT INTO phrase (id, profile_id, namespace_id, content)
  VALUES
    (4787561121710080, 2, 0, 'decrease in communication'),
    (5067792839606279, 2, 0, 'control of nature'),
    (5069036098420736, 2, 0, 'civilizational demise'),
    (5074003093880839, 2, 0, 'omnipotent technology'),
    (5076076959105029, 2, 0, 'eroded privacy'),
    (5076495651307520, 2, 0, 'frightening'),
    (5083924199899139, 2, 0, 'machine superpower'),
    (5140451673767936, 2, 0, 'stress'),
    (5144140178259974, 2, 0, 'surveillance'),
    (5144752345317381, 2, 0, 'collapse'),
    (5146674678726656, 2, 0, 'excessive pollution'),
    (5149138983321600, 2, 0, 'shallow'),
    (5152211763986432, 2, 0, 'rampant crime'),
    (5153049148391424, 2, 0, 'zombie apocalypse'),
    (5629499534213125, 2, 0, 'destroyed nature'),
    (5630121163620352, 2, 0, 'modern slavery'),
    (5630742793027588, 2, 0, 'misuse of technologies'),
    (5631986051842059, 2, 0, 'killer robots'),
    (5633226290757636, 2, 0, 'tyrannical governments'),
    (5634472569470982, 2, 0, 'control of machines'),
    (5635703144710148, 2, 0, 'pain'),
    (5636953047302149, 2, 0, 'extinction of humans'),
    (5638186843766792, 2, 0, 'fascist regime'),
    (5639026912526342, 2, 0, 'fear'),
    (5639445604728837, 2, 0, 'living underground'),
    (5640060892348416, 2, 0, 'unsatisfying'),
    (5641497726681092, 2, 0, 'environmental disaster'),
    (5641906755207177, 2, 0, 'dangerous technologies'),
    (5643172898144266, 2, 0, 'undesirable'),
    (5644406560391175, 2, 0, 'poverty'),
    (5645015573331969, 2, 0, 'black markets'),
    (5646874153320450, 2, 0, 'technological singularity'),
    (5668600916475909, 2, 0, 'cataclysmic decline'),
    (5670794235478016, 2, 0, 'dreary existence'),
    (5672330625810438, 2, 0, 'war'),
    (5674053578784768, 2, 0, 'bribe'),
    (5679790782676998, 2, 0, 'disintegration'),
    (5681034041491456, 2, 0, 'deprivation'),
    (5701330244993028, 2, 0, 'pessimistic'),
    (5703401627189248, 2, 0, 'dangerous'),
    (5705241014042627, 2, 0, 'not-good place'),
    (5706275094528001, 2, 0, 'uncaring'),
    (5707090131681288, 2, 0, 'oppression'),
    (5707702298738689, 2, 0, 'dehumanization'),
    (5708323928145920, 2, 0, 'atmospheric contamination'),
    (5709624632147974, 2, 0, 'reduced brain-function'),
    (5710239819104258, 2, 0, 'brutal'),
    (5712088936742915, 2, 0, 'darkness'),
    (5713309579870208, 2, 0, 'unabashed consumption'),
    (5715161717407748, 2, 0, 'nothing is ok'),
    (5715789755711488, 2, 0, 'control'),
    (5715999101812736, 2, 0, 'atomic explosion'),
    (5717023518621696, 2, 0, 'fatal flaw'),
    (5746055551385600, 2, 0, 'manipulation'),
    (5752256343310336, 2, 0, 'violence'),
    (6193692746448896, 2, 0, 'control of machines'),
    (6194936005263360, 2, 0, 'infiltration'),
    (6201976865947648, 2, 0, 'inequalities'),
    (6275038890164224, 2, 0, 'class system'),
    (6278949055234048, 2, 0, 'fanaticism');
SQL
