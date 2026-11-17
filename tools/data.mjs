// Single source of truth for the generated site.
// Article bodies live in /content/blog/*.md and are read at build time.

export const site = {
  name: 'Kumar & Swamy Architects',
  shortName: 'K&S Architects',
  // Must match CNAME: GitHub Pages 301s www → apex, so canonicals, og:url and
  // sitemap entries all point at the apex host.
  domain: 'https://kumarandswamyarchitects.com',
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
    'https://www.indiamart.com/kumar-swamy-architects',
    'https://educationworld.in/kumar-and-swamy-architects/'
  ]
};

export const nav = [
  // Index of Works taken down for now — restore this item + buildIndexPage() to bring it back.
  // { id: 'index', label: 'Index', href: 'index-of-works' },
  { id: 'projects', label: 'Projects', href: 'projects' },
  { id: 'services', label: 'Services', href: 'services' },
  { id: 'about', label: 'About Us', href: 'about' },
  { id: 'blog', label: 'Journal', href: 'blog' },
  { id: 'contact', label: 'Contact', href: 'contact-kumar-swamy-architect' },
  { id: 'apply', label: 'Work with us', href: 'applytowork' }
];

export const categories = ['All', 'Education', 'Campus', 'Sport', 'Revitalisation'];

// sketch = which axonometric/plan SVG illustrates the card (placeholder until photos land)
//
// Optional fields for fuller project write-ups (rendered when present):
//   school    true for a Campus project that is a school (Education and
//             Revitalisation projects count as schools already)
//   team      partner slugs from `team` below, e.g. ['harshashivakumar', 'paromitaharsha'].
//             Shown as "Project team" and credited as creators in the JSON-LD.
//   client    who commissioned it, e.g. 'PES Group of Institutions'
//   curriculum e.g. 'CBSE', 'IB', 'Montessori to grade 6, CBSE to grade 12'
//   sections  [{ h: 'The brief', body: `paragraphs…` }, …] — headed sections under
//             the overview. See the writing guide in the PR for the headings to use.
export const projects = [
  { slug: 'mallya-aditi-international-school', name: 'Mallya Aditi International School', location: 'Bangalore, Karnataka', year: 1991, category: 'Education', sketch: 'courtyard', featured: true,
    brief: "Our first school: a campus of connected courtyards in place of corridors, with every classroom open to light and air.",
    overview: `Built on a five-acre site in Yelahanka, in north Bangalore, Mallya Aditi International School was our first school and our first venture into institutional architecture. We won the commission through a design competition in 1990, and the campus was conceived to hold 600 students across just over one lakh square feet of built space. It was among the first international schools in Bangalore, at a time when the city had few precedents for what such a school should look or feel like. That absence of a template turned out to be a gift: it let us ask, from first principles, what a child's day at school should be like.

The answer began with what we wanted to leave out. Most schools of the period were organised along corridors — long, doubly loaded passages with classrooms on either side, dark in the middle and noisy at every change of period. Corridors are efficient on paper, but they are dead space. Nobody lingers in them, nobody learns in them, and they cut classrooms off from light, air and the view outside. At Aditi we did away with the conventional corridor altogether. In its place, the school is arranged as a sequence of interconnected courtyards, so that moving from one class to the next means walking through open, shaded, planted space rather than down a tunnel.

The courtyards do several jobs at once. They are the school's circulation, its gathering places and its lungs. Every classroom borders one, so every classroom can draw light from more than one side and take advantage of cross-ventilation — important in Bangalore, where a well-shaded, well-ventilated room stays comfortable for most of the year without mechanical cooling. Shaded verandahs mediate between the courtyards and the rooms, giving children a place to wait, talk or spill out into, and giving the monsoon somewhere to fall that is not a doorway.

Just as important is what the courtyards do for the life of the school. A child moving through Aditi is constantly passing other children — older students, younger ones, friends from other sections. Teachers see students outside the classroom, and students see teachers outside their roles. These chance encounters are a quiet but powerful part of an education, and the plan was designed to multiply them. Each courtyard has its own scale and character, so the campus reads not as a single institution but as a cluster of smaller places, each one knowable to a child.

Aditi was drawn entirely by hand. Some of its original working drawings were on display when we marked fifty years of the practice, and they remain among the drawings we are proudest of. The project set down ideas that have run through our educational work ever since: courtyards over corridors, daylight in every room, and the belief that the spaces between classrooms matter as much as the classrooms themselves.

In 2021, three decades after the school first opened, we returned to add a first floor. The original building is load-bearing, so the extension had to be light: we built it as a steel structure, with lightweight Aerocon panels for the walls and a combination of sheet and fabric roofs. The challenge was to make a modern addition that still felt like Aditi. Clerestory windows and balconies recreate the quality of light and the ease of ventilation of the original classrooms below, carrying the spirit of the old school into a new structure.

Revisiting our first school after thirty years was a rare privilege. It confirmed that the core idea — a school built around open, connected courtyards rather than corridors — has aged well, and that a building designed around how children actually move, gather and learn can keep serving them for generations.`,
    stats: [{ label: 'Site area', value: '5 acres' }, { label: 'Built-up area', value: '1,00,000 sft' }, { label: 'Capacity', value: '600' }] },
  { slug: 'canadian-international-school', name: 'Canadian International School', location: 'Bangalore, Karnataka', year: 2004, category: 'Education', sketch: 'linear', featured: true,
    brief: "A 14-acre residential IB campus in Yelahanka, roofed in a bespoke blue Mangalore tile made to match the school's logo.",
    overview: `Set on a 14-acre campus in Yelahanka, in north Bangalore, Canadian International School is a residential school offering the Canadian curriculum to around 600 students. The school was founded in 1996 and moved to this campus, which we designed, in 2006. It was one of the first residential schools we designed, and it asked a different question of us: how do you design a place where children not only learn, but live?

A day school has a rhythm that begins in the morning and ends in the afternoon. A boarding school has no such edges. Classrooms, dining halls, playing fields and dormitories all become part of one continuous day, and the campus has to support children through all of it — lessons, meals, sport, study, rest and the long evenings in between. For many students, drawn from a diverse community of families, the school would be home for most of the year. The brief, as we understood it, was to make a campus that felt like home without losing the focus and clarity of a place of learning.

The campus has a built-up area of around 2.5 lakh square feet, holding academic buildings alongside residential accommodation. We planned the site so that the academic and residential parts of the school each have their own identity and pace. The teaching spaces are organised for light, ventilation and ease of movement through the busy school day. The residences are quieter and more domestic in scale, giving boarders privacy, rest and a sense of belonging. Between them, the open grounds — lawns, playing fields and landscaped paths — tie the two together and give the school room to breathe.

The school is today an authorised IB World School, and the campus was planned for the inquiry-led teaching that the International Baccalaureate asks for: spaces for group work and discussion, laboratories and studios, and places for independent study alongside conventional classrooms.

One detail of this project has stayed with us, and it is perhaps the one people remember most. The school's identity is built around a distinctive blue. Rather than leaving the logo to letterheads and signage, we wanted the buildings themselves to carry it. We worked with Lafarge to develop a bespoke blue Mangalore tile, made specifically for the school's roofs and matched to the colour of its logo.

The Mangalore tile is one of the most familiar roofing materials in south India — a clay tile on a pitched roof that has sheltered homes, schools and public buildings in the region for well over a century. It sheds heavy monsoon rain, keeps buildings cool and weathers gracefully. Using it tied the school to a regional building tradition suited to Bangalore's climate; making it blue gave the campus an identity entirely its own. From across the grounds, the blue roofs announce the school long before any sign does. The brand and the architecture become the same thing.

That idea — that a school's identity should be legible in its buildings, not only its branding — has informed much of our work since. A school is a community, and communities recognise themselves in the places they share. In a residential school, where children may spend years of their lives, the architecture becomes part of their memory of growing up. We wanted former students to be able to picture those blue roofs long after they had left.

The project also gave us early experience of the particular demands of residential education: planning for pastoral care as well as teaching, for evenings and weekends as well as school hours, and for a community of students and staff who live together on one site. It is experience we have drawn on in many residential campuses since, from The Cathedral Vidya School in Lonavala to Amaatra Academy in Bangalore.`,
    stats: [{ label: 'Site area', value: '14 acres' }, { label: 'Built-up area', value: '2,50,000 sft' }, { label: 'Capacity', value: '600' }] },
  { slug: "sri-kumarans-children's-home", name: 'Sri Kumarans Children’s Home', location: 'Bangalore, Karnataka', year: 2006, category: 'Education', sketch: 'linear',
    brief: "A 35-acre campus for 7,000 students, broken into smaller clusters of buildings and courts so a school the size of a town still feels knowable.",
    overview: `Sri Kumarans Children's Home occupies a 35-acre campus in Malasandra, on the northern edge of Bangalore. With around 7,000 students and a built-up area of roughly five lakh square feet, it is one of the largest schools in the city and one of the largest educational projects we have undertaken. The campus belongs to the Sri Kumaran group of institutions, whose first school opened in 1959, and it is home to both the group's CBSE and ICSE schools. Designing at that scale brings its own problems, and its own opportunities.

A school of 7,000 is, in effect, a small town. Every morning thousands of children arrive within a narrow window; every change of period sets a large share of them moving at once; every afternoon they leave together. If circulation is poorly planned, the whole school feels it — in crowding, noise and lost time. So the first task was to get the movement right. We organised the campus around clear routes and generous shared spaces, so that large numbers of students can move through the site easily and safely, and so that a child, even a very young one, can always tell where they are and where they need to go.

The second task was to stop the school from feeling as big as it is. Size can easily become anonymity; a child in a school of thousands can feel lost unless the spaces they use every day are scaled to them. We broke the campus down into smaller groupings of buildings and courts, each with its own identity, so that students belong first to a part of the school they know well, and only then to the institution as a whole. Shared courts give each group a place to gather and play between classes, and they bring light and air deep into the plan.

Sport and activity are central to the school's identity, and they shaped the masterplan as much as the academic buildings did. Sri Kumarans has a comprehensive range of sporting facilities and spaces for a wide variety of extra-curricular pursuits. On a 35-acre site there is room to give these activities the space they deserve, rather than squeezing them into whatever land is left after the classrooms are placed. The fields, courts and activity spaces are integral to the plan, and they give the campus its open, green character.

Gathering places matter at this scale too. A school this size needs spaces where large parts of the community can come together for assemblies, performances and celebrations, as well as places where smaller groups can meet informally. One of the campus's most recognisable spaces is an open-air amphitheatre beneath a brick building, where stepped seating creates a natural setting for performances, assemblies and everyday gatherings.

Materials were chosen for durability as much as appearance. A campus used by thousands of children every day needs finishes that age well and stay easy to maintain over decades. Exposed brick gives the buildings warmth and texture while standing up to hard daily use, and ties the campus to Bangalore's long tradition of brick architecture.

Because the campus houses both a CBSE and an ICSE school, it was planned to meet the affiliation norms of both boards, including the separate, dedicated science laboratories that the Council for the Indian School Certificate Examinations requires. Its generous provision for sport and extra-curricular activity is also in line with the National Education Policy 2020, which calls for an end to the rigid separation between curricular and extra-curricular learning.

Since it opened, Sri Kumarans has grown into one of Bangalore's most prominent schools. For us, it showed that the principles we had developed on much smaller campuses — courtyards, daylight, clear movement and spaces scaled to children — hold true at a very large scale, as long as the plan is broken down into places that individual children can know and call their own.`,
    stats: [{ label: 'Site area', value: '35 acres' }, { label: 'Built-up area', value: '5,00,000 sft' }, { label: 'Capacity', value: '7000' }] },
  { slug: 'amaatra-academy', name: 'Amaatra Academy', location: 'Bangalore, Karnataka', year: 2008, category: 'Education', sketch: 'courtyard', featured: true,
    brief: "A residential college-preparatory academy for 1,600 students, zoned so that serious study and the ease of home sit side by side.",
    overview: `Amaatra Academy is a college preparatory school with residential facilities, established by the PES group of institutions in Bangalore. It occupies a nine-acre campus planned for 1,600 students, with a total built-up area of around 3.5 lakh square feet. Our relationship with PES goes back many years — we also masterplanned their 50-acre campus in Shimoga — and Amaatra was a chance to bring that experience to a school in the city.

A college preparatory school has a particular character. Its students are working towards a clear goal, entry into higher education, and the academic programme is demanding. The campus has to support focused, serious study. At the same time, its students are young people, many of whom live on campus, and they need room to unwind, play sport, make friends and simply be themselves. The design had to hold both realities: the rigour of the classroom and the ease of home.

We approached this by planning the teaching spaces for light and air, creating a calm, well-ordered setting for study. Classrooms are planned for daylight and cross-ventilation, so they stay bright and comfortable through the school day, and the open spaces between buildings give students places to pause, talk and unwind between classes.

The academic buildings are complemented by a range of supporting facilities. A library gives students a quiet place for independent work. A swimming pool supports the sports programme and gives students another outlet for physical activity, alongside courts for games such as basketball. These are not extras: at a school where students live as well as learn, sport and recreation are essential parts of a balanced day. The academic buildings themselves were built to CBSE's affiliation norms, with classrooms of at least 500 square feet, dedicated mathematics and computer laboratories, a library, and separate physics, chemistry and biology laboratories for the senior secondary years.

The residential side of the campus received as much care as the academic. The hostel was designed with contemporary amenities to give students a comfortable, home-like setting through their years at the school. We wanted boarders to feel that they were living somewhere, not merely staying somewhere, with rooms that offer privacy and rest and shared spaces that let friendships form. Staff quarters on campus allow teachers to live close to the school, which helps sustain the close relationships between teachers and students that residential education depends on.

Planning so many functions on nine acres required careful zoning. Academic, residential and recreational areas each needed their own space and identity while staying close enough to make daily life easy. We arranged the site so that the noisier, more active parts of the school are separated from the quieter areas for study and rest, and so that students can move comfortably between them through the day. Seen from the air, the campus reads as a set of clearly defined parts held together by open space.

Amaatra brought together many of the ideas we had developed in other schools — daylight, ventilation, careful zoning and an understanding of the needs of residential students — and combined them on a compact city site. The result is a campus that supports serious academic ambition while giving its students the space, comfort and community they need during some of the most important years of their education.`,
    stats: [{ label: 'Site area', value: '9 acres' }, { label: 'Built-up area', value: '3,50,000 sft' }, { label: 'Capacity', value: '1600' }] },
  { slug: 'valiants-academy', name: 'Valiants Academy', location: 'Kengeri, Karnataka', year: 2019, category: 'Education', sketch: 'pitched',
    brief: "A Montessori-to-CBSE school shaped by incidental learning and multiple intelligences, its blocks framing a central, sheltered heart.",
    overview: `Valiants Academy, in Kengeri on the southern edge of Bangalore, is a school with a distinctive educational approach. It offers a dual curriculum: Montessori education for children up to the sixth grade, followed by the CBSE curriculum through to the twelfth. The campus spans five acres, with a built-up area of around 70,000 square feet, and accommodates 600 students. From the outset it was clear that a school built on this philosophy could not simply follow the template of a conventional campus.

Montessori education rests on the idea that children learn best through self-directed activity, hands-on exploration and freedom of movement within a carefully prepared environment. The classroom is not a room of desks facing a blackboard but a space for discovery, where children choose their work, move between activities and learn at their own pace. The CBSE years that follow are more structured, but the school wanted older students to carry forward the same curiosity and independence. The architecture had to support both stages, and the transition between them.

Two ideas guided the design. The first was incidental learning: the idea that children learn not only from formal lessons but from everything around them. A staircase can teach counting, a shadow can teach time, a planted edge can teach the seasons. The second was Howard Gardner's theory of multiple intelligences, which holds that children are intelligent in different ways — linguistic, logical, spatial, musical, bodily, interpersonal, intrapersonal and naturalistic. A school that takes this seriously needs spaces that engage all of them, not only the ones measured by exams.

We translated these ideas directly into the architecture. Spaces across the campus invite exploration, movement and discovery, so that learning continues beyond the classroom. Outdoor areas and transitional spaces are treated as learning environments in their own right. Spaces for art, music, movement and play sit alongside classrooms and laboratories, so that every kind of intelligence finds a place in the school. The layout grew out of the school's educational values, rather than having those values fitted into a standard plan afterwards.

The Montessori years called for spaces scaled to young children. Classrooms for the youngest students are designed to give them independence — things within reach, room to move, and easy access to the outdoors. As students move into the CBSE years the spaces become more structured to support formal study, but the same emphasis on light, openness and connection to the outside remains.

The architectural character was considered just as carefully. Every decision, from the choice of materials to the arrangement of spaces, was made to support the learning experience. The campus is organised as a set of blocks framing a central, sheltered heart — a shared space at the centre of school life where students of all ages meet. Materials and colours were chosen to create a calm, warm environment that supports concentration while still feeling welcoming to the youngest children.

The school was built to the Central Board of Secondary Education's affiliation norms, with classrooms of at least 500 square feet, dedicated science, mathematics and computer laboratories, and a library. Its approach also sits comfortably with the National Education Policy 2020, published soon after the school opened. The Montessori years correspond closely to the play- and activity-based foundational stage the policy sets out for children aged three to eight, and the emphasis on incidental learning and multiple intelligences is in line with its call for experiential learning, with the arts and sport woven through the curriculum rather than set apart from it.

At Valiants, the building itself becomes part of the curriculum. Children are not only taught inside it; they learn from it — from the way its spaces are arranged, the way light moves through it, and the way it invites them to explore. It is one of the clearest expressions in our work of a belief that runs through all our educational projects: that architecture can be an active partner in how children learn.`,
    stats: [{ label: 'Site area', value: '5 acres' }, { label: 'Built-up area', value: '70,000 sft' }, { label: 'Capacity', value: '600' }] },
  { slug: 'the-cathedral-vidya-school', name: 'The Cathedral Vidya School', location: 'Lonavala, Maharashtra', year: 2010, category: 'Education', sketch: 'pitched',
    brief: "A hillside IB school in the Western Ghats, its pitched roofs and buildings following the contours of the land.",
    overview: `Set in the hills of Lonavala, between Mumbai and Pune, The Cathedral Vidya School was a residential school on a 14-acre campus. It was set up as an affiliate of the Cathedral and John Connon School in Mumbai, one of the city's oldest schools, to bring that tradition to a new setting outside the city. We designed the campus for 1,200 students, with a built-up area of around three lakh square feet, purpose-built for the International Baccalaureate curriculum.

The site set the tone. Lonavala sits in the Western Ghats, a landscape of hills, valleys and dense green that changes dramatically with the seasons. It is cooler than the plains below, and it receives some of the heaviest monsoon rainfall in the region. For a residential school this was a remarkable setting — children grew up surrounded by nature — but it placed real demands on the architecture. The buildings had to shed water quickly, stand up to months of rain and damp, and stay comfortable through cool winters and humid monsoons.

Our response was to work with the landscape rather than against it. The buildings sit lightly on the hillside, following the contours of the site rather than flattening it, so that the campus steps with the land and the hills remain the dominant presence. Pitched roofs carry the monsoon rain off the buildings quickly and give the campus a character that belongs to its setting.

The International Baccalaureate shaped the interior planning just as strongly. The IB is an inquiry-based programme that emphasises independent research, collaboration, creativity and an international outlook. It needs more than rows of classrooms: it calls for spaces for group work and discussion, laboratories and studios, places for independent study, and areas where students can present and share their work. We planned the academic buildings to meet these needs, with teaching spaces that adapt to different ways of learning and a generous provision of specialist facilities. The school was authorised as an IB World School offering the IB Diploma Programme, and the campus met the IB's standard that a school's learning spaces and resources must support the delivery of its programme.

The open landscape between the buildings was as important as the buildings themselves. In a residential school, shared outdoor space is where much of the community's life happens: conversations between classes, games in the evening, quiet moments away from the classroom.

As a residential campus, the school also had to give its students comfortable places to live. The boarding facilities were designed to support both academic focus and personal growth, offering privacy and rest along with shared spaces that build friendships and a sense of belonging. Sports and recreational facilities, including a swimming pool, completed a campus where children could study, play and live in one place.

With a generous allocation of space for every student, the campus gave each child access to everything a complete education requires, while keeping the calm, unhurried quality that a hill setting allows. The school closed in 2022, but the campus remains one of our clearest examples of how a demanding international curriculum and a demanding natural setting can come together in architecture that is rigorous in its programme, comfortable in its climate and deeply connected to its landscape.`,
    stats: [{ label: 'Site area', value: '14 acres' }, { label: 'Built-up area', value: '3,00,000 sft' }, { label: 'Capacity', value: '1200' }] },
  { slug: 'pes-group-of-institutions', name: 'PES Group of Institutions', location: 'Shimoga, Karnataka', year: 2006, category: 'Campus', school: true, sketch: 'siteplan',
    brief: "A 50-acre masterplan bringing an engineering college, a K-12 school, hostels and sport together, planned in phases so it could grow as one place.",
    overview: `The PES campus in Shimoga is a 50-acre masterplan that brings several institutions together on one site: an engineering college, a K-12 school, extensive sports facilities, two residential blocks, an auditorium, and private spaces for the client's own meetings. With a built-up area of around six lakh square feet, the campus serves some 4,500 people. It is one of the most ambitious masterplans we have undertaken, and the start of a long relationship with the PES group that later led to Amaatra Academy in Bangalore.

Designing a campus like this is less like designing a building and more like planning a small town. Each institution has its own users, rhythms and needs. An engineering college has lecture halls, laboratories and workshops, and students who are young adults. A school has classrooms and play areas for much younger children. Residential blocks need privacy and quiet; sports facilities need space and access; an auditorium has to receive large audiences, sometimes from beyond the campus. The masterplan had to give each its own identity and setting while making the whole work as one place. Each institution was also built to the norms of its regulator: the engineering college, today the PES Institute of Technology and Management and affiliated to Visvesvaraya Technological University, to those of the All India Council for Technical Education, and the school to CBSE's affiliation norms.

We began by establishing a clear structure for the site: a framework of routes, open spaces and zones that organises the institutions and the movement between them. The school and the college each have their own precinct, so that younger children and older students work in settings suited to them. The residential blocks sit in quieter parts of the site, and the sports facilities are placed where they can be shared. Landscaped open space between these zones gives the campus its green, spacious character and lets light and air reach every building.

The masterplan was also designed to grow. Campuses of this scale are rarely built at once; they develop in phases as institutions expand and new needs arise. We planned PES so that each phase could be built without disrupting what was already there, and so that the campus would stay coherent at every stage. New buildings slot into the framework rather than being added wherever space allows.

Sport plays a major role in campus life. The extensive sports facilities support physical wellness and athletic development across the whole student body, from schoolchildren to college students, and give the campus shared places for activity and competition. The auditorium, technically equipped for performances and events, is a hub for the community, hosting everything from academic functions to cultural programmes and public gatherings.

The two residential facilities give students and faculty a comfortable home on campus. For a campus that draws students from across the region, good residential accommodation is essential, and we wanted these buildings to offer warmth and a sense of community rather than just a place to sleep. Alongside them, private areas provide dedicated space for the client's meetings and professional engagements.

Together, these elements make PES a complete educational environment, where students can move from early schooling through to higher education on one campus, supported by sport, culture and residential life. For us, the project showed the value of thinking at the scale of the masterplan: getting the big structure right first, so that each building, and each phase of growth, contributes to a campus that feels like a single, considered place.`,
    stats: [{ label: 'Site area', value: '50 acres' }, { label: 'Built-up area', value: '6,00,000 sft' }, { label: 'Capacity', value: '4500' }] },
  { slug: 'tejas-international-school', name: 'Tejas International School', location: 'Bagalkote, Karnataka', year: 2015, category: 'Education', sketch: 'linear',
    brief: "A school in one of Karnataka's hottest regions that stays up to 4°C cooler inside with no air conditioning, through deep shade, shaded courtyards and local stone.",
    overview: `Tejas International School is in Bagalkot, in north Karnataka, and is owned and managed by Mr. Murugesh Nirani. Its 14-acre campus holds around two lakh square feet of built space for 700 students. The school opened in 2017 as Tejas International Residential School, a CBSE school for both day scholars and boarders. Of all our schools, it is perhaps the one most shaped by its climate.

Bagalkot is one of the hottest and driest parts of the state. Temperatures regularly reach 40°C, and the heat and aridity persist through every season. In a region like this, the conventional response is to seal buildings up and air-condition them. That approach is expensive to build and run, consumes a great deal of energy, and leaves a school entirely dependent on electricity to stay usable. We wanted a building that would stay comfortable on its own.

Our approach drew on two sources: a careful study of the site's environmental conditions, and the long tradition of Indian building in hot, dry climates. For centuries, buildings across the Deccan have kept cool without machines — through thick walls, shaded courtyards, small openings on sun-facing sides and careful management of air movement. We studied the path of the sun across the site, the direction of prevailing winds and the pattern of heat through the day and the year, and let these shape the design.

The building uses a range of passive cooling strategies. Deep shading protects walls and windows from direct radiation. Openings are placed to encourage cross-ventilation, drawing cooler air through the classrooms and letting hot air escape. Courtyards and shaded outdoor spaces create pockets of cooler air within the campus. Local stone was chosen for its thermal mass and durability, slowing the transfer of heat into the interior during the day.

The results have been measured. Based on documentation provided by the client, the interior spaces stay up to 4°C cooler than the outside air — achieved entirely through architectural design, with no air conditioning or mechanical ventilation. In a climate where outdoor temperatures reach 40°C, those four degrees make a real difference to how children feel, how well they concentrate and how long they can learn comfortably through the day.

This matters beyond comfort. A school that relies on passive design is cheaper to run, uses far less energy and keeps working when the power fails. It also teaches, quietly, a lesson about building in a warming world. Children who grow up in a building that stays cool by design learn that comfort does not have to come from a machine, and that architecture can respond intelligently to the place where it stands.

Tejas also had to work as a school in every other sense — classrooms, laboratories, play spaces and shared areas for an international curriculum and a community of 700 students. The passive strategies were built into the planning from the start, so that the spaces that keep the building cool are also the spaces where children gather, play and learn. The school was built to CBSE's affiliation norms, with classrooms of at least 500 square feet, dedicated laboratories and a library, and its boarding facilities were planned alongside the academic blocks to the board's requirements for residential schools.

For us, Tejas is a clear demonstration of a principle we hold across all our work: thoughtful, context-specific design can solve problems that are usually handed over to technology. In one of Karnataka's most demanding climates, careful architecture has created a learning environment that is comfortable, sustainable and resilient.`,
    stats: [{ label: 'Site area', value: '14 acres' }, { label: 'Built-up area', value: '2,00,000 sft' }, { label: 'Capacity', value: '700' }] },
  { slug: 'united-world-academy', name: 'United World Academy', location: 'Bangalore, Karnataka', year: 2018, category: 'Campus', school: true, sketch: 'tower',
    brief: "An IB school in Sarjapur with a classical GFRC facade crowned by glass domes, and calm, contemporary spaces inside.",
    overview: `United World Academy sits on a ten-acre campus in Sarjapur, in south-east Bangalore. With a built-up area of 1,60,000 square feet, it is planned for 1,500 students and was designed specifically around the pedagogy of the International Baccalaureate. It is also one of our most striking buildings, defined by a deliberate contrast between a classical exterior and a contemporary interior.

The IB shaped the plan. Its programmes emphasise inquiry, collaboration and an international outlook, and ask students to research, discuss, create and present as much as to listen. That requires a school with more than classrooms: spaces for group work, specialist laboratories and studios, places for independent study, and areas where the community can gather and share work. We planned United World Academy around these needs, so that the building supports the way the curriculum is actually taught. The school is authorised for the IB Diploma Programme and Cambridge IGCSE, and the building meets the IB's standard that a school's learning spaces and resources must support the delivery of its programmes.

The exterior makes a bold statement. The elevations draw on the vocabulary of classical architecture — columns, arches and a strong symmetry — giving the school a sense of grandeur and permanence. Glass domes crown the building, acting both as architectural landmarks and as sources of natural light for the spaces below. The facades are made in Glass Fibre Reinforced Concrete (GFRC), a material that allows complex classical profiles to be produced with precision, at a fraction of the weight of stone or solid concrete, and with excellent durability in Bangalore's climate. GFRC made it possible to achieve the richness of a classical facade with modern construction methods.

Step inside, and the character changes. The interiors are contemporary and minimal — clean lines, uncluttered spaces and a restrained palette that lets light and activity take centre stage. Under the domes, daylight falls into the heart of the building, creating bright, uplifting spaces at the centre of school life. Classrooms and learning spaces are calm, flexible and focused, supporting the open, inquiry-led teaching of the IB.

The contrast is intentional. The classical exterior speaks to tradition: to the long history of learning, to the dignity of institutions, and to the idea that a school should be a building its community can be proud of. The modern interior speaks to the present: to new ways of teaching, new technologies and new ideas about how children learn. Together they express the school's aspiration to balance time-honoured educational values with progressive methods — respecting the past while preparing students for the future.

Making that contrast work required careful coordination. The rhythm of the exterior — its bays, openings and domes — is tied to the organisation of the spaces inside, so that the classical shell and the contemporary interior read as one building rather than two. Windows are placed to give classrooms good daylight and views, and the domes sit over the spaces where light is needed most.

Beyond the main building, the ten-acre campus provides room for sport, play and outdoor activity, giving the school's 1,500 students space to move, gather and grow. United World Academy is an unusual project in our portfolio, and a demonstration that a school can draw on very different architectural languages and still form a coherent, purposeful whole — one grounded in how its students learn.`,
    stats: [{ label: 'Site area', value: '10 acres' }, { label: 'Built-up area', value: '1,60,000 sft' }, { label: 'Capacity', value: '1500' }] },
  { slug: 'wisdom-tree-global-school', name: 'Wisdom Tree Global School', location: 'Bhubaneswar, Odisha', year: 2019, category: 'Education', sketch: 'pitched',
    brief: "A 12-acre CBSE campus in Bhubaneswar where we designed the architecture, interiors and landscape as one, with incidental learning built in.",
    overview: `The DN Wisdom Tree Global School is set on a 12-acre campus at Sundarpur, on the quiet outskirts of Bhubaneswar in Odisha, and was inaugurated in 2022. It provides a learning environment for 1,600 students within a built-up area of around 1,60,000 square feet. It was also one of the most complete commissions we have taken on: beyond the architecture, we were responsible for the interior design and the landscape architecture of the whole campus.

That breadth of involvement shaped the project. On many projects, architecture, interiors and landscape are handled by different consultants, and the joins between them show. At Wisdom Tree we could design the school as a single, continuous environment, from the masterplan down to the furniture and the planting. The buildings, the rooms inside them and the spaces between them were conceived together, with one set of ideas running through all three.

The central idea was incidental learning: the belief that children learn not only in lessons but from everything they encounter in the course of the day. We wove learning elements through the campus, indoors and out, so that every corner offers something to discover. Learning becomes part of how students move around the school — spontaneous, curious and self-directed.

These elements are deliberately subtle. They are designed into the fabric of the campus rather than added as decoration, so they reward attention without demanding it. A child might pass the same feature a hundred times before noticing what it shows, and that moment of noticing is the point. Incidental learning works best when it feels like discovery rather than instruction.

The landscape plays a central role. With 12 acres to work with, we could balance buildings and open space carefully, giving students room to play, explore and spend time outdoors. Gardens, play areas and green spaces extend the learning environment outside, supporting both recreation and education. In a climate as warm and humid as Odisha's, shade, planting and the movement of air through the campus are also essential to comfort.

The school offers an extensive range of facilities for sport and extra-curricular activity, reflecting a commitment to the development of the whole child. Sports fields and courts, spaces for the arts and areas for clubs sit alongside the academic buildings, giving students the chance to discover interests and talents beyond the curriculum.

Inside, the interiors carry the same philosophy. Classrooms are bright, flexible and welcoming, with furniture and finishes chosen to support different ways of learning. Colour, material and light were used to create spaces calm enough for concentration and engaging enough to spark curiosity. Because we designed the interiors alongside the architecture, the two work together: rooms are shaped for the way they will be used, and the details carry the same ideas as the building as a whole.

The campus was built to CBSE's affiliation norms, with classrooms of at least 500 square feet, dedicated laboratories and a library. It opened in 2022, two years after the National Education Policy 2020, and its planning reflects one of the policy's central ideas: that there should be no rigid separation between curricular and extra-curricular learning. Sport and the arts are given their own space alongside the academic buildings, as equal parts of a child's education.

Wisdom Tree reflects our belief that a school is more than a collection of classrooms. It is an environment that teaches — through its spaces, its landscape and its details — and when architecture, interiors and landscape are designed as one, that environment can be remarkably rich: a place where curiosity is encouraged at every turn, and where learning continues long after the lesson ends.`,
    stats: [{ label: 'Site area', value: '12 acres' }, { label: 'Built-up area', value: '1,60,000 sft' }, { label: 'Capacity', value: '1600' }] },
  { slug: 'dempo-football-academy', name: 'Dempo Football Academy', location: 'Ella, Goa', year: 2011, category: 'Sport', sketch: 'stadium', featured: true,
    brief: "A residential football academy in Goa, with a FIFA-size pitch and spectator pavilion, built economically in local laterite.",
    overview: `The Dempo Football Academy in Ella, Goa, was established under the vision of Mr. Srinivas Dempo, owner of Goa's ISL football team. Goa is one of India's great footballing states, with a passion for the game that runs deep in its towns and villages, and the academy was conceived to nurture the next generation of players. On a 12-acre site, it brings together an educational institution, a specialised football academy with advanced training facilities, a regulation FIFA-size pitch with a spectator pavilion, and a range of supporting amenities. The academy accommodates 120 students within a built-up area of around one lakh square feet. Its first phase opened in 2017, taking in its first intake of young players on full scholarship.

A residential sports academy is an unusual brief. Its students are young athletes who train intensively while continuing their education, and the campus has to support every part of their day: training, study, meals, recovery and rest. The aim was a campus where athletic and academic development support each other rather than compete for time.

The pitch is the heart of the academy. Built to FIFA dimensions, it lets students train and play on a full-size, regulation field, preparing them for the professional game. The spectator pavilion alongside it provides covered seating for matches and events, turning the pitch into a place where the wider community can gather to watch. Its roof gives shade and shelter from Goa's monsoon rains, and gives the academy a recognisable face.

The project is also an exercise in cost-effective construction. Procurement timelines in Goa are long, and materials brought in from outside the state can add significant delays and cost. Rather than design around imported materials, we made a deliberate choice to use what was available locally, and that decision shaped the character of the whole campus.

The most important of these local materials is laterite: the red-brown stone that defines the architecture of Goa, quarried from the region's own ground, cut into blocks and used for centuries in its houses, churches and walls. It is strong and durable, and its thermal mass helps keep interiors cool in Goa's warm, humid climate. Using it brought practical benefits — shorter procurement times, lower costs and a material local builders know well — and it rooted the academy firmly in its place.

Laterite gives the campus a warm, earthy character and a texture that weathers beautifully, placing the academy within the architectural vocabulary of the region. The buildings feel as though they belong in Goa rather than having been imported from elsewhere. In a project built around a deeply local passion for football, that connection to place felt especially fitting.

Alongside laterite, we used other locally available materials and construction methods wherever possible, keeping the design straightforward to build and maintain. The result is a campus that is economical without being utilitarian, and practical without losing its sense of identity.

The Dempo Football Academy shows how a specialised brief, a tight budget and a strong regional context can come together in architecture with real character. It supports young athletes in pursuing their ambitions, gives Goan football a home worthy of the game's place in the state, and demonstrates the value of building with the materials of the place.`,
    stats: [{ label: 'Site area', value: '12 acres' }, { label: 'Built-up area', value: '1,00,000 sft' }, { label: 'Capacity', value: '120' }] },
  { slug: 'kanteerva-outdoor-stadium', name: 'Kanteerva Outdoor Stadium', location: 'Bangalore, Karnataka', year: 1997, category: 'Sport', sketch: 'stadium', featured: true,
    brief: "Karnataka's premier athletics stadium, with butterfly arches and slip-formed floodlight towers, among the first slip-form construction in Bangalore.",
    overview: `Few buildings in Bangalore are as closely tied to the city's sporting life as the Kanteerva outdoor stadium. We designed it in the early 1990s, soon after Mallya Aditi International School, and it opened in 1997, when Bangalore hosted the National Games. It remains one of the best-known projects in our history. Set on a site of seven to eight acres in the heart of the city, with a built-up area of around one lakh square feet and seating for around 25,000 spectators, it has become Karnataka's premier venue for athletics.

A stadium has to serve two very different audiences at once: the athletes on the field and the crowds in the stands. Athletes need a track and field built to exacting standards, with good access to changing rooms, warm-up areas and the arena. Spectators need clear sightlines, shelter from sun and rain, and routes that let tens of thousands of people arrive, find their seats and leave again safely. Resolving all of this at the scale of a city venue was the central challenge of the design.

The stadium was one of the first buildings in Bangalore to use slip form construction. In slip forming, concrete is poured into formwork that rises continuously as the structure is built, so tall, uniform concrete elements can be cast quickly and without joints. At the time it was a new and ambitious technique for the city, and adopting it let us build elements that would have been slow and difficult to achieve by conventional means. It reflected a willingness, shared by client and builders, to bring new technology to a major public project.

Two features give the stadium its identity. The first is its butterfly arches — sweeping structural elements that support the roof over the stands and give the stadium a light, dynamic profile against the sky. They provide structure and shelter, but they also make the stadium recognisable, an image that has become part of the city's visual memory. The second is the floodlighting towers, also built using slip form construction. Tall and slender, they give even, high-quality illumination for evening events, so competitions can continue after dark, while their clean form complements the rest of the structure.

The stands and circulation were resolved with equal care. Seating is arranged to give spectators good views of the track and field from every part of the stadium, and entrances, concourses and stairways are planned to move large crowds efficiently on major event days.

Kanteerva was drawn entirely by hand. When we marked fifty years of Kumar & Swamy Architects, some of its original hand-drafted working drawings were among those we put on display — a reminder of the craft and precision that went into it.

Since its completion, Kanteerva has hosted many of Karnataka's most significant athletics meets and sporting events, and it has become a cornerstone of the state's sporting infrastructure. Generations of athletes have trained and competed there, and countless spectators have watched from its stands. For us it remains a source of great pride: a building that has served its city for decades, and that still stands as a symbol of sporting excellence in the region.`,
    stats: [{ label: 'Site area', value: '7-8 acres' }, { label: 'Built-up area', value: '1,00,000 sft' }, { label: 'Capacity', value: '25,000' }] },
  { slug: 'anthem-biosciences-campus', name: 'Anthem Biosciences Campus', location: 'Bangalore, Karnataka', year: 2001, category: 'Campus', sketch: 'tower',
    brief: "A biosciences factory and office campus set in a landscaped masterplan, with daylight and green views wherever the work allows.",
    overview: `This five-acre campus in Bangalore houses the factory and offices of Anthem Biosciences, a contract research, development and manufacturing organisation that serves pharmaceutical and biotech companies. With a built-up area of around 60,000 square feet and space for some 300 people, it took a question we had long asked in schools into a new setting: how does the place where people spend their days affect how they feel, and how well they work?

Industrial and corporate campuses are often designed with function alone in mind. Factories become sealed boxes; offices become rows of desks under artificial light; the land around them becomes car parks and leftover space. Such buildings may work efficiently, but they rarely give anything back to the people inside. Anthem wanted something different, and we set out to break away from conventional industrial and corporate architecture.

The starting point was the landscape. Rather than treating the site as a plot to be filled, we developed an extensively landscaped masterplan that puts green space and natural elements first. Buildings are set within gardens and planted courts rather than surrounded by tarmac, so that everyone on the campus — in the laboratories, the production areas or the offices — has a connection to greenery and the outdoors. The landscape provides shade, softens the buildings and creates pleasant places to walk, pause and meet through the working day.

Within this setting, the buildings had to meet the exacting requirements of a biosciences company. Laboratory and production spaces demand precision: controlled environments, careful separation of functions, clear and efficient movement of people and materials, and compliance with stringent regulatory standards. We planned the campus so that these operational requirements are met clearly and rigorously. The clarity of the plan is what makes the rest of the design possible: once the operational logic is right, the buildings can be shaped around the people who use them.

Daylight was central to that. Wherever the technical requirements allowed, offices, laboratories and shared spaces were designed to receive natural light and views of the landscape. Daylight makes spaces more pleasant, reduces dependence on artificial lighting and has a well-documented effect on wellbeing and alertness. Together with the green surroundings, it creates a working environment that feels calm and humane rather than industrial.

The design balances aesthetic appeal with function throughout. The buildings keep the professional standards expected of a modern research organisation while offering a warm, inviting atmosphere for employees and visitors. Materials, colours and finishes were chosen to convey quality and care.

Much of our practice is devoted to schools, where we design spaces that inspire children to learn. Anthem showed us that the same principles hold in a workplace. Whether we are designing for students or scientists, the aim is the same: dynamic environments that foster positivity, energise people, support them in their work and give them a sense of comfort and wellbeing through the day.

The Anthem campus demonstrates that an industrial facility does not need to look or feel industrial. With a thoughtful masterplan, a generous landscape and close attention to the experience of the people inside, a factory and office complex can become a genuinely good place to work — one that serves both the operational needs of the business and the wellbeing of the people who keep it running.`,
    stats: [{ label: 'Site area', value: '5 acres' }, { label: 'Built-up area', value: '60,000 sft' }, { label: 'Capacity', value: '300' }] },
  { slug: 'sjr-public-schools', name: 'SJR Public Schools', location: 'Bangalore, Karnataka', year: 2006, yearLabel: '2006–2010', category: 'Education', sketch: 'linear',
    brief: "Three compact city schools for over 4,000 students: multi-storey, daylit and robust enough for decades of heavy use.",
    overview: `This project brings together three SJR schools we designed across Bangalore. Each sits on a different site in a different part of the city, with its own scale and character, but they share a common purpose: to provide high-quality school buildings for large numbers of students on compact urban sites.

The Kengeri campus, in the south-west of the city, is the smallest of the three. It occupies just 0.6 acres, with a built area of 50,000 square feet, and accommodates up to 800 students. The Sarjapur campus, in the south-east, is the largest, covering two acres with 1,20,000 square feet of built space and a capacity of 2,000 students. The school in HRBR Layout, in the north-east, occupies 1.5 acres, with a built-up area of 90,000 square feet, and serves 1,600 students. Between them, the three schools provide places for more than 4,000 children.

Those figures tell an important part of the story. On sites this compact, every square foot counts. Land in Bangalore is scarce and expensive, and a school serving hundreds or thousands of children has to fit classrooms, laboratories, libraries, assembly spaces and play areas into a footprint far smaller than a suburban campus. The challenge is to achieve that density without making the school feel cramped, dark or institutional.

Our response was to build upwards and plan carefully. Classroom blocks rise over several floors to free as much ground as possible for open space and play. Every classroom is planned to receive good daylight and cross-ventilation, so that even on a tight urban site, students learn in bright, airy rooms. Circulation is kept clear and efficient, with staircases and corridors sized for the movement of large numbers of students at each change of period, while open areas at ground level give children room to gather, play and let off energy.

Durability was another priority. Schools like these are used intensively by large numbers of children every day, for decades. The buildings needed to stand up to heavy use without constant maintenance, and without feeling institutional. We chose robust materials and straightforward construction, and designed details that age well, so that the schools stay good places to learn long after they first open.

Designing three schools under one name let us develop a consistent approach while responding to the conditions of each site. The schools share a common architectural language and a common set of principles — daylight, ventilation, efficient planning and durable construction — but each is shaped by its own site, neighbourhood and number of students. The Kengeri school makes the most of a very small plot; the Sarjapur campus has room for more generous open space; the HRBR Layout school balances the two.

Each school was also built to the norms of its board: the Kengeri school to those of the Council for the Indian School Certificate Examinations, and the HRBR Layout and Sarjapur schools to those of the Central Board of Secondary Education. Meeting those requirements, from minimum classroom sizes to dedicated laboratories and a library, on sites this compact is a large part of what made the planning so demanding.

Schools like these play a vital role in a growing city. They serve large and diverse communities of families, and they shape the daily experience of thousands of children. For us, designing them matters as much as designing any landmark. The SJR schools show that good architecture does not depend on a generous site or a lavish budget. With careful planning and clear priorities, even a dense urban school can give its students daylight, fresh air, room to play and a building they can be proud of.`,
    stats: [{ label: 'Site area', value: 'Various' }, { label: 'Built-up area', value: 'Various' }, { label: 'Capacity', value: 'Various' }] },
  { slug: 'national-public-school-', name: 'National Public School, Jalahalli', location: 'Bangalore, Karnataka', year: 2020, category: 'Education', sketch: 'courtyard',
    brief: "An understated CBSE school on a two-acre city site, organised vertically around clear circulation and daylit classrooms.",
    overview: `National Public School in Jalahalli, in north-west Bangalore, is a compact city school designed for 1,200 students. Its two-acre site holds a built-up area of around two lakh square feet — a far higher density than most of our campuses, and one that shaped every decision in the design.

The brief was clear from the start. The school was to be functional and understated, with a firm emphasis on academic excellence. Some of our schools are built around alternative or experimental models of learning — Montessori classrooms, incidental learning, open-ended exploration. This one was not. The client wanted a building that would support a rigorous, focused academic programme, and the architecture needed to serve that purpose directly, without distraction. The school has since come under the management of the NPS Group of Institutions, known for their strong academic focus — a natural fit for the building.

Designing an understated building is not the same as designing a plain one. Restraint has its own discipline. Without expressive gestures to rely on, the quality of a building depends entirely on getting the fundamentals right: planning, light, air and proportion. These are the things that make a school a good place to learn day after day, and they were our focus throughout.

The school was built to CBSE's affiliation norms, with classrooms of at least 500 square feet, dedicated laboratories and a library. Fitting a full CBSE senior secondary programme, with everything the board requires, onto a two-acre city site was the central planning challenge of the project, and it shaped the building's vertical organisation.

The density of the site demanded careful planning. With two lakh square feet on two acres, the school is necessarily vertical, with academic spaces stacked over several floors. We organised the building so that this arrangement stays easy to understand and move through. Staircases and circulation are clear and generous, allowing 1,200 students to move between floors at the change of periods without congestion, and each floor is laid out so that students and teachers find their way intuitively.

Daylight and ventilation were central priorities. On a compact site, classrooms can easily end up deep, dark and dependent on artificial light. We planned the building so that classrooms receive good natural light and cross-ventilation, making calm, comfortable rooms that support concentration. In Bangalore's climate, a well-ventilated classroom stays comfortable for most of the year without mechanical cooling, keeping running costs down and the learning environment healthy.

Open space is precious on a site like this, and we made the most of it. By building compactly, we freed as much ground as possible for outdoor areas where students can gather, play sport and spend breaks in the open air. Shared spaces within the building — for assembly, activities and the library — give the school community room to come together.

The materials and detailing follow the same understated approach. Finishes were chosen to be durable, practical and easy to maintain, suited to a building used intensively every day. The architecture does not call attention to itself; it provides a quiet, ordered backdrop to the life of the school.

National Public School, Jalahalli, is a reminder that not every school needs to be a statement. Sometimes the best answer to a brief is a building that does its job exceptionally well — clear in its planning, comfortable in its rooms and focused on the needs of students and teachers. On a compact urban site with a clear academic mission, that kind of disciplined, understated architecture is exactly what the school required.`,
    stats: [{ label: 'Site area', value: '2 acres' }, { label: 'Built-up area', value: '2,00,000 sft' }, { label: 'Capacity', value: '1200' }] },
  { slug: 'good-shepherds-intl.-school-revitalisation', name: 'Good Shepherd’s International School', location: 'Ooty, Tamil Nadu', year: 2023, category: 'Revitalisation', sketch: 'pitched',
    brief: "A child-centred revitalisation of a 180-acre residential school in the Nilgiris: new dormitory, dining and library interiors, and inclusive signage.",
    overview: `Good Shepherd International School in Ooty is one of India's premier residential schools. Its 180-acre campus in the Nilgiris holds a wide range of buildings and facilities for students and staff — more than 1,50,000 square feet of built space serving a community of around 850 students. Founded in 1977, the school spans two campuses: Fernhill, built around the former summer palace of the Maharaja of Baroda, for its youngest students, and Palada for the middle and senior school. When the school approached us, it was not to build a new campus but to rethink an existing one: to reimagine its spaces — its interiors and its signage — with a more child-centric approach.

Revitalisation is a different kind of architectural work. On a new campus, the architect starts with an empty site. On an established one, every decision begins with what is already there: buildings with their own histories, routines developed over decades, and a community deeply attached to the place. Our task was to understand the campus as it was, identify what was working and what was not, and make changes that improve life for students and staff without losing the character that makes the school what it is.

We began by looking at the campus through the eyes of its students. A child-centric approach means asking how children actually experience a place: how they find their way, where they gather, where they feel at ease and where they feel lost, which spaces they love and which they avoid. On a 180-acre site spread across hilly terrain, those questions matter a great deal. A campus that is easy for adults to navigate can still be confusing and intimidating for a young child.

Interiors came first. Many of the school's spaces had been designed for function rather than for children. We redesigned the dormitories, the dining halls and the library to make them brighter, warmer and better suited to how children learn and live. In a residential school, interiors matter more than usual: these are the spaces where students spend their evenings, make friends and find a sense of home far from their families. In Ooty's cool climate, warmth and comfort indoors are especially important.

Signage came second. Wayfinding is often overlooked, but on a large campus it shapes how confidently children move around. We developed a new signage system for the school, designed to be clear, legible and friendly, so that students — especially new and younger ones — can find their way without anxiety. Good signage also strengthens a school's identity, giving the campus a consistent visual language.

Coming soon after the National Education Policy 2020, the work reflects the policy's focus on the wellbeing of the learner and on joyful, engaging places to learn. The new wayfinding in particular was designed to be inclusive, easy for every child to read and use, in keeping with the policy's emphasis on inclusion.

The work was carried out over two years, with spaces across the campus redesigned in turn. Working within a functioning school requires careful phasing, so that changes can be made without disrupting the daily life of students and staff. We worked closely with the school throughout, fitting the programme around its calendar and priorities.

Good Shepherd reflects a growing part of our practice: the revitalisation of existing campuses. Many of India's established schools have strong foundations but spaces that no longer meet the needs of today's students. With careful, child-centred design, these campuses can be renewed — preserving what makes them special while giving their students the environment they deserve.`,
    stats: [{ label: 'Site area', value: '180 acres' }, { label: 'Built-up area', value: '>1,50,000 sft' }, { label: 'Capacity', value: '850' }] },
];

// The complete chronological record — every project, drawn from the office archive.
// A typographic index on the home page; no detail pages or imagery required.
// `year` is the numeric sort key; `yearLabel` is what shows (ranges, "ongoing").
// `slug` links a row to its project page, where one exists.
export const projectIndex = [
  { slug: 'mallya-aditi-international-school', name: 'The Mallya Aditi School',                 year: 1991, yearLabel: '1991',          location: 'Bangalore',           category: 'Education' },
  { slug: 'kanteerva-outdoor-stadium', name: 'Sree Kanteerava Outdoor Stadium',         year: 1997, yearLabel: '1997',          location: 'Bangalore',           category: 'Sport' },
  { name: '16 World Bank Hospitals',                 year: 1997, yearLabel: '1997–98',       location: 'Across Karnataka',    category: 'Healthcare' },
  { name: 'National Cricket Academy',                year: 2000, yearLabel: '2000',          location: 'Bangalore',           category: 'Sport' },
  { slug: 'anthem-biosciences-campus', name: 'Anthem Biosciences',                      year: 2001, yearLabel: '2001',          location: 'Bangalore',           category: 'Campus' },
  { name: 'Commercial Complex, Koramangala',         year: 2002, yearLabel: '2002',          location: 'Bangalore',           category: 'Commercial' },
  { slug: 'canadian-international-school', name: 'The Canadian International School',       year: 2004, yearLabel: '2004',          location: 'Bangalore',           category: 'Education' },
  { slug: "sri-kumarans-children's-home", name: 'Sri Kumarans Children’s Home',            year: 2006, yearLabel: '2006',          location: 'Bangalore',           category: 'Education' },
  { slug: 'sjr-public-schools', name: 'SJR Public Schools — Three Campuses',              year: 2006, yearLabel: '2006–2010',     location: 'HBR Layout · Kengeri · Sarjapur', category: 'Education' },
  { name: 'Kumudvati Residential School',            year: 2006, yearLabel: '2006',          location: 'Shikaripura',         category: 'Education' },
  { slug: 'pes-group-of-institutions', name: 'PES Engineering College & Residential School', year: 2006, yearLabel: '2006',     location: 'Shivamogga',          category: 'Campus' },
  { slug: 'amaatra-academy', name: 'Amaatra Academy',                         year: 2008, yearLabel: '2008',          location: 'Bangalore',           category: 'Education' },
  { name: 'Chittoor Residential School, PES Institutions', year: 2009, yearLabel: '2009',     location: 'Chittoor',            category: 'Education' },
  { name: 'Sahyadri Engineering College',            year: 2010, yearLabel: '2010',          location: 'Mangalore',           category: 'Campus' },
  { slug: 'the-cathedral-vidya-school', name: 'The Cathedral Vidya School',                  year: 2010, yearLabel: '2010',          location: 'Lonavala',            category: 'Education' },
  { name: 'ARRS Residential School',                 year: 2011, yearLabel: '2011',          location: 'Salem',               category: 'Education' },
  { slug: 'dempo-football-academy', name: 'Dempo Football Academy',                  year: 2011, yearLabel: '2011',          location: 'Goa',                 category: 'Sport' },
  { name: 'Krissar Academy',                         year: 2015, yearLabel: '2015',          location: 'Arani, Tamil Nadu',   category: 'Education' },
  { name: 'Takshashila School',                      year: 2015, yearLabel: '2015',          location: 'Veloor',              category: 'Education' },
  { slug: 'tejas-international-school', name: 'Tejas International Residential School',  year: 2015, yearLabel: '2015',          location: 'Bagalkote',           category: 'Education' },
  { name: 'Hill Rock Academy',                       year: 2016, yearLabel: '2016',          location: 'Bangalore',           category: 'Education' },
  { name: 'Global World Academy',                    year: 2016, yearLabel: '2016',          location: 'Bangalore',           category: 'Education' },
  { slug: 'united-world-academy', name: 'United World Academy', year: 2018, yearLabel: '2018', location: 'Bangalore', category: 'Education' },
  { slug: 'valiants-academy', name: 'Valiants Academy', year: 2019, yearLabel: '2019', location: 'Kengeri, Bangalore', category: 'Education' },
  { slug: 'wisdom-tree-global-school', name: 'Wisdom Tree Global School',               year: 2019, yearLabel: '2019',          location: 'Bhubaneswar',         category: 'Education' },
  { name: 'Football Academy, Muthoot Group',         year: 2020, yearLabel: '2020 – ongoing', location: 'Palakkad',           category: 'Sport' },
  { slug: 'national-public-school-', name: 'NPS Jalahalli',                           year: 2020, yearLabel: '2020',          location: 'Bangalore',           category: 'Education' },
  { name: 'NPS Jakkur',                              year: 2022, yearLabel: '2022',          location: 'Bangalore',           category: 'Education' },
  { name: 'NPS Banashankari — Extensions & New Block', year: 2022, yearLabel: '2022',         location: 'Bangalore',           category: 'Education' },
  { slug: 'good-shepherds-intl.-school-revitalisation', name: 'Good Shepherd International School — Interiors, Artwork & Signage', year: 2023, yearLabel: '2023', location: 'Ooty', category: 'Interiors' },
  { name: 'Mother Theresa Public School',            year: 2020, yearLabel: '2020 – ongoing', location: 'Bangalore',          category: 'Education' }
];

// State for each `projectIndex` location, for the "where we've built" page.
// A location missing here is listed under "Elsewhere in India" — Veloor is
// left out on purpose until the office confirms which Veloor it is.
export const placeStates = {
  'Bangalore': 'Karnataka', 'Kengeri, Bangalore': 'Karnataka', 'HBR Layout · Kengeri · Sarjapur': 'Karnataka',
  'Across Karnataka': 'Karnataka', 'Shikaripura': 'Karnataka', 'Shivamogga': 'Karnataka',
  'Mangalore': 'Karnataka', 'Bagalkote': 'Karnataka',
  'Salem': 'Tamil Nadu', 'Arani, Tamil Nadu': 'Tamil Nadu', 'Ooty': 'Tamil Nadu',
  'Chittoor': 'Andhra Pradesh', 'Lonavala': 'Maharashtra', 'Goa': 'Goa',
  'Bhubaneswar': 'Odisha', 'Palakkad': 'Kerala'
};

// Landing pages by type of school, worded the way school trustees search
// (from blind searches run as trustees, Nov 2026). `rows` are projectIndex
// names; only list a project where the site already says it is that type.
// `intro` must stay factual; the writer can replace it with fuller copy.
export const schoolTypes = [
  { slug: 'residential-school-architects',
    h1: 'Residential & boarding', h1em: 'school architects.',
    title: 'Residential & Boarding School Architects in India',
    nav: 'Residential & boarding schools',
    description: 'Architects for residential and boarding schools: academic blocks, hostels, staff housing and sport on one campus. Boarding schools in Karnataka, Tamil Nadu, Andhra Pradesh and Maharashtra by Kumar & Swamy Architects, Bangalore.',
    intro: 'A boarding school is a small town: classrooms, hostels, dining, staff housing, sport and a day that runs from morning study to lights out. We have designed residential schools for more than twenty years, for schools teaching the IB, the Canadian curriculum and others, on campuses of up to 50 acres.',
    rows: ['The Canadian International School', 'Amaatra Academy', 'The Cathedral Vidya School', 'Tejas International Residential School', 'Kumudvati Residential School', 'PES Engineering College & Residential School', 'Chittoor Residential School, PES Institutions', 'ARRS Residential School', 'Good Shepherd International School — Interiors, Artwork & Signage'] },
  { slug: 'international-school-architects',
    h1: 'International & IB', h1em: 'school architects.',
    title: 'International & IB School Architects in Bangalore',
    nav: 'International & IB schools',
    description: 'Architects for international and IB schools in Bangalore and across India, from Mallya Aditi International School (one of Bangalore’s first) to United World Academy and Vidya Cathedral School.',
    intro: 'Our first school, Mallya Aditi International School, was one of Bangalore’s first international schools. Since then we have designed international schools teaching the IB, the Canadian curriculum and other international programmes, planned around how each one teaches.',
    rows: ['The Mallya Aditi School', 'The Canadian International School', 'United World Academy', 'The Cathedral Vidya School', 'Good Shepherd International School — Interiors, Artwork & Signage'] },
  { slug: 'school-campus-master-planning',
    h1: 'School campus', h1em: 'master planning.',
    title: 'School Campus Master Planning — Architects in Bangalore',
    nav: 'Campus master planning',
    description: 'School and education campus master planning by Kumar & Swamy Architects: campuses of 10 to 200 acres, planned in phases, with schools, colleges, hostels and sport.',
    intro: 'Large school campuses are built over years, not at once. We plan the whole site first, then each phase so it works on its own while the campus grows: academic blocks, hostels, sport, landscape and the roads between them.',
    minAcres: 10, rows: ['Sahyadri Engineering College'] },
  { slug: 'school-extension-renovation-architects',
    h1: 'School extensions', h1em: '& renovation.',
    title: 'School Extension & Renovation Architects in Bangalore',
    nav: 'Extensions & renovation',
    description: 'Architects for school extensions, new academic blocks and renovation in Bangalore and beyond: new blocks, upgrades and campus-wide redesigns for schools that are already running.',
    intro: 'Most schools grow on a site that is already in use. Our extension and renovation work includes a new extension at Mallya Aditi thirty years after the original, extensions and a new block at NPS Banashankari, and a two-year redesign of Good Shepherd International School in Ooty.',
    posts: ['reinterpreting-our-very-first-school', 'the-case-for-adaptive-reuse-in-india'],
    rows: ['The Mallya Aditi School', 'NPS Banashankari — Extensions & New Block', 'Good Shepherd International School — Interiors, Artwork & Signage'] },
];

