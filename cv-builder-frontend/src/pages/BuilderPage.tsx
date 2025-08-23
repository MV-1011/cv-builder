import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Resume } from '../types';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import { API_BASE_URL } from '../utils/api';
import './BuilderPage.css';

const BuilderPage: React.FC = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  
  const [resumeData, setResumeData] = useState<Resume>({
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
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' }
  ];

  const updateResumeData = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };


  const saveResume = async () => {
    try {
      // Clean up the data before sending
      const cleanedData = {
        ...resumeData,
        personal_info: {
          ...resumeData.personal_info,
          email: resumeData.personal_info.email || null,
          address: resumeData.personal_info.address || null,
          city: resumeData.personal_info.city || null,
          country: resumeData.personal_info.country || null,
          postal_code: resumeData.personal_info.postal_code || null,
          linkedin: resumeData.personal_info.linkedin || null,
          github: resumeData.personal_info.github || null,
          website: resumeData.personal_info.website || null,
          summary: resumeData.personal_info.summary || null,
        }
      };
      
      const response = await fetch(`${API_BASE_URL}/api/resumes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData)
      });

      if (response.ok) {
        const savedResume = await response.json();
        navigate(`/preview/${savedResume._id}`);
      } else {
        const errorData = await response.json();
        console.error('Error saving resume:', errorData);
        alert(`Error saving resume: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume. Please try again.');
    }
  };

  const downloadPDF = async () => {
    try {
      // Clean up the data before sending
      const cleanedData = {
        ...resumeData,
        personal_info: {
          ...resumeData.personal_info,
          email: resumeData.personal_info.email || null,
          address: resumeData.personal_info.address || null,
          city: resumeData.personal_info.city || null,
          country: resumeData.personal_info.country || null,
          postal_code: resumeData.personal_info.postal_code || null,
          linkedin: resumeData.personal_info.linkedin || null,
          github: resumeData.personal_info.github || null,
          website: resumeData.personal_info.website || null,
          summary: resumeData.personal_info.summary || null,
        }
      };
      
      const response = await fetch(`${API_BASE_URL}/api/resumes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData)
      });

      if (response.ok) {
        const savedResume = await response.json();
        window.open(`${API_BASE_URL}/api/resumes/${savedResume._id}/download`, '_blank');
      } else {
        const errorData = await response.json();
        console.error('Error downloading PDF:', errorData);
        alert(`Error downloading PDF: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    }
  };

  return (
    <div className="builder-page">
      <div className="builder-sidebar">
        <h2>Build Your CV</h2>
        <p className="builder-instructions">
          Fill out all sections below, then save to preview and customize your resume.
        </p>
        <div className="section-tabs">
          {sections.map(section => (
            <button
              key={section.id}
              className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="section-icon">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
        <div className="builder-actions">
          <button onClick={saveResume} className="save-btn">
            Save & Preview
          </button>
          <button onClick={downloadPDF} className="download-btn">
            Download PDF
          </button>
        </div>
      </div>

      <div className="builder-content">
        <div className="form-section">
          {activeSection === 'personal' && (
            <PersonalInfoForm
              data={resumeData.personal_info}
              onChange={(data) => updateResumeData('personal_info', data)}
            />
          )}
          {activeSection === 'experience' && (
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) => updateResumeData('experience', data)}
            />
          )}
          {activeSection === 'education' && (
            <EducationForm
              data={resumeData.education}
              onChange={(data) => updateResumeData('education', data)}
            />
          )}
          {activeSection === 'skills' && (
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) => updateResumeData('skills', data)}
            />
          )}
          {activeSection === 'projects' && (
            <ProjectsForm
              data={resumeData.projects}
              onChange={(data) => updateResumeData('projects', data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;