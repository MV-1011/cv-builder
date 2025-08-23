import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Resume } from '../types';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import { API_BASE_URL } from '../utils/api';
import { getSampleDataForTemplate } from '../utils/templateSampleData';
import './BuilderPage.css';

const BuilderPage: React.FC = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  
  const [resumeData, setResumeData] = useState<Resume>(() => {
    // Get template-specific sample data based on templateId
    const sampleData = getSampleDataForTemplate(templateId || '1');
    // Ensure template_id matches the current template
    return {
      ...sampleData,
      template_id: templateId || '1'
    };
  });

  // Update resume data when template changes
  useEffect(() => {
    const newSampleData = getSampleDataForTemplate(templateId || '1');
    setResumeData({
      ...newSampleData,
      template_id: templateId || '1'
    });
  }, [templateId]);

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
        // Open PDF download in new tab
        window.open(`${API_BASE_URL}/api/resumes/${savedResume._id}/download?format=pdf`, '_blank');
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

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personal_info}
            onChange={(data) => updateResumeData('personal_info', data)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => updateResumeData('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => updateResumeData('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => updateResumeData('skills', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => updateResumeData('projects', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="builder-page">
      <div className="builder-container">
        <div className="builder-sidebar">
          <div className="template-info">
            <h2>CV Builder</h2>
            <p>Template {templateId}</p>
          </div>
          
          <nav className="builder-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </nav>

          <div className="builder-actions">
            <button 
              className="save-btn"
              onClick={saveResume}
            >
              Save & Preview
            </button>
            <button 
              className="download-btn"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className="builder-content">
          <div className="form-section">
            <h3>{sections.find(s => s.id === activeSection)?.label}</h3>
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;