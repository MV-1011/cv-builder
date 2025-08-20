import React from 'react';
import { Resume } from '../../types';
import './CreativeDesignerTemplate.css';

interface Props {
  resume: Resume;
}

const CreativeDesignerTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="creative-designer-template">
      <div className="creative-sidebar">
        <div className="creative-header">
          <div className="profile-circle">
            <h1>{(resume.personal_info.full_name || 'Your Name').split(' ').map(n => n[0]).join('')}</h1>
          </div>
          <h2>{resume.personal_info.full_name || 'Your Name'}</h2>
          <div className="creative-subtitle">
            {resume.personal_info.summary || 'Creative Professional'}
          </div>
        </div>

        <div className="sidebar-content">
          <section className="sidebar-section">
            <h3>CONTACT</h3>
            <div className="contact-list">
              {resume.personal_info.email && (
                <div className="contact-item">
                  <span className="contact-icon">✉</span>
                  <span>{resume.personal_info.email}</span>
                </div>
              )}
              {resume.personal_info.phone && (
                <div className="contact-item">
                  <span className="contact-icon">☎</span>
                  <span>{resume.personal_info.phone}</span>
                </div>
              )}
              {resume.personal_info.city && resume.personal_info.country && (
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>{resume.personal_info.city}, {resume.personal_info.country}</span>
                </div>
              )}
              {resume.personal_info.linkedin && (
                <div className="contact-item">
                  <span className="contact-icon">💼</span>
                  <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
              )}
              {resume.personal_info.github && (
                <div className="contact-item">
                  <span className="contact-icon">💻</span>
                  <a href={resume.personal_info.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </section>

          {resume.skills.length > 0 && (
            <section className="sidebar-section">
              <h3>SKILLS</h3>
              <div className="skills-creative">
                {resume.skills.map((skill, index) => (
                  <div key={index} className="creative-skill-tag">
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.education.length > 0 && (
            <section className="sidebar-section">
              <h3>EDUCATION</h3>
              {resume.education.map((edu, index) => (
                <div key={index} className="sidebar-education-item">
                  <h4>{edu.degree}</h4>
                  <p>{edu.field_of_study}</p>
                  <strong>{edu.institution}</strong>
                  <div className="edu-year">
                    {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <div className="creative-main">
        {resume.experience.length > 0 && (
          <section className="main-section">
            <h2 className="main-title">
              <span className="title-icon">💼</span>
              EXPERIENCE
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="creative-experience-item">
                <div className="exp-header">
                  <h3>{exp.position}</h3>
                  <div className="exp-company-date">
                    <strong>{exp.company}</strong>
                    <span className="exp-date">
                      {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                    </span>
                  </div>
                </div>
                <p className="exp-description">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="creative-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {resume.projects.length > 0 && (
          <section className="main-section">
            <h2 className="main-title">
              <span className="title-icon">🚀</span>
              PROJECTS
            </h2>
            <div className="projects-creative-grid">
              {resume.projects.map((project, index) => (
                <div key={index} className="creative-project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="project-tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeDesignerTemplate;