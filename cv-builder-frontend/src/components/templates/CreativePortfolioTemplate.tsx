import React from 'react';
import { Resume } from '../../types';
import './CreativePortfolioTemplate.css';

interface Props {
  resume: Resume;
}

const CreativePortfolioTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="creative-portfolio-template">
      <div className="portfolio-header">
        <div className="header-content">
          <div className="header-main">
            <div className="name-section">
              <h1 className="portfolio-name">{resume.personal_info.full_name || 'Your Name'}</h1>
              <div className="portfolio-tagline">
                {(resume.experience.length > 0 && resume.experience[0].position) || 'Creative Professional'}
              </div>
            </div>
            
            <div className="contact-section">
              <div className="contact-items">
                {resume.personal_info.email && (
                  <div className="contact-item">
                    <span className="icon">✉</span> {resume.personal_info.email}
                  </div>
                )}
                {resume.personal_info.phone && (
                  <div className="contact-item">
                    <span className="icon">📞</span> {resume.personal_info.phone}
                  </div>
                )}
                {resume.personal_info.city && resume.personal_info.country && (
                  <div className="contact-item">
                    <span className="icon">📍</span> {resume.personal_info.city}, {resume.personal_info.country}
                  </div>
                )}
                {resume.personal_info.website && (
                  <div className="contact-item">
                    <span className="icon">🌐</span> 
                    <a href={resume.personal_info.website} target="_blank" rel="noopener noreferrer">
                      Portfolio
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="header-pattern"></div>
        </div>
      </div>

      <div className="portfolio-body">
        <div className="portfolio-main">
          {resume.personal_info.summary && (
            <section className="portfolio-section intro-section">
              <h2 className="section-title">About Me</h2>
              <p className="intro-text">{resume.personal_info.summary}</p>
            </section>
          )}

          {resume.projects && resume.projects.length > 0 && (
            <section className="portfolio-section">
              <h2 className="section-title">Featured Projects</h2>
              <div className="projects-grid">
                {resume.projects.map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-header">
                      <h3>{project.name}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          View Project →
                        </a>
                      )}
                    </div>
                    <p className="project-description">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-tech">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-date">
                      {project.start_date} {project.end_date && `- ${project.end_date}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.experience.length > 0 && (
            <section className="portfolio-section">
              <h2 className="section-title">Work Experience</h2>
              <div className="experience-timeline">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="experience-header">
                        <h3>{exp.position}</h3>
                        <span className="date-badge">
                          {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                        </span>
                      </div>
                      <div className="company-info">
                        <strong>{exp.company}</strong>
                        {exp.location && <span> • {exp.location}</span>}
                      </div>
                      <p className="experience-description">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="achievements">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="achievement-item">
                              <span className="achievement-marker">★</span>
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="portfolio-sidebar">
          {resume.skills.length > 0 && (
            <section className="sidebar-section">
              <h3>Skills & Expertise</h3>
              <div className="skills-cloud">
                {resume.skills.map((skill, index) => (
                  <div key={index} className={`skill-bubble ${skill.level?.toLowerCase()}`}>
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.education.length > 0 && (
            <section className="sidebar-section">
              <h3>Education</h3>
              {resume.education.map((edu, index) => (
                <div key={index} className="education-card">
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-field">{edu.field_of_study}</div>
                  <div className="edu-institution">{edu.institution}</div>
                  <div className="edu-period">
                    {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                  </div>
                  {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </section>
          )}

          {resume.languages && resume.languages.length > 0 && (
            <section className="sidebar-section">
              <h3>Languages</h3>
              <div className="languages-list">
                {resume.languages.map((lang, index) => (
                  <div key={index} className="language-item">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-prof">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.certifications && resume.certifications.length > 0 && (
            <section className="sidebar-section">
              <h3>Certifications</h3>
              {resume.certifications.map((cert, index) => (
                <div key={index} className="cert-item">
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-issuer">{cert.issuer}</div>
                  <div className="cert-date">{cert.date}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativePortfolioTemplate;