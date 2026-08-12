// Single source of truth for the generated site.
// Article bodies live in /content/blog/*.md and are read at build time.

export const site = {
  name: 'Kumar & Swamy Architects',
  shortName: 'K&S Architects',
  domain: 'https://www.kumarandswamyarchitects.com',
  founded: 1969,
  city: 'Bangalore',
  tagline: 'A multidisciplinary architecture and design practice in Bangalore — from schools, campuses and civic institutions to infrastructure, healthcare, sport, homes, resorts, interiors and product, since 1969.',
  description: 'Kumar & Swamy Architects is a multidisciplinary architecture practice in Bangalore, founded 1969 — from schools, campuses and institutions to infrastructure, healthcare, sports, residential, resorts, interiors and product design across India. 60+ institutions built in three generations.',
  email: 'kumarswamy49@gmail.com',
  // Web3Forms access key for the "Work with us" application form.
  // Generated free at https://web3forms.com by entering the email above;
  // the key is emailed to that inbox and submissions are delivered there.
  // Safe to commit — it is meant to live in public client-side HTML.
  applyFormKey: '76889970-f084-4762-8dc7-80e8022292c2',
  geo: { lat: 12.9699, lng: 77.6336 },     // MF 2/8 BDA Building, Cambridge Layout (Google geocode)
  region: 'IN-KA',
  placename: 'Bengaluru, Karnataka',
  knowsAbout: [
    'Architecture', 'School architecture', 'Campus design', 'Institutional architecture',
    'Educational architecture', 'Masterplanning', 'Infrastructure design',
    'Healthcare architecture', 'Hospital design', 'Sports facilities', 'Stadium design',
    'Residential architecture', 'Resort and hospitality design', 'Interior design',
    'Product design', 'Architecture in Bangalore'
  ],
  phones: [
    { label: '+91 63624 28416', href: 'tel:+916362428416' },
    { label: '+91 63607 57772', href: 'tel:+916360757772' },
    { label: '+91 98800 77546', href: 'tel:+919880077546' },
    { label: '080 41214283', href: 'tel:08041214283' }
  ],
  address: 'MF 2/8 BDA Building, Cambridge Layout, Bengaluru, Karnataka 560008',
  hours: 'Mon – Fri · 10:00 am – 7:00 pm',
  // Google Business Profile / Maps listing for the office (shareable short link).
  google: 'https://share.google/s0do7jVBrIQGyeG2j',
  social: {
    instagram: 'https://www.instagram.com/kumar_and_swamy_architects',
    facebook: 'https://www.facebook.com/kumarswamy49',
    // Live Instagram feed on the homepage. A static site can't pull the feed
    // itself, so paste the embed snippet from a free widget service here
    // (LightWidget, Behold, SnapWidget, EmbedSocial, …) — the whole thing:
    // <script>/<iframe>/<blockquote> and all. Leave '' to show the styled
    // "Follow on Instagram" fallback plate instead. Re-run the build after editing.
    instagramEmbed: `<behold-widget feed-id="HmJvFeMNoq1T9l2VJvWe"></behold-widget>
<script>
  (() => {
    if(window.__bhldScript)return;window.__bhldScript=true;
    const d=document,s=d.createElement("script");s.type="module";
    s.src="https://w.behold.so/widget.js";setTimeout(()=>{d.head.append(s);},0);
  })();
</script>`
  },
  // Comments + reactions on journal posts, via giscus (https://giscus.app).
  // Free, no ads, privacy-friendly — every thread is stored in this repo's
  // GitHub Discussions. To switch it on (one-time):
  //   1. Repo → Settings → General → Features → tick "Discussions".
  //   2. Install the giscus app on the repo: https://github.com/apps/giscus
  //   3. Go to https://giscus.app, enter this repo, choose the "Discussion title
  //      contains page pathname" mapping and a category (e.g. "Announcements",
  //      or make a new "Journal" category), then copy the data-repo-id and
  //      data-category-id it generates into the two blanks below. Re-run the build.
  // Until repoId + categoryId are filled in, posts show a tasteful placeholder
  // instead of the live widget.
  giscus: {
    repo: 'paroharsha/kumarandswamyarchitects.com',
    repoId: 'R_kgDOStolxA',
    category: 'General',
    categoryId: 'DIC_kwDOStolxM4DDHBD',
    mapping: 'pathname',
    theme: 'light'
  },
  // Authoritative external profiles — used as schema.org sameAs to tie the
  // site to the Google Business Profile entity (/g/11dzw7r2x_) and directories.
  sameAs: [
    'https://share.google/s0do7jVBrIQGyeG2j',
    'https://www.instagram.com/kumar_and_swamy_architects',
    'https://www.facebook.com/kumarswamy49',
    'https://archinect.com/kumarandswamy',
    'https://www.indiamart.com/kumar-swamy-architects'
  ]
};

