/**
 * Themengebiet 1: Fussball-Nationalmannschaften
 *
 * DATENSTAND: kuratiert, Stand nach WM 2022 bzw. Laenderspiele bis Mitte 2025.
 * Die Werte sind handgepflegt und koennen leicht von tagesaktuellen Zahlen
 * abweichen -> einfach hier korrigieren, die App liest die Datei direkt.
 *
 * Felder:
 *   wmTeilnahmen        Anzahl WM-Endrundenteilnahmen        (hoeher = besser)
 *   wmSpiele            Spiele bei WM-Endrunden gesamt       (hoeher = besser)
 *   wmTabelle           Platz in der ewigen WM-Tabelle       (niedriger = besser)
 *   erstesSpiel         Jahr des ersten Laenderspiels        (frueher = besser)
 *   rekordspieler       { name, spiele }                     (mehr Spiele = besser)
 *   staerke             0-100, historische/strukturelle Staerke (fuer Simulation)
 *   form                0-100, aktuelle Form                    (fuer Simulation)
 */
export const NATIONALTEAMS = [
  { id:'bra', name:'Brasilien',     flag:'🇧🇷', aliases:['brasil','brazil'],                 wmTeilnahmen:22, wmSpiele:114, wmTabelle:1,  erstesSpiel:1914, rekordspieler:{name:'Cafu', spiele:142},                staerke:94, form:78 },
  { id:'ger', name:'Deutschland',   flag:'🇩🇪', aliases:['germany','brd','die mannschaft'],   wmTeilnahmen:20, wmSpiele:112, wmTabelle:2,  erstesSpiel:1908, rekordspieler:{name:'Lothar Matthäus', spiele:150},   staerke:92, form:80 },
  { id:'ita', name:'Italien',       flag:'🇮🇹', aliases:['italy','italia','squadra azzurra'], wmTeilnahmen:18, wmSpiele:83,  wmTabelle:3,  erstesSpiel:1910, rekordspieler:{name:'Gianluigi Buffon', spiele:176},  staerke:88, form:72 },
  { id:'arg', name:'Argentinien',   flag:'🇦🇷', aliases:['argentina','argentinia'],           wmTeilnahmen:18, wmSpiele:88,  wmTabelle:4,  erstesSpiel:1902, rekordspieler:{name:'Lionel Messi', spiele:193},      staerke:93, form:90 },
  { id:'fra', name:'Frankreich',    flag:'🇫🇷', aliases:['france','les bleus'],               wmTeilnahmen:16, wmSpiele:73,  wmTabelle:5,  erstesSpiel:1904, rekordspieler:{name:'Hugo Lloris', spiele:145},       staerke:93, form:88 },
  { id:'eng', name:'England',       flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', aliases:['three lions'],                      wmTeilnahmen:16, wmSpiele:74,  wmTabelle:6,  erstesSpiel:1872, rekordspieler:{name:'Peter Shilton', spiele:125},     staerke:90, form:85 },
  { id:'esp', name:'Spanien',       flag:'🇪🇸', aliases:['spain','espana','españa','la roja'], wmTeilnahmen:16, wmSpiele:67, wmTabelle:7,  erstesSpiel:1920, rekordspieler:{name:'Sergio Ramos', spiele:180},      staerke:91, form:92 },
  { id:'ned', name:'Niederlande',   flag:'🇳🇱', aliases:['holland','netherlands','oranje'],   wmTeilnahmen:11, wmSpiele:55,  wmTabelle:8,  erstesSpiel:1905, rekordspieler:{name:'Wesley Sneijder', spiele:134},   staerke:88, form:82 },
  { id:'uru', name:'Uruguay',       flag:'🇺🇾', aliases:['la celeste'],                       wmTeilnahmen:14, wmSpiele:59,  wmTabelle:9,  erstesSpiel:1902, rekordspieler:{name:'Diego Godín', spiele:161},       staerke:84, form:78 },
  { id:'bel', name:'Belgien',       flag:'🇧🇪', aliases:['belgium','rote teufel'],            wmTeilnahmen:14, wmSpiele:48,  wmTabelle:10, erstesSpiel:1904, rekordspieler:{name:'Jan Vertonghen', spiele:157},    staerke:85, form:76 },
  { id:'swe', name:'Schweden',      flag:'🇸🇪', aliases:['sweden','sverige'],                 wmTeilnahmen:12, wmSpiele:51,  wmTabelle:11, erstesSpiel:1908, rekordspieler:{name:'Anders Svensson', spiele:148},   staerke:76, form:68 },
  { id:'sui', name:'Schweiz',       flag:'🇨🇭', aliases:['switzerland','suisse','schwiiz'],   wmTeilnahmen:12, wmSpiele:41,  wmTabelle:24, erstesSpiel:1905, rekordspieler:{name:'Granit Xhaka', spiele:135},      staerke:79, form:74 },
  { id:'mex', name:'Mexiko',        flag:'🇲🇽', aliases:['mexico','el tri'],                  wmTeilnahmen:17, wmSpiele:60,  wmTabelle:14, erstesSpiel:1923, rekordspieler:{name:'Andrés Guardado', spiele:180},   staerke:78, form:70 },
  { id:'cro', name:'Kroatien',      flag:'🇭🇷', aliases:['croatia','hrvatska'],               wmTeilnahmen:6,  wmSpiele:31,  wmTabelle:17, erstesSpiel:1990, rekordspieler:{name:'Luka Modrić', spiele:183},       staerke:85, form:80 },
  { id:'por', name:'Portugal',      flag:'🇵🇹', aliases:['selecao','seleção'],                wmTeilnahmen:8,  wmSpiele:34,  wmTabelle:18, erstesSpiel:1921, rekordspieler:{name:'Cristiano Ronaldo', spiele:222}, staerke:90, form:89 },
  { id:'pol', name:'Polen',         flag:'🇵🇱', aliases:['poland','polska'],                  wmTeilnahmen:9,  wmSpiele:37,  wmTabelle:23, erstesSpiel:1921, rekordspieler:{name:'Robert Lewandowski', spiele:158},staerke:76, form:66 },
  { id:'aut', name:'Österreich',    flag:'🇦🇹', aliases:['austria','oesterreich'],            wmTeilnahmen:7,  wmSpiele:29,  wmTabelle:22, erstesSpiel:1902, rekordspieler:{name:'Marko Arnautović', spiele:125},  staerke:79, form:80 },
  { id:'cze', name:'Tschechien',    flag:'🇨🇿', aliases:['czech','tschechei'],                wmTeilnahmen:10, wmSpiele:33,  wmTabelle:20, erstesSpiel:1920, rekordspieler:{name:'Petr Čech', spiele:124},         staerke:73, form:65 },
  { id:'den', name:'Dänemark',      flag:'🇩🇰', aliases:['denmark','danmark','daenemark'],    wmTeilnahmen:6,  wmSpiele:22,  wmTabelle:30, erstesSpiel:1908, rekordspieler:{name:'Simon Kjær', spiele:133},        staerke:80, form:76 },
  { id:'srb', name:'Serbien',       flag:'🇷🇸', aliases:['serbia','srbija'],                  wmTeilnahmen:13, wmSpiele:43,  wmTabelle:19, erstesSpiel:1920, rekordspieler:{name:'Dejan Stanković', spiele:103},   staerke:74, form:64 },
  { id:'tur', name:'Türkei',        flag:'🇹🇷', aliases:['turkey','tuerkei','türkiye'],       wmTeilnahmen:2,  wmSpiele:10,  wmTabelle:26, erstesSpiel:1923, rekordspieler:{name:'Rüştü Reçber', spiele:120},      staerke:78, form:78 },
  { id:'sco', name:'Schottland',    flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', aliases:['scotland'],                        wmTeilnahmen:8,  wmSpiele:23,  wmTabelle:37, erstesSpiel:1872, rekordspieler:{name:'Kenny Dalglish', spiele:102},   staerke:70, form:68 },
  { id:'wal', name:'Wales',         flag:'🏴󠁧󠁢󠁷󠁬󠁳󠁿', aliases:['cymru'],                           wmTeilnahmen:2,  wmSpiele:10,  wmTabelle:57, erstesSpiel:1876, rekordspieler:{name:'Chris Gunter', spiele:109},     staerke:69, form:64 },
  { id:'irl', name:'Irland',        flag:'🇮🇪', aliases:['ireland','eire'],                   wmTeilnahmen:3,  wmSpiele:13,  wmTabelle:46, erstesSpiel:1882, rekordspieler:{name:'Robbie Keane', spiele:146},      staerke:66, form:60 },
  { id:'nor', name:'Norwegen',      flag:'🇳🇴', aliases:['norway','norge'],                   wmTeilnahmen:3,  wmSpiele:8,   wmTabelle:59, erstesSpiel:1908, rekordspieler:{name:'John Arne Riise', spiele:110},   staerke:75, form:82 },
  { id:'gre', name:'Griechenland',  flag:'🇬🇷', aliases:['greece','hellas'],                  wmTeilnahmen:3,  wmSpiele:10,  wmTabelle:62, erstesSpiel:1929, rekordspieler:{name:'Giorgos Karagounis', spiele:139},staerke:68, form:66 },
  { id:'ukr', name:'Ukraine',       flag:'🇺🇦', aliases:['ukraina'],                          wmTeilnahmen:1,  wmSpiele:5,   wmTabelle:64, erstesSpiel:1992, rekordspieler:{name:'Anatoliy Tymoshchuk', spiele:144},staerke:72, form:66 },
  { id:'usa', name:'USA',           flag:'🇺🇸', aliases:['vereinigte staaten','amerika','united states'], wmTeilnahmen:11, wmSpiele:37, wmTabelle:31, erstesSpiel:1916, rekordspieler:{name:'Cobi Jones', spiele:164}, staerke:74, form:70 },
  { id:'can', name:'Kanada',        flag:'🇨🇦', aliases:['canada'],                           wmTeilnahmen:3,  wmSpiele:6,   wmTabelle:76, erstesSpiel:1924, rekordspieler:{name:'Atiba Hutchinson', spiele:104},  staerke:69, form:70 },
  { id:'crc', name:'Costa Rica',    flag:'🇨🇷', aliases:['costarica'],                        wmTeilnahmen:6,  wmSpiele:18,  wmTabelle:44, erstesSpiel:1921, rekordspieler:{name:'Celso Borges', spiele:160},      staerke:63, form:58 },
  { id:'col', name:'Kolumbien',     flag:'🇨🇴', aliases:['colombia','kolumbia'],              wmTeilnahmen:6,  wmSpiele:22,  wmTabelle:35, erstesSpiel:1938, rekordspieler:{name:'David Ospina', spiele:128},      staerke:82, form:84 },
  { id:'chi', name:'Chile',         flag:'🇨🇱', aliases:['la roja chile'],                    wmTeilnahmen:9,  wmSpiele:33,  wmTabelle:27, erstesSpiel:1910, rekordspieler:{name:'Alexis Sánchez', spiele:166},    staerke:72, form:58 },
  { id:'per', name:'Peru',          flag:'🇵🇪', aliases:[],                                   wmTeilnahmen:5,  wmSpiele:18,  wmTabelle:43, erstesSpiel:1927, rekordspieler:{name:'Roberto Palacios', spiele:128},  staerke:67, form:58 },
  { id:'ecu', name:'Ecuador',       flag:'🇪🇨', aliases:['equador'],                          wmTeilnahmen:4,  wmSpiele:13,  wmTabelle:55, erstesSpiel:1938, rekordspieler:{name:'Iván Hurtado', spiele:168},      staerke:74, form:74 },
  { id:'par', name:'Paraguay',      flag:'🇵🇾', aliases:[],                                   wmTeilnahmen:8,  wmSpiele:27,  wmTabelle:33, erstesSpiel:1919, rekordspieler:{name:'Paulo da Silva', spiele:148},    staerke:70, form:70 },
  { id:'mar', name:'Marokko',       flag:'🇲🇦', aliases:['morocco','maroc'],                  wmTeilnahmen:6,  wmSpiele:22,  wmTabelle:34, erstesSpiel:1957, rekordspieler:{name:'Noureddine Naybet', spiele:115}, staerke:83, form:86 },
  { id:'sen', name:'Senegal',       flag:'🇸🇳', aliases:['senegall'],                         wmTeilnahmen:3,  wmSpiele:12,  wmTabelle:50, erstesSpiel:1961, rekordspieler:{name:'Henri Camara', spiele:99},       staerke:80, form:80 },
  { id:'cmr', name:'Kamerun',       flag:'🇨🇲', aliases:['cameroon','kamerum'],               wmTeilnahmen:8,  wmSpiele:26,  wmTabelle:40, erstesSpiel:1956, rekordspieler:{name:'Rigobert Song', spiele:137},     staerke:72, form:66 },
  { id:'nga', name:'Nigeria',       flag:'🇳🇬', aliases:['super eagles'],                     wmTeilnahmen:6,  wmSpiele:21,  wmTabelle:41, erstesSpiel:1949, rekordspieler:{name:'Ahmed Musa', spiele:109},        staerke:76, form:70 },
  { id:'gha', name:'Ghana',         flag:'🇬🇭', aliases:['black stars'],                      wmTeilnahmen:4,  wmSpiele:15,  wmTabelle:48, erstesSpiel:1950, rekordspieler:{name:'Asamoah Gyan', spiele:109},      staerke:71, form:64 },
  { id:'egy', name:'Ägypten',       flag:'🇪🇬', aliases:['egypt','aegypten'],                 wmTeilnahmen:3,  wmSpiele:7,   wmTabelle:60, erstesSpiel:1920, rekordspieler:{name:'Ahmed Hassan', spiele:184},      staerke:75, form:74 },
  { id:'alg', name:'Algerien',      flag:'🇩🇿', aliases:['algeria','algerie'],                wmTeilnahmen:4,  wmSpiele:16,  wmTabelle:47, erstesSpiel:1963, rekordspieler:{name:'Riyad Mahrez', spiele:104},      staerke:74, form:72 },
  { id:'tun', name:'Tunesien',      flag:'🇹🇳', aliases:['tunisia'],                          wmTeilnahmen:6,  wmSpiele:18,  wmTabelle:52, erstesSpiel:1957, rekordspieler:{name:'Radhi Jaïdi', spiele:105},       staerke:70, form:68 },
  { id:'civ', name:'Elfenbeinküste',flag:'🇨🇮', aliases:['ivory coast','elfenbeinkueste','cote divoire'], wmTeilnahmen:3, wmSpiele:9, wmTabelle:56, erstesSpiel:1960, rekordspieler:{name:'Didier Zokora', spiele:123}, staerke:75, form:76 },
  { id:'jpn', name:'Japan',         flag:'🇯🇵', aliases:['nippon'],                           wmTeilnahmen:7,  wmSpiele:25,  wmTabelle:38, erstesSpiel:1917, rekordspieler:{name:'Yasuhito Endō', spiele:152},     staerke:81, form:86 },
  { id:'kor', name:'Südkorea',      flag:'🇰🇷', aliases:['korea','suedkorea','south korea'],  wmTeilnahmen:11, wmSpiele:38,  wmTabelle:29, erstesSpiel:1948, rekordspieler:{name:'Hong Myung-bo', spiele:136},    staerke:76, form:74 },
  { id:'aus', name:'Australien',    flag:'🇦🇺', aliases:['australia','socceroos'],            wmTeilnahmen:6,  wmSpiele:22,  wmTabelle:45, erstesSpiel:1922, rekordspieler:{name:'Mark Schwarzer', spiele:109},    staerke:70, form:68 },
  { id:'irn', name:'Iran',          flag:'🇮🇷', aliases:['persien'],                          wmTeilnahmen:6,  wmSpiele:18,  wmTabelle:53, erstesSpiel:1941, rekordspieler:{name:'Javad Nekounam', spiele:151},    staerke:72, form:72 },
  { id:'ksa', name:'Saudi-Arabien', flag:'🇸🇦', aliases:['saudi arabien','saudiarabien','saudi'], wmTeilnahmen:6, wmSpiele:19, wmTabelle:54, erstesSpiel:1957, rekordspieler:{name:'Mohamed Al-Deayea', spiele:178}, staerke:66, form:62 },
  { id:'qat', name:'Katar',         flag:'🇶🇦', aliases:['qatar'],                            wmTeilnahmen:1,  wmSpiele:3,   wmTabelle:80, erstesSpiel:1970, rekordspieler:{name:'Hassan Al-Haydos', spiele:178},  staerke:60, form:58 },
];
