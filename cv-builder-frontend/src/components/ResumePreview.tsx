import React from 'react';
import { Resume } from '../types';
import ModernExecutiveTemplate from './templates/ModernExecutiveTemplate';
import CreativeDesignerTemplate from './templates/CreativeDesignerTemplate';
import TechSidebarTemplate from './templates/TechSidebarTemplate';
import MinimalistCleanTemplate from './templates/MinimalistCleanTemplate';
import ProfessionalAccountantTemplate from './templates/ProfessionalAccountantTemplate';
import SalesExecutiveTemplate from './templates/SalesExecutiveTemplate';
import LegalProfessionalTemplate from './templates/LegalProfessionalTemplate';
import CreativePortfolioTemplate from './templates/CreativePortfolioTemplate';
import AcademicScholarTemplate from './templates/AcademicScholarTemplate';
import './ResumePreview.css';

interface Props {
  resume: Resume;
}

const ResumePreview: React.FC<Props> = ({ resume }) => {
  // Determine which template to use based on template_id
  const getTemplate = () => {
    const templateId = resume.template_id;
    
    // Map template IDs to specific templates
    switch (templateId) {
      case '2':
        return <ModernExecutiveTemplate resume={resume} />;
      case '3':
        return <CreativeDesignerTemplate resume={resume} />;
      case '4':
        return <MinimalistCleanTemplate resume={resume} />;
      case '5':
        return <AcademicScholarTemplate resume={resume} />;
      case '6':
        return <TechSidebarTemplate resume={resume} />;
      case '7':
        return <CreativePortfolioTemplate resume={resume} />;
      case '8':
        return <ModernExecutiveTemplate resume={resume} />;
      case '9':
        return <ProfessionalAccountantTemplate resume={resume} />;
      case '10':
        return <SalesExecutiveTemplate resume={resume} />;
      case '11':
        return <LegalProfessionalTemplate resume={resume} />;
      // Handle database template IDs as well
      case '68a309eb5bd4f4f3594268c9': // Creative from DB
        return <CreativeDesignerTemplate resume={resume} />;
      case '68a309eb5bd4f4f3594268ca': // Minimalist from DB
        return <MinimalistCleanTemplate resume={resume} />;
      case '68a309eb5bd4f4f3594268cb': // Executive from DB
        return <ModernExecutiveTemplate resume={resume} />;
      case '68a309eb5bd4f4f3594268cc': // Tech Pro from DB
        return <TechSidebarTemplate resume={resume} />;
      case '68a3a104ca6b026875831f3f': // Professional Accountant from DB
        return <ProfessionalAccountantTemplate resume={resume} />;
      case '68a3a111ca6b026875831f40': // Sales Executive from DB
        return <SalesExecutiveTemplate resume={resume} />;
      case '68a3a143ca6b026875831f41': // Legal Professional from DB
        return <LegalProfessionalTemplate resume={resume} />;
      default:
        // Default template (original single column)
        return renderDefaultTemplate();
    }
  };

  const renderDefaultTemplate = () => {
    return (
      <div className="resume-preview">
        <div className="resume-header">
          <h1>{resume.personal_info.full_name || 'Your Name'}</h1>
          <div className="contact-info">
            {resume.personal_info.email && <span>{resume.personal_info.email}</span>}
            {resume.personal_info.phone && <span>{resume.personal_info.phone}</span>}
            {resume.personal_info.city && resume.personal_info.country && (
              <span>{resume.personal_info.city}, {resume.personal_info.country}</span>
            )}
          </div>
          <div className="social-links">
            {resume.personal_info.linkedin && (
              <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {resume.personal_info.github && (
              <a href={resume.personal_info.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {resume.personal_info.website && (
              <a href={resume.personal_info.website} target="_blank" rel="noopener noreferrer">
                Website
              </a>
            )}
          </div>
        </div>

        {resume.personal_info.summary && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            <p>{resume.personal_info.summary}</p>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <span className="date-range">
                    {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                  </span>
                </div>
                <div className="company-location">
                  <strong>{exp.company}</strong>
                  {exp.location && <span> | {exp.location}</span>}
                </div>
                <p>{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {resume.education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <h3>{edu.degree} in {edu.field_of_study}</h3>
                  <span className="date-range">
                    {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                  </span>
                </div>
                <strong>{edu.institution}</strong>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {resume.skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {resume.skills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill.name}
                  {skill.level && <span className="skill-level"> ({skill.level})</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {resume.projects.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {resume.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="project-tech">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    );
  };

  // Return the appropriate template
  return getTemplate();
};

export default ResumePreview;