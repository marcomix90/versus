/**
 * Selbst gezeichnete Tier-Piktogramme für Arten ohne passendes Emoji.
 *
 * Alle SVGs nutzen viewBox 0 0 64 64 und kommen ohne externe Abhaengigkeiten
 * aus – damit sind sie rechtlich unbedenklich, skalieren verlustfrei und
 * funktionieren offline. In data/animals.js verweist das Feld `svg` hierher.
 */
export const TIERICONS = {

  strauss: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vogelstrauß">
    <path d="M20 40v14M32 40v14" stroke="#d9a066" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M16 54h8M28 54h8" stroke="#c98d52" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="27" cy="34" rx="19" ry="14" fill="#2f2a26"/>
    <path d="M44 26c5-2 11 0 13 5s-2 10-7 11c-3-6-4-11-6-16z" fill="#f7f4ee"/>
    <path d="M24 22c0-7 3-12 8-16" stroke="#d9a066" stroke-width="5.5" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="7" r="5.5" fill="#e8b87e"/>
    <circle cx="36.5" cy="6" r="1.5" fill="#22201d"/>
    <path d="M39 8l6 1.5-6 2.5z" fill="#e88a2a"/>
  </svg>`,

  bussard: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mäusebussard">
    <path d="M28 26C22 20 12 16 3 17c2 5 5 9 9 12-3 1-5 2-7 4 7 3 14 4 21 2z" fill="#6b4a2f"/>
    <path d="M36 26c6-6 16-10 25-9-2 5-5 9-9 12 3 1 5 2 7 4-7 3-14 4-21 2z" fill="#6b4a2f"/>
    <path d="M14 24c-4-2-8-4-11-5M50 24c4-2 8-4 11-5" stroke="#4a3220" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 18c5 0 9 5 9 13s-4 12-9 12-9-4-9-12 4-13 9-13z" fill="#c9a271"/>
    <path d="M23 30c6 2 12 2 18 0-1 4-3 6-9 6s-8-2-9-6z" fill="#6b4a2f"/>
    <path d="M25 42h14l-3 12h-8z" fill="#8a6440"/>
    <path d="M27 54h10" stroke="#6b4a2f" stroke-width="2.5"/>
    <circle cx="32" cy="16" r="6.5" fill="#8a6440"/>
    <circle cx="29.4" cy="15" r="1.6" fill="#12100c"/>
    <circle cx="34.6" cy="15" r="1.6" fill="#12100c"/>
    <path d="M32 18.5l-3 3.5h6z" fill="#f0b429"/>
  </svg>`,

  rotmilan: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rotmilan">
    <path d="M27 26C20 17 11 12 2 12c1 7 4 13 9 17-2 2-4 4-5 7 8 1 15-2 21-6z" fill="#a8412a"/>
    <path d="M37 26c7-9 16-14 25-14-1 7-4 13-9 17 2 2 4 4 5 7-8 1-15-2-21-6z" fill="#a8412a"/>
    <path d="M32 20c4 0 7 5 7 12s-3 11-7 11-7-4-7-11 3-12 7-12z" fill="#c4643f"/>
    <path d="M25 41h14l-2 8 7 9-12-6-12 6 7-9z" fill="#b04c30"/>
    <path d="M32 12c3 0 5 3 5 7s-2 6-5 6-5-2-5-6 2-7 5-7z" fill="#b8ab99"/>
    <circle cx="29.4" cy="17" r="1" fill="#2b2620"/>
    <path d="M32 11l2 4h-4z" fill="#f0b429"/>
  </svg>`,

  meerschweinchen: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Meerschweinchen">
    <ellipse cx="34" cy="36" rx="24" ry="16" fill="#b07a4a"/>
    <path d="M34 21c9 0 17 5 21 12-5-3-12-4-21-4s-16 1-21 4c4-7 12-12 21-12z" fill="#f2e6d8"/>
    <circle cx="14" cy="30" r="10" fill="#8a5a33"/>
    <ellipse cx="9" cy="22" rx="4" ry="3.2" fill="#c98f8f" transform="rotate(-25 9 22)"/>
    <circle cx="10" cy="29" r="2" fill="#1c140c"/>
    <circle cx="10.7" cy="28.3" r=".7" fill="#fff"/>
    <circle cx="5" cy="33" r="1.6" fill="#c98f8f"/>
    <path d="M22 50h4M32 50h4M42 50h4" stroke="#8a5a33" stroke-width="3.4" stroke-linecap="round"/>
  </svg>`,

  salamander: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feuersalamander">
    <path d="M18 38v9M28 38v9M40 38v9" stroke="#1e1b18" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M15 47h6M25 47h6M37 47h6" stroke="#1e1b18" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M46 32c6-3 12-2 16 2-4 1-7 3-9 6-2 3-6 4-9 2z" fill="#1e1b18"/>
    <path d="M11 30c0-6 5-10 12-10h16c6 0 11 4 11 9s-5 10-11 10H23c-7 0-12-3-12-9z" fill="#1e1b18"/>
    <circle cx="15" cy="24" r="6" fill="#1e1b18"/>
    <circle cx="21" cy="27" r="3.6" fill="#f0b429"/>
    <circle cx="31" cy="25" r="4" fill="#f0b429"/>
    <circle cx="41" cy="28" r="3.4" fill="#f0b429"/>
    <circle cx="27" cy="34" r="2.8" fill="#f0b429"/>
    <circle cx="38" cy="35" r="2.4" fill="#f0b429"/>
    <circle cx="51" cy="35" r="2.2" fill="#f0b429"/>
    <circle cx="12.5" cy="22" r="1.9" fill="#f7f3e8"/>
    <circle cx="12.2" cy="22" r="1" fill="#1e1b18"/>
    <path d="M9 26q3 1 5 0" stroke="#4a4440" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </svg>`,

  kohlmeise: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kohlmeise">
    <path d="M40 30c0 11-7 20-16 20s-13-7-13-15 6-17 15-17c8 0 14 5 14 12z" fill="#f2c53d"/>
    <path d="M26 18c8 0 14 5 14 12 0 3-1 6-2 9-4-4-6-9-6-14 0-3 0-5-6-7z" fill="#e8e4d9"/>
    <path d="M22 12c7 0 12 4 12 9 0 3-2 5-5 5h-9c-4 0-7-2-7-6s3-8 9-8z" fill="#26262b"/>
    <ellipse cx="18" cy="21" rx="5" ry="4" fill="#f7f5ef"/>
    <circle cx="17" cy="19.5" r="1.7" fill="#26262b"/>
    <path d="M24 33c0 6 1 11 2 15h-4c1-4 2-9 2-15z" fill="#26262b"/>
    <path d="M9 20l-6 2 6 3z" fill="#3b3b42"/>
    <path d="M40 35c6 2 12 8 16 16-8-2-14-6-19-11z" fill="#6f8fa8"/>
    <path d="M20 50v6M27 50v6" stroke="#8a6a3a" stroke-width="2.6" stroke-linecap="round"/>
  </svg>`,

  rotkehlchen: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rotkehlchen">
    <path d="M44 32c0 12-8 20-18 20S9 45 9 35 17 16 28 16c9 0 16 7 16 16z" fill="#a8895e"/>
    <path d="M20 20c7-4 15-2 19 4 2 4 2 8 0 12-5 3-11 2-15-2-3-4-4-10-4-14z" fill="#e2622c"/>
    <circle cx="17" cy="24" r="2" fill="#1c140c"/>
    <circle cx="17.7" cy="23.3" r=".7" fill="#fff"/>
    <path d="M9 26l-6 2 6 2.5z" fill="#3b3128"/>
    <path d="M44 34c6 3 12 9 16 18-9-2-16-7-20-13z" fill="#8a7049"/>
    <path d="M24 51v6M31 51v6" stroke="#8a6a3a" stroke-width="2.6" stroke-linecap="round"/>
  </svg>`,

  kraehe: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Krähe">
    <path d="M46 30c0 13-9 22-20 22S8 44 8 33 17 12 29 12c10 0 17 8 17 18z" fill="#1c1c22"/>
    <path d="M30 22c8 2 14 9 16 18-6 8-14 12-22 11 6-6 9-14 9-22 0-3-1-5-3-7z" fill="#2b2b33"/>
    <circle cx="17" cy="22" r="2.2" fill="#e8d24a"/>
    <circle cx="17" cy="22" r="1.1" fill="#0d0d10"/>
    <path d="M9 24L1 27l8 3z" fill="#3b3b44"/>
    <path d="M46 33c7 4 13 10 17 20-10-1-18-6-23-13z" fill="#15151a"/>
    <path d="M26 52v6M34 52v6" stroke="#5a5a4a" stroke-width="2.8" stroke-linecap="round"/>
  </svg>`,
};