// Capability keywords shown under the hero title (also strong SEO signals).
export const specialties = [
  'Institutional architecture', 'Schools & campuses', 'Masterplanning',
  'Infrastructure', 'Healthcare', 'Sports facilities', 'Residences',
  'Resorts & hospitality', 'Interiors', 'Product design'
];

// `name`/`blurb` power the compact "Eight briefs" summary + Organization
// makesOffer JSON-LD. `id`/`tag`/`seo`/`body`/`covers`/`projects` additionally
// drive the dedicated /services page (one keyword-headed section per sector).
export const services = [
  {
    n: '01', id: 'institutional-campus', tag: 'Education & Campus',
    name: 'Institutional & Campus Design', seo: 'School & Institutional Architecture',
    blurb: 'Schools, universities and civic institutions — from a single block to a full multi-phase campus masterplan.',
    body: 'Five decades of schools, colleges and civic institutions across India — from a single teaching block to a full multi-phase campus masterplan. We design learning environments that hold an institution’s values in built form, planned for growth, climate and the rhythm of daily life.',
    covers: ['Schools & K–12 campuses', 'Colleges & universities', 'Civic & cultural institutions', 'Campus masterplans'],
    projects: ['amaatra-academy', 'canadian-international-school', 'mallya-aditi-international-school', 'national-public-school-']
  },
  {
    n: '02', id: 'masterplanning', tag: 'Campus & Urban',
    name: 'Masterplanning', seo: 'Campus & Institutional Masterplanning',
    blurb: 'Long-horizon planning that anticipates growth, climate and culture. We think in decades, not quarters.',
    body: 'Long-horizon planning that anticipates growth, movement, climate and culture. We phase large campuses so each stage stands complete on its own while building toward the whole — thinking in decades, not quarters.',
    covers: ['Campus masterplans', 'Phasing & growth strategy', 'Site & landscape planning', 'Feasibility studies'],
    projects: ['pes-group-of-institutions', 'united-world-academy', 'anthem-biosciences-campus']
  },
  {
    n: '03', id: 'infrastructure', tag: 'Civic & Public',
    name: 'Infrastructure', seo: 'Civic & Public Infrastructure',
    blurb: 'Civic and public infrastructure designed for the scale, movement and pace of a growing city.',
    body: 'Public buildings and civic infrastructure designed for the scale, movement and pace of a growing city — built to serve large numbers of people durably, safely and legibly.',
    covers: ['Civic & public buildings', 'Public amenities', 'Large-span structures', 'Transport-adjacent facilities'],
    projects: ['kanteerva-outdoor-stadium']
  },
  {
    n: '04', id: 'sports-facilities', tag: 'Sport',
    name: 'Sports Facilities', seo: 'Sports & Stadium Architecture',
    blurb: 'Stadiums, academies and training facilities — designed for athletes, spectators and the city alike.',
    body: 'Stadiums, academies and training facilities designed for athletes, spectators and the city alike — from field-of-play geometry and sightlines to the crowd flows that make an event work.',
    covers: ['Stadiums & arenas', 'Sports academies', 'Training & practice facilities', 'Pavilions & clubhouses'],
    projects: ['kanteerva-outdoor-stadium', 'dempo-football-academy']
  },
  {
    n: '05', id: 'healthcare', tag: 'Health & Life Sciences',
    name: 'Healthcare', seo: 'Healthcare & Life-Sciences Architecture',
    blurb: 'Hospitals and clinical interiors where clarity, calm and operational efficiency share the brief equally.',
    body: 'Hospitals, clinical interiors and research campuses where clarity, calm and operational efficiency share the brief equally — environments that support both care and the people who deliver it.',
    covers: ['Hospitals & clinics', 'Clinical & diagnostic interiors', 'Life-sciences & lab campuses', 'Wellness facilities'],
    projects: ['anthem-biosciences-campus']
  },
  {
    n: '06', id: 'residential-hospitality', tag: 'Homes & Resorts',
    name: 'Residential & Hospitality', seo: 'Residential & Resort Architecture',
    blurb: 'Homes, resorts and hospitality that balance comfort, place and craft over the long life of a building.',
    body: 'Homes, resorts and hospitality that balance comfort, place and craft over the long life of a building — private residences and getaways shaped by climate, landscape and the way people actually live.',
    covers: ['Private residences', 'Villas & farmhouses', 'Resorts & hospitality', 'Landscape & site design'],
    projects: []
  },
  {
    n: '07', id: 'interiors', tag: 'Interior Design',
    name: 'Interiors', seo: 'Interior Design & Fit-Out',
    blurb: 'The inside of a building: libraries, classrooms, workplaces and public rooms tuned for real daily use.',
    body: 'The inside of a building: libraries, classrooms, workplaces and public rooms tuned for real daily use. We carry a project’s ideas indoors — materials, light and detail working with the architecture, not against it.',
    covers: ['Education & workplace interiors', 'Libraries & labs', 'Public & common rooms', 'Furniture & fit-out'],
    projects: ['good-shepherds-intl.-school-revitalisation']
  },
  {
    n: '08', id: 'product-design', tag: 'Product & Objects',
    name: 'Product Design', seo: 'Product & Furniture Design',
    blurb: 'Furniture, fittings and bespoke elements — down to the details that carry the identity of a place.',
    body: 'Furniture, fittings and bespoke elements — down to the details that carry the identity of a place. We design objects at the scale of the hand with the same rigour we bring to buildings.',
    covers: ['Furniture & seating', 'Lighting & fittings', 'Signage & wayfinding', 'Bespoke joinery'],
    projects: []
  }
];

