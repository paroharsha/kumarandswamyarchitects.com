/* global React, Band, H2, Button, Eyebrow, ProjectImage */

function ProjectCard({ seed, title, location, year }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'transform 200ms cubic-bezier(0.2,0,0,1)',
      cursor: 'pointer',
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <ProjectImage seed={seed} label="Project Photo" />
      <div style={{
        background: '#F6F9F5',
        margin: '-28px 16px 0 16px',
        padding: '14px 16px',
        position: 'relative',
        boxShadow: hover ? '0 8px 24px rgba(9,20,5,0.12)' : '0 2px 8px rgba(9,20,5,0.08)',
        borderRadius: 4,
        transition: 'box-shadow 200ms',
      }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#091405', lineHeight: 1.25 }}>{title}</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#626462', marginTop: 4 }}>{location} · {year}</div>
      </div>
    </div>
  );
}

function ProjectsBand({ onViewAll }) {
  const projects = [
    { seed: 0, title: 'Mallya Aditi International School', location: 'Bangalore, Karnataka', year: 1990 },
    { seed: 1, title: 'Canadian International School', location: 'Bangalore, Karnataka', year: 1996 },
    { seed: 3, title: "Sri Kumarans Children's Home", location: 'Bangalore, Karnataka', year: 2008 },
    { seed: 5, title: 'Amaatra Academy', location: 'Bangalore, Karnataka', year: 2012 },
  ];
  return (
    <Band variant="mustard">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <H2>Our Projects</H2>
        <p style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 18,
          lineHeight: 1.6, color: '#091405', maxWidth: 680, margin: '24px auto 0',
        }}>
          We have completed over 60 schools and institutions across the country, in addition to our sporting infrastructure, residential and commercial projects. Come explore our work!
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
        {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
      <div style={{ textAlign: 'center', marginTop: 56 }}>
        <Button variant="primary" wide onClick={onViewAll}>Check out our Projects!</Button>
      </div>
    </Band>
  );
}

Object.assign(window, { ProjectsBand, ProjectCard });