export const nav = [
  // Index of Works taken down for now — restore this item + buildIndexPage() to bring it back.
  // { id: 'index', label: 'Index', href: 'index-of-works' },
  { id: 'projects', label: 'Projects', href: 'projects' },
  { id: 'about', label: 'About Us', href: 'about' },
  { id: 'blog', label: 'Journal', href: 'blog' },
  { id: 'contact', label: 'Contact', href: 'contact-kumar-swamy-architect' },
  { id: 'apply', label: 'Work with us', href: 'applytowork' }
];

export const categories = ['All', 'Education', 'Campus', 'Sport', 'Revitalisation'];

// sketch = which axonometric/plan SVG illustrates the card (placeholder until photos land)
export const projects = [
  { slug: 'mallya-aditi-international-school', name: 'Mallya Aditi International School', location: 'Bangalore, Karnataka', year: 1990, category: 'Education', sketch: 'courtyard', featured: true,
    brief: 'A campus arranged as a series of courtyards and shaded verandahs — learning spaces that open to the monsoon and the sun in equal measure.',
    overview: `Built on a sprawling site spanning 5 acres in Yelahanka, North Bangalore, Mallya Aditi International School represented our inaugural venture into institutional architecture during the early nineties. This pioneering project, encompassing just over one lakh square feet of thoughtfully designed space, was conceived to accommodate and nurture 600 young minds. As one of Bangalore's first international schools, it marked a significant milestone in the city's educational landscape. The architectural design broke away from traditional school layouts by implementing an innovative concept - the elimination of conventional corridors in favor of interconnected courtyards. These courtyards serve as vibrant gathering spaces that encourage student interaction while maintaining natural ventilation and creating a more open, welcoming learning environment.`,
    stats: [{ label: 'Site area', value: '5 acres' }, { label: 'Built-up area', value: '1,00,000 sft' }, { label: 'Capacity', value: '600' }] },
  { slug: 'canadian-international-school', name: 'Canadian International School', location: 'Bangalore, Karnataka', year: 1996, category: 'Education', sketch: 'linear', featured: true,
    brief: 'A linear stack of light-filled studios and a full-height library wall, planned for an international curriculum and a young, mobile community.',
    overview: `This prestigious residential school, nestled within a sprawling 14-acre campus in North Bangalore, offers comprehensive education following the Canadian syllabus to a diverse student body of approximately 600 learners. The institution stands as a testament to modern educational architecture, featuring not only state-of-the-art academic facilities but also well-appointed residential accommodations that create a true home away from home for its boarding students.

The impressive campus boasts an extensive built-up area spanning 2.5 lakh square feet, thoughtfully designed to accommodate both academic and residential needs while maintaining a harmonious balance between functionality and aesthetic appeal.

In a unique architectural detail that exemplifies our commitment to customization and brand identity, we undertook a special collaboration with Lafarge to develop a bespoke blue Mangalore tile. This custom-created roofing solution was specifically designed to perfectly complement the school's distinctive logo, creating a visual cohesion that extends from the institution's branding to its physical structure.`,
    stats: [{ label: 'Site area', value: '14 acres' }, { label: 'Built-up area', value: '2,50,000 sft' }, { label: 'Capacity', value: '600' }] },
  { slug: "sri-kumarans-children's-home", name: 'Sri Kumarans Children’s Home', location: 'Bangalore, Karnataka', year: 2008, category: 'Education', sketch: 'linear',
    brief: 'A dense urban school organised around shared courts and clear wayfinding for thousands of daily movements.',
    overview: `Situated on an expansive 28-acre campus in the serene locality of Malasandra, Bangalore, the Sri Kumarans Children's Home stands as a testament to educational excellence. This prestigious institution accommodates an impressive student body of 7000 learners within its meticulously planned built-up area spanning 5 lakh square feet.

The campus is distinguished by its comprehensive range of state-of-the-art sporting facilities and diverse extra-curricular amenities, designed to nurture both academic and personal growth. With its remarkable scale and exceptional infrastructure, this educational institution has rapidly emerged as one of Bangalore's largest and most prominent schools, setting new standards for educational excellence in the region.`,
    stats: [{ label: 'Site area', value: '28 acres' }, { label: 'Built-up area', value: '5,00,000 sft' }, { label: 'Capacity', value: '7000' }] },
  { slug: 'amaatra-academy', name: 'Amaatra Academy', location: 'Bangalore, Karnataka', year: 2012, category: 'Education', sketch: 'courtyard', featured: true,
    brief: 'A courtyard academy where verandahs, volume and natural light do the quiet work of teaching alongside the curriculum.',
    overview: `A distinguished college preparatory school with comprehensive residential facilities, established by the prestigious PES group of institutions, this academy occupies an expansive 9-acre property in a prime location. The institution has been thoughtfully designed and meticulously planned to accommodate a substantial capacity of 1600 students, ensuring optimal learning conditions and comfortable living spaces for its diverse student body.

The impressive campus encompasses a total built-up area of approximately 3.5 lakh square feet, which includes extensive academic facilities alongside well-appointed residential quarters. This substantial space has been carefully allocated to create an environment that seamlessly blends educational excellence with comfortable living arrangements.

The campus features an array of exceptional amenities designed to enhance both the academic and residential experience. Among its notable facilities are a modern swimming pool for athletic development, comfortable and well-maintained staff quarters to ensure faculty convenience, and a state-of-the-art hostel facility equipped with contemporary amenities to provide students with a home-like atmosphere during their academic journey.`,
    stats: [{ label: 'Site area', value: '9 acres' }, { label: 'Built-up area', value: '3,50,000 sft' }, { label: 'Capacity', value: '1600' }] },
  { slug: 'valiants-academy', name: 'Valiants Academy', location: 'Kengeri, Karnataka', year: 2019, category: 'Education', sketch: 'pitched',
    brief: 'A pavilion school on the city’s edge, its flanking blocks framing a central, sheltered heart.',
    overview: `This innovative educational institution in south Bangalore offers a distinctive dual curriculum approach, seamlessly integrating Montessori education for children up to 6th grade with the CBSE curriculum extending through 12th grade. This unique educational philosophy required a completely different approach to the architectural design compared to traditional schools.

The design process was meticulously crafted to incorporate various principles of incidental learning and Howard Gardner's theory of multiple intelligences. These educational philosophies were thoughtfully translated into architectural elements throughout the campus, resulting in a distinctive layout that organically reflects and supports the school's core educational values and teaching methodologies.

The architectural aesthetic was carefully considered to complement this pedagogical approach, with every design element - from the choice of materials to the arrangement of spaces - deliberately selected to create an environment that enhances the learning experience while maintaining harmony with the school's educational philosophy. The result is a campus where the physical structure itself becomes an integral part of the learning process.`,
    stats: [{ label: 'Site area', value: '5 acres' }, { label: 'Built-up area', value: '70,000 sft' }, { label: 'Capacity', value: '600' }] },
  { slug: 'vidya-cathedral-school', name: 'Vidya Cathedral School', location: 'Lonavala, Maharashtra', year: 2008, category: 'Education', sketch: 'pitched',
    brief: 'A hillside school of pitched-roof pavilions, sitting lightly on its contours and weathering the Western Ghats.',
    overview: `Nestled in the picturesque landscape of Lonavala, near the bustling city of Pune, this prestigious residential school spans an impressive 14-acre campus. As an ambitious extension of the well-established Vidya Cathedral school in Bombay, this institution represents a significant expansion of educational excellence in the region.

The campus has been meticulously designed and purpose-built to accommodate the rigorous standards and unique requirements of the International Baccalaureate (IB) curriculum, ensuring that students receive a world-class education in an environment specifically tailored to support their academic journey.

With a substantial capacity to accommodate 1200 students, the institution boasts an extensive built-up area of approximately 3 Lakh square feet. This generous space allocation ensures that every student has access to the comprehensive facilities and learning spaces necessary for a complete educational experience, while maintaining comfortable living arrangements that promote both academic excellence and personal growth.`,
    stats: [{ label: 'Site area', value: '14 acres' }, { label: 'Built-up area', value: '3,00,000 sft' }, { label: 'Capacity', value: '1200' }] },
  { slug: 'pes-group-of-institutions', name: 'PES Group of Institutions', location: 'Shimoga, Karnataka', year: 2007, category: 'Campus', sketch: 'siteplan',
    brief: 'A multi-faculty masterplan, planned in phases so the institution could grow without losing the coherence of its first idea.',
    overview: `Situated on an expansive and meticulously planned 50-acre campus in Shimoga, this distinguished educational complex represents a masterful integration of diverse institutional facilities within its comprehensive masterplan. The thoughtfully designed grounds serve as a testament to the institution's unwavering commitment to fostering a holistic educational and developmental environment that nurtures the growth and success of its entire community. The carefully considered layout and architectural elements work in harmony to create spaces that inspire learning, collaboration, and personal development.

The campus boasts an impressive array of purpose-built facilities designed to support academic excellence, athletic achievement, and cultural enrichment. At its core, the institution features extensive and well-maintained sports facilities that promote physical wellness and athletic development, complemented by a fully equipped, state-of-the-art engineering college that provides advanced technical education. The comprehensive K-12 school forms an integral part of the educational ecosystem, offering seamless learning pathways from early education through higher studies. Adding to these educational amenities, the campus is enhanced by two modern and comfortable residential facilities that create a home-away-from-home atmosphere for students and faculty. A sophisticated, technically advanced auditorium serves as a vibrant hub for events, performances, and community gatherings, while thoughtfully designed private areas provide dedicated spaces for client meetings and professional interactions.`,
    stats: [{ label: 'Site area', value: '50 acres' }, { label: 'Built-up area', value: '6,00,000 sft' }, { label: 'Capacity', value: '4500' }] },
  { slug: 'tejas-international-school', name: 'Tejas International School', location: 'Bagalkote, Karnataka', year: 2016, category: 'Education', sketch: 'linear',
    brief: 'A school for a hotter, drier climate — deep shade, cross-ventilation and durable local materials shaping the plan.',
    overview: `This esteemed international school, under the dedicated ownership and management of Mr. Murgesh Nirani, is strategically positioned in the historic city of Bagalkot, Karnataka. The location presents unique architectural challenges, as it sits within one of North Karnataka's most climatically demanding regions, where Bagalkot endures persistent high temperatures and pronounced arid conditions that extend throughout all seasons of the year. Through the implementation of sophisticated architectural design solutions and meticulous analysis of environmental factors, our team has achieved exceptional results in natural climate control within the building envelope. Based on comprehensive documentation provided by the client, the interior spaces maintain temperatures that are notably lower - up to 4 degrees Celsius - compared to the external environment. What makes this achievement particularly remarkable is that these optimal thermal conditions are attained solely through the application of passive cooling strategies and innovative architectural design principles, completely eliminating the need for conventional air conditioning systems or mechanical ventilation methods. This successful implementation of sustainable design principles not only showcases our dedication to environmentally conscious architecture but also demonstrates our expertise in creating comfortable, conducive learning environments that thrive even in the most challenging climatic conditions. The project stands as a testament to how thoughtful architectural design can effectively address environmental challenges while maintaining optimal comfort for building occupants.`,
    stats: [{ label: 'Site area', value: '14 acres' }, { label: 'Built-up area', value: '2,00,000 sft' }, { label: 'Capacity', value: '700' }] },
  { slug: 'united-world-academy', name: 'United World Academy', location: 'Bangalore, Karnataka', year: 2018, category: 'Campus', sketch: 'tower',
    brief: 'A vertical academy stacking learning, sport and assembly where land is scarce and aspiration is not.',
    overview: `Nestled in the vibrant neighborhood of Sarjapur, Bangalore, this prestigious educational institution spans an impressive ten-acre campus with a meticulously designed built-up area of 1,60,000 square feet. The expansive facility has been thoughtfully planned to accommodate and nurture a diverse student body of 1,500 learners, providing them with an enriching educational environment that promotes both academic excellence and personal growth.

In alignment with the institution's commitment to international education standards, the school has been specifically designed to seamlessly integrate with the International Baccalaureate (IB) Curriculum's pedagogical approach and teaching methodologies. This educational philosophy is reflected in every aspect of the building's design and functionality. The exterior architecture makes a bold statement with its striking elevational features, masterfully crafted in Glass Fiber Reinforced Concrete (GFRC), creating an impressive facade that evokes the grandeur of classical architecture, complete with magnificent glass domes that serve as both architectural focal points and sources of natural illumination.

While the exterior pays homage to traditional architectural elements, the interior spaces present a thoughtful contrast with their contemporary design aesthetic. The modern, minimalist approach to the internal environments creates clean lines and uncluttered spaces that perfectly complement the school's forward-thinking educational approach. This deliberate juxtaposition of classical exterior and modern interior design elements symbolizes the institution's unique ability to balance time-honored educational traditions with progressive teaching methods and modern learning environments.`,
    stats: [{ label: 'Site area', value: '10 acres' }, { label: 'Built-up area', value: '1,60,000 sft' }, { label: 'Capacity', value: '1500' }] },
  { slug: 'wisdom-tree-global-school', name: 'Wisdom Tree Global School', location: 'Bhubaneswar, Odisha', year: 2020, category: 'Education', sketch: 'pitched',
    brief: 'An eastern-India campus shaped to its climate and culture, learning from the institution it serves.',
    overview: `Situated on a sprawling 16-acre campus in the tranquil outskirts of Bhuvneshwar, Orissa, this prestigious educational institution provides a nurturing learning environment for 1,600 students within its expansive built-up area of 1 lakh 60,000 square feet. The thoughtfully designed campus creates an optimal balance between academic spaces and recreational areas, ensuring a comprehensive educational experience.

The institution distinguishes itself through its extensive range of state-of-the-art facilities, encompassing both extra-curricular activities and sporting amenities. Our firm's comprehensive involvement extended beyond architectural design to include complete interior design services and detailed landscape architecture. A notable feature of our design approach was the seamless integration of incidental learning elements throughout both the indoor and outdoor spaces, creating an environment where every corner presents an opportunity for discovery and education. These carefully crafted learning elements are subtly woven into the fabric of the campus, encouraging spontaneous learning experiences as students move through their daily activities.`,
    stats: [{ label: 'Site area', value: '16 acres' }, { label: 'Built-up area', value: '1,60,000 sft' }, { label: 'Capacity', value: '1600' }] },
  { slug: 'dempo-football-academy', name: 'Dempo Football Academy', location: 'Ella, Goa', year: 2018, category: 'Sport', sketch: 'stadium', featured: true,
    brief: 'A residential football academy in Goa — training, lodging and recovery planned around the rhythm of the athlete’s day.',
    overview: `This prestigious football academy was established under the vision of Mr. Srinivas Dempo, the esteemed owner of Goa's ISL football team. The comprehensive facility integrates multiple components including an educational institution, a specialized football academy with advanced training facilities, a regulation FIFA-size football field complemented by a spectator viewing pavilion, and numerous other purpose-built amenities designed to nurture both athletic and academic excellence.

The project stands as a testament to innovative cost-effective construction practices, achieved through the strategic utilization of locally sourced materials - a decision particularly crucial given Goa's characteristically extended procurement timelines. The architectural design prominently features laterite stone, a material deeply rooted in Goan architectural heritage, which not only provided practical advantages in construction but also seamlessly integrated the facility into the region's distinctive architectural vocabulary, creating a harmonious blend of functionality and cultural identity.`,
    stats: [{ label: 'Site area', value: '12 acres' }, { label: 'Built-up area', value: '1,00,000 sft' }, { label: 'Capacity', value: '120' }] },
  { slug: 'kanteerva-outdoor-stadium', name: 'Kanteerva Outdoor Stadium', location: 'Bangalore, Karnataka', year: 1997, category: 'Sport', sketch: 'stadium', featured: true,
    brief: 'An outdoor bowl tuned to athletes and spectators alike — circulation, sightlines and shade resolved at the scale of the city.',
    overview: `Synonymous with Bangalore's rich sporting heritage and cultural identity, the iconic Kanteerva outdoor stadium was constructed in the early 1990's, immediately following the completion of the Aditi project. This remarkable facility holds the distinction of being one of Bangalore's pioneering implementations of slip form construction technology, showcasing the city's commitment to innovative architectural solutions.

The stadium's architectural design incorporates several distinctive and technically advanced features that set it apart. These include elegantly designed butterfly arches that create a striking visual impact while providing structural stability, and sophisticated slip form lighting towers that ensure optimal illumination for evening events while maintaining aesthetic appeal.

As Karnataka's premier athletic venue, this prestigious facility has become the preferred location for hosting the state's most significant athletic competitions and sporting events, cementing its position as a cornerstone of Karnataka's sporting infrastructure. The stadium's enduring legacy continues to inspire athletes and serve as a symbol of sporting excellence in the region.`,
    stats: [{ label: 'Site area', value: '7-8 acres' }, { label: 'Built-up area', value: '1,00,000 sft' }, { label: 'Capacity', value: '40,000' }] },
  { slug: 'anthem-biosciences-campus', name: 'Anthem Biosciences Campus', location: 'Bangalore, Karnataka', year: 2005, category: 'Campus', sketch: 'tower',
    brief: 'A research campus where laboratory rigour meets daylight and calm — clarity of plan carrying the operational brief.',
    overview: `This is the expansive and thoughtfully designed campus of the Anthem Biosciences factory and offices, situated in the vibrant city of Bangalore. In a conscious effort to break away from conventional industrial and corporate architectural styles, the campus features an extensively landscaped masterplan that prioritises green spaces and natural elements. The spaces throughout the facility were meticulously designed to strike a perfect balance between aesthetic appeal and functionality, creating an environment that maintains professional standards while offering a warm and inviting atmosphere to employees and visitors alike.

Our expertise lies in crafting dynamic working environments that foster positivity and enhance productivity throughout the workday. We understand that whether we're designing for an educational institution or an industrial facility, the key is to create spaces that inspire and energise people, enabling them to perform at their best while maintaining a sense of comfort and well-being in their professional surrounding.`,
    stats: [{ label: 'Site area', value: '5 acres' }, { label: 'Built-up area', value: '60,000 sft' }, { label: 'Capacity', value: '300' }] },
  { slug: 'sjr-public-schools', name: 'SJR Public Schools', location: 'Bangalore, Karnataka', year: 2010, category: 'Education', sketch: 'linear',
    brief: 'Robust, daylit classroom blocks built to take heavy daily use for decades without feeling institutional.',
    overview: `This project includes three public schools developed for the SJR Group across Bangalore. The Kengeri campus spans 0.6 acres with a built area of 50,000 sq. ft., accommodating up to 800 students. The Sarjapur campus is the largest, covering 2 acres with 1,20,000 sq. ft. of built space and a capacity of 2,000 students. The HRBR Layout school occupies 1.5 acres, with a built-up area of 90,000 sq. ft. and serves 1,600 students`,
    stats: [{ label: 'Site area', value: 'Various' }, { label: 'Built-up area', value: 'Various' }, { label: 'Capacity', value: 'Various' }] },
  { slug: 'national-public-school-', name: 'National Public School, Jalahalli', location: 'Bangalore, Karnataka', year: 2018, category: 'Education', sketch: 'courtyard',
    brief: 'A compact city campus that finds generous shared space within a tight urban footprint.',
    overview: `The design was envisioned to be functional and understated, with a clear emphasis on academic excellence rather than experimental or alternative learning models. The school has since been brought under the management of the NPS Group of Institutions, known for their strong academic focus.`,
    stats: [{ label: 'Site area', value: '2 acres' }, { label: 'Built-up area', value: '2,00,000 sft' }, { label: 'Capacity', value: '1200' }] },
  { slug: 'good-shepherds-intl.-school-revitalisation', name: 'Good Shepherd’s International School', location: 'Ooty, Tamil Nadu', year: 2022, category: 'Revitalisation', sketch: 'pitched',
    brief: 'A careful revitalisation of a hill-station campus — preserving what matters, modernising what must change.',
    overview: `Good Shepherd International School in Ooty is one of India's premier residential schools, set on a sprawling 200-acre campus. Home to a wide range of infrastructure and facilities for both students and staff, the school invited us to reimagine its spaces — including the campus layout, interiors, and signage — with a more child-centric approach. Over the course of two years, we thoughtfully redesigned multiple areas across the campus to better serve the needs of its community.`,
    stats: [{ label: 'Site area', value: '200 acres' }, { label: 'Built-up area', value: '>1,50,000 sft' }, { label: 'Capacity', value: '1000' }] },
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

// Capability keywords shown under the hero title (also strong SEO signals).
export const specialties = [
  'Institutional architecture', 'Schools & campuses', 'Masterplanning',
  'Infrastructure', 'Healthcare', 'Sports facilities', 'Residences',
  'Resorts & hospitality', 'Interiors', 'Product design'
];

export const services = [
  { n: '01', name: 'Institutional & Campus Design', blurb: 'Schools, universities and civic institutions — from a single block to a full multi-phase campus masterplan.' },
  { n: '02', name: 'Masterplanning', blurb: 'Long-horizon planning that anticipates growth, climate and culture. We think in decades, not quarters.' },
  { n: '03', name: 'Infrastructure', blurb: 'Civic and public infrastructure designed for the scale, movement and pace of a growing city.' },
  { n: '04', name: 'Sports Facilities', blurb: 'Stadiums, academies and training facilities — designed for athletes, spectators and the city alike.' },
  { n: '05', name: 'Healthcare', blurb: 'Hospitals and clinical interiors where clarity, calm and operational efficiency share the brief equally.' },
  { n: '06', name: 'Residential & Hospitality', blurb: 'Homes, resorts and hospitality that balance comfort, place and craft over the long life of a building.' },
  { n: '07', name: 'Interiors', blurb: 'The inside of a building: libraries, classrooms, workplaces and public rooms tuned for real daily use.' },
  { n: '08', name: 'Product Design', blurb: 'Furniture, fittings and bespoke elements — down to the details that carry the identity of a place.' }
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
  { slug: 'designing-for-a-billion-5-ways-india-s-new-building-code-is-reimagining-the-modern-city', file: 'designing-for-a-billion.md',
    title: 'Designing for a Billion: 5 Ways India’s New Building Code is Reimagining the Modern City',
    author: 'Paromita Harsha', date: 'Apr 16, 2026', readTime: '4 min read', sketch: 'siteplan',
    excerpt: 'India’s urban population is projected to reach 820 million by 2051. How the National Building Code 2016 is rethinking our cities at scale.' },
  { slug: 'architecture-that-teaches-the-reality-of-designing-modern-educational-spaces', file: 'architecture-that-teaches.md',
    title: 'Architecture That Teaches: The Reality of Designing Modern Educational Spaces',
    author: 'Kumar and Swamy Architects', date: 'Apr 8, 2026', readTime: '2 min read', sketch: 'courtyard',
    excerpt: 'Physical space is a silent partner in every classroom. Notes on the real-world challenges and rewards of designing modern educational spaces.' },
  { slug: 'inclusivity-in-architecture-design-without-bias', file: 'inclusivity-in-architecture.md',
    title: 'Inclusivity in Architecture — Design Without Bias',
    author: 'Varun Govind', date: 'Aug 7, 2025', readTime: '4 min read', sketch: 'pitched',
    excerpt: 'Building spaces that work in a fragmented world — a practical philosophy for bias-free, inclusive design.' },
  { slug: '18th-june-2025-an-architect-s-journal-entry', file: '18th-june-2025-an-architect-s-journal-entry.md',
    title: '18th June, 2025: An Architect’s Journal Entry',
    author: 'Prathik R. Jagtap', date: 'Jun 18, 2025', readTime: '5 min read', sketch: 'pitched',
    excerpt: 'A monsoon-morning time-slip to 1995 — drafting tables, ammonia prints and scale models, and a reflection on what architecture felt like before the screens.' },
  { slug: 'designing-flexible-and-adaptable-learning-spaces', file: 'designing-flexible-and-adaptable-learning-spaces.md',
    title: 'Designing Flexible and Adaptable Learning Spaces',
    author: 'Kumar and Swamy Architects', date: 'May 22, 2025', readTime: '3 min read', sketch: 'linear',
    excerpt: 'Movable furniture, zoned spaces and technology hubs — how reconfigurable learning environments support diverse teaching methods and active learning.' },
  { slug: 'the-impact-of-colour-on-learning-a-guide-to-selecting-colours-for-school-interiors', file: 'the-impact-of-colour-on-learning-a-guide-to-selecting-colours-for-school-interiors.md',
    title: 'The Impact of Colour on Learning: A Guide to Selecting Colours for School Interiors',
    author: 'Kumar and Swamy Architects', date: 'Jan 28, 2025', readTime: '4 min read', sketch: 'courtyard',
    excerpt: 'Warm, cool and neutral palettes, colour-coding and wayfinding — a practical guide to using colour to support focus, identity and learning in schools.' },
  { slug: 'vivitsa-world-school-the-architecture', file: 'vivitsa-world-school-the-architecture.md',
    title: 'Vivitsa World School: The Architecture',
    author: 'Kumar and Swamy Architects', date: 'Dec 6, 2024', readTime: '2 min read', sketch: 'courtyard',
    excerpt: 'A child-centric, courtyard-based campus where every brick serves a pedagogical purpose — learning, play and nature woven into a sustainable design.' },
  { slug: 'the-importance-of-natural-light-in-school-design', file: 'the-importance-of-natural-light-in-school-design.md',
    title: 'The Importance of Natural Light in School Design',
    author: 'Kumar and Swamy Architects', date: 'Nov 21, 2024', readTime: '4 min read', sketch: 'pitched',
    excerpt: 'Why daylight matters in Indian schools — its measurable effect on performance, health and mood, and the strategies we use to bring it deep into buildings.' },
  { slug: '50-years-of-kumar-swamy', file: '50-years-of-kumar-swamy.md',
    title: '50 Years of Kumar & Swamy',
    author: 'Kumar and Swamy Architects', date: 'Oct 11, 2022', readTime: '1 min read', sketch: 'tower',
    excerpt: 'We marked our 50th anniversary with an Open Day — old hand-drafted drawings, CR Shivakumar’s legacy, and friends from across Bangalore.' },
  { slug: 'reinterpreting-our-very-first-school', file: 'reinterpreting-our-very-first-school.md',
    title: 'Reinterpreting Our Very First School',
    author: 'Kumar and Swamy Architects', date: 'Feb 11, 2021', readTime: '1 min read', sketch: 'courtyard',
    excerpt: 'Thirty years on, we extended Mallya Aditi — our very first school — with a lightweight steel structure that reinterprets the original in a modern context.' }
];

// Handwritten "margin notes" for the Journal drawing-sheet layout (build.mjs / buildBlog).
// Keyed by post slug; a plate with no note simply renders without one.
export const journalNotes = {
  'designing-for-a-billion-5-ways-india-s-new-building-code-is-reimagining-the-modern-city': '820 million\nby 2051 —\nplan for it',
  'architecture-that-teaches-the-reality-of-designing-modern-educational-spaces': 'the room\nteaches too',
  'inclusivity-in-architecture-design-without-bias': 'no user\nis average',
  '18th-june-2025-an-architect-s-journal-entry': 'smell of\nammonia\nprints',
  'designing-flexible-and-adaptable-learning-spaces': 'walls that\nmove',
  'the-impact-of-colour-on-learning-a-guide-to-selecting-colours-for-school-interiors': 'colour is\nwayfinding',
  'vivitsa-world-school-the-architecture': 'courtyard\nfirst',
  'the-importance-of-natural-light-in-school-design': 'daylight\n= free',
  '50-years-of-kumar-swamy': '50 yrs.\nopen day',
  'reinterpreting-our-very-first-school': 'where it\nall began'
};
