// Centralized mock data for Zelvora Industry Labs
export const BRAND = {
  name: 'Zelvora Industry Labs',
  parent: 'Zelvora Technologies Pvt. Ltd.',
  logo: '/logo.png',
  colors: { cyan: '#00E5FF', purple: '#7C3AED', green: '#00FFA3' }
};

export const CONTACT = {
  email: 'info@zelvoratech.com',
  supportEmail: 'info@zelvoratech.com',
  phone: '+91 9100040993',
  phoneRaw: '9100040993',
  address: 'Hyderabad, Telangana, India',
  hours: 'Mon – Sat, 9:00 AM – 6:00 PM IST',
  website: 'https://zelvoratech.com'
};

export const FAQS = [
  { q: 'What is Zelvora Industry Labs?', a: 'Zelvora Industry Labs is an industry-grade learning platform by Zelvora Technologies. We help students and early-career professionals build real-world projects, earn verifiable digital credentials, and become job-ready — not through passive courses, but through hands-on work with mentor reviews.' },
  { q: 'How is this different from a regular internship?', a: 'Unlike traditional internships where work may be limited or unverified, Zelvora gives you structured project roadmaps, weekly mentor feedback, rubric-based reviews, and credentials that recruiters can verify online via QR code or credential ID.' },
  { q: 'Who can join Zelvora Industry Labs?', a: 'Any student, fresher, or career switcher who wants to build a portfolio of real projects. No prior industry experience is required — tracks range from beginner to advanced across AI/ML, Full Stack, Data Science, Cyber Security, Cloud, and Generative AI.' },
  { q: 'How do I get started?', a: 'Create a free account, browse the project marketplace, pick a track that matches your goals, and start your first guided project. Your dashboard tracks progress, submissions, and earned badges.' },
  { q: 'Are the credentials verifiable?', a: 'Yes. Every credential has a unique ID (e.g. ZV-2026-AM-0421), a public verification page, and a QR code. Recruiters and employers can verify authenticity instantly on our Verify page — no login required.' },
  { q: 'What tracks are available?', a: 'We offer six industry tracks: AI & ML, Full Stack, Data Science, Cyber Security, Cloud Computing, and Generative AI. Each track includes 12+ projects, weekly milestones, mentor reviews, and a capstone project.' },
  { q: 'Do I get mentor support?', a: 'Yes. Every project submission is reviewed by industry mentors who provide detailed code feedback, rubric scores, and improvement suggestions. Top performers can earn mentor endorsements on their credentials.' },
  { q: 'How much does it cost?', a: 'We offer free starter projects and premium tracks for full access to mentor reviews, credentials, and capstone projects. Visit the Projects page or contact us for more information.' },
  { q: 'Can I share credentials on LinkedIn?', a: 'Absolutely. Each credential includes a one-click LinkedIn share option and a downloadable PDF certificate. Verified badges appear on your public Zelvora profile.' },
  { q: 'How do I contact support?', a: 'Reach us at info@zelvoratech.com. You can also use the contact form on our Contact page.' }
];

export const STATS = [
  { label: 'Active Students', value: '12,480+' },
  { label: 'Projects Shipped', value: '38,210' },
  { label: 'Credentials Issued', value: '74,950' },
  { label: 'Industry Mentors', value: '320+' }
];

export const TRACKS = [
  { id: 'aiml', name: 'AI & ML', color: '#00E5FF', icon: 'BrainCircuit', desc: 'Build production ML systems with real datasets.' },
  { id: 'fullstack', name: 'Full Stack', color: '#7C3AED', icon: 'Layers', desc: 'Ship apps end-to-end with modern stacks.' },
  { id: 'data', name: 'Data Science', color: '#00FFA3', icon: 'BarChart3', desc: 'Turn data into decisions and dashboards.' },
  { id: 'cyber', name: 'Cyber Security', color: '#F472B6', icon: 'ShieldCheck', desc: 'Defensive and offensive security projects.' },
  { id: 'cloud', name: 'Cloud Computing', color: '#FBBF24', icon: 'Cloud', desc: 'Deploy and scale on AWS, GCP, Azure.' },
  { id: 'genai', name: 'Generative AI', color: '#A78BFA', icon: 'Sparkles', desc: 'Build with LLMs, RAG, agents and tools.' }
];

