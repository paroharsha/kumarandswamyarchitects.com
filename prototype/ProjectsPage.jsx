/* global React, Band, Eyebrow, ProjectImage */
const { useState } = React;

function ProjectsPage() {
  const categories = ['All', 'Education', 'Sports', 'Healthcare', 'Masterplanning', 'Interiors'];
  const [active, setActive] = useState('All');

  const all = [
    { seed: 0, title: 'Mallya Aditi International School', location: 'Bangalore', year: 1990, cat: 'Education' },
    { seed: 1, title: 'Canadian International School', location: 'Bangalore', year: 1996, cat: 'Education' },
    { seed: 3, title: "Sri Kumarans Children's Home", location: 'Bangalore', year: 2008, cat: 'Education' },
    { seed: 5, title: 'Amaatra Academy', location: 'Bangalore', year: 2012, cat: 'Education' },
    { seed: 4, title: 'Regional Stadium', location: 'Karnataka', year: 2015, cat: 'Sports' },
    { seed: 2, title: 'Community Hospital', location: 'Bangalore', year: 2018, cat: 'Healthcare' },
    { seed: 0, title: 'Campus Masterplan', location: 'Hyderabad', year: 2020, cat: 'Masterplanning' },
    { seed: 5, title: 'Faculty Interiors', location: 'Bangalore', year: 2022, cat: 'Interiors' },
  ];
  const filtered = active === 'All' ? all : all.filter(p => p.cat === active);
  const [hero, ...rest] = filtered;

  return (
    <>
      <Band variant="bg" padded={false}>
        <div style={{ padding: '80px 24px 40px', textAlign: 'center' }}>
          <Eyebrow>FEATURED PROJECTS</Eyebrow>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 56,
            letterSpacing: '-0.01em', color: '#091405', margin: '20px 0 20px', lineHeight: 1.1,
          }}>Our Work</h1>
          <p style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 18,
            lineHeight: 1.6, color: '#091405', maxWidth: 680, margin: '0 auto',
          }}>
            We have completed over 60 schools and institutions across the country apart from our sporting infrastructure and commercial projects. The following are a few of our featured projects.
          </p>
        </div>
      </Band>

      <Band variant="bg" padded={false}>
        <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: '8px 18px', borderRadius: 999,
              border: '1px solid ' + (active === c ? '#091405' : '#E6E9E4'),
              background: active === c ? '#FDC12C' : 'transparent',
              color: '#091405', fontFamily: 'Manrope, sans-serif',
              fontWeight: active === c ? 700 : 500, fontSize: 13, cursor: 'pointer',
              letterSpacing: active === c ? '0.08em' : '0',
              textTransform: active === c ? 'uppercase' : 'none',
            }}>{c}</button>
          ))}
        </div>
      </Band>

      <Band variant="bg">
        {hero && (
          <div style={{ marginBottom: 48 }}>
            <ProjectImage seed={hero.seed} label="Featured" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 20, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <Eyebrow>{hero.cat}</Eyebrow>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 36, color: '#091405', margin: '8px 0 0' }}>{hero.title}</h2>
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#626462' }}>{hero.location} · {hero.year}</div>
            </div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {rest.map((p, i) => (
            <div key={i}>
              <ProjectImage seed={p.seed} label="Project" />
              <div style={{ marginTop: 14 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 17, color: '#091405', lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#626462', marginTop: 4 }}>{p.location} · {p.year} · {p.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </Band>
    </>
  );
}

Object.assign(window, { ProjectsPage });