export const founder = {
  name: 'C R Shivakumar',
  body: [
    'C R Shivakumar was born in 1938 in Bangalore. After studying civil engineering at Central College Bangalore — one of India’s oldest colleges — he established Kumar and Swamy in 1969, one of Bangalore’s oldest architecture practices, which grew from a civil-engineering outfit into an architecture and design house.',
    'A remarkable human being with an indomitable passion for life, he was an avid reader and traveller who explored South India, parts of North India, and Europe. He married Uma Shivakumar, a renowned personality of the Kannada theatre and film industry. A patron of music, dance, drama and writing, he held a deep love for nature and for Bangalore — values he instilled in his family.'
  ]
};

// Partners. Each gets a profile page at /<slug> (the old Wix team URLs, kept for
// their search history). `name` is the one spelling used everywhere on the site;
// `alternateName` lists other spellings people search for, so search engines
// treat them as the same person. `photo` is the file in assets/img/team/.
//
// Fields to fill in (profile pages render whatever is present):
//   summary  one sentence: who they are, their role, what they focus on
//   bio      paragraphs, 250–400 words in all (see the writing guide in the PR)
//   focus    short list of specialisms, e.g. ['School design', 'Campus masterplanning']
//   education / memberships / recognition   short lists of plain strings
//   links    { website, linkedin, instagram, archello } — full URLs
// Project credits come from `team` on each project; journal posts from `author`.
export const team = [
  { slug: 'sanchaliharsha', name: 'Sanchali Harsha', role: 'Partner', photo: 'sanchali-harsha',
    alternateName: [],
    summary: '', bio: [], focus: [], education: [], memberships: [], recognition: [], links: {} },
  { slug: 'paromitaharsha', name: 'Paromita Harsha', role: 'Partner', photo: 'paromita-harsha',
    alternateName: [],
    summary: '', bio: [], focus: [], education: [], memberships: [], recognition: [], links: {} },
  { slug: 'harshashivakumar', name: 'C. S. Harsha', role: 'Partner', photo: 'harsha-shivakumar',
    alternateName: ['Harsha Shivakumar', 'C S Harsha', 'C.S. Harsha', 'CS Harsha'],
    summary: '', bio: [], focus: [], education: [], memberships: [], recognition: [], links: {} },
  { slug: 'suchitraharsha', name: 'Suchitra Harsha', role: 'Partner', photo: 'suchitra-harsha',
    alternateName: [],
    summary: '', bio: [], focus: [], education: [], memberships: [], recognition: [], links: {} }
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
  { slug: 'the-case-for-adaptive-reuse-in-india', file: 'the-case-for-adaptive-reuse-in-india.md',
    title: 'The Case for Adaptive Reuse in India',
    author: 'Paromita Harsha', date: 'Nov 1, 2026', readTime: '5 min read', sketch: 'linear',
    excerpt: 'Most of the buildings India will have in 2070 do not exist yet. Why the greenest square metre is usually the one already standing, and how we approach reuse on schools and campuses.' },
  { slug: 'learning-architecture', file: 'learning-architecture.md',
    title: 'Learning Architecture',
    author: 'C. S. Harsha', date: 'Sep 30, 2026', readTime: '4 min read', sketch: 'courtyard', heroFull: true, heroPos: '85% 78%',
    excerpt: 'Should architecture schools start with engineering drawing, or with people? A case for spending the first years on the human mind and its relationship with space.' },
  { slug: 'london-is-a-collision', file: 'london-is-a-collision.md',
    title: 'London Is a Collision',
    author: 'Suchitra Harsha', date: 'Sep 8, 2026', readTime: '10 min read', sketch: 'tower',
    excerpt: 'Three weeks in a city I had written off. Windows, facades and interiors, and why the master plan is a myth: a city lives and dies in its joints and details.' },
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
  'the-case-for-adaptive-reuse-in-india': 'reuse first,\ndemolish\nlast',
  'learning-architecture': 'can’t be\ntaught —\nonly learned',
  'london-is-a-collision': 'the truth is\nin the joints',
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
