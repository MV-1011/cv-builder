import React from 'react';
import { Resume } from '../../types';
import './ModernExecutiveTemplate.css';

interface Props {
  resume: Resume;
}

const ModernExecutiveTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="modern-executive-template">
      <div className="executive-header">
        <div className="header-content">
          <div className="executive-name">
            <h1>{resume.personal_info.full_name || 'Your Name'}</h1>
            <div className="executive-title">
              {resume.personal_info.summary || 'Professional Title'}
            </div>
          </div>
          <div className="executive-contact">
            {resume.personal_info.email && <div className="contact-item">📧 {resume.personal_info.email}</div>}
            {resume.personal_info.phone && <div className="contact-item">📞 {resume.personal_info.phone}</div>}
            {resume.personal_info.city && resume.personal_info.country && (
              <div className="contact-item">📍 {resume.personal_info.city}, {resume.personal_info.country}</div>
            )}
            {resume.personal_info.linkedin && (
              <div className="contact-item">
                💼 <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="executive-content">
        {resume.experience.length > 0 && (
          <section className="executive-section">
            <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
            <div className="section-content">
              {resume.experience.map((exp, index) => (
                <div key={index} className="executive-experience-item">
                  <div className="experience-timeline">
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="experience-details">
                    <div className="experience-header">
                      <h3>{exp.position}</h3>
                      <div className="experience-meta">
                        <strong>{exp.company}</strong>
                        <span className="date-range">
                          {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                        </span>
                      </div>
                    </div>
                    <p className="experience-description">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="achievements-list">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="executive-two-column">
          {resume.education.length > 0 && (
            <section className="executive-section">
              <h2 className="section-title">EDUCATION</h2>
              <div className="section-content">
                {resume.education.map((edu, index) => (
                  <div key={index} className="executive-education-item">
                    <h3>{edu.degree} in {edu.field_of_study}</h3>
                    <div className="education-details">
                      <strong>{edu.institution}</strong>
                      <span className="education-date">
                        {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                      </span>
                    </div>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.skills.length > 0 && (
            <section className="executive-section">
              <h2 className="section-title">CORE COMPETENCIES</h2>
              <div className="section-content">
                <div className="executive-skills-grid">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="executive-skill-item">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {resume.projects.length > 0 && (
          <section className="executive-section">
            <h2 className="section-title">KEY PROJECTS</h2>
            <div className="section-content">
              <div className="projects-grid">
                {resume.projects.map((project, index) => (
                  <div key={index} className="executive-project-item">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="project-technologies">
                        {project.technologies.join(' • ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernExecutiveTemplate;