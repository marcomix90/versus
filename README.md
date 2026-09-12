# VERSUS – A gegen B

Eine PWA (Progressive Web App) zum Duellieren: zwei Kontrahenten auswählen, fünf
Kategorien vergleichen, wer die meisten gewinnt, gewinnt das Duell. Gebaut ohne
Framework und ohne Build-Schritt – nur HTML, CSS und ES-Module.

## Starten

Die App braucht einen HTTP-Server (ES-Module und der Service Worker laufen nicht
über `file://`):

```bash
cd versus
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

Auf dem Handy: Rechner und Handy im selben WLAN, `http://<Rechner-IP>:8000` öffnen.
Für die **Spracheingabe unterwegs** wird HTTPS gebraucht (Ausnahme: `localhost`) –
also z. B. über GitHub Pages, Netlify oder Cloudflare Pages veröffentlichen.

**Installieren:** In Chrome/Edge erscheint auf dem Startbildschirm der Button
„📲 App installieren“; unter iOS über Safari → Teilen → „Zum Home-Bildschirm“.
Danach läuft alles offline.

## Bedienung

* **Antippen:** erst tippt man A, dann B. Nochmal auf eine gewählte Kachel oder
  auf den Slot tippen macht die Auswahl rückgängig.
* **Sprechen:** Mikro-Button drücken und z. B. *„Frankreich gegen Senegal“* sagen.
  Erkannt werden auch `vs`, `versus`, `und` als Trennwort, Spitznamen („Barca“,
  „Juve“, „Oranje“) und Sätze ganz ohne Trennwort („Brasilien Argentinien“).
  Wird nur ein Name verstanden, landet er in A und die App fragt nach dem Gegner.
  **Nur Chrome/Edge** können die Web Speech API – in Firefox/Safari blendet sich
  der Mikro-Button aus.
* **🎲 Zufall** würfelt beide Seiten aus, **⏩ alles zeigen** überspringt die
  Aufdeck-Animation, **🔄 Seiten tauschen** dreht A und B um.

### Deep-Links

`?t=<thema>&a=<id>&b=<id>` startet ein Duell direkt, z. B.

```
?t=nations&a=fra&b=sen        # Duell mit Aufdeck-Animation
?t=clubs&a=bay&b=rma&show=1   # Ergebnis sofort vollständig
?t=animals&a=loewe&duell=0    # nur Auswahl vorbelegen
```

Themen: `nations`, `clubs`, `animals`. Die IDs stehen in den Datendateien.
Mit `&f=<filter>` lässt sich zusätzlich ein Filter vorwählen, z. B.
`?t=nations&f=OFC` (nur Ozeanien), `?t=nations&f=wm` (nur WM-Teilnehmer) oder
`?t=clubs&f=t1` (nur Lostopf 1).

## Themengebiete

| Thema | Kategorien |
|---|---|
| 🌍 Nationalmannschaften (alle 211 FIFA-Mitglieder) | WM-Teilnahmen · WM-Spiele · ewige WM-Tabelle (niedriger besser) · erstes Länderspiel (früher besser) · Rekordspieler |
| 🏟️ Champions League 26/27 (36, echtes Teilnehmerfeld) | CL-Teilnahmen · CL-Spiele · Titel (Liga + international) · Gründungsjahr (früher besser) · Rekordspieler |
| 🦁 Tiere (58, wild + Nutztiere) | Größe · Gewicht · Lebenserwartung · Höchsttempo · Kraft |

Bei den beiden Fussball-Themen kommen unter dem Ergebnis noch das letzte direkte
Duell, die Gesamtbilanz (Siege A / Unentschieden / Siege B) und ein simuliertes
Spiel dazu. Bei den Tieren gibt es stattdessen zu jedem Tier einen Fun Fact.

## Datenpflege

Alle Inhalte liegen als schlichte JS-Arrays in `data/` – eine Zeile pro Eintrag,
kein Build nötig, Änderungen sind nach dem Neuladen sofort wirksam:

* `data/nationalteams.js` – Nationalmannschaften
* `data/clubs.js` – Vereine
* `data/animals.js` – Tiere
* `js/h2h.js` – direkte Duelle (siehe unten)

Neuen Eintrag anlegen = Zeile kopieren, Werte anpassen, eindeutige `id` vergeben.
Wer in `aliases` Spitznamen einträgt, verbessert damit direkt die Spracherkennung.

### Woher die Zahlen kommen – und was geschätzt ist

