/* global React, Button, Eyebrow */
const { useState } = React;

function Header({ page, onNavigate }) {
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About us' },
    { key: 'projects', label: 'Projects' },
    { key: 'blog', label: 'Blog' },
    { key: 'contact', label: 'Contact Us' },
    { key: 'apply', label: 'Apply' },
  ];
  return (
    <header style={{ background: '#F6F9F5', padding: '28px 24px 18px', borderBottom: '1px solid #E6E9E4' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
        {items.map((it, i) => {
          const active = page === it.key;
          return (
            <React.Fragment key={it.key}>
              {i > 0 && !active && items[i-1].key !== page && (
                <span style={{ width: 1, height: 16, background: '#898989' }} />
              )}
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(it.key); }}
                style={{
                  padding: '8px 18px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: '#091405',
                  textDecoration: 'none',
                  background: active ? '#FDC12C' : 'transparent',
                  borderRadius: active ? 999 : 0,
                }}>{it.label}</a>
            </React.Fragment>
          );
        })}
      </nav>
      <div style={{
        textAlign: 'center', marginTop: 16,
        fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: '#626462',
        textTransform: 'lowercase', letterSpacing: '0.02em',
      }}>
        school design | campus design | institution design | masterplanning | education interiors | sports infrastructure | stadium design | hospital design | hospital interiors
      </div>
    </header>
  );
}

Object.assign(window, { Header });
