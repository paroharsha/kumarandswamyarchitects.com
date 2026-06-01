/* global React, Band, Eyebrow, H2, ProjectImage */

function TeamMember({ initials, name, role }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 140, height: 140, borderRadius: '50%', background: '#509599',
        margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#FFFFFF', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 36, letterSpacing: '-0.02em',
      }}>{initials}</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#091405' }}>{name}</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#626462', marginTop: 2 }}>{role}</div>
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <Band variant="bg" padded={false}>
        <div style={{ padding: '80px 24px 48px', textAlign: 'center' }}>
          <Eyebrow>OUR FOUNDER</Eyebrow>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 56,
            letterSpacing: '-0.01em', color: '#091405', margin: '20px 0 0', lineHeight: 1.1,
          }}>C R Shivakumar</h1>
        </div>
      </Band>

      <div style={{ background: '#FDC12C', padding: '0 24px', position: 'relative' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', background: '#FFFFFF', padding: 48, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, transform: 'translateY(-40px)', alignItems: 'center', borderRadius: 4 }}>
          <div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: '#091405', margin: 0 }}>
              Born 1938 in Bangalore. Studied civil engineering at Central College Bangalore. Established Kumar and Swamy in 1969 — one of Bangalore's oldest architecture firms — starting as a civil-engineering outfit and evolving into an architecture and design house.
            </p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: '#091405', marginTop: 16 }}>
              "A remarkable human being" with an indomitable passion for life. Avid reader and traveller. Married to Uma Shivakumar, a theater and film personality in the Kannada industry. Patron of music, dance, drama, writing. A deep love for nature and for Bangalore — values he instilled in his family.
            </p>
          </div>
          <ProjectImage seed={2} label="Portrait" />
        </div>
      </div>

      <Band variant="white">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>THE TEAM</Eyebrow>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 40, color: '#091405', margin: '14px 0 0' }}>Partners & Family</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          <TeamMember initials="SH" name="Sanchali Harsha" role="Partner" />
          <TeamMember initials="PH" name="Paromita Harsha" role="Partner" />
          <TeamMember initials="HS" name="Harsha Shivakumar" role="Partner" />
          <TeamMember initials="SH" name="Suchitra Harsha" role="Partner" />
        </div>
      </Band>

      <Band variant="bg">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>OUR DESIGN APPROACH</Eyebrow>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 22, lineHeight: 1.6, color: '#091405', marginTop: 24 }}>
            "As one of our core principles of design, we believe that we are here to interpret the philosophy, the vision and the core ethics of an institution into a design of a building or infrastructure. Hence, we don't have any distinct style — we believe the style of the building should reflect the values of the institution."
          </p>
        </div>
      </Band>
    </>
  );
}

Object.assign(window, { AboutPage, TeamMember });
