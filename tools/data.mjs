// Single source of truth for the generated site.
// Article bodies live in /content/blog/*.md and are read at build time.

export const site = {
  name: 'Kumar & Swamy Architects',
  shortName: 'K&S Architects',
  domain: 'https://www.kumarandswamyarchitects.com',
  founded: 1969,
  city: 'Bangalore',
  tagline: 'An institutional architecture practice in Bangalore — interpreting the values of the schools, campuses and civic buildings we’ve shaped since 1969.',
  description: 'Kumar & Swamy Architects is a school and institutional architecture firm in Bangalore, founded 1969 — designing schools, campuses, institutions, sports infrastructure and healthcare across India. Over 60 institutions built in three generations.',
  email: 'kumarswamy49@gmail.com',
  geo: { lat: 12.9719, lng: 77.6412 },     // Cambridge Layout, Bengaluru
  region: 'IN-KA',
  placename: 'Bengaluru, Karnataka',
  knowsAbout: [
    'School architecture', 'Campus design', 'Institutional architecture', 'Educational architecture',
    'Masterplanning', 'Education interiors', 'Sports infrastructure', 'Stadium design',
    'Hospital architecture', 'Architecture in Bangalore'
  ],
  phones: [
    { label: '+91 63624 28416', href: 'tel:+916362428416' },
    { label: '+91 63607 57772', href: 'tel:+916360757772' },
    { label: '+91 98800 77546', href: 'tel:+919880077546' },
    { label: '080 41214283', href: 'tel:08041214283' }
  ],
  address: 'MF 2/8 BDA Building, Cambridge Layout, Bengaluru, Karnataka 560008',
  hours: 'Mon – Fri · 10:00 am – 7:00 pm',
  social: {
    instagram: 'https://www.instagram.com/kumar_and_swamy_architects',
    facebook: 'https://www.facebook.com/kumarswamy49'
  },
  // Authoritative external profiles — used as schema.org sameAs to tie the
  // site to the Google Business Profile entity (/g/11dzw7r2x_) and directories.
  sameAs: [
    'https://www.instagram.com/kumar_and_swamy_architects',
    'https://www.facebook.com/kumarswamy49',
    'https://archinect.com/kumarandswamy',
    'https://www.indiamart.com/kumar-swamy-architects'
  ]
};

export const nav = [
  { id: 'index', label: 'Index', href: 'index-of-works.html' },
  { id: 'projects', label: 'Projects', href: 'projects.html' },
  { id: 'about', label: 'Studio', href: 'about.html' },
  { id: 'blog', label: 'Journal', href: 'blog.html' },
  { id: 'contact', label: 'Contact', href: 'contact.html' }
];

export const categories = ['All', 'Education', 'Campus', 'Sport', 'Revitalisation'];

// sketch = which axonometric/plan SVG illustrates the card (placeholder until photos land)
export const projects = [
  { slug: 'mallya-aditi', name: 'Mallya Aditi International School', location: 'Bangalore, Karnataka', year: 1990, category: 'Education', sketch: 'courtyard', featured: true,
    brief: 'A campus arranged as a series of courtyards and shaded verandahs — learning spaces that open to the monsoon and the sun in equal measure.' },
  { slug: 'canadian-intl', name: 'Canadian International School', location: 'Bangalore, Karnataka', year: 1996, category: 'Education', sketch: 'linear', featured: true,
    brief: 'A linear stack of light-filled studios and a full-height library wall, planned for an international curriculum and a young, mobile community.' },
  { slug: 'kanteerva', name: 'Kanteerva Outdoor Stadium', location: 'Bangalore, Karnataka', year: 1997, category: 'Sport', sketch: 'stadium', featured: true,
    brief: 'An outdoor bowl tuned to athletes and spectators alike — circulation, sightlines and shade resolved at the scale of the city.' },
  { slug: 'anthem', name: 'Anthem Biosciences Campus', location: 'Bangalore, Karnataka', year: 2005, category: 'Campus', sketch: 'tower',
    brief: 'A research campus where laboratory rigour meets daylight and calm — clarity of plan carrying the operational brief.' },
  { slug: 'pes', name: 'PES Group of Institutions', location: 'Shimoga, Karnataka', year: 2007, category: 'Campus', sketch: 'siteplan',
    brief: 'A multi-faculty masterplan, planned in phases so the institution could grow without losing the coherence of its first idea.' },
  { slug: 'vidya-cathedral', name: 'Vidya Cathedral School', location: 'Lonavala, Maharashtra', year: 2008, category: 'Education', sketch: 'pitched',
    brief: 'A hillside school of pitched-roof pavilions, sitting lightly on its contours and weathering the Western Ghats.' },
  { slug: 'sri-kumarans', name: 'Sri Kumarans Children’s Home', location: 'Bangalore, Karnataka', year: 2008, category: 'Education', sketch: 'linear',
    brief: 'A dense urban school organised around shared courts and clear wayfinding for thousands of daily movements.' },
  { slug: 'sjr', name: 'SJR Public Schools', location: 'Bangalore, Karnataka', year: 2010, category: 'Education', sketch: 'linear',
    brief: 'Robust, daylit classroom blocks built to take heavy daily use for decades without feeling institutional.' },
  { slug: 'amaatra', name: 'Amaatra Academy', location: 'Bangalore, Karnataka', year: 2012, category: 'Education', sketch: 'courtyard', featured: true,
    brief: 'A courtyard academy where verandahs, volume and natural light do the quiet work of teaching alongside the curriculum.' },
  { slug: 'tejas', name: 'Tejas International School', location: 'Bagalkote, Karnataka', year: 2016, category: 'Education', sketch: 'linear',
    brief: 'A school for a hotter, drier climate — deep shade, cross-ventilation and durable local materials shaping the plan.' },
  { slug: 'npsj', name: 'National Public School, Jalahalli', location: 'Bangalore, Karnataka', year: 2018, category: 'Education', sketch: 'courtyard',
    brief: 'A compact city campus that finds generous shared space within a tight urban footprint.' },
  { slug: 'united-world', name: 'United World Academy', location: 'Bangalore, Karnataka', year: 2018, category: 'Campus', sketch: 'tower',
    brief: 'A vertical academy stacking learning, sport and assembly where land is scarce and aspiration is not.' },
  { slug: 'dempo', name: 'Dempo Football Academy', location: 'Ella, Goa', year: 2018, category: 'Sport', sketch: 'stadium', featured: true,
    brief: 'A residential football academy in Goa — training, lodging and recovery planned around the rhythm of the athlete’s day.' },
  { slug: 'valiants', name: 'Valiants Academy', location: 'Kengeri, Karnataka', year: 2019, category: 'Education', sketch: 'pitched',
    brief: 'A pavilion school on the city’s edge, its flanking blocks framing a central, sheltered heart.' },
  { slug: 'wisdom-tree', name: 'Wisdom Tree Global School', location: 'Bhubaneswar, Odisha', year: 2020, category: 'Education', sketch: 'pitched',
    brief: 'An eastern-India campus shaped to its climate and culture, learning from the institution it serves.' },
  { slug: 'good-shepherds', name: 'Good Shepherd’s International School', location: 'Ooty, Tamil Nadu', year: 2022, category: 'Revitalisation', sketch: 'pitched',
    brief: 'A careful revitalisation of a hill-station campus — preserving what matters, modernising what must change.' }
];

// The complete chronological record — every project, drawn from the office archive.
// A typographic index on the home page; no detail pages or imagery required.
// `year` is the numeric sort key; `yearLabel` is what shows (ranges, "ongoing").
export const projectIndex = [
  { name: 'The Mallya Aditi School',                 year: 1991, yearLabel: '1991',          location: 'Bangalore',           category: 'Education' },
  { name: 'Sree Kanteerava Outdoor Stadium',         year: 1997, yearLabel: '1997',          location: 'Bangalore',           category: 'Sport' },
  { name: '16 World Bank Hospitals',                 year: 1997, yearLabel: '1997–98',       location: 'Across Karnataka',    category: 'Healthcare' },
  { name: 'National Cricket Academy',                year: 2000, yearLabel: '2000',          location: 'Bangalore',           category: 'Sport' },
  { name: 'Anthem Biosciences',                      year: 2001, yearLabel: '2001',          location: 'Bangalore',           category: 'Campus' },
  { name: 'Commercial Complex, Koramangala',         year: 2002, yearLabel: '2002',          location: 'Bangalore',           category: 'Commercial' },
  { name: 'The Canadian International School',       year: 2004, yearLabel: '2004',          location: 'Bangalore',           category: 'Education' },
  { name: 'Sri Kumarans Children’s Home',            year: 2006, yearLabel: '2006',          location: 'Bangalore',           category: 'Education' },
  { name: 'SJRC Group — Three Schools',              year: 2006, yearLabel: '2006–2010',     location: 'HBR Layout · Kengeri · Sarjapur', category: 'Education' },
  { name: 'Kumudvati Residential School',            year: 2006, yearLabel: '2006',          location: 'Shikaripura',         category: 'Education' },
  { name: 'PES Engineering College & Residential School', year: 2006, yearLabel: '2006',     location: 'Shivamogga',          category: 'Campus' },
  { name: 'Amaatra Academy',                         year: 2008, yearLabel: '2008',          location: 'Bangalore',           category: 'Education' },
  { name: 'Chittoor Residential School, PES Institutions', year: 2009, yearLabel: '2009',     location: 'Chittoor',            category: 'Education' },
  { name: 'Sahyadri Engineering College',            year: 2010, yearLabel: '2010',          location: 'Mangalore',           category: 'Campus' },
  { name: 'Cathedral Vidya School',                  year: 2010, yearLabel: '2010',          location: 'Lonavala',            category: 'Education' },
  { name: 'ARRS Residential School',                 year: 2011, yearLabel: '2011',          location: 'Salem',               category: 'Education' },
  { name: 'Dempo Football Academy',                  year: 2011, yearLabel: '2011',          location: 'Goa',                 category: 'Sport' },
  { name: 'Krissar Academy',                         year: 2015, yearLabel: '2015',          location: 'Arani, Tamil Nadu',   category: 'Education' },
  { name: 'Takshashila School',                      year: 2015, yearLabel: '2015',          location: 'Veloor',              category: 'Education' },
  { name: 'Tejas International Residential School',  year: 2015, yearLabel: '2015',          location: 'Bagalkote',           category: 'Education' },
  { name: 'Hill Rock Academy',                       year: 2016, yearLabel: '2016',          location: 'Bangalore',           category: 'Education' },
  { name: 'Global World Academy',                    year: 2016, yearLabel: '2016',          location: 'Bangalore',           category: 'Education' },
  { name: 'Wisdom Tree Global School',               year: 2019, yearLabel: '2019',          location: 'Bhubaneswar',         category: 'Education' },
  { name: 'Football Academy, Muthoot Group',         year: 2020, yearLabel: '2020 – ongoing', location: 'Palakkad',           category: 'Sport' },
  { name: 'NPS Jalahalli',                           year: 2020, yearLabel: '2020',          location: 'Bangalore',           category: 'Education' },
  { name: 'NPS Jakkur',                              year: 2022, yearLabel: '2022',          location: 'Bangalore',           category: 'Education' },
  { name: 'NPS Banashankari — Extensions & New Block', year: 2022, yearLabel: '2022',         location: 'Bangalore',           category: 'Education' },
  { name: 'Good Shepherd International School — Interiors, Artwork & Signage', year: 2023, yearLabel: '2023', location: 'Ooty', category: 'Interiors' },
  { name: 'Mother Theresa Public School',            year: 2020, yearLabel: '2020 – ongoing', location: 'Bangalore',          category: 'Education' }
];

export const services = [
  { n: '01', name: 'School & Campus Design', blurb: 'Masterplans and buildings for schools and universities — from individual blocks to full multi-phase campuses.' },
  { n: '02', name: 'Institution & Masterplanning', blurb: 'Long-horizon planning that anticipates growth, climate and culture. We think in decades, not quarters.' },
  { n: '03', name: 'Sports Infrastructure', blurb: 'Stadiums, academies and training facilities — designed for athletes, spectators and the pace of the city.' },
  { n: '04', name: 'Education Interiors', blurb: 'The inside of learning: libraries, classrooms, labs and common rooms tuned for attention and play.' },
  { n: '05', name: 'Healthcare', blurb: 'Hospitals and clinical interiors where clarity, calm and operational efficiency share the brief equally.' },
  { n: '06', name: 'Revitalisation', blurb: 'Careful interventions in existing campuses — preserving what matters, modernising what must change.' }
];

export const founder = {
  name: 'C R Shivakumar',
  body: [
    'C R Shivakumar was born in 1938 in Bangalore. After studying civil engineering at Central College Bangalore — one of India’s oldest colleges — he established Kumar and Swamy in 1969, one of Bangalore’s oldest architecture practices, which grew from a civil-engineering outfit into an architecture and design house.',
    'A remarkable human being with an indomitable passion for life, he was an avid reader and traveller who explored South India, parts of North India, and Europe. He married Uma Shivakumar, a renowned personality of the Kannada theatre and film industry. A patron of music, dance, drama and writing, he held a deep love for nature and for Bangalore — values he instilled in his family.'
  ]
};

export const team = [
  { name: 'Sanchali Harsha', role: 'Partner' },
  { name: 'Paromita Harsha', role: 'Partner' },
  { name: 'Harsha Shivakumar', role: 'Partner' },
  { name: 'Suchitra Harsha', role: 'Partner' }
];

export const approach = {
  quote: 'We are here to interpret the philosophy, the vision and the core ethics of an institution into a design. We have no distinct style — the style of a building should reflect the values of the institution.',
  items: [
    { n: '01', h: 'Aspiration first', p: 'We help our clients achieve their aspirations — the brief begins with their values, not our signature.' },
    { n: '02', h: 'Form follows validity', p: 'Spaces should balance aesthetic appeal with functional validity, tested against real daily use.' },
    { n: '03', h: 'Of its place', p: 'We incorporate indigenous cultural expressions evolved through climate, materials and customs.' },
    { n: '04', h: 'Discovery & anticipation', p: 'Experience is enriched through discovery and anticipation — a building should unfold as you move through it.' },
    { n: '05', h: 'Always learning', p: 'Learning from leading institutions, here and abroad, continually informs our practice.' },
    { n: '06', h: 'Intellectually alive', p: 'Passion drives the creation of intellectually stimulating environments for the people who use them.' }
  ]
};

export const studio = {
  body: [
    'At Kumar and Swamy, architecture extends beyond the office. We prioritise individual development: small teams of architects and interns are given real design opportunities and the freedom for creative expression.',
    'We encourage music, film and art appreciation as essential to architectural success, and we value travel and cultural learning. Professional success, we believe, requires well-read, well-travelled, well-rounded individuals.'
  ]
};

export const roles = [
  { n: '01', title: 'Junior Architect', blurb: 'For early-career architects ready to take on real design responsibility within small, mentored teams.' },
  { n: '02', title: 'Internship', blurb: 'For students and recent graduates seeking hands-on studio experience across live projects.' },
  { n: '03', title: 'Interiors Architect', blurb: 'For designers focused on education and institutional interiors that balance durability with inspiration.' }
];

// Article bodies are read from content/blog/<file> at build time.
export const posts = [
  { slug: 'designing-for-a-billion', file: 'designing-for-a-billion.md',
    title: 'Designing for a Billion: 5 Ways India’s New Building Code is Reimagining the Modern City',
    author: 'Paromita Harsha', date: 'Apr 16, 2026', readTime: '4 min read', sketch: 'siteplan',
    excerpt: 'India’s urban population is projected to reach 820 million by 2051. How the National Building Code 2016 is rethinking our cities at scale.' },
  { slug: 'architecture-that-teaches', file: 'architecture-that-teaches.md',
    title: 'Architecture That Teaches: The Reality of Designing Modern Educational Spaces',
    author: 'Kumar and Swamy Architects', date: 'Apr 8, 2026', readTime: '2 min read', sketch: 'courtyard',
    excerpt: 'Physical space is a silent partner in every classroom. Notes on the real-world challenges and rewards of designing modern educational spaces.' },
  { slug: 'inclusivity-in-architecture', file: 'inclusivity-in-architecture.md',
    title: 'Inclusivity in Architecture — Design Without Bias',
    author: 'Varun Govind', date: 'Aug 7, 2025', readTime: '4 min read', sketch: 'pitched',
    excerpt: 'Building spaces that work in a fragmented world — a practical philosophy for bias-free, inclusive design.' }
];
