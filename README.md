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

## Themengebiete

| Thema | Kategorien |
|---|---|
| 🌍 Nationalmannschaften (50) | WM-Teilnahmen · WM-Spiele · ewige WM-Tabelle (niedriger besser) · erstes Länderspiel (früher besser) · Rekordspieler |
| 🏟️ Champions League 26/27 (36) | CL-Teilnahmen · CL-Spiele · Titel (Liga + international) · Gründungsjahr (früher besser) · Rekordspieler |
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
* **Champions League 26/27:** Das reale Teilnehmerfeld der Saison ist *nicht*
  eingepflegt – hinterlegt sind 36 plausible Stammgäste. Sobald die echte
  Auslosung feststeht, einfach die Einträge in `data/clubs.js` austauschen.
* **Direkte Duelle:** In `js/h2h.js` liegen ~40 echte Bilanzen für die bekannten
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
