/* global React */

function Footer() {
  return (
    <footer style={{ background: '#F6F9F5', padding: '48px 24px 40px', borderTop: '1px solid #E6E9E4' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, fontFamily: 'Manrope, sans-serif' }}>
        <div style={{ fontSize: 14, color: '#091405', fontWeight: 500 }}>
          +91 6362428416 &nbsp;|&nbsp; +91 6360757772 &nbsp;|&nbsp; 080 - 41214283
        </div>
        <a href="mailto:kumarswamy49@gmail.com" style={{ fontSize: 14, color: '#091405', textDecoration: 'none' }}
           onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
           onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
          kumarswamy49@gmail.com
        </a>
        <div style={{ display: 'flex', gap: 18, marginTop: 6 }}>
          <a href="#" aria-label="Facebook" style={{ color: '#091405' }}><i data-lucide="facebook" style={{ width: 20, height: 20 }}></i></a>
          <a href="#" aria-label="Instagram" style={{ color: '#091405' }}><i data-lucide="instagram" style={{ width: 20, height: 20 }}></i></a>
        </div>
        <div style={{ fontSize: 11, color: '#898989', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 10 }}>
          &copy; Kumar &amp; Swamy Architects · Est. 1969 · Bangalore
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
