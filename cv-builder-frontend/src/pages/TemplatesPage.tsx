import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Template, Resume } from '../types';
import ResumePreview from '../components/ResumePreview';
import './TemplatesPage.css';

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultTemplates: Template[] = [
    {
      _id: '1',
      name: 'Professional',
      description: 'Clean and professional template perfect for corporate positions',
      category: 'Business',
      is_premium: false,
      sections: ['personal', 'experience', 'education', 'skills'],
      color_scheme: { primary: '#2c3e50', secondary: '#3498db' },
      font_family: 'Arial',
      layout: 'single-column'
    },
    {
      _id: '2',
      name: 'Modern Executive',
      description: 'Sophisticated design for senior executives and managers',
      category: 'Executive',
      is_premium: false,
      sections: ['personal', 'experience', 'education', 'skills'],
      color_scheme: { primary: '#1a237e', secondary: '#3f51b5' },
      font_family: 'Roboto',
      layout: 'modern-executive'
    },
    {
      _id: '3',
      name: 'Creative Designer',
      description: 'Bold and creative template perfect for designers and artists',
      category: 'Creative',
      is_premium: false,
      sections: ['personal', 'portfolio', 'skills', 'experience'],
      color_scheme: { primary: '#e91e63', secondary: '#ff5722' },
      font_family: 'Montserrat',
      layout: 'creative-designer'
    },
    {
      _id: '4',
      name: 'Minimalist Clean',
      description: 'Ultra-clean minimal design that lets content shine',
      category: 'Minimal',
      is_premium: false,
      sections: ['personal', 'experience', 'education', 'skills'],
      color_scheme: { primary: '#424242', secondary: '#757575' },
      font_family: 'Inter',
      layout: 'minimalist-clean'
    },
    {
      _id: '5',
      name: 'Academic Scholar',
      description: 'Traditional academic template for researchers and professors',
      category: 'Academic',
      is_premium: false,
      sections: ['personal', 'education', 'experience', 'skills', 'publications'],
      color_scheme: { primary: '#1b5e20', secondary: '#388e3c' },
      font_family: 'Times New Roman',
      layout: 'academic-scholar'
    },
    {
      _id: '6',
      name: 'Tech Professional',
      description: 'Modern tech-focused template with sidebar layout',
      category: 'Technology',
      is_premium: false,
      sections: ['personal', 'skills', 'experience', 'projects'],
      color_scheme: { primary: '#0d47a1', secondary: '#2196f3' },
      font_family: 'Source Code Pro',
      layout: 'tech-sidebar'
    },
    {
      _id: '7',
      name: 'Creative Portfolio',
      description: 'Showcase your creativity with this portfolio-style template',
      category: 'Portfolio',
      is_premium: false,
      sections: ['personal', 'portfolio', 'experience', 'skills'],
      color_scheme: { primary: '#7b1fa2', secondary: '#e1bee7' },
      font_family: 'Poppins',
      layout: 'creative-portfolio'
    },
    {
      _id: '8',
      name: 'Corporate Executive',
      description: 'Premium executive template with elegant typography',
      category: 'Executive',
      is_premium: true,
      sections: ['personal', 'experience', 'education', 'skills'],
      color_scheme: { primary: '#bf360c', secondary: '#ff8a65' },
      font_family: 'Playfair Display',
      layout: 'corporate-executive'
    },
    {
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
    {
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
    {
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
  ];

  const displayTemplates = templates.length > 0 ? templates : defaultTemplates;

  // Function to get profession-specific sample data
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

  // Sample data for template previews (keeping original for backward compatibility)
  const sampleResumeData: Resume = {
    template_id: '1',
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
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' }
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
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        date: '2023',
        url: 'https://aws.amazon.com/certification/'
      }
    ],
    references: [
      {
        name: 'Michael Chen',
        position: 'Engineering Manager',
        company: 'TechCorp Inc.',
        email: 'michael.chen@techcorp.com',
        phone: '+1 (555) 987-6543'
      }
    ]
  };

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>Choose Your Template</h1>
        <p>Select from our professionally designed templates</p>
      </div>
      
      {loading ? (
        <div className="loading">Loading templates...</div>
      ) : (
        <div className="templates-grid">
          {displayTemplates.map((template) => (
            <div key={template._id} className="template-card">
              <div className="template-preview-container">
                <div className="mini-preview">
                  <ResumePreview 
                    resume={getSampleData(template)}
                  />
                </div>
              </div>
              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <div className="template-meta">
                  <span className="template-category">{template.category}</span>
                  {template.is_premium && <span className="premium-badge">Premium</span>}
                </div>
                <Link to={`/template-preview/${template._id}`} className="use-template-btn">
                  Preview Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;