* **Stammdaten** (WM-Teilnahmen, Titel, Gründungsjahre, Rekordspieler, Tierdaten)
  sind von Hand kuratiert, Stand ca. Mitte 2025 bzw. nach der WM 2022. Sie sind
  sorgfältig zusammengetragen, aber nicht aus einer Live-Quelle – einzelne Werte
  können von tagesaktuellen Zahlen abweichen.
* **Nationalmannschaften:** Alle 211 FIFA-Mitglieder sind enthalten (55 UEFA,
  54 CAF, 46 AFC, 35 CONCACAF, 11 OFC, 10 CONMEBOL) und über Kontinent-Chips
  filterbar. WM-Teilnahmen und WM-Spiele sind für die 79 WM-Teilnehmer belegt,
  alle übrigen Verbände stehen korrekt auf 0 bzw. „nie dabei“. Die ewige
  WM-Tabelle folgt bis etwa Platz 30 der offiziellen Reihenfolge, dahinter ist
  sie plausibel geordnet. Wo Rekordspieler oder erstes Länderspiel nicht belegt
  sind – das betrifft vor allem kleine Verbände –, steht im Datensatz
  `ca:['rekord']` bzw. `ca:['erstes']`, und die App zeigt vor dem Wert ein
  **„ca."**. Solche Einträge sind Größenordnungen, keine Fakten; wer einen echten
  Wert kennt, trägt ihn ein und löscht das `ca`.
* **Duelle ohne WM-Beteiligung:** Treten zwei Länder gegeneinander an, die nie
  bei einer WM waren, sind drei der fünf Kategorien zwangsläufig unentschieden –
  entschieden wird dann über erstes Länderspiel und Rekordspieler, und ein 1:1
  ist möglich. Wer das vermeiden will, ersetzt eine der WM-Kategorien in
  `js/duel.js` durch eine, die jedes Land hat (z. B. Platz in der
  FIFA-Weltrangliste).
* **Champions League 26/27:** Das echte Teilnehmerfeld der Ligaphase ist
  eingepflegt (36 Vereine, 9 pro Lostopf, in der App per Topf-Chip filterbar).
  Der UEFA-Klubkoeffizient steht als `kk` im Datensatz; daraus ist `staerke`
  linear abgeleitet (Bayern 147,5 → 95 … Sabah FK 6,0 → 50). `form` bildet
  dagegen die aktuelle Spielstärke aus der Platzierung 2025/26 ab – da die
  Simulation die Form mit 65 % gewichtet, zählt der sportliche Ist-Zustand
  mehr als die Europapokal-Historie.
* **Direkte Duelle:** In `js/h2h.js` liegen echte Bilanzen für die bekannten
  Klassiker (Clásico, Bayern–Dortmund, Deutschland–Niederlande …). Für alle
  anderen Paarungen erzeugt ein deterministischer Generator aus den Stärkewerten
  eine plausible Bilanz. Solche Werte sind in der App mit **„≈ geschätzt“**
  gekennzeichnet und tragen als Wettbewerb „geschätztes Ergebnis“. Wer eine echte
  Bilanz nachträgt, ergänzt sie einfach im `REAL`-Objekt – der Generator tritt
  dann für diese Paarung zurück.
* **Simuliertes Spiel:** Poisson-Modell aus `staerke` und `form`, wobei die
  **aktuelle Form mit 65 % deutlich schwerer wiegt** als die historische Stärke
  (35 %); A bekommt einen kleinen Heimvorteil. Jeder Klick auf „Nochmal
  simulieren“ würfelt neu. Die Formwerte (`form`, 0–100) sind der Regler, an dem
  man vor einem Turnier dreht.

## Aufbau

```
index.html              App-Shell mit den drei Screens
css/style.css           komplettes Design (Dark, große Tap-Ziele ≥ 56 px)
js/app.js               Navigation, Auswahl, Duell-Ablauf, Deep-Links
js/duel.js              Themen + Kategorien, Punktewertung, Simulation
js/h2h.js               direkte Duelle (echt + Generator)
js/speech.js            Web Speech API, Fuzzy-Matching, „A gegen B“-Parser
js/sound.js             Sounds per WebAudio (keine Audiodateien)
data/*.js               die drei Datensätze
sw.js                   Service Worker (Cache-first, offline)
manifest.webmanifest    PWA-Manifest
icons/                  App-Icons (PNG + SVG)
```

Vereinswappen sind urheberrechtlich geschützt und deshalb nicht enthalten –
Vereine werden mit ihren Vereinsfarben und Kürzel als Wappen-Kachel dargestellt.

Ton lässt sich auf dem Startbildschirm abschalten; die Einstellung bleibt
gespeichert. `prefers-reduced-motion` wird respektiert (keine Animationen,
kein Konfetti).
