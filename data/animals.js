/**
 * Themengebiet 3: Tiere - Vorauswahl aus aller Welt, Wildtiere + Nutztiere.
 *
 * Werte sind typische Durchschnitts-/Maximalwerte fuer ausgewachsene Tiere
 * (Quellen: gaengige Tierlexika, gerundet und kindgerecht vereinfacht).
 *
 * Felder:
 *   groesse  cm  Koerperlaenge bzw. Schulter-/Standhoehe   (groesser = besser)
 *   gewicht  kg  Koerpergewicht                            (schwerer = besser)
 *   leben    a   Lebenserwartung in Jahren                 (laenger = besser)
 *   tempo    km/h Hoechstgeschwindigkeit                   (schneller = besser)
 *   kraft    Punkte 1-100, Kraft-/Wehrhaftigkeitswert      (mehr = besser)
 */
export const ANIMALS = [
  // --- Wildtiere ---
  { id:'loewe',      name:'Löwe',              emoji:'🦁', art:'wild',     aliases:['lion'],                     groesse:200,  gewicht:190,    leben:14,   tempo:80,  kraft:88, fact:'Ein Löwenbrüllen ist bis zu 8 km weit zu hören.' },
  { id:'tiger',      name:'Tiger',             emoji:'🐯', art:'wild',     aliases:[],                           groesse:250,  gewicht:260,    leben:15,   tempo:65,  kraft:92, fact:'Der Sibirische Tiger ist die größte Raubkatze der Welt.' },
  { id:'elefant',    name:'Elefant',           emoji:'🐘', art:'wild',     aliases:['afrikanischer elefant'],    groesse:330,  gewicht:6000,   leben:65,   tempo:40,  kraft:98, fact:'Sein Rüssel hat über 40.000 Muskeln.' },
  { id:'giraffe',    name:'Giraffe',           emoji:'🦒', art:'wild',     aliases:[],                           groesse:550,  gewicht:1200,   leben:25,   tempo:60,  kraft:62, fact:'Die Zunge einer Giraffe ist fast 50 cm lang.' },
  { id:'nilpferd',   name:'Nilpferd',          emoji:'🦛', art:'wild',     aliases:['hippo','flusspferd'],       groesse:400,  gewicht:1500,   leben:45,   tempo:30,  kraft:90, fact:'Nilpferde können ihr Maul 150 Grad weit öffnen.' },
  { id:'nashorn',    name:'Nashorn',           emoji:'🦏', art:'wild',     aliases:['rhino'],                    groesse:380,  gewicht:2300,   leben:45,   tempo:50,  kraft:93, fact:'Das Horn besteht aus dem gleichen Stoff wie deine Fingernägel.' },
  { id:'krokodil',   name:'Krokodil',          emoji:'🐊', art:'wild',     aliases:['leistenkrokodil'],          groesse:500,  gewicht:1000,   leben:70,   tempo:29,  kraft:96, fact:'Es hat den stärksten Biss aller Tiere.' },
  { id:'braunbaer',  name:'Braunbär',          emoji:'🐻', art:'wild',     aliases:['bär','baer','grizzly'],     groesse:250,  gewicht:350,    leben:25,   tempo:48,  kraft:87, fact:'Im Winterschlaf schlägt sein Herz nur 8-mal pro Minute.' },
  { id:'eisbaer',    name:'Eisbär',            emoji:'🐻‍❄️', art:'wild',   aliases:['polarbär','eisbaer'],       groesse:250,  gewicht:450,    leben:25,   tempo:40,  kraft:91, fact:'Unter dem weißen Fell ist seine Haut schwarz.' },
  { id:'gorilla',    name:'Gorilla',           emoji:'🦍', art:'wild',     aliases:['silberrücken'],             groesse:175,  gewicht:200,    leben:40,   tempo:40,  kraft:94, fact:'Ein Gorilla ist etwa 6-mal so stark wie ein Mensch.' },
  { id:'schimpanse', name:'Schimpanse',        emoji:'🐵', art:'wild',     aliases:['affe'],                     groesse:130,  gewicht:50,     leben:40,   tempo:40,  kraft:60, fact:'Schimpansen benutzen Stöcke als Werkzeug.' },
  { id:'wolf',       name:'Wolf',              emoji:'🐺', art:'wild',     aliases:[],                           groesse:130,  gewicht:45,     leben:13,   tempo:60,  kraft:58, fact:'Ein Wolfsrudel läuft pro Nacht bis zu 60 km weit.' },
  { id:'fuchs',      name:'Fuchs',             emoji:'🦊', art:'wild',     aliases:['rotfuchs'],                 groesse:75,   gewicht:7,      leben:5,    tempo:50,  kraft:20, fact:'Ein Fuchs hört eine Maus unter dem Schnee.' },
  { id:'gepard',     name:'Gepard',            emoji:'🐆', art:'wild',     aliases:['cheetah'],                  groesse:130,  gewicht:60,     leben:12,   tempo:112, kraft:45, fact:'Er beschleunigt in 3 Sekunden auf 100 km/h.' },
  { id:'kaenguru',   name:'Känguru',           emoji:'🦘', art:'wild',     aliases:['kanguru','kaenguruh'],      groesse:160,  gewicht:85,     leben:20,   tempo:70,  kraft:48, fact:'Ein Sprung ist bis zu 9 Meter weit.' },
  { id:'koala',      name:'Koala',             emoji:'🐨', art:'wild',     aliases:[],                           groesse:80,   gewicht:12,     leben:15,   tempo:30,  kraft:15, fact:'Koalas schlafen bis zu 20 Stunden am Tag.' },
  { id:'panda',      name:'Panda',             emoji:'🐼', art:'wild',     aliases:['großer panda'],             groesse:160,  gewicht:110,    leben:20,   tempo:32,  kraft:70, fact:'Ein Panda frisst täglich 12 kg Bambus.' },
  { id:'faultier',   name:'Faultier',          emoji:'🦥', art:'wild',     aliases:[],                           groesse:60,   gewicht:6,      leben:30,   tempo:0.24,kraft:12, fact:'Es braucht einen ganzen Monat, um sein Essen zu verdauen.' },
  { id:'adler',      name:'Adler',             emoji:'🦅', art:'wild',     aliases:['steinadler'],               groesse:90,   gewicht:5,      leben:30,   tempo:240, kraft:38, fact:'Im Sturzflug ist er schneller als ein Rennwagen.' },
  { id:'pinguin',    name:'Pinguin',           emoji:'🐧', art:'wild',     aliases:['kaiserpinguin'],            groesse:120,  gewicht:40,     leben:20,   tempo:9,   kraft:14, fact:'Kaiserpinguine tauchen über 500 Meter tief.' },
  { id:'blauwal',    name:'Blauwal',           emoji:'🐳', art:'wild',     aliases:['wal'],                      groesse:2500, gewicht:150000, leben:85,   tempo:37,  kraft:100,fact:'Sein Herz ist so groß wie ein Kleinwagen.' },
  { id:'orca',       name:'Orca',              emoji:'🐋', art:'wild',     aliases:['schwertwal','killerwal'],   groesse:700,  gewicht:5000,   leben:60,   tempo:56,  kraft:95, fact:'Orcas geben sich gegenseitig Namen - mit Pfeiflauten.' },
  { id:'hai',        name:'Weißer Hai',        emoji:'🦈', art:'wild',     aliases:['hai','weisser hai'],        groesse:500,  gewicht:1100,   leben:70,   tempo:56,  kraft:97, fact:'Er riecht einen Tropfen Blut in 100 Litern Wasser.' },
  { id:'delfin',     name:'Delfin',            emoji:'🐬', art:'wild',     aliases:['delphin'],                  groesse:250,  gewicht:200,    leben:45,   tempo:60,  kraft:42, fact:'Delfine schlafen immer nur mit einer Gehirnhälfte.' },
  { id:'krake',      name:'Krake',             emoji:'🐙', art:'wild',     aliases:['oktopus','tintenfisch'],    groesse:100,  gewicht:15,     leben:3,    tempo:40,  kraft:36, fact:'Ein Krake hat drei Herzen und blaues Blut.' },
  { id:'schildkroete',name:'Riesenschildkröte',emoji:'🐢', art:'wild',     aliases:['schildkröte','schildkroete'],groesse:120, gewicht:250,    leben:150,  tempo:0.5, kraft:26, fact:'Sie kann älter werden als deine Urgroßeltern.' },
  { id:'python',     name:'Python',            emoji:'🐍', art:'wild',     aliases:['schlange','riesenschlange'],groesse:500,  gewicht:90,     leben:30,   tempo:20,  kraft:72, fact:'Eine Python kann ein ganzes Reh verschlingen.' },
  { id:'fledermaus', name:'Fledermaus',        emoji:'🦇', art:'wild',     aliases:[],                           groesse:12,   gewicht:0.03,   leben:20,   tempo:40,  kraft:4,  fact:'Sie sieht mit den Ohren - per Echo.' },
  { id:'igel',       name:'Igel',              emoji:'🦔', art:'wild',     aliases:[],                           groesse:25,   gewicht:1.2,    leben:6,    tempo:8,   kraft:6,  fact:'Ein Igel trägt rund 8.000 Stacheln.' },
  { id:'eichhoernchen',name:'Eichhörnchen',    emoji:'🐿️', art:'wild',    aliases:['eichhoernchen'],            groesse:22,   gewicht:0.35,   leben:6,    tempo:20,  kraft:3,  fact:'Es vergisst, wo die Hälfte seiner Nüsse liegt - so wachsen Bäume.' },
  { id:'waschbaer',  name:'Waschbär',          emoji:'🦝', art:'wild',     aliases:['waschbaer'],                groesse:60,   gewicht:8,      leben:5,    tempo:24,  kraft:19, fact:'Er kann Türklinken und Schraubdeckel öffnen.' },
  { id:'elch',       name:'Elch',              emoji:'🦌', art:'wild',     aliases:['hirsch'],                   groesse:230,  gewicht:500,    leben:20,   tempo:56,  kraft:58, fact:'Sein Geweih wird jedes Jahr neu gebildet.' },
  { id:'zebra',      name:'Zebra',             emoji:'🦓', art:'wild',     aliases:[],                           groesse:240,  gewicht:350,    leben:25,   tempo:65,  kraft:52, fact:'Kein Zebra hat das gleiche Streifenmuster wie ein anderes.' },
  { id:'kamel',      name:'Kamel',             emoji:'🐪', art:'wild',     aliases:['dromedar'],                 groesse:300,  gewicht:600,    leben:45,   tempo:65,  kraft:48, fact:'Es trinkt 100 Liter Wasser in nur 10 Minuten.' },
  { id:'flamingo',   name:'Flamingo',          emoji:'🦩', art:'wild',     aliases:[],                           groesse:120,  gewicht:3.5,    leben:40,   tempo:60,  kraft:9,  fact:'Rosa wird er erst durch sein Futter.' },
  { id:'papagei',    name:'Papagei',           emoji:'🦜', art:'wild',     aliases:['ara'],                      groesse:90,   gewicht:1.2,    leben:60,   tempo:56,  kraft:28, fact:'Manche Aras werden älter als 80 Jahre.' },
  { id:'otter',      name:'Otter',             emoji:'🦦', art:'wild',     aliases:['fischotter'],               groesse:100,  gewicht:25,     leben:20,   tempo:11,  kraft:24, fact:'Otter halten beim Schlafen Pfötchen, um nicht wegzutreiben.' },
  { id:'wildschwein',name:'Wildschwein',       emoji:'🐗', art:'wild',     aliases:['keiler'],                   groesse:150,  gewicht:120,    leben:12,   tempo:48,  kraft:64, fact:'Es riecht Futter 5 Meter tief unter der Erde.' },
  { id:'frosch',     name:'Frosch',            emoji:'🐸', art:'wild',     aliases:[],                           groesse:10,   gewicht:0.06,   leben:10,   tempo:8,   kraft:3,  fact:'Er trinkt nicht - er nimmt Wasser über die Haut auf.' },
  { id:'krabbe',     name:'Krabbe',            emoji:'🦀', art:'wild',     aliases:['krebs'],                    groesse:20,   gewicht:2,      leben:10,   tempo:4,   kraft:32, fact:'Krabben können Beine nachwachsen lassen.' },
  { id:'schnecke',   name:'Schnecke',          emoji:'🐌', art:'wild',     aliases:[],                           groesse:8,    gewicht:0.03,   leben:7,    tempo:0.05,kraft:1,  fact:'Sie hat über 10.000 winzige Zähne.' },
  { id:'biene',      name:'Biene',             emoji:'🐝', art:'wild',     aliases:['honigbiene'],               groesse:1.5,  gewicht:0.0001, leben:0.12, tempo:29,  kraft:2,  fact:'Für 1 Glas Honig fliegen Bienen 3-mal um die Erde.' },
  { id:'ameise',     name:'Ameise',            emoji:'🐜', art:'wild',     aliases:[],                           groesse:0.6,  gewicht:0.00001,leben:1,    tempo:0.9, kraft:2,  fact:'Sie trägt das 50-Fache ihres eigenen Gewichts.' },
  { id:'maus',       name:'Maus',              emoji:'🐁', art:'wild',     aliases:[],                           groesse:9,    gewicht:0.02,   leben:2,    tempo:13,  kraft:1,  fact:'Eine Maus passt durch ein Loch so groß wie ein Bleistift.' },
  // --- Nutztiere ---
  { id:'kuh',        name:'Kuh',               emoji:'🐄', art:'nutztier', aliases:['rind'],                     groesse:150,  gewicht:750,    leben:20,   tempo:40,  kraft:50, fact:'Eine Kuh kaut bis zu 8 Stunden am Tag wieder.' },
  { id:'pferd',      name:'Pferd',             emoji:'🐴', art:'nutztier', aliases:['ross'],                     groesse:165,  gewicht:550,    leben:28,   tempo:70,  kraft:58, fact:'Pferde schlafen auch im Stehen.' },
  { id:'schwein',    name:'Schwein',           emoji:'🐖', art:'nutztier', aliases:['sau'],                      groesse:100,  gewicht:250,    leben:15,   tempo:17,  kraft:38, fact:'Schweine sind schlauer als Hunde.' },
  { id:'schaf',      name:'Schaf',             emoji:'🐑', art:'nutztier', aliases:[],                           groesse:90,   gewicht:80,     leben:12,   tempo:40,  kraft:22, fact:'Ein Schaf erkennt bis zu 50 Gesichter wieder.' },
  { id:'ziege',      name:'Ziege',             emoji:'🐐', art:'nutztier', aliases:['geiss'],                    groesse:90,   gewicht:65,     leben:15,   tempo:27,  kraft:24, fact:'Ziegen klettern auf fast senkrechte Felswände.' },
  { id:'huhn',       name:'Huhn',              emoji:'🐔', art:'nutztier', aliases:['henne'],                    groesse:45,   gewicht:3,      leben:8,    tempo:14,  kraft:4,  fact:'Hühner können sich über 100 Gesichter merken.' },
  { id:'ente',       name:'Ente',              emoji:'🦆', art:'nutztier', aliases:[],                           groesse:60,   gewicht:3.5,    leben:10,   tempo:30,  kraft:5,  fact:'Entenfedern bleiben im Wasser komplett trocken.' },
  { id:'schwan',     name:'Schwan',            emoji:'🦢', art:'nutztier', aliases:[],                           groesse:150,  gewicht:12,     leben:20,   tempo:60,  kraft:16, fact:'Ein Schwan hat über 25.000 Federn.' },
  { id:'hund',       name:'Hund',              emoji:'🐕', art:'nutztier', aliases:['schäferhund'],              groesse:60,   gewicht:30,     leben:13,   tempo:45,  kraft:36, fact:'Er riecht 10.000-mal besser als ein Mensch.' },
  { id:'katze',      name:'Katze',             emoji:'🐈', art:'nutztier', aliases:['mieze'],                    groesse:45,   gewicht:4.5,    leben:15,   tempo:48,  kraft:16, fact:'Katzen schlafen 16 Stunden pro Tag.' },
  { id:'kaninchen',  name:'Kaninchen',         emoji:'🐰', art:'nutztier', aliases:['hase'],                     groesse:45,   gewicht:2,      leben:9,    tempo:45,  kraft:8,  fact:'Kaninchen sehen fast rundherum, ohne den Kopf zu drehen.' },
  { id:'alpaka',     name:'Alpaka',            emoji:'🦙', art:'nutztier', aliases:['lama'],                     groesse:90,   gewicht:65,     leben:20,   tempo:56,  kraft:22, fact:'Alpakas summen, wenn sie sich unterhalten.' },
  { id:'wasserbueffel',name:'Wasserbüffel',    emoji:'🐃', art:'nutztier', aliases:['bueffel','büffel'],         groesse:170,  gewicht:900,    leben:25,   tempo:48,  kraft:74, fact:'Er zieht in Asien bis heute die meisten Reisfelder-Pflüge.' },
  { id:'truthahn',   name:'Truthahn',          emoji:'🦃', art:'nutztier', aliases:['pute'],                     groesse:110,  gewicht:12,     leben:10,   tempo:40,  kraft:10, fact:'Wilde Truthähne fliegen bis zu 90 km/h schnell.' },
];
