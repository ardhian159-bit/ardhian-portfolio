export const profile = {
  name: 'Ardhian Caesar Hermawan',
  tagline: 'Data & Strategy',
  location: 'Surakarta, Indonesia',
  timezone: 'UTC+7',
  email: 'ardhian159@gmail.com',
  github: 'ardhian159-bit',
  linkedin: 'ardhian-caesar-hermawan-5b18a6157',
  githubUrl: 'https://github.com/ardhian159-bit',
  linkedinUrl: 'https://linkedin.com/in/ardhian-caesar-hermawan-5b18a6157',
}

export const stats = [
  {
    value: 3.85,
    decimals: 2,
    unit: '/4.00',
    label: 'GPA',
    context: 'Cum Laude, Universitas Negeri Malang',
  },
  {
    value: 514,
    decimals: 0,
    unit: '',
    label: 'Districts covered',
    context: 'SIRUP scraper, all 514 kabupaten/kota',
  },
  {
    value: 3,
    decimals: 0,
    unit: '',
    label: 'Internships shipped',
    context: 'Intan Pariwara · Pintar.co · Telkomsel',
  },
  {
    value: 2,
    decimals: 0,
    unit: '',
    label: 'Systems adopted',
    context: 'NSMS + Warehouse Dashboard in production use',
  },
]

export type ImpactVariant = 'adopted' | 'live' | 'proto'

export const projects = [
  {
    id: 'NSMS · 2026',
    slug: 'nsms',
    title: 'National Sales Management System',
    org: 'PT Intan Pariwara',
    division: 'KLDI Division',
    impact: 'Adopted by management' as const,
    impactVariant: 'adopted' as ImpactVariant,
    impactIcon: 'badge-check',
    description:
      'Full-stack production CRM rebuilt from an HTML prototype. Real-time pipeline tracking, role-based views, and KPI dashboards for the national sales team. Currently the primary management monitoring tool.',
    stack: ['Next.js 14', 'Supabase', 'TypeScript', 'Tailwind', 'Recharts'],
    liveUrl: 'https://nsms-three.vercel.app',
    githubUrl: 'https://github.com/ardhian159-bit/NSMS',
    liveLabel: 'Live',
    githubLabel: 'GitHub',
  },
  {
    id: 'SIRUP · 2025',
    slug: 'sirup',
    title: 'Government Procurement Pipeline',
    org: 'PT Intan Pariwara',
    division: 'Solo engineer',
    impact: '514 districts indexed',
    impactVariant: 'live' as ImpactVariant,
    impactIcon: 'activity',
    description:
      'Python scraper covering every kabupaten/kota in Indonesia, with session auth, anti-fail resume, and DuckDB analysis. Powers lead scoring and national market sizing at Intan Pariwara — a process that previously took weeks of manual research.',
    stack: ['Python', 'DuckDB', 'pandas', 'BeautifulSoup', 'SQL'],
    liveUrl: null,
    githubUrl: 'https://github.com/ardhian159-bit/sirup-scraper',
    liveLabel: 'Internal',
    githubLabel: 'GitHub',
  },
  {
    id: 'WHFD · 2026',
    slug: 'whfd',
    title: 'Warehouse Fulfillment Dashboard',
    org: 'PT Wikrama Dharma Tunggadewa',
    division: 'Jombang',
    impact: 'Hybrid model · Rp 169 M/mo',
    impactVariant: 'proto' as ImpactVariant,
    impactIcon: 'layout-dashboard',
    description:
      'Prototype for a hybrid fulfilment model — passive rental + activity-based billing. Implements dead-stock fees, SKU tiering, and auto-billing across 6 modules including a visual pallet-grid warehouse map.',
    stack: ['Next.js 16', 'shadcn/ui', 'Tailwind v4', 'Recharts'],
    liveUrl: 'https://warehouse-fulfillment-dashboard.vercel.app/dashboard',
    githubUrl: 'https://github.com/ardhian159-bit/warehouse-fulfillment-dashboard',
    liveLabel: 'Live',
    githubLabel: 'GitHub',
  },
]

export const experience = [
  {
    role: 'Business Intelligence & Marketing Support Intern',
    org: 'PT Intan Pariwara',
    location: 'Klaten · Central Java',
    period: 'Jan 2026 – Present',
    current: true,
    edu: false,
    bullets: [
      'Designed, built, and deployed a full-stack Sales Funnel CRM (Next.js + Supabase + Vercel) — adopted as the primary management monitoring tool across the national sales team.',
      'Engineered an automated Python pipeline to collect SIRUP procurement data across all 514 districts, enabling national-scale market sizing and lead scoring.',
      'Built Power BI / Tableau dashboards for competitor benchmarking; findings incorporated into strategic planning.',
    ],
  },
  {
    role: 'Business Intelligence Intern',
    org: 'Pintar.co',
    location: 'MSIB Batch 6 · Remote',
    period: 'Feb – Jun 2024',
    current: false,
    edu: false,
    bullets: [
      'End-to-end SQL analysis on large consumer datasets (joins, CTEs, window functions) — defined KPI logic and built reporting infrastructure for senior leadership.',
      'Shipped real-time Tableau dashboards tracking user behaviour across product and growth functions; presented findings directly to leadership.',
      'Collaborated cross-functionally with product, engineering, and business teams to align analytics with operational needs.',
    ],
  },
  {
    role: 'Youth Digital Administrator Intern',
    org: 'PT Telkomsel',
    location: 'Surakarta',
    period: 'Jan – May 2024',
    current: false,
    edu: false,
    bullets: [
      'Monitored compliance and tracked performance metrics for 70 program participants; escalated corrective strategies to management.',
      'Managed high-volume daily transaction records in Excel; maintained audit-ready documentation.',
      'Delivered weekly analytics reports enabling timely regional strategy adjustments.',
    ],
  },
  {
    role: 'B.Sc. Economic Development',
    org: 'Universitas Negeri Malang',
    location: 'GPA 3.85 · Cum Laude',
    period: '2021 – 2025',
    current: false,
    edu: true,
    bullets: [
      'Thesis: VECM time-series modelling of macroeconomic transmission (interest rates, inflation, exchange rate dynamics) in EViews.',
      'Best Participant — BESS 2025 International Conference; co-authored research on digital software adoption using the TAM framework.',
      'Chief Executive of Indonesia Day 2023 — led 8 divisions, managed cross-functional budget allocation, delivered on schedule.',
    ],
  },
]

export const skills = {
  technical: [
    {
      group: 'Analytics & data',
      items: ['Python', 'SQL', 'R', 'EViews', 'DuckDB', 'pandas', 'BeautifulSoup', 'Econometrics'],
    },
    {
      group: 'Visualisation',
      items: ['Tableau', 'Power BI', 'Chart.js', 'Recharts'],
    },
    {
      group: 'Development',
      items: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    },
  ],
  business: [
    {
      group: 'Strategy & analysis',
      items: ['Requirements analysis', 'KPI definition', 'Market sizing', 'Lead scoring', 'Competitor benchmarking'],
    },
    {
      group: 'Delivery',
      items: ['Stakeholder communication', 'Project delivery', 'Cross-functional collaboration', 'Budget allocation'],
    },
    {
      group: 'Languages',
      items: ['Bahasa Indonesia · Native', 'English · TOEFL ITP 537'],
    },
  ],
}

export const certifications = [
  {
    title: 'Business Intelligence with Tableau',
    issuer: 'Kemendikbudristek MSIB · 2024',
  },
  {
    title: 'AI-volution Workshop',
    issuer: 'U.S. Embassy Jakarta · 2025',
  },
]