export const PROJECTS = [
  { id: 'p1', title: 'Real-Time Fraud Detection', track: 'aiml', difficulty: 'Advanced', duration: '6 weeks', skills: ['Python','XGBoost','Kafka','Streamlit'], outcomes: ['Build ML pipeline','Deploy to cloud','Live dashboard'], image: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p2', title: 'SaaS Billing Platform', track: 'fullstack', difficulty: 'Intermediate', duration: '5 weeks', skills: ['React','Node','Stripe','Postgres'], outcomes: ['Auth + RBAC','Subscriptions','Webhooks'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p3', title: 'Retail Sales Analytics', track: 'data', difficulty: 'Beginner', duration: '4 weeks', skills: ['Pandas','SQL','PowerBI'], outcomes: ['ETL pipeline','KPI dashboard','Story telling'], image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p4', title: 'Zero Trust Network Audit', track: 'cyber', difficulty: 'Advanced', duration: '7 weeks', skills: ['Kali','Burp','OWASP','Wireshark'], outcomes: ['Threat model','Pen test report','Hardening plan'], image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p5', title: 'Multi-Region K8s Deployment', track: 'cloud', difficulty: 'Advanced', duration: '6 weeks', skills: ['AWS','Kubernetes','Terraform','GitOps'], outcomes: ['IaC','Auto-scaling','Observability'], image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p6', title: 'RAG Research Assistant', track: 'genai', difficulty: 'Intermediate', duration: '5 weeks', skills: ['LangChain','Pinecone','OpenAI','FastAPI'], outcomes: ['Vector store','Agent tools','Eval harness'], image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p7', title: 'Computer Vision Quality Inspector', track: 'aiml', difficulty: 'Intermediate', duration: '5 weeks', skills: ['PyTorch','YOLO','Edge'], outcomes: ['Dataset curation','Model training','Edge deploy'], image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p8', title: 'Real-Time Chat with Presence', track: 'fullstack', difficulty: 'Beginner', duration: '3 weeks', skills: ['React','Socket.io','Redis'], outcomes: ['WebSockets','Scaling','Auth'], image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' },
  { id: 'p9', title: 'Generative Art Studio', track: 'genai', difficulty: 'Beginner', duration: '3 weeks', skills: ['Diffusers','Next.js','S3'], outcomes: ['Prompt engineering','UI/UX','Gallery'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200' }
];

export const BADGES = [
  { id: 'b1', name: 'Project Explorer', tier: 'bronze', color: '#CD7F32', desc: 'Completed your first guided project.', criteria: 'Submit 1 project' },
  { id: 'b2', name: 'Active Contributor', tier: 'silver', color: '#C0C0C0', desc: 'Consistently shipping work and reviews.', criteria: 'Submit 3 projects + 2 peer reviews' },
  { id: 'b3', name: 'Project Builder', tier: 'gold', color: '#FFD700', desc: 'Built and shipped multiple real-world projects.', criteria: 'Submit 5 projects' },
  { id: 'b4', name: 'Industry Ready', tier: 'platinum', color: '#00E5FF', desc: 'Demonstrated production-grade skills.', criteria: 'Complete a track + capstone' },
  { id: 'b5', name: 'Excellence Award', tier: 'diamond', color: '#7C3AED', desc: 'Top 1% on track with mentor endorsement.', criteria: 'Top leaderboard + mentor review' }
];

export const LEADERS = [
  { rank: 1, name: 'Aarav Mehta', track: 'AI & ML', xp: 9820, projects: 12, country: 'IN', avatar: 'https://i.pravatar.cc/120?img=15' },
  { rank: 2, name: 'Sofia Romero', track: 'Full Stack', xp: 9410, projects: 11, country: 'ES', avatar: 'https://i.pravatar.cc/120?img=47' },
  { rank: 3, name: 'Kenji Watanabe', track: 'Generative AI', xp: 9180, projects: 10, country: 'JP', avatar: 'https://i.pravatar.cc/120?img=33' },
  { rank: 4, name: 'Priya Sharma', track: 'Data Science', xp: 8900, projects: 10, country: 'IN', avatar: 'https://i.pravatar.cc/120?img=49' },
  { rank: 5, name: 'Liam O\'Connor', track: 'Cloud', xp: 8720, projects: 9, country: 'IE', avatar: 'https://i.pravatar.cc/120?img=12' },
  { rank: 6, name: 'Nora Hassan', track: 'Cyber Security', xp: 8540, projects: 9, country: 'EG', avatar: 'https://i.pravatar.cc/120?img=45' },
  { rank: 7, name: 'Diego Alvarez', track: 'Full Stack', xp: 8420, projects: 9, country: 'MX', avatar: 'https://i.pravatar.cc/120?img=68' },
  { rank: 8, name: 'Mei Lin', track: 'AI & ML', xp: 8210, projects: 8, country: 'SG', avatar: 'https://i.pravatar.cc/120?img=20' },
  { rank: 9, name: 'Ahmed Khalil', track: 'Cloud', xp: 7990, projects: 8, country: 'AE', avatar: 'https://i.pravatar.cc/120?img=53' },
  { rank: 10, name: 'Hannah Becker', track: 'Data Science', xp: 7820, projects: 7, country: 'DE', avatar: 'https://i.pravatar.cc/120?img=44' }
];

export const TESTIMONIALS = [
  { quote: 'Zelvora turned my portfolio into proof of work. Got hired before graduation.', name: 'Aarav M.', role: 'ML Engineer @ Fintech' },
  { quote: 'The certificate verification is what makes recruiters take it seriously.', name: 'Sofia R.', role: 'Full Stack Dev @ SaaS' },
  { quote: 'Real reviews, real projects, real growth. No fluff.', name: 'Kenji W.', role: 'GenAI Engineer' },
  { quote: 'I shipped 7 projects in 4 months. My GitHub finally tells a story.', name: 'Priya S.', role: 'Data Scientist' }
];

export const STUDENT = {
  id: 'stu_28471',
  name: 'Aarav Mehta',
  email: 'aarav@zelvoratech.com',
  avatar: 'https://i.pravatar.cc/120?img=15',
  track: 'AI & ML',
  level: 7,
  xp: 9820,
  xpNext: 12000,
  streakDays: 23,
  attendance: 96,
  joinDate: '2025-04-12',
  badges: ['b1','b2','b3','b4'],
  assignedProjects: [
    { id: 'p1', status: 'In Review', progress: 92, due: '2026-07-12' },
    { id: 'p7', status: 'In Progress', progress: 64, due: '2026-07-20' },
    { id: 'p6', status: 'Submitted', progress: 100, due: '2026-06-28' }
  ],
  achievements: [
    { id: 'a1', title: 'First Place — June Hackathon', date: '2026-06-22' },
    { id: 'a2', title: 'Mentor Endorsement — Vision', date: '2026-06-10' },
    { id: 'a3', title: 'Top 1% — AI/ML Track', date: '2026-05-30' }
  ]
};

export const ADMIN_STATS = [
  { label: 'Pending Reviews', value: 142, delta: '+8%' },
  { label: 'Active Students', value: 12480, delta: '+12%' },
  { label: 'Issued Credentials', value: 74950, delta: '+19%' },
  { label: 'Live Programs', value: 24, delta: '+2' }
];

export const ADMIN_SUBMISSIONS = [
  { id: 'sub_1001', student: 'Aarav Mehta', project: 'Real-Time Fraud Detection', track: 'AI & ML', submitted: '2026-07-04', status: 'Pending' },
  { id: 'sub_1002', student: 'Sofia Romero', project: 'SaaS Billing Platform', track: 'Full Stack', submitted: '2026-07-04', status: 'In Review' },
  { id: 'sub_1003', student: 'Kenji Watanabe', project: 'RAG Research Assistant', track: 'GenAI', submitted: '2026-07-03', status: 'Approved' },
  { id: 'sub_1004', student: 'Priya Sharma', project: 'Retail Sales Analytics', track: 'Data Science', submitted: '2026-07-03', status: 'Pending' },
  { id: 'sub_1005', student: 'Nora Hassan', project: 'Zero Trust Audit', track: 'Cyber Security', submitted: '2026-07-02', status: 'Pending' }
];

// Verifiable credentials database (mock)
export const CREDENTIALS_DB = {
  'ZV-2026-AM-0421': {
    student: 'Aarav Mehta', credential: 'Industry Ready — AI & ML', project: 'Real-Time Fraud Detection',
    issuedAt: '2026-06-30', status: 'Verified', mentor: 'Dr. Vivek Rao'
  },
  'ZV-2026-SR-0388': {
    student: 'Sofia Romero', credential: 'Project Builder — Full Stack', project: 'SaaS Billing Platform',
    issuedAt: '2026-06-18', status: 'Verified', mentor: 'Maya Iyer'
  },
  'ZV-2026-KW-0291': {
    student: 'Kenji Watanabe', credential: 'Excellence Award — Generative AI', project: 'RAG Research Assistant',
    issuedAt: '2026-06-12', status: 'Verified', mentor: 'Prof. L. Chen'
  }
};
