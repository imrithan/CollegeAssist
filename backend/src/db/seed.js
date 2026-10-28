const db = require('./database');
const bcrypt = require('bcryptjs');

console.log('Seeding CollegeAssist database...');

// Clear existing tables
db.exec('DELETE FROM counseling_history;');
db.exec('DELETE FROM profiles;');
db.exec('DELETE FROM users;');
db.exec('DELETE FROM colleges;');

// 1. Seed Demo User
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync('password123', salt);

const insertUser = db.prepare(`
  INSERT INTO users (full_name, email, password_hash)
  VALUES (?, ?, ?)
`);
insertUser.run('Rithan V', 'rithan@example.com', passwordHash);

const user = db.prepare('SELECT id FROM users WHERE email = ?').get('rithan@example.com');
const userId = user.id;

// 2. Seed Student Profile (Matching Figure 12 exactly)
const insertProfile = db.prepare(`
  INSERT INTO profiles (user_id, name, dob, class_12_stream, preferred_location, interests, preferred_degree, academic_score)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
insertProfile.run(
  userId,
  'Rithan V',
  '2006-05-12',
  'Computer Science',
  'Tamil Nadu',
  JSON.stringify(['Computer Science', 'Artificial Intelligence']),
  'B.Tech',
  92
);

// 3. Seed Colleges (32 Indian Colleges & Programmes, including Figure 13 top 3)
const collegesData = [
  // Top 3 matching Figure 13 exactly:
  {
    name: 'IIT Madras',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '95+',
    min_cutoff: 95.0,
    nirf_rank: 1,
    fees: '₹2.1 Lakhs/year',
    placements: 'Average ₹21.4 LPA (Highest ₹1.3 Crore)',
    website: 'https://www.iitm.ac.in',
    logo_type: 'iitm',
    description: 'Premier national institute of technology renowned globally for computer science research, world-class faculty, and incubation ecosystem.'
  },
  {
    name: 'Anna University',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '90+',
    min_cutoff: 90.0,
    nirf_rank: 14,
    fees: '₹55,000/year (Government Quota)',
    placements: 'Average ₹8.5 LPA (Top recruiters: Microsoft, Amazon, Zoho)',
    website: 'https://www.annauniv.edu',
    logo_type: 'anna',
    description: 'Top state technical university offering renowned engineering programs at College of Engineering Guindy (CEG) campus.'
  },
  {
    name: 'Coimbatore Institute of Technology',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Coimbatore, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '85+',
    min_cutoff: 85.0,
    nirf_rank: 102,
    fees: '₹75,000/year',
    placements: 'Average ₹7.2 LPA (Top recruiters: TCS, Infosys, Robert Bosch)',
    website: 'https://www.cit.edu.in',
    logo_type: 'cit',
    description: 'Government-aided autonomous institution established in 1956, known for strong alumni network and core engineering excellence.'
  },
  // Additional Tamil Nadu institutions
  {
    name: 'NIT Tiruchirappalli',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Tiruchirappalli, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '94+',
    min_cutoff: 94.0,
    nirf_rank: 9,
    fees: '₹1.5 Lakhs/year',
    placements: 'Average ₹15.8 LPA',
    website: 'https://www.nitt.edu',
    logo_type: 'nit',
    description: 'Ranked #1 among all NITs in India, offering cutting-edge computing labs and exceptional research facilities.'
  },
  {
    name: 'PSG College of Technology',
    programme: 'B.Tech in Information Technology',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Coimbatore, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '89+',
    min_cutoff: 89.0,
    nirf_rank: 63,
    fees: '₹85,000/year',
    placements: 'Average ₹10.2 LPA',
    website: 'https://www.psgtech.edu',
    logo_type: 'psg',
    description: 'Pioneer in industry-institute collaboration with over 70 years of engineering legacy and strong recruitment records.'
  },
  {
    name: 'Vellore Institute of Technology',
    programme: 'B.Tech in Artificial Intelligence & Data Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Vellore, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '82+',
    min_cutoff: 82.0,
    nirf_rank: 11,
    fees: '₹1.98 Lakhs/year',
    placements: 'Average ₹9.0 LPA',
    website: 'https://vit.ac.in',
    logo_type: 'vit',
    description: 'Consistently ranked among top private engineering universities with modern labs and international exchange tie-ups.'
  },
  {
    name: 'Thiagarajar College of Engineering',
    programme: 'B.Tech in Computer Science and Business Systems',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Madurai, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '86+',
    min_cutoff: 86.0,
    nirf_rank: 85,
    fees: '₹65,000/year',
    placements: 'Average ₹7.5 LPA',
    website: 'https://www.tce.edu',
    logo_type: 'tce',
    description: 'Autonomous government-aided college in Madurai known for quality engineering education and student innovation.'
  },
  {
    name: 'SSN College of Engineering',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '88+',
    min_cutoff: 88.0,
    nirf_rank: 45,
    fees: '₹95,000/year',
    placements: 'Average ₹8.8 LPA',
    website: 'https://www.ssn.edu.in',
    logo_type: 'ssn',
    description: 'Shiv Nadar Foundation institution with scenic campus on OMR Chennai, generous scholarships, and premier faculty.'
  },
  // Karnataka institutions
  {
    name: 'IISc Bangalore',
    programme: 'B.Sc (Research) in Computational Science',
    degree: 'B.Sc',
    stream: 'Computer Science',
    location: 'Bangalore, Karnataka',
    state: 'Karnataka',
    duration: '4 Years',
    cutoff: '98+',
    min_cutoff: 98.0,
    nirf_rank: 1,
    fees: '₹35,000/year',
    placements: 'Average ₹28.0 LPA',
    website: 'https://iisc.ac.in',
    logo_type: 'iisc',
    description: 'India premier research university for pure science, interdisciplinary research, and computational mathematics.'
  },
  {
    name: 'NITK Surathkal',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Mangalore, Karnataka',
    state: 'Karnataka',
    duration: '4 Years',
    cutoff: '94+',
    min_cutoff: 94.0,
    nirf_rank: 12,
    fees: '₹1.5 Lakhs/year',
    placements: 'Average ₹16.5 LPA',
    website: 'https://www.nitk.ac.in',
    logo_type: 'nitk',
    description: 'Features a private Arabian Sea beach, exceptional placement records, and elite alumni across Silicon Valley.'
  },
  {
    name: 'IIIT Bangalore',
    programme: 'Integrated M.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Bangalore, Karnataka',
    state: 'Karnataka',
    duration: '5 Years',
    cutoff: '92+',
    min_cutoff: 92.0,
    nirf_rank: 74,
    fees: '₹2.4 Lakhs/year',
    placements: 'Average ₹24.0 LPA',
    website: 'https://www.iiitb.ac.in',
    logo_type: 'iiitb',
    description: 'Located in Electronics City Bangalore, heavily focused on advanced AI, software architecture, and industry sponsored labs.'
  },
  {
    name: 'RV College of Engineering',
    programme: 'B.E. in Computer Science and Engineering',
    degree: 'B.E.',
    stream: 'Computer Science',
    location: 'Bangalore, Karnataka',
    state: 'Karnataka',
    duration: '4 Years',
    cutoff: '90+',
    min_cutoff: 90.0,
    nirf_rank: 89,
    fees: '₹1.2 Lakhs/year',
    placements: 'Average ₹14.0 LPA',
    website: 'https://www.rvce.edu.in',
    logo_type: 'rvce',
    description: 'Top-tier private engineering college in Bangalore attracting tier-1 tech firms and high funding.'
  },
  // Maharashtra institutions
  {
    name: 'IIT Bombay',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    duration: '4 Years',
    cutoff: '98+',
    min_cutoff: 98.0,
    nirf_rank: 3,
    fees: '₹2.2 Lakhs/year',
    placements: 'Average ₹23.5 LPA',
    website: 'https://www.iitb.ac.in',
    logo_type: 'iitb',
    description: 'Most coveted engineering campus in India with legendary entrepreneurship cell and global alumni network.'
  },
  {
    name: 'COEP Technological University',
    programme: 'B.Tech in Computer Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Pune, Maharashtra',
    state: 'Maharashtra',
    duration: '4 Years',
    cutoff: '92+',
    min_cutoff: 92.0,
    nirf_rank: 73,
    fees: '₹85,000/year',
    placements: 'Average ₹11.2 LPA',
    website: 'https://www.coep.org.in',
    logo_type: 'coep',
    description: 'One of the oldest colleges in Asia (est. 1854) offering prestigious state engineering education.'
  },
  {
    name: 'VJTI Mumbai',
    programme: 'B.Tech in Computer Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    duration: '4 Years',
    cutoff: '91+',
    min_cutoff: 91.0,
    nirf_rank: 82,
    fees: '₹82,000/year',
    placements: 'Average ₹12.5 LPA',
    website: 'https://www.vjti.ac.in',
    logo_type: 'vjti',
    description: 'Veermata Jijabai Technological Institute is Mumbai premier state-funded institution in Matunga.'
  },
  // Delhi NCR
  {
    name: 'IIT Delhi',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi NCR',
    duration: '4 Years',
    cutoff: '98+',
    min_cutoff: 98.0,
    nirf_rank: 2,
    fees: '₹2.2 Lakhs/year',
    placements: 'Average ₹24.2 LPA',
    website: 'https://home.iitd.ac.in',
    logo_type: 'iitd',
    description: 'Pinnacle of technology and innovation in the national capital region with top-tier incubator.'
  },
  {
    name: 'Delhi Technological University (DTU)',
    programme: 'B.Tech in Software Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi NCR',
    duration: '4 Years',
    cutoff: '91+',
    min_cutoff: 91.0,
    nirf_rank: 29,
    fees: '₹1.9 Lakhs/year',
    placements: 'Average ₹15.4 LPA',
    website: 'https://www.dtu.ac.in',
    logo_type: 'dtu',
    description: 'Formerly Delhi College of Engineering (DCE), legendary campus culture and incredible placement packages.'
  },
  {
    name: 'IIIT Delhi',
    programme: 'B.Tech in Computer Science and Artificial Intelligence',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi NCR',
    duration: '4 Years',
    cutoff: '93+',
    min_cutoff: 93.0,
    nirf_rank: 60,
    fees: '₹4.2 Lakhs/year',
    placements: 'Average ₹20.5 LPA',
    website: 'https://www.iiitd.ac.in',
    logo_type: 'iiitd',
    description: 'Specialized state research institute focusing deeply on AI, ML, cyber security, and autonomous systems.'
  },
  // Andhra Pradesh & Telangana
  {
    name: 'IIIT Hyderabad',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Hyderabad, Telangana',
    state: 'Telangana',
    duration: '4 Years',
    cutoff: '97+',
    min_cutoff: 97.0,
    nirf_rank: 55,
    fees: '₹3.6 Lakhs/year',
    placements: 'Average ₹30.0 LPA',
    website: 'https://www.iiit.ac.in',
    logo_type: 'iiith',
    description: 'India top coding school and AI research hub with world-renowned natural language and computer vision labs.'
  },
  {
    name: 'IIT Hyderabad',
    programme: 'B.Tech in Artificial Intelligence',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Sangareddy, Telangana',
    state: 'Telangana',
    duration: '4 Years',
    cutoff: '95+',
    min_cutoff: 95.0,
    nirf_rank: 8,
    fees: '₹2.1 Lakhs/year',
    placements: 'Average ₹20.0 LPA',
    website: 'https://www.iith.ac.in',
    logo_type: 'iith',
    description: 'First institute in India to introduce a dedicated B.Tech in Artificial Intelligence program.'
  },
  {
    name: 'NIT Warangal',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Warangal, Telangana',
    state: 'Telangana',
    duration: '4 Years',
    cutoff: '93+',
    min_cutoff: 93.0,
    nirf_rank: 21,
    fees: '₹1.4 Lakhs/year',
    placements: 'Average ₹17.2 LPA',
    website: 'https://www.nitw.ac.in',
    logo_type: 'nitw',
    description: 'First REC in India, legendary reputation for technical rigor and coding culture.'
  },
  // Rajasthan & North
  {
    name: 'BITS Pilani',
    programme: 'B.E. in Computer Science',
    degree: 'B.E.',
    stream: 'Computer Science',
    location: 'Pilani, Rajasthan',
    state: 'Rajasthan',
    duration: '4 Years',
    cutoff: '94+',
    min_cutoff: 94.0,
    nirf_rank: 20,
    fees: '₹5.4 Lakhs/year',
    placements: 'Average ₹20.5 LPA',
    website: 'https://www.bits-pilani.ac.in',
    logo_type: 'bits',
    description: 'India premier private engineering university with zero attendance policy and massive startup ecosystem.'
  },
  {
    name: 'IIT Roorkee',
    programme: 'B.Tech in Data Science and Artificial Intelligence',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Roorkee, Uttarakhand',
    state: 'Uttarakhand',
    duration: '4 Years',
    cutoff: '95+',
    min_cutoff: 95.0,
    nirf_rank: 5,
    fees: '₹2.1 Lakhs/year',
    placements: 'Average ₹19.8 LPA',
    website: 'https://www.iitr.ac.in',
    logo_type: 'iitr',
    description: 'Oldest technical institution in Asia with state of the art supercomputing clusters.'
  },
  // Additional disciplines & colleges:
  {
    name: 'Loyola College',
    programme: 'B.Sc in Computer Science',
    degree: 'B.Sc',
    stream: 'Computer Science',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '3 Years',
    cutoff: '90+',
    min_cutoff: 90.0,
    nirf_rank: 7,
    fees: '₹48,000/year',
    placements: 'Average ₹5.5 LPA',
    website: 'https://www.loyolacollege.edu',
    logo_type: 'loyola',
    description: 'Premier arts and science college in Chennai with top NIRF ranking and exceptional holistic growth.'
  },
  {
    name: 'Madras Christian College (MCC)',
    programme: 'BCA (Bachelor of Computer Applications)',
    degree: 'BCA',
    stream: 'Computer Science',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '3 Years',
    cutoff: '85+',
    min_cutoff: 85.0,
    nirf_rank: 16,
    fees: '₹52,000/year',
    placements: 'Average ₹4.8 LPA',
    website: 'https://www.mcc.edu.in',
    logo_type: 'mcc',
    description: 'Historic green campus in Tambaram offering modern applied computer science and software courses.'
  },
  {
    name: 'St. Xavier College',
    programme: 'B.Sc in Information Technology',
    degree: 'B.Sc',
    stream: 'Computer Science',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    duration: '3 Years',
    cutoff: '88+',
    min_cutoff: 88.0,
    nirf_rank: 5,
    fees: '₹45,000/year',
    placements: 'Average ₹5.0 LPA',
    website: 'https://xaviers.edu',
    logo_type: 'xavier',
    description: 'Historic gothic architecture and top ranked science programmes in south Mumbai.'
  },
  {
    name: 'IIT Kharagpur',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Kharagpur, West Bengal',
    state: 'West Bengal',
    duration: '4 Years',
    cutoff: '96+',
    min_cutoff: 96.0,
    nirf_rank: 6,
    fees: '₹2.2 Lakhs/year',
    placements: 'Average ₹22.0 LPA',
    website: 'https://www.iitkgp.ac.in',
    logo_type: 'iitkgp',
    description: 'First IIT established in 1951, massive 2,100 acre campus with diverse specialized interdisciplinary schools.'
  },
  {
    name: 'Jadavpur University',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Kolkata, West Bengal',
    state: 'West Bengal',
    duration: '4 Years',
    cutoff: '92+',
    min_cutoff: 92.0,
    nirf_rank: 10,
    fees: '₹2,400/year (Nominal State Fee)',
    placements: 'Average ₹16.0 LPA',
    website: 'http://www.jaduniv.edu.in',
    logo_type: 'ju',
    description: 'World-renowned for unmatched return on investment with near-zero tuition fee and premier alumni.'
  },
  {
    name: 'NIT Calicut',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Kozhikode, Kerala',
    state: 'Kerala',
    duration: '4 Years',
    cutoff: '91+',
    min_cutoff: 91.0,
    nirf_rank: 23,
    fees: '₹1.4 Lakhs/year',
    placements: 'Average ₹14.5 LPA',
    website: 'https://www.nitc.ac.in',
    logo_type: 'nitc',
    description: 'Leading institute of national importance in God own country with top campus placements.'
  },
  {
    name: 'College of Engineering Trivandrum (CET)',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Thiruvananthapuram, Kerala',
    state: 'Kerala',
    duration: '4 Years',
    cutoff: '88+',
    min_cutoff: 88.0,
    nirf_rank: 95,
    fees: '₹25,000/year',
    placements: 'Average ₹8.2 LPA',
    website: 'https://www.cet.ac.in',
    logo_type: 'cet',
    description: 'Oldest engineering college in Kerala, known for academic excellence and tech innovation.'
  },
  {
    name: 'IIT Kanpur',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Kanpur, Uttar Pradesh',
    state: 'Uttar Pradesh',
    duration: '4 Years',
    cutoff: '97+',
    min_cutoff: 97.0,
    nirf_rank: 4,
    fees: '₹2.1 Lakhs/year',
    placements: 'Average ₹23.0 LPA',
    website: 'https://www.iitk.ac.in',
    logo_type: 'iitk',
    description: 'Pioneered computer science education in India in 1963 with the legendary IBM 1620.'
  },
  {
    name: 'SRM Institute of Science and Technology',
    programme: 'B.Tech in Computer Science and Engineering',
    degree: 'B.Tech',
    stream: 'Computer Science',
    location: 'Kattankulathur, Tamil Nadu',
    state: 'Tamil Nadu',
    duration: '4 Years',
    cutoff: '80+',
    min_cutoff: 80.0,
    nirf_rank: 28,
    fees: '₹3.2 Lakhs/year',
    placements: 'Average ₹7.8 LPA',
    website: 'https://www.srmist.edu.in',
    logo_type: 'srm',
    description: 'Massive residential campus with state of the art infrastructure and high volume placements.'
  }
];

const insertCollege = db.prepare(`
  INSERT INTO colleges (name, programme, degree, stream, location, state, duration, cutoff, min_cutoff, nirf_rank, fees, placements, website, logo_type, description)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const c of collegesData) {
  insertCollege.run(
    c.name,
    c.programme,
    c.degree,
    c.stream,
    c.location,
    c.state,
    c.duration,
    c.cutoff,
    c.min_cutoff,
    c.nirf_rank,
    c.fees,
    c.placements,
    c.website,
    c.logo_type,
    c.description
  );
}

// 4. Seed Counseling History (Matching Figure 14 exactly)
const historyData = [
  {
    date_time: '2025-09-20 10:24 AM',
    query: 'Best colleges for computer science in Tamil Nadu',
    response_summary: 'IIT Madras, Anna University, Coimbatore Institute of Technology',
    full_response: 'Based on your interest in Computer Science and your location (Tamil Nadu), here are some top colleges you can consider:\n1. IIT Madras - B.Tech in Computer Science and Engineering\n2. Anna University - B.Tech in Computer Science and Engineering\n3. Coimbatore Institute of Technology - B.Tech in CSE\n\nWould you like more details about admission criteria, fees or placements?',
    source: 'College Database'
  },
  {
    date_time: '2025-09-18 03:12 PM',
    query: 'Courses after 12th for science students',
    response_summary: 'B.Tech, B.Sc, Integrated Programmes',
    full_response: 'Top recommended courses for Class 12 Science graduates:\n• B.Tech / B.E. in specialized computer science, AI, electronics\n• B.Sc (Research) in Computational Science and Data Analytics\n• 5-Year Integrated M.Tech programmes at premier institutes',
    source: 'University Website'
  },
  {
    date_time: '2025-09-15 11:45 AM',
    query: 'Scholarships for engineering students',
    response_summary: 'Merit and Government Scholarships',
    full_response: 'Comprehensive scholarship options include:\n1. Central Sector Scheme of Scholarship for College and University Students\n2. AICTE Pragati Scholarship for Girls\n3. State Government First Graduate Concession (Tamil Nadu)\n4. Institute Merit-cum-Means (MCM) assistance',
    source: 'Government Portal'
  },
  {
    date_time: '2025-09-10 02:30 PM',
    query: 'Career options in AI and ML',
    response_summary: 'Data Scientist, ML Engineer, Researcher',
    full_response: 'Prominent career pathways:\n1. Machine Learning Engineer (median package ₹12-25 LPA)\n2. Applied Data Scientist\n3. AI Research Scientist & NLP Specialist\n4. Computer Vision Architect',
    source: 'Career Portal'
  }
];

const insertHistory = db.prepare(`
  INSERT INTO counseling_history (user_id, date_time, query, response_summary, full_response, source)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const h of historyData) {
  insertHistory.run(userId, h.date_time, h.query, h.response_summary, h.full_response, h.source);
}

console.log('Database seeded successfully:');
console.log('- 1 User created (rithan@example.com / password123)');
console.log('- 1 Profile seeded matching Figure 12');
console.log(`- ${collegesData.length} Colleges seeded`);
console.log(`- ${historyData.length} Counseling History records seeded matching Figure 14`);
