/* global React, Band, H2, Button, ProjectImage */

function BlogCard({ seed, title, excerpt }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 200ms cubic-bezier(0.2,0,0,1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <ProjectImage seed={seed} label="Blog cover" />
      <div style={{ padding: '20px 4px 0' }}>
        <h3 style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 20,
          color: '#091405', lineHeight: 1.25, margin: 0,
        }}>{title}</h3>
        <p style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 15,
          color: '#091405', lineHeight: 1.6, marginTop: 12,
        }}>{excerpt}</p>
      </div>
    </div>
  );
}

function BlogSection({ onViewAll }) {
  const posts = [
    { seed: 2, title: "Designing for a Billion: 5 Ways India's New Building Code is Reimagining the Modern City",
      excerpt: "India's urban population is projected to reach 820 million by 2051. A look at how the country's new building code is rethinking cities at scale." },
    { seed: 0, title: 'Architecture That Teaches: The Reality of Designing Modern Educational Spaces',
      excerpt: 'Physical space acts as a silent partner in education. Notes from 55 years designing for learners.' },
    { seed: 4, title: 'Inclusivity in architecture — Design without bias',
      excerpt: 'Building spaces that work in a fragmented world. A practical philosophy for bias-free design.' },
  ];
  return (
    <Band variant="white">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <H2>the K&S Blog</H2>
        <p style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 18,
          lineHeight: 1.6, color: '#091405', maxWidth: 680, margin: '24px auto 0',
        }}>
          From partners to juniors, we post thoughts and articles from as many perspectives as possible. Explore our blog and see what speaks to you!
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
        {posts.map((p, i) => <BlogCard key={i} {...p} />)}
      </div>
      <div style={{ textAlign: 'center', marginTop: 56 }}>
        <Button variant="primary" wide onClick={onViewAll}>Check out our Blog!</Button>
      </div>
    </Band>
  );
}

Object.assign(window, { BlogSection, BlogCard });
