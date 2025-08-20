import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { Resume, Template } from '../types';
import './TemplatePreviewPage.css';

const TemplatePreviewPage: React.FC = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTemplate = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8001/api/templates/${templateId}`);
      if (response.ok) {
        const data = await response.json();
        setTemplate(data);
      } else {
        // Fallback to default templates if API fails
        const defaultTemplate = getDefaultTemplate(templateId || '');
        setTemplate(defaultTemplate);
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      // Fallback to default templates
      const defaultTemplate = getDefaultTemplate(templateId || '');
      setTemplate(defaultTemplate);
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    fetchTemplate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const getDefaultTemplate = (id: string): Template => {
    const defaultTemplates: { [key: string]: Template } = {
      '9': {
        _id: '9',
        name: 'Professional Accountant',
        description: 'Tailored for CAs, CPAs, and finance professionals',
        category: 'Finance',
        is_premium: false,
        sections: ['personal', 'experience', 'education', 'skills', 'certifications'],
        color_scheme: { primary: '#1e3c72', secondary: '#2a5298' },
        font_family: 'Georgia',
        layout: 'professional-accountant'
      },
      '10': {
        _id: '10',
        name: 'Sales Executive',
        description: 'Dynamic template for sales and business development professionals',
        category: 'Sales',
        is_premium: false,
        sections: ['personal', 'experience', 'achievements', 'skills'],
        color_scheme: { primary: '#667eea', secondary: '#764ba2' },
        font_family: 'Helvetica Neue',
        layout: 'sales-executive'
      },
      '11': {
        _id: '11',
        name: 'Legal Professional',
        description: 'Formal template for lawyers, advocates, and legal counsels',
        category: 'Legal',
        is_premium: false,
        sections: ['personal', 'experience', 'education', 'practice_areas', 'cases'],
        color_scheme: { primary: '#1a1a1a', secondary: '#8b7355' },
        font_family: 'Book Antiqua',
        layout: 'legal-professional'
      }
    };

    return defaultTemplates[id] || {
      _id: id,
      name: 'Professional',
      description: 'Clean and professional template',
      category: 'Technology',
      is_premium: false,
      sections: ['personal', 'experience', 'education', 'skills'],
      color_scheme: { primary: '#2c3e50', secondary: '#3498db' },
      font_family: 'Arial',
      layout: 'single-column'
    };
  };

  // Function to get profession-specific sample data (same as TemplatesPage)
  const getSampleData = (template: Template): Resume => {
    const baseTemplate = {
      template_id: template._id,
      languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Spanish', proficiency: 'Conversational' }
      ],
      certifications: [],
      references: []
    };

    switch (template.category) {
      case 'Finance':
        return {
          ...baseTemplate,
          personal_info: {
            full_name: 'Michael Chen CPA',
            email: 'michael.chen@email.com',
            phone: '+1 (555) 234-5678',
            address: '456 Financial District, Suite 200',
            city: 'New York',
            country: 'United States',
            postal_code: '10005',
            linkedin: 'https://linkedin.com/in/michaelchencpa',
            github: '',
            website: '',
            summary: 'Certified Public Accountant with 8+ years of experience in financial analysis, audit, and tax compliance. Specialized in corporate finance, risk management, and regulatory compliance with expertise in GAAP and IFRS standards.'
          },
          education: [
            {
              degree: 'Master of Business Administration',
              field_of_study: 'Finance & Accounting',
              institution: 'Wharton School, University of Pennsylvania',
              start_date: '2014',
              end_date: '2016',
              current: false,
              gpa: '3.8',
              description: 'Specialized in Corporate Finance and Financial Reporting.'
            },
            {
              degree: 'Bachelor of Commerce',
              field_of_study: 'Accounting & Finance',
              institution: 'New York University',
              start_date: '2010',
              end_date: '2014',
              current: false,
              gpa: '3.7',
              description: 'Magna Cum Laude. Member of Beta Alpha Psi Honor Society.'
            }
          ],
          experience: [
            {
              position: 'Senior Financial Analyst',
              company: 'Goldman Sachs',
              location: 'New York, NY',
              start_date: '2020',
              end_date: '',
              current: true,
              description: 'Lead financial analysis and reporting for investment banking division with $2B+ portfolio.',
              achievements: [
                'Reduced monthly closing process by 25% through automation',
                'Led audit team for SOX compliance across 15 subsidiaries',
                'Managed budget variance analysis saving $1.2M annually',
                'Implemented new ERP system improving reporting accuracy by 40%'
              ]
            },
            {
              position: 'Staff Accountant',
              company: 'KPMG',
              location: 'New York, NY',
              start_date: '2016',
              end_date: '2020',
              current: false,
              description: 'Performed external audits for Fortune 500 companies across various industries.',
              achievements: [
                'Completed 20+ audit engagements with zero material weaknesses',
                'Specialized in revenue recognition under ASC 606',
                'Mentored 5 junior staff members',
                'Received "Outstanding Performance" rating for 3 consecutive years'
              ]
            }
          ],
          skills: [
            { name: 'Financial Analysis', level: 'Expert' },
            { name: 'GAAP/IFRS', level: 'Expert' },
            { name: 'Tax Compliance', level: 'Advanced' },
            { name: 'SAP ERP', level: 'Advanced' },
            { name: 'Excel/VBA', level: 'Expert' },
            { name: 'QuickBooks', level: 'Advanced' },
            { name: 'Audit & Assurance', level: 'Expert' },
            { name: 'Risk Management', level: 'Intermediate' }
          ],
          projects: [
            {
              name: 'SOX Compliance Implementation',
              description: 'Led cross-functional team to implement Sarbanes-Oxley compliance framework across 12 business units, ensuring regulatory adherence and internal control effectiveness.',
              technologies: ['Internal Controls', 'Risk Assessment', 'Process Documentation', 'SAP'],
              start_date: '2023',
              end_date: '2023',
              link: ''
            },
            {
              name: 'Financial Systems Integration',
              description: 'Managed migration from legacy accounting system to SAP S/4HANA, resulting in improved reporting capabilities and reduced month-end close time.',
              technologies: ['SAP S/4HANA', 'Data Migration', 'Process Automation', 'Financial Reporting'],
              start_date: '2022',
              end_date: '2023',
              link: ''
            }
          ]
        };

      case 'Sales':
        return {
          ...baseTemplate,
          personal_info: {
            full_name: 'Jessica Rodriguez',
            email: 'jessica.rodriguez@email.com',
            phone: '+1 (555) 345-6789',
            address: '789 Business Park Dr, Suite 300',
            city: 'Los Angeles',
            country: 'United States',
            postal_code: '90210',
            linkedin: 'https://linkedin.com/in/jessicarodriguezsales',
            github: '',
            website: '',
            summary: 'Results-driven Sales Executive with 7+ years of experience exceeding revenue targets and building strategic client relationships. Proven track record of generating $10M+ in annual revenue through consultative selling and territory expansion.'
          },
          education: [
            {
              degree: 'Master of Business Administration',
              field_of_study: 'Marketing & Sales Management',
              institution: 'UCLA Anderson School of Management',
              start_date: '2015',
              end_date: '2017',
              current: false,
              gpa: '3.6',
              description: 'Concentration in Strategic Marketing and Business Development.'
            },
            {
              degree: 'Bachelor of Business Administration',
              field_of_study: 'Marketing',
              institution: 'University of Southern California',
              start_date: '2011',
              end_date: '2015',
              current: false,
              gpa: '3.5',
              description: 'Dean\'s List. President of Marketing Student Association.'
            }
          ],
          experience: [
            {
              position: 'Senior Sales Manager',
              company: 'Salesforce',
              location: 'Los Angeles, CA',
              start_date: '2021',
              end_date: '',
              current: true,
              description: 'Lead enterprise sales team managing $15M territory, focusing on Fortune 500 accounts in technology and manufacturing sectors.',
              achievements: [
                'Exceeded annual quota by 145% for three consecutive years',
                'Generated $12.5M in new business revenue in 2023',
                'Built and managed pipeline of 200+ qualified prospects',
                'Led team of 6 sales representatives achieving 125% of team target',
                'Closed largest deal in company history worth $2.8M'
              ]
            },
            {
              position: 'Account Executive',
              company: 'Oracle Corporation',
              location: 'Los Angeles, CA',
              start_date: '2018',
              end_date: '2021',
              current: false,
              description: 'Managed key accounts in the entertainment and media industry, selling cloud solutions and enterprise software.',
              achievements: [
                'Consistently achieved 130%+ of annual sales targets',
                'Expanded existing accounts by average of 40% year-over-year',
                'Won "Rookie of the Year" award in first year',
                'Developed strategic partnerships with 15+ major clients'
              ]
            }
          ],
          skills: [
            { name: 'Consultative Selling', level: 'Expert' },
            { name: 'Account Management', level: 'Expert' },
            { name: 'CRM (Salesforce)', level: 'Advanced' },
            { name: 'Lead Generation', level: 'Expert' },
            { name: 'Negotiation', level: 'Advanced' },
            { name: 'Pipeline Management', level: 'Expert' },
            { name: 'Presentation Skills', level: 'Advanced' },
            { name: 'Market Analysis', level: 'Intermediate' }
          ],
          projects: [
            {
              name: 'Enterprise Client Acquisition Program',
              description: 'Developed and executed comprehensive sales strategy targeting Fortune 500 companies, resulting in 25 new enterprise clients and $8M in annual recurring revenue.',
              technologies: ['CRM', 'Sales Analytics', 'Lead Scoring', 'Account Planning'],
              start_date: '2023',
              end_date: '2023',
              link: ''
            },
            {
              name: 'Digital Transformation Sales Initiative',
              description: 'Led cross-functional team to develop sales methodology for cloud transformation services, achieving 180% of target in first quarter of launch.',
              technologies: ['Cloud Solutions', 'Digital Strategy', 'Customer Success', 'Sales Enablement'],
              start_date: '2022',
              end_date: '2023',
              link: ''
            }
          ]
        };

      case 'Legal':
        return {
          ...baseTemplate,
          personal_info: {
            full_name: 'David Thompson, Esq.',
            email: 'david.thompson@lawfirm.com',
            phone: '+1 (555) 456-7890',
            address: '321 Legal Plaza, Floor 25',
            city: 'Chicago',
            country: 'United States',
            postal_code: '60601',
            linkedin: 'https://linkedin.com/in/davidthompsonlaw',
            github: '',
            website: '',
            summary: 'Experienced Corporate Attorney with 10+ years specializing in mergers & acquisitions, securities law, and corporate governance. Licensed to practice in Illinois and New York with expertise in complex commercial transactions.'
          },
          education: [
            {
              degree: 'Juris Doctor (J.D.)',
              field_of_study: 'Corporate Law',
              institution: 'Harvard Law School',
              start_date: '2011',
              end_date: '2014',
              current: false,
              gpa: '',
              description: 'Magna Cum Laude. Editor, Harvard Law Review. Specialized in Corporate Finance and Securities Regulation.'
            },
            {
              degree: 'Bachelor of Arts',
              field_of_study: 'Political Science',
              institution: 'Northwestern University',
              start_date: '2007',
              end_date: '2011',
              current: false,
              gpa: '3.8',
              description: 'Summa Cum Laude. Phi Beta Kappa Honor Society.'
            }
          ],
          experience: [
            {
              position: 'Partner',
              company: 'Skadden, Arps, Slate, Meagher & Flom LLP',
              location: 'Chicago, IL',
              start_date: '2022',
              end_date: '',
              current: true,
              description: 'Lead corporate transactions practice group, advising Fortune 500 companies on complex M&A deals, securities offerings, and corporate governance matters.',
              achievements: [
                'Closed $2.5B in M&A transactions over the past two years',
                'Successfully defended major corporate client in $500M securities litigation',
                'Led due diligence team for 15+ IPO transactions',
                'Recognized as "Rising Star" by Super Lawyers for 5 consecutive years',
                'Published 12+ articles in leading legal journals'
              ]
            },
            {
              position: 'Senior Associate',
              company: 'Kirkland & Ellis LLP',
              location: 'Chicago, IL',
              start_date: '2017',
              end_date: '2022',
              current: false,
              description: 'Specialized in private equity transactions, representing both sponsors and portfolio companies in acquisition and exit strategies.',
              achievements: [
                'Participated in 50+ private equity transactions totaling $8B',
                'Drafted and negotiated complex purchase agreements',
                'Managed cross-border transactions across 10+ jurisdictions',
                'Mentored 8 junior associates and summer interns'
              ]
            }
          ],
          skills: [
            { name: 'Mergers & Acquisitions', level: 'Expert' },
            { name: 'Securities Law', level: 'Expert' },
            { name: 'Corporate Governance', level: 'Advanced' },
            { name: 'Contract Negotiation', level: 'Expert' },
            { name: 'Due Diligence', level: 'Expert' },
            { name: 'Litigation Management', level: 'Advanced' },
            { name: 'Regulatory Compliance', level: 'Advanced' },
            { name: 'Legal Research', level: 'Expert' }
          ],
          projects: [
            {
              name: 'Cross-Border Acquisition',
              description: 'Led legal team for $1.2B acquisition of European technology company by US-based Fortune 100 client, involving complex regulatory approvals across multiple jurisdictions.',
              technologies: ['Cross-border M&A', 'Regulatory Approval', 'Tax Structuring', 'Employment Law'],
              start_date: '2023',
              end_date: '2023',
              link: ''
            },
            {
              name: 'IPO Legal Advisory',
              description: 'Served as lead counsel for technology startup\'s $400M initial public offering, managing SEC filings, underwriter agreements, and compliance requirements.',
              technologies: ['Securities Law', 'SEC Compliance', 'Corporate Finance', 'Public Offerings'],
              start_date: '2022',
              end_date: '2023',
              link: ''
            }
          ]
        };

      default:
        // Default tech sample data
        return {
          ...baseTemplate,
          personal_info: {
            full_name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            address: '123 Professional Ave, Suite 100',
            city: 'San Francisco',
            country: 'United States',
            postal_code: '94105',
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            github: 'https://github.com/sarahjohnson',
            website: 'https://sarahjohnson.dev',
            summary: 'Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.'
          },
          education: [
            {
              degree: 'Master of Science',
              field_of_study: 'Computer Science',
              institution: 'Stanford University',
              start_date: '2016',
              end_date: '2018',
              current: false,
              gpa: '3.8',
              description: 'Specialized in Machine Learning and Distributed Systems.'
            },
            {
              degree: 'Bachelor of Science',
              field_of_study: 'Software Engineering',
              institution: 'UC Berkeley',
              start_date: '2012',
              end_date: '2016',
              current: false,
              gpa: '3.7',
              description: 'Magna Cum Laude. President of Computer Science Student Association.'
            }
          ],
          experience: [
            {
              position: 'Senior Software Engineer',
              company: 'TechCorp Inc.',
              location: 'San Francisco, CA',
              start_date: '2021',
              end_date: '',
              current: true,
              description: 'Lead development of microservices architecture serving 2M+ users.',
              achievements: [
                'Reduced application load time by 40%',
                'Led team of 4 developers',
                'Implemented CI/CD pipeline'
              ]
            },
            {
              position: 'Software Engineer',
              company: 'StartupXYZ',
              location: 'Palo Alto, CA',
              start_date: '2019',
              end_date: '2021',
              current: false,
              description: 'Full-stack development using React, Node.js, and PostgreSQL.',
              achievements: [
                'Developed RESTful APIs handling 10K+ requests',
                'Created responsive web application',
                'Integrated third-party payment systems'
              ]
            }
          ],
          skills: [
            { name: 'JavaScript', level: 'Expert' },
            { name: 'React', level: 'Expert' },
            { name: 'Node.js', level: 'Advanced' },
            { name: 'Python', level: 'Advanced' },
            { name: 'TypeScript', level: 'Advanced' },
            { name: 'AWS', level: 'Intermediate' }
          ],
          projects: [
            {
              name: 'E-Commerce Platform',
              description: 'Full-stack e-commerce solution with React frontend and Node.js backend.',
              technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
              start_date: '2023',
              end_date: '2023',
              link: 'https://github.com/sarahjohnson/ecommerce'
            }
          ]
        };
    }
  };

  // Sample data for preview (keeping for backward compatibility)
  const sampleResumeData: Resume = {
    template_id: templateId || '1',
    personal_info: {
      full_name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Professional Ave, Suite 100',
      city: 'San Francisco',
      country: 'United States',
      postal_code: '94105',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      website: 'https://sarahjohnson.dev',
      summary: 'Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams. Passionate about creating innovative solutions and mentoring junior developers.'
    },
    education: [
      {
        degree: 'Master of Science',
        field_of_study: 'Computer Science',
        institution: 'Stanford University',
        start_date: '2016',
        end_date: '2018',
        current: false,
        gpa: '3.8',
        description: 'Specialized in Machine Learning and Distributed Systems. Thesis on "Scalable Data Processing in Cloud Environments".'
      },
      {
        degree: 'Bachelor of Science',
        field_of_study: 'Software Engineering',
        institution: 'UC Berkeley',
        start_date: '2012',
        end_date: '2016',
        current: false,
        gpa: '3.7',
        description: 'Magna Cum Laude. President of Computer Science Student Association.'
      }
    ],
    experience: [
      {
        position: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        start_date: '2021',
        end_date: '',
        current: true,
        description: 'Lead development of microservices architecture serving 2M+ users. Collaborate with product and design teams to deliver high-quality features.',
        achievements: [
          'Reduced application load time by 40% through optimization techniques',
          'Led a team of 4 developers in building new customer dashboard',
          'Implemented CI/CD pipeline reducing deployment time by 60%',
          'Mentored 3 junior developers and conducted technical interviews'
        ]
      },
      {
        position: 'Software Engineer',
        company: 'StartupXYZ',
        location: 'Palo Alto, CA',
        start_date: '2019',
        end_date: '2021',
        current: false,
        description: 'Full-stack development using React, Node.js, and PostgreSQL. Built core features for B2B SaaS platform.',
        achievements: [
          'Developed RESTful APIs handling 10K+ requests per minute',
          'Created responsive web application with 99.9% uptime',
          'Integrated third-party payment systems and analytics tools'
        ]
      },
      {
        position: 'Junior Developer',
        company: 'Digital Solutions LLC',
        location: 'San Jose, CA',
        start_date: '2018',
        end_date: '2019',
        current: false,
        description: 'Worked on client projects using modern web technologies. Collaborated with senior developers to deliver quality software.',
        achievements: [
          'Built 5+ responsive websites for small businesses',
          'Improved code quality through peer reviews and testing',
          'Learned agile development methodologies and best practices'
        ]
      }
    ],
    skills: [
      { name: 'JavaScript', level: 'Expert' },
      { name: 'React', level: 'Expert' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'Git', level: 'Expert' },
      { name: 'GraphQL', level: 'Intermediate' },
      { name: 'Redis', level: 'Intermediate' }
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' },
      { name: 'French', proficiency: 'Basic' }
    ],
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and Stripe integration. Features include user authentication, product catalog, shopping cart, and order management.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
        start_date: '2023',
        end_date: '2023',
        link: 'https://github.com/sarahjohnson/ecommerce-platform'
      },
      {
        name: 'Task Management App',
        description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern React and WebSocket technology.',
        technologies: ['React', 'TypeScript', 'Socket.io', 'Express', 'MongoDB'],
        start_date: '2022',
        end_date: '2023',
        link: 'https://github.com/sarahjohnson/task-manager'
      },
      {
        name: 'Weather Dashboard',
        description: 'Interactive weather dashboard displaying current conditions and forecasts with beautiful data visualizations. Features location-based weather and historical data charts.',
        technologies: ['React', 'D3.js', 'Weather API', 'Chart.js'],
        start_date: '2022',
        end_date: '2022',
        link: 'https://weather-dashboard-sj.netlify.app'
      }
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        date: '2023',
        url: 'https://aws.amazon.com/certification/'
      },
      {
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022',
        url: 'https://developers.facebook.com/docs/react/'
      }
    ],
    references: [
      {
        name: 'Michael Chen',
        position: 'Engineering Manager',
        company: 'TechCorp Inc.',
        email: 'michael.chen@techcorp.com',
        phone: '+1 (555) 987-6543'
      },
      {
        name: 'Emily Rodriguez',
        position: 'Senior Developer',
        company: 'StartupXYZ',
        email: 'emily.r@startupxyz.com',
        phone: '+1 (555) 456-7890'
      }
    ]
  };

  const handleCreateCV = () => {
    navigate(`/builder/${templateId}`);
  };

  const handleBackToTemplates = () => {
    navigate('/templates');
  };

  if (loading) {
    return <div className="loading">Loading template...</div>;
  }

  return (
    <div className="template-preview-page">
      <div className="preview-header">
        <button onClick={handleBackToTemplates} className="back-button">
          ← Back to Templates
        </button>
        <div className="preview-actions">
          <button onClick={handleCreateCV} className="create-cv-button">
            Create Your CV
          </button>
        </div>
        <div className="header-spacer"></div>
      </div>

      <div className="fullscreen-preview">
        <div className="preview-container">
          <ResumePreview resume={template ? getSampleData(template) : sampleResumeData} />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewPage;