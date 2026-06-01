/* global React */
const { useState } = React;

// ------------------------------- PRIMITIVES -------------------------------

function Button({ variant = 'primary', children, onClick, wide = false, icon = null }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    padding: wide ? '18px 40px' : '14px 28px',
    fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: 14,
    letterSpacing: '0.04em', borderRadius: 4, cursor: 'pointer',
    border: '1px solid #091405', transition: 'all 200ms cubic-bezier(0.2,0,0,1)',
    textDecoration: 'none',
  };
  const variants = {
    primary: { background: '#FDC12C', color: '#091405' },
    outline: { background: 'transparent', color: '#091405' },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick}
      onMouseEnter={(e) => {
        if (variant === 'primary') e.currentTarget.style.background = '#E5AC1F';
        if (variant === 'outline') { e.currentTarget.style.background = '#091405'; e.currentTarget.style.color = '#fff'; }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') e.currentTarget.style.background = '#FDC12C';
        if (variant === 'outline') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#091405'; }
      }}>
      {children}
      {icon}
    </button>
  );
}

function Eyebrow({ children, color = '#626462' }) {
  return (
    <div style={{
      fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11,
      letterSpacing: '0.14em', textTransform: 'uppercase', color,
    }}>{children}</div>
  );
}

function H2({ children, color = '#091405', align = 'center' }) {
  return (
    <h2 style={{
      fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 48,
      letterSpacing: '-0.01em', color, margin: 0, textAlign: align, lineHeight: 1.1,
    }}>{children}</h2>
  );
}

function Band({ variant = 'white', children, padded = true }) {
  const backgrounds = {
    white: '#FFFFFF',
    mustard: '#FDC12C',
    cream: 'linear-gradient(180deg, #FEE095 0%, #F6F9F5 100%)',
    bg: '#F6F9F5',
  };
  const isGradient = variant === 'cream';
  return (
    <section style={{
      width: '100%',
      padding: padded ? '120px 24px' : 0,
      ...(isGradient ? { backgroundImage: backgrounds[variant] } : { background: backgrounds[variant] }),
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

// Tinted placeholder for photography — differentiates cards
function ProjectImage({ seed = 0, label = 'Project' }) {
  const palettes = [
    ['#B8D5D6', '#509599'],
    ['#FEE095', '#E5AC1F'],
    ['#091405', '#626462'],
    ['#F6F9F5', '#B8D5D6'],
    ['#FFE19A', '#FDC12C'],
    ['#509599', '#3B7578'],
  ];
  const [a, b] = palettes[seed % palettes.length];
  return (
    <div style={{
      aspectRatio: '4 / 3',
      background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 16,
      color: 'rgba(255,255,255,0.55)',
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      fontWeight: 700,
    }}>{label}</div>
  );
}

Object.assign(window, { Button, Eyebrow, H2, Band, ProjectImage });
