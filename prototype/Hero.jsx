/* global React, Eyebrow */
const { useEffect, useState } = React;

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);
  const line = (txt, size, delay) => (
    <div style={{
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 800,
      fontSize: size,
      lineHeight: 0.94,
      color: '#FDC12C',
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 500ms cubic-bezier(0.2,0,0,1) ${delay}ms`,
    }}>{txt}</div>
  );
  return (
    <section style={{ background: '#F6F9F5', padding: '80px 24px 120px', textAlign: 'center' }}>
      <div style={{ marginBottom: 40, opacity: mounted ? 1 : 0, transition: 'opacity 400ms' }}>
        <Eyebrow>EST. 1969 &nbsp;|&nbsp; Bangalore, India</Eyebrow>
      </div>
      {line('Kumar', 'clamp(88px, 14vw, 200px)', 0)}
      {line('&', 'clamp(88px, 14vw, 200px)', 80)}
      {line('Swamy', 'clamp(88px, 14vw, 200px)', 160)}
      {line('Architects', 'clamp(56px, 9vw, 130px)', 240)}
    </section>
  );
}

Object.assign(window, { Hero });
