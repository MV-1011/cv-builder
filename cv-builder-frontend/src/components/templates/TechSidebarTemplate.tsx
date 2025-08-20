import React from 'react';
import { Resume } from '../../types';
import './TechSidebarTemplate.css';

interface Props {
  resume: Resume;
}

const TechSidebarTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="tech-sidebar-template">
      <div className="tech-left-sidebar">
        <div className="tech-profile">
          <div className="tech-avatar">
            <span>{(resume.personal_info.full_name || 'YN').split(' ').map(n => n[0]).join('')}</span>
          </div>
          <h1>{resume.personal_info.full_name || 'Your Name'}</h1>
          <p className="tech-role">
            {resume.personal_info.summary || 'Software Developer'}
          </p>
        </div>

        <div className="tech-sidebar-section">
          <h3><span className="section-icon">📧</span> CONTACT</h3>
          <div className="tech-contact-list">
            {resume.personal_info.email && (
              <div className="tech-contact-item">
                <strong>Email:</strong> {resume.personal_info.email}
              </div>
            )}
            {resume.personal_info.phone && (
              <div className="tech-contact-item">
                <strong>Phone:</strong> {resume.personal_info.phone}
              </div>
            )}
            {resume.personal_info.city && resume.personal_info.country && (
              <div className="tech-contact-item">
                <strong>Location:</strong> {resume.personal_info.city}, {resume.personal_info.country}
              </div>
            )}
            {resume.personal_info.linkedin && (
              <div className="tech-contact-item">
                <strong>LinkedIn:</strong> 
                <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                  Profile
                </a>
              </div>
            )}
            {resume.personal_info.github && (
              <div className="tech-contact-item">
                <strong>GitHub:</strong>
                <a href={resume.personal_info.github} target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>

        {resume.skills.length > 0 && (
          <div className="tech-sidebar-section">
            <h3><span className="section-icon">⚡</span> TECHNICAL SKILLS</h3>
            <div className="tech-skills-list">
              {resume.skills.map((skill, index) => (
                <div key={index} className="tech-skill-item">
                  <span className="skill-name">{skill.name}</span>
                  {skill.level && (
                    <div className="skill-level">
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{
                            width: skill.level === 'Expert' ? '100%' : 
                                   skill.level === 'Advanced' ? '80%' :
                                   skill.level === 'Intermediate' ? '60%' : '40%'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="tech-sidebar-section">
            <h3><span className="section-icon">🎓</span> EDUCATION</h3>
            {resume.education.map((edu, index) => (
              <div key={index} className="tech-education-item">
                <h4>{edu.degree}</h4>
                <p>{edu.field_of_study}</p>
                <strong>{edu.institution}</strong>
                <div className="tech-edu-year">
                  {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                </div>
                {edu.gpa && <div className="tech-gpa">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tech-main-content">
        {resume.experience.length > 0 && (
          <section className="tech-main-section">
            <h2 className="tech-section-title">
              <span className="title-bracket">&lt;</span>
              EXPERIENCE
              <span className="title-bracket">/&gt;</span>
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="tech-experience-item">
                <div className="tech-exp-header">
                  <div>
                    <h3>{exp.position}</h3>
                    <div className="tech-company">
                      <strong>{exp.company}</strong>
                      {exp.location && <span> | {exp.location}</span>}
                    </div>
                  </div>
                  <div className="tech-date-badge">
                    {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                  </div>
                </div>
                <p className="tech-description">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="tech-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>
                        <span className="achievement-bullet">▸</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {resume.projects.length > 0 && (
          <section className="tech-main-section">
            <h2 className="tech-section-title">
              <span className="title-bracket">&lt;</span>
              PROJECTS
              <span className="title-bracket">/&gt;</span>
            </h2>
            <div className="tech-projects-grid">
              {resume.projects.map((project, index) => (
                <div key={index} className="tech-project-card">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        <span className="link-icon">🔗</span>
                      </a>
                    )}
                  </div>
                  <p className="project-description">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="tech-stack">
                      <div className="tech-stack-label">Tech Stack:</div>
                      <div className="tech-tags">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default TechSidebarTemplate;