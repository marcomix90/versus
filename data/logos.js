/**
 * Vereinswappen – optionale lokale Bilder.
 *
 * RECHTLICHER HINWEIS
 * Vereinswappen sind marken- und meist auch urheberrechtlich geschuetzt. Fuer
 * den rein privaten Gebrauch (§ 53 UrhG) darfst du sie auf deinen eigenen
 * Geraeten verwenden – NICHT aber oeffentlich zugaenglich machen. Sobald die
 * App auf GitHub Pages o. ae. liegt, waere das eine Veroeffentlichung.
 * Deshalb ist der Ordner `logos/` in .gitignore eingetragen: die Bilder
 * bleiben lokal und landen nicht im Repository.
 *
 * SO AKTIVIERST DU SIE
 *   1. Ordner `logos/` anlegen
 *   2. je Verein eine Datei mit der Vereins-ID ablegen, z. B. logos/bay.png
 *      (IDs stehen in data/clubs.js – bay, rma, psg, liv, int, mci, ars, …)
 *   3. hier AKTIV auf true setzen
 *
 * Fehlt ein Bild, faellt die Kachel automatisch auf die Vereinsfarben zurueck –
 * du musst also nicht alle 36 auf einmal haben.
 */
export const LOGOS = {
  aktiv:  false,      // <- auf true setzen, wenn logos/ gefuellt ist
  ordner: 'logos/',
  endung: '.png',     // z. B. '.svg', wenn du SVGs ablegst
};
