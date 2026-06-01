// Abstract architectural SVG illustrations (ink-on-paper), ported from the
// design bundle. Used as on-brand placeholders until real photography lands.
const A = '#E8B629'; // accent (mustard)

const bodies = {
  courtyard: `
    <rect x="0" y="0" width="400" height="300" fill="#EFE8DB"/>
    <g transform="translate(60,90)" stroke="#1A1814" stroke-width="0.8" fill="none" stroke-linejoin="round">
      <path d="M 40 140 L 240 140 L 290 170 L 90 170 Z" fill="#E8DCC4" stroke="none"/>
      <path d="M 0 100 L 180 100 L 240 130 L 60 130 Z" fill="none"/>
      <path d="M 0 100 L 0 70 L 180 70 L 180 100"/>
      <path d="M 180 70 L 240 100 L 240 130"/>
      <path d="M 0 70 L 60 40 L 240 40 L 240 100" stroke-opacity="0.55"/>
      <path d="M 60 40 L 60 130" stroke-opacity="0.3"/>
      <path d="M 0 70 L 60 40"/>
      <path d="M 180 70 L 240 40"/>
      <g stroke-opacity="0.5">
        <line x1="20" y1="78" x2="20" y2="98"/><line x1="40" y1="78" x2="40" y2="98"/>
        <line x1="60" y1="78" x2="60" y2="98"/><line x1="80" y1="78" x2="80" y2="98"/>
        <line x1="100" y1="78" x2="100" y2="98"/><line x1="120" y1="78" x2="120" y2="98"/>
        <line x1="140" y1="78" x2="140" y2="98"/><line x1="160" y1="78" x2="160" y2="98"/>
      </g>
      <circle cx="120" cy="115" r="10" fill="${A}" fill-opacity="0.9" stroke="none"/>
      <line x1="120" y1="115" x2="120" y2="130"/>
    </g>`,
  linear: `
    <rect x="0" y="0" width="400" height="300" fill="#EFE8DB"/>
    <g transform="translate(50,100)" stroke="#1A1814" stroke-width="0.8" fill="none">
      <path d="M 0 100 L 260 100 L 300 80 L 40 80 Z" fill="#E8DCC4" stroke="#1A1814"/>
      <path d="M 0 100 L 0 50 L 260 50 L 260 100"/>
      <path d="M 260 50 L 300 30 L 300 80"/>
      <path d="M 0 50 L 40 30 L 300 30"/>
      <g stroke-opacity="0.5">
        ${Array.from({length:12},(_,i)=>`<rect x="${12+i*20}" y="58" width="12" height="16" fill="none"/>`).join('')}
      </g>
      <g stroke-opacity="0.35">
        <path d="M 80 50 L 100 20 L 220 20 L 220 50"/><path d="M 100 20 L 100 50"/>
        <path d="M 220 20 L 240 10 L 240 45"/>
      </g>
      <rect x="140" y="105" width="40" height="4" fill="${A}" stroke="none"/>
      <circle cx="-10" cy="105" r="8" fill="#1A1814" fill-opacity="0.15" stroke="none"/>
      <circle cx="310" cy="95" r="7" fill="#1A1814" fill-opacity="0.15" stroke="none"/>
    </g>`,
  stadium: (() => {
    const seats = Array.from({length:24},(_,i)=>{const a=(i/24)*Math.PI*2;const x1=(Math.cos(a)*140).toFixed(1),y1=(Math.sin(a)*55).toFixed(1),x2=(Math.cos(a)*168).toFixed(1),y2=(Math.sin(a)*68).toFixed(1);return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;}).join('');
    return `
    <rect x="0" y="0" width="400" height="300" fill="#EFE8DB"/>
    <g transform="translate(200,170)" stroke="#1A1814" stroke-width="0.8" fill="none">
      <ellipse cx="0" cy="0" rx="170" ry="70"/><ellipse cx="0" cy="0" rx="140" ry="55"/><ellipse cx="0" cy="0" rx="110" ry="42"/>
      <ellipse cx="0" cy="0" rx="80" ry="28" fill="${A}" fill-opacity="0.85" stroke="#1A1814" stroke-width="0.5"/>
      <line x1="0" y1="-28" x2="0" y2="28" stroke="#1A1814" stroke-opacity="0.5"/>
      <circle cx="0" cy="0" r="8" fill="none" stroke="#1A1814" stroke-opacity="0.5"/>
      <line x1="-170" y1="0" x2="-180" y2="-60"/><line x1="170" y1="0" x2="180" y2="-60"/>
      <line x1="-180" y1="-60" x2="-160" y2="-62"/><line x1="180" y1="-60" x2="160" y2="-62"/>
      <g stroke-opacity="0.3">${seats}</g>
    </g>`;
  })(),
  pitched: `
    <rect x="0" y="0" width="400" height="300" fill="#EFE8DB"/>
    <g transform="translate(80,60)" stroke="#1A1814" stroke-width="0.8" fill="none">
      <path d="M 80 140 L 80 80 L 120 40 L 160 80 L 160 140 Z" fill="#E8DCC4" stroke="#1A1814"/>
      <path d="M 80 80 L 160 80"/>
      <path d="M 110 140 L 110 110 L 130 110 L 130 140" stroke="#1A1814"/>
      <rect x="108" y="60" width="24" height="3" fill="${A}" stroke="none"/>
      <path d="M 0 140 L 0 100 L 80 100" stroke-opacity="0.75"/>
      <path d="M 160 100 L 240 100 L 240 140" stroke-opacity="0.75"/>
      <g stroke-opacity="0.5">
        <rect x="12" y="112" width="14" height="20"/><rect x="34" y="112" width="14" height="20"/><rect x="56" y="112" width="14" height="20"/>
        <rect x="170" y="112" width="14" height="20"/><rect x="192" y="112" width="14" height="20"/><rect x="214" y="112" width="14" height="20"/>
      </g>
      <line x1="-20" y1="140" x2="260" y2="140"/>
      <path d="M -30 100 L -30 80 L 0 80 L 0 100" stroke-opacity="0.25"/>
      <path d="M 240 100 L 240 82 L 270 82 L 270 105" stroke-opacity="0.25"/>
    </g>`,
  tower: `
    <rect x="0" y="0" width="400" height="300" fill="#EFE8DB"/>
    <g transform="translate(80,40)" stroke="#1A1814" stroke-width="0.8" fill="none">
      <rect x="100" y="20" width="60" height="180" fill="#E8DCC4" stroke="#1A1814"/>
      <path d="M 100 20 L 130 0 L 190 0 L 160 20"/>
      <path d="M 160 20 L 190 0 L 190 180 L 160 200"/>
      <g stroke-opacity="0.5">${Array.from({length:14},(_,i)=>`<line x1="108" y1="${30+i*12}" x2="152" y2="${30+i*12}"/>`).join('')}</g>
      <rect x="60" y="140" width="50" height="60" fill="#E8DCC4" stroke="#1A1814"/>
      <path d="M 60 140 L 80 130 L 130 130"/>
      <path d="M 110 140 L 130 130 L 130 190" stroke-opacity="0.5"/>
      <path d="M 200 100 L 260 100 L 260 200 L 200 200 Z" stroke-opacity="0.7"/>
      <path d="M 200 100 L 220 88 L 280 88 L 260 100" stroke-opacity="0.4"/>
      <rect x="100" y="202" width="60" height="4" fill="${A}" stroke="none"/>
      <line x1="0" y1="200" x2="300" y2="200"/>
      <circle cx="30" cy="195" r="10" fill="#1A1814" fill-opacity="0.12" stroke="none"/>
    </g>`,
  siteplan: (() => {
    const trees = Array.from({length:10},(_,i)=>`<circle cx="${20+(i*31)%300}" cy="${210+((i*13)%20)}" r="3"/>`).join('');
    return `
    <rect x="0" y="0" width="400" height="300" fill="#EFE8DB"/>
    <g transform="translate(40,30)" stroke="#1A1814" stroke-width="0.7" fill="none">
      <path d="M 0 0 L 320 0 L 320 240 L 0 240 Z" stroke-opacity="0.4" stroke-dasharray="2 4"/>
      <path d="M 0 180 L 320 180" stroke-width="1.2"/><path d="M 0 186 L 320 186" stroke-opacity="0.3"/>
      <rect x="30" y="30" width="90" height="60" fill="#E8DCC4"/><rect x="140" y="30" width="60" height="40" fill="#E8DCC4"/>
      <rect x="220" y="30" width="70" height="70" fill="#E8DCC4"/><rect x="30" y="110" width="60" height="50" fill="#E8DCC4"/>
      <rect x="110" y="95" width="180" height="65" fill="${A}" fill-opacity="0.55" stroke="#1A1814"/>
      <path d="M 75 90 L 75 180" stroke-opacity="0.35"/><path d="M 200 70 L 200 95" stroke-opacity="0.35"/><path d="M 255 100 L 255 180" stroke-opacity="0.35"/>
      <g fill="#1A1814" fill-opacity="0.25" stroke="none">${trees}</g>
      <g transform="translate(300,220)"><circle r="10" stroke-opacity="0.5"/><path d="M 0 -8 L 3 3 L 0 1 L -3 3 Z" fill="#1A1814" stroke="none"/></g>
    </g>`;
  })()
};

export function sketch(type, { ratio = '4/3', label = '' } = {}) {
  const inner = bodies[type] || bodies.linear;
  const lab = label
    ? `<div style="position:absolute;top:12px;left:12px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.08em;color:#1A1814;opacity:0.55;text-transform:uppercase">${label}</div>`
    : '';
  return `<div class="ks-sketch" style="aspect-ratio:${ratio};position:relative;background:#EFE8DB;overflow:hidden">`
    + `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" aria-hidden="true" focusable="false">${inner}</svg>`
    + lab + `</div>`;
}
