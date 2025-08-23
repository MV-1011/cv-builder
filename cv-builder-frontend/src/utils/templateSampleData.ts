import { Resume } from '../types';

export const templateSampleData: { [key: string]: Resume } = {
  // Template 2 - Modern Executive
  '2': {
    template_id: '2',
    personal_info: {
      full_name: 'Alexander Mitchell',
      email: 'alexander.mitchell@executive.com',
      phone: '+1 (555) 234-5678',
      address: '500 Executive Plaza, Suite 2000',
      city: 'New York',
      country: 'United States',
      postal_code: '10001',
      linkedin: 'https://linkedin.com/in/alexandermitchell',
      github: '',
      website: 'https://alexandermitchell.executive',
      summary: 'Visionary C-Level Executive with 15+ years driving digital transformation, strategic growth, and operational excellence across Fortune 500 companies. Proven track record of scaling organizations, leading high-performance teams, and delivering sustainable revenue growth in competitive markets.'
    },
    education: [
      {
        degree: 'Master of Business Administration',
        field_of_study: 'Strategic Management & Leadership',
        institution: 'Harvard Business School',
        start_date: '2006',
        end_date: '2008',
        current: false,
        gpa: '3.9',
        description: 'Concentrated in Corporate Strategy and Leadership. Case study finalist. Leadership Fellow.'
      },
      {
        degree: 'Bachelor of Science',
        field_of_study: 'Economics',
        institution: 'Wharton School, University of Pennsylvania',
        start_date: '2002',
        end_date: '2006',
        current: false,
        gpa: '3.8',
        description: 'Summa Cum Laude. Phi Beta Kappa Society.'
      }
    ],
    experience: [
      {
        position: 'Chief Executive Officer',
        company: 'TechVision Corp',
        location: 'New York, NY',
        start_date: '2020',
        end_date: '',
        current: true,
        description: 'Lead strategic vision and operations for $2B technology company with 5,000+ employees across 12 countries. Drive digital transformation initiatives and sustainable growth strategies.',
        achievements: [
          'Increased annual revenue by 180% from $800M to $2.2B in 4 years',
          'Successfully executed 8 strategic acquisitions totaling $400M',
          'Led company through IPO raising $500M in capital',
          'Expanded global footprint from 3 to 12 countries'
        ]
      },
      {
        position: 'Chief Operations Officer',
        company: 'InnovateGlobal Solutions',
        location: 'San Francisco, CA',
        start_date: '2016',
        end_date: '2020',
        current: false,
        description: 'Oversaw global operations, supply chain, and business development for leading software company serving enterprise clients worldwide.',
        achievements: [
          'Optimized global operations reducing costs by 35% while improving efficiency',
          'Established strategic partnerships generating $150M in new revenue',
          'Built and scaled international teams across 6 new markets'
        ]
      },
      {
        position: 'Vice President of Strategy',
        company: 'Pinnacle Consulting Group',
        location: 'Boston, MA',
        start_date: '2012',
        end_date: '2016',
        current: false,
        description: 'Developed and executed strategic initiatives for Fortune 500 clients across technology, healthcare, and financial services sectors.',
        achievements: [
          'Led strategic consulting projects worth over $50M in combined value',
          'Drove digital transformation initiatives for 25+ enterprise clients',
          'Grew consulting practice by 200% over 4-year tenure'
        ]
      }
    ],
    skills: [
      { name: 'Strategic Planning', level: 'Expert' },
      { name: 'Digital Transformation', level: 'Expert' },
      { name: 'Operations Management', level: 'Expert' },
      { name: 'Mergers & Acquisitions', level: 'Advanced' },
      { name: 'Team Leadership', level: 'Expert' },
      { name: 'Financial Analysis', level: 'Advanced' },
      { name: 'Business Development', level: 'Expert' },
      { name: 'Change Management', level: 'Advanced' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' },
      { name: 'Mandarin', proficiency: 'Basic' }
    ],
    projects: [
      {
        name: 'Global Digital Transformation Initiative',
        description: 'Led enterprise-wide digital transformation across 12 countries, implementing cloud infrastructure, AI-powered analytics, and automated workflows resulting in 40% operational efficiency improvement.',
        technologies: ['Cloud Computing', 'AI/ML', 'Process Automation', 'Data Analytics'],
        link: '',
        start_date: '2021',
        end_date: '2023'
      },
      {
        name: 'Strategic Acquisition Program',
        description: 'Orchestrated comprehensive acquisition strategy identifying, evaluating, and successfully integrating 8 strategic acquisitions totaling $400M to expand market presence and capabilities.',
        technologies: ['Due Diligence', 'Integration Management', 'Financial Modeling', 'Risk Assessment'],
        link: '',
        start_date: '2020',
        end_date: '2024'
      }
    ],
    certifications: [
      {
        name: 'Certified Strategic Management Professional',
        issuer: 'Strategic Management Society',
        date: '2019',
        credential_id: 'SMP-2019-AM',
        url: ''
      },
      {
        name: 'Advanced Leadership Certificate',
        issuer: 'Harvard Business School Executive Education',
        date: '2018',
        credential_id: 'HBS-ALC-2018',
        url: ''
      }
    ],
    references: [
      {
        name: 'Patricia Williams',
        position: 'Board Member',
        company: 'TechVision Corp',
        email: 'p.williams@techvision.com',
        phone: '+1 (555) 987-6543',
        relationship: 'Board Supervisor'
      },
      {
        name: 'Robert Chen',
        position: 'Managing Partner',
        company: 'Pinnacle Consulting Group',
        email: 'r.chen@pinnacle.com',
        phone: '+1 (555) 876-5432',
        relationship: 'Former Supervisor'
      }
    ]
  },

  // Template 11 - Legal Professional
  '11': {
    template_id: '11',
    personal_info: {
      full_name: 'Catherine Elizabeth Morrison',
      email: 'c.morrison@morrisonlaw.com',
      phone: '+1 (555) 123-4567',
      address: '1200 Legal Plaza, 42nd Floor',
      city: 'Chicago',
      country: 'United States',
      postal_code: '60601',
      linkedin: 'https://linkedin.com/in/catherinemorrison',
      github: '',
      website: 'https://morrisonlaw.com',
      summary: 'Accomplished Attorney with 12+ years specializing in Corporate Law, Mergers & Acquisitions, and Securities Regulation. Licensed to practice in Illinois, New York, and California with extensive experience representing Fortune 500 companies in complex transactions and regulatory compliance matters.'
    },
    education: [
      {
        degree: 'Juris Doctor',
        field_of_study: 'Corporate Law & Securities',
        institution: 'Northwestern University Pritzker School of Law',
        start_date: '2009',
        end_date: '2012',
        current: false,
        gpa: '3.85',
        description: 'Order of the Coif. Northwestern Law Review, Senior Editor. Moot Court National Champions.'
      },
      {
        degree: 'Bachelor of Arts',
        field_of_study: 'Political Science & Economics',
        institution: 'University of Chicago',
        start_date: '2005',
        end_date: '2009',
        current: false,
        gpa: '3.9',
        description: 'Phi Beta Kappa. Magna Cum Laude. Dean\'s List all semesters.'
      }
    ],
    experience: [
      {
        position: 'Senior Partner',
        company: 'Morrison & Associates Law Firm',
        location: 'Chicago, IL',
        start_date: '2020',
        end_date: '',
        current: true,
        description: 'Lead corporate law practice specializing in M&A transactions, securities offerings, and regulatory compliance for mid-market and Fortune 500 companies across technology, healthcare, and financial services sectors.',
        achievements: [
          'Closed over $2.5B in M&A transactions representing both buyers and sellers',
          'Successfully defended clients in 15+ SEC enforcement actions with zero penalties',
          'Led IPO counsel for 8 companies raising over $800M in capital',
          'Recognized as "Lawyer of the Year" by Best Lawyers in America 2023'
        ]
      },
      {
        position: 'Senior Associate',
        company: 'Kirkland & Ellis LLP',
        location: 'Chicago, IL',
        start_date: '2016',
        end_date: '2020',
        current: false,
        description: 'Specialized in complex corporate transactions, private equity deals, and securities law compliance for major institutional clients and high-growth companies.',
        achievements: [
          'Participated in $5B+ worth of private equity and M&A transactions',
          'Drafted and negotiated complex acquisition agreements and securities filings',
          'Provided regulatory guidance for 20+ IPOs and secondary offerings',
          'Mentored junior associates and summer law students'
        ]
      },
      {
        position: 'Associate Attorney',
        company: 'Latham & Watkins LLP',
        location: 'New York, NY',
        start_date: '2012',
        end_date: '2016',
        current: false,
        description: 'Corporate law practice focusing on venture capital financing, technology transactions, and emerging company representation in fast-paced startup environment.',
        achievements: [
          'Advised 50+ startups through Series A-C funding rounds totaling $300M+',
          'Structured and documented complex licensing and joint venture agreements',
          'Achieved 98% client retention rate through responsive service delivery'
        ]
      }
    ],
    skills: [
      { name: 'Corporate Law', level: 'Expert' },
      { name: 'Mergers & Acquisitions', level: 'Expert' },
      { name: 'Securities Regulation', level: 'Expert' },
      { name: 'Contract Negotiation', level: 'Expert' },
      { name: 'Due Diligence', level: 'Advanced' },
      { name: 'Regulatory Compliance', level: 'Expert' },
      { name: 'Private Equity', level: 'Advanced' },
      { name: 'IPO Counsel', level: 'Advanced' },
      { name: 'Legal Research', level: 'Expert' },
      { name: 'Client Relations', level: 'Expert' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'French', proficiency: 'Proficient' },
      { name: 'Spanish', proficiency: 'Conversational' }
    ],
    projects: [
      {
        name: 'TechUnicorn IPO - $400M Public Offering',
        description: 'Served as lead counsel for high-profile technology company IPO, managing all aspects from S-1 preparation through successful NASDAQ listing. Coordinated with underwriters, auditors, and regulators throughout 8-month process.',
        technologies: ['Securities Law', 'IPO Process', 'NASDAQ Listing', 'Regulatory Filings'],
        link: '',
        start_date: '2022',
        end_date: '2023'
      },
      {
        name: 'Cross-Border M&A - $1.2B Acquisition',
        description: 'Led legal team for complex cross-border acquisition involving US technology company acquiring European competitor. Managed regulatory approvals across 3 jurisdictions and complex tax structuring.',
        technologies: ['M&A', 'Cross-Border Transactions', 'Antitrust Law', 'Tax Structuring'],
        link: '',
        start_date: '2021',
        end_date: '2022'
      },
      {
        name: 'Private Equity Fund Formation - $500M Fund',
        description: 'Advised private equity firm on formation of new $500M growth equity fund, including fund documentation, regulatory compliance, and LP negotiations with institutional investors.',
        technologies: ['Private Equity', 'Fund Formation', 'Investment Management', 'Regulatory Compliance'],
        link: '',
        start_date: '2020',
        end_date: '2021'
      }
    ],
    certifications: [
      {
        name: 'Licensed Attorney - Illinois',
        issuer: 'Illinois State Bar Association',
        date: '2012',
        credential_id: 'IL-BAR-2012-CEM',
        url: ''
      },
      {
        name: 'Licensed Attorney - New York',
        issuer: 'New York State Bar Association',
        date: '2013',
        credential_id: 'NY-BAR-2013-CEM',
        url: ''
      }
    ],
    references: [
      {
        name: 'Hon. Margaret Thompson',
        position: 'Federal Judge',
        company: 'US District Court Northern District of Illinois',
        email: 'm.thompson@ilnd.uscourts.gov',
        phone: '+1 (312) 435-5678',
        relationship: 'Former Law Clerk Supervisor'
      },
      {
        name: 'David Richardson',
        position: 'Managing Partner',
        company: 'Kirkland & Ellis LLP',
        email: 'd.richardson@kirkland.com',
        phone: '+1 (312) 862-2000',
        relationship: 'Former Supervisor'
      }
    ]
  },

  // Template 3 - Creative Designer  
  '3': {
    template_id: '3',
    personal_info: {
      full_name: 'Sofia Rodriguez',
      email: 'sofia@creativestudio.design',
      phone: '+1 (555) 345-6789',
      address: '800 Design District',
      city: 'Los Angeles',
      country: 'United States',
      postal_code: '90028',
      linkedin: 'https://linkedin.com/in/sofiarodriguezdesign',
      github: 'https://github.com/sofia-design',
      website: 'https://sofiarodriguez.design',
      summary: 'Award-winning Creative Director and UX/UI Designer with 8+ years crafting innovative digital experiences for global brands. Specializes in user-centered design, brand identity, and interactive storytelling with expertise across web, mobile, and emerging technologies.'
    },
    education: [
      {
        degree: 'Master of Fine Arts',
        field_of_study: 'Digital Media & Interactive Design',
        institution: 'Art Center College of Design',
        start_date: '2014',
        end_date: '2016',
        current: false,
        gpa: '3.95',
        description: 'Thesis: "Immersive Brand Experiences in Virtual Reality." Graduate Teaching Assistant.'
      },
      {
        degree: 'Bachelor of Fine Arts',
        field_of_study: 'Graphic Design & Visual Communications',
        institution: 'California Institute of the Arts',
        start_date: '2010',
        end_date: '2014',
        current: false,
        gpa: '3.8',
        description: 'Dean\'s List. Student Gallery Featured Artist. Adobe Design Achievement Award.'
      }
    ],
    experience: [
      {
        position: 'Creative Director',
        company: 'Pixel Perfect Studios',
        location: 'Los Angeles, CA',
        start_date: '2021',
        end_date: '',
        current: true,
        description: 'Lead creative vision and design strategy for boutique digital agency serving entertainment, tech, and lifestyle brands. Manage team of 12 designers, developers, and strategists.',
        achievements: [
          'Increased agency revenue by 250% through strategic client acquisition and retention',
          'Won 8 industry awards including Webby Award and Communication Arts Design Annual',
          'Led rebranding projects for 3 Fortune 500 companies resulting in 40% brand recognition increase',
          'Established agency\'s first VR/AR design practice generating $500K new revenue'
        ]
      },
      {
        position: 'Senior UX/UI Designer',
        company: 'Netflix Design Studio',
        location: 'Los Gatos, CA',
        start_date: '2018',
        end_date: '2021',
        current: false,
        description: 'Designed user experiences for Netflix original content discovery, personalization features, and emerging platform initiatives across web, mobile, and connected TV.',
        achievements: [
          'Redesigned content discovery flow increasing user engagement by 35%',
          'Led design for Netflix VR experience with 2M+ downloads in first 6 months',
          'Collaborated with data science team to optimize recommendation algorithms UI',
          'Mentored 6 junior designers through design career development program'
        ]
      },
      {
        position: 'Digital Designer',
        company: 'IDEO San Francisco',
        location: 'San Francisco, CA',
        start_date: '2016',
        end_date: '2018',
        current: false,
        description: 'Created human-centered digital solutions for healthcare, education, and financial services clients through design thinking methodology and rapid prototyping.',
        achievements: [
          'Designed healthcare app improving patient medication adherence by 60%',
          'Led design research studies with 200+ participants across 5 user segments',
          'Developed design system adopted by 15+ product teams across multiple clients'
        ]
      }
    ],
    skills: [
      { name: 'UI/UX Design', level: 'Expert' },
      { name: 'Creative Direction', level: 'Expert' },
      { name: 'Brand Identity', level: 'Advanced' },
      { name: 'Figma', level: 'Expert' },
      { name: 'Adobe Creative Suite', level: 'Expert' },
      { name: 'Prototyping', level: 'Advanced' },
      { name: 'Design Systems', level: 'Advanced' },
      { name: 'User Research', level: 'Advanced' },
      { name: 'Motion Graphics', level: 'Intermediate' },
      { name: 'VR/AR Design', level: 'Intermediate' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Native' },
      { name: 'Portuguese', proficiency: 'Conversational' }
    ],
    projects: [
      {
        name: 'Immersive Brand Experience - Global Fashion Week',
        description: 'Created interactive VR experience for luxury fashion brand showcasing collections in virtual runway shows. Integrated haptic feedback and spatial audio for fully immersive brand storytelling.',
        technologies: ['VR Design', 'Unity 3D', 'Spatial Audio', 'Haptic Feedback', 'Brand Storytelling'],
        link: 'https://fashionweek-vr.example.com',
        start_date: '2023',
        end_date: '2023'
      },
      {
        name: 'Netflix Original Content Discovery Redesign',
        description: 'Reimagined Netflix\'s content discovery experience using AI-powered personalization and intuitive browsing patterns. Increased user engagement and reduced decision fatigue.',
        technologies: ['UX Research', 'Prototyping', 'A/B Testing', 'Data Visualization', 'Interaction Design'],
        link: '',
        start_date: '2019',
        end_date: '2020'
      },
      {
        name: 'Healthcare App - MediTrack Pro',
        description: 'Designed comprehensive medication management app for elderly patients with complex health conditions. Features include medication reminders, doctor communication, and family caregiver dashboard.',
        technologies: ['Healthcare UX', 'Accessibility Design', 'iOS/Android', 'User Testing', 'HIPAA Compliance'],
        link: 'https://meditrack-pro.example.com',
        start_date: '2017',
        end_date: '2018'
      }
    ],
    certifications: [
      {
        name: 'Certified UX Professional',
        issuer: 'Nielsen Norman Group',
        date: '2020',
        credential_id: 'NN-UXC-2020-SR',
        url: ''
      },
      {
        name: 'Google Design Certificate',
        issuer: 'Google Career Certificates',
        date: '2019',
        credential_id: 'GDC-2019-SR',
        url: ''
      }
    ],
    references: [
      {
        name: 'Maria Santos',
        position: 'VP of Design',
        company: 'Netflix',
        email: 'm.santos@netflix.com',
        phone: '+1 (408) 555-0123',
        relationship: 'Former Manager'
      },
      {
        name: 'James Wilson',
        position: 'Design Director',
        company: 'IDEO',
        email: 'j.wilson@ideo.com',
        phone: '+1 (650) 555-0124',
        relationship: 'Former Supervisor'
      }
    ]
  },

  // Template 4 - Minimalist Clean
  '4': {
    template_id: '4',
    personal_info: {
      full_name: 'Emma Thompson',
      email: 'emma.thompson@minimal.co',
      phone: '+1 (555) 456-7890',
      address: '400 Clean Street',
      city: 'Portland',
      country: 'United States',
      postal_code: '97205',
      linkedin: 'https://linkedin.com/in/emmathompson',
      github: '',
      website: 'https://emmathompson.co',
      summary: 'Strategic Product Manager with 6+ years building user-focused digital products from concept to launch. Expertise in agile development, data-driven decision making, and cross-functional team leadership in fast-paced startup and enterprise environments.'
    },
    education: [
      {
        degree: 'Master of Science',
        field_of_study: 'Human-Computer Interaction',
        institution: 'Stanford University',
        start_date: '2016',
        end_date: '2018',
        current: false,
        gpa: '3.9',
        description: 'Focus on user research and product design methodology.'
      }
    ],
    experience: [
      {
        position: 'Senior Product Manager',
        company: 'Stripe',
        location: 'San Francisco, CA',
        start_date: '2021',
        end_date: '',
        current: true,
        description: 'Lead product strategy for payment infrastructure serving millions of businesses globally.',
        achievements: [
          'Launched payment optimization feature increasing conversion by 12%',
          'Managed $50M product line with 8-person cross-functional team',
          'Reduced payment processing time by 40% through API improvements'
        ]
      }
    ],
    skills: [
      { name: 'Product Strategy', level: 'Expert' },
      { name: 'Agile/Scrum', level: 'Advanced' },
      { name: 'Data Analysis', level: 'Advanced' },
      { name: 'User Research', level: 'Intermediate' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'French', proficiency: 'Conversational' }
    ],
    projects: [
      {
        name: 'Payment Gateway Redesign',
        description: 'Led complete redesign of payment infrastructure improving developer experience and reducing integration time by 60%.',
        technologies: ['Product Strategy', 'API Design', 'User Research', 'A/B Testing'],
        link: '',
        start_date: '2022',
        end_date: '2023'
      }
    ],
    certifications: [
      {
        name: 'Certified Product Manager',
        issuer: 'Product Management Institute',
        date: '2020',
        credential_id: 'CPM-2020-ET',
        url: ''
      }
    ],
    references: [
      {
        name: 'Michael Chen',
        position: 'VP of Product',
        company: 'Stripe',
        email: 'm.chen@stripe.com',
        phone: '+1 (415) 555-0125',
        relationship: 'Direct Manager'
      }
    ]
  },

  // Template 5 - Academic Scholar
  '5': {
    template_id: '5',
    personal_info: {
      full_name: 'Dr. Jonathan Pierce',
      email: 'j.pierce@university.edu',
      phone: '+1 (555) 567-8901',
      address: '1000 University Avenue',
      city: 'Cambridge',
      country: 'United States',
      postal_code: '02138',
      linkedin: 'https://linkedin.com/in/jonathanpierce',
      github: 'https://github.com/dr-pierce',
      website: 'https://jonathanpierce.academia.edu',
      summary: 'Distinguished Professor of Computer Science with 15+ years in artificial intelligence research, machine learning, and computational linguistics. Published 50+ peer-reviewed papers with 3,000+ citations and $2M+ in research funding.'
    },
    education: [
      {
        degree: 'Doctor of Philosophy',
        field_of_study: 'Computer Science - Artificial Intelligence',
        institution: 'MIT',
        start_date: '2006',
        end_date: '2011',
        current: false,
        gpa: '4.0',
        description: 'Dissertation: "Neural Network Approaches to Natural Language Understanding"'
      }
    ],
    experience: [
      {
        position: 'Professor of Computer Science',
        company: 'Harvard University',
        location: 'Cambridge, MA',
        start_date: '2018',
        end_date: '',
        current: true,
        description: 'Lead AI research lab, teach graduate and undergraduate courses, mentor PhD students.',
        achievements: [
          'Published 25 papers in top-tier conferences (NIPS, ICML, ACL)',
          'Secured $1.5M NSF grant for natural language processing research',
          'Mentored 15 PhD students, 8 successfully defended dissertations'
        ]
      }
    ],
    skills: [
      { name: 'Machine Learning', level: 'Expert' },
      { name: 'Python', level: 'Expert' },
      { name: 'Research Methodology', level: 'Expert' },
      { name: 'Academic Writing', level: 'Expert' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'German', proficiency: 'Proficient' }
    ],
    projects: [
      {
        name: 'Neural Language Model for Scientific Text',
        description: 'Developed novel neural architecture for understanding and generating scientific literature with 40% improvement in coherence metrics.',
        technologies: ['Deep Learning', 'NLP', 'Transformers', 'PyTorch'],
        link: 'https://arxiv.org/paper/12345',
        start_date: '2022',
        end_date: '2024'
      }
    ],
    certifications: [],
    references: [
      {
        name: 'Dr. Sarah Kim',
        position: 'Department Head',
        company: 'Harvard Computer Science',
        email: 's.kim@harvard.edu',
        phone: '+1 (617) 555-0126',
        relationship: 'Department Supervisor'
      }
    ]
  }
};

export const getDefaultSampleData = (): Resume => ({
  template_id: '1',
  personal_info: {
    full_name: 'Your Name',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'Your City',
    country: 'Your Country',
    postal_code: '12345',
    linkedin: 'https://linkedin.com/in/yourname',
    github: 'https://github.com/yourname',
    website: 'https://yourwebsite.com',
    summary: 'Write a compelling professional summary that highlights your key skills and career objectives.'
  },
  education: [
    {
      degree: 'Your Degree',
      field_of_study: 'Your Field of Study',
      institution: 'University Name',
      start_date: '2018',
      end_date: '2022',
      current: false,
      gpa: '3.8',
      description: 'Relevant coursework, honors, or achievements.'
    }
  ],
  experience: [
    {
      position: 'Your Job Title',
      company: 'Company Name',
      location: 'City, State',
      start_date: '2022',
      end_date: '',
      current: true,
      description: 'Describe your role and responsibilities in this position.',
      achievements: [
        'Key achievement or accomplishment',
        'Another significant contribution',
        'Quantified result or impact'
      ]
    }
  ],
  skills: [
    { name: 'Technical Skill', level: 'Advanced' },
    { name: 'Software Tool', level: 'Expert' },
    { name: 'Industry Knowledge', level: 'Intermediate' }
  ],
  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Second Language', proficiency: 'Conversational' }
  ],
  projects: [
    {
      name: 'Project Name',
      description: 'Brief description of the project and your role.',
      technologies: ['Technology 1', 'Technology 2', 'Technology 3'],
      link: 'https://project-link.com',
      start_date: '2023',
      end_date: '2023'
    }
  ],
  certifications: [
    {
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: '2023',
      credential_id: 'CERT-123',
      url: 'https://certification-link.com'
    }
  ],
  references: [
    {
      name: 'Reference Name',
      position: 'Their Position',
      company: 'Their Company',
      email: 'reference@email.com',
      phone: '+1 (555) 987-6543',
      relationship: 'Professional Relationship'
    }
  ]
});

export const getSampleDataForTemplate = (templateId: string): Resume => {
  return templateSampleData[templateId] || getDefaultSampleData();
};