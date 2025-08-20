import React from 'react';
import { Resume } from '../../types';
import './ProfessionalAccountantTemplate.css';

interface Props {
  resume: Resume;
}

const ProfessionalAccountantTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="professional-accountant-template">
      <div className="accountant-header">
        <div className="header-main">
          <h1>{resume.personal_info.full_name || 'Your Name'}</h1>
          <p className="professional-title">
            {resume.personal_info.summary || 'Chartered Accountant | Financial Professional'}
          </p>
        </div>
        <div className="header-contact">
          <div className="contact-grid">
            {resume.personal_info.email && (
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <span>{resume.personal_info.email}</span>
              </div>
            )}
            {resume.personal_info.phone && (
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <span>{resume.personal_info.phone}</span>
              </div>
            )}
            {resume.personal_info.city && resume.personal_info.country && (
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span>{resume.personal_info.city}, {resume.personal_info.country}</span>
              </div>
            )}
            {resume.personal_info.linkedin && (
              <div className="contact-item">
                <span className="contact-label">LinkedIn:</span>
                <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                  Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="accountant-body">
        {/* Professional Summary */}
        {resume.personal_info.summary && (
          <section className="accountant-section">
            <h2 className="section-title">
              <span className="title-icon">📊</span>
              Professional Summary
            </h2>
            <p className="professional-summary">
              {resume.personal_info.summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {resume.experience.length > 0 && (
          <section className="accountant-section">
            <h2 className="section-title">
              <span className="title-icon">💼</span>
              Professional Experience
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="exp-header">
                  <div className="exp-title">
                    <h3>{exp.position}</h3>
                    <p className="company-name">{exp.company}</p>
                  </div>
                  <div className="exp-period">
                    <span className="date-badge">
                      {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                    </span>
                    {exp.location && <span className="location">{exp.location}</span>}
                  </div>
                </div>
                {exp.description && (
                  <p className="exp-description">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <div className="key-achievements">
                    <h4>Key Achievements:</h4>
                    <ul className="achievements-list">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="two-column-section">
          <div className="left-column">
            {/* Education & Certifications */}
            {resume.education.length > 0 && (
              <section className="accountant-section">
                <h2 className="section-title">
                  <span className="title-icon">🎓</span>
                  Education & Certifications
                </h2>
                {resume.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h3>{edu.degree}</h3>
                    {edu.field_of_study && <p className="field">{edu.field_of_study}</p>}
                    <p className="institution">{edu.institution}</p>
                    <p className="edu-period">
                      {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                    </p>
                    {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Professional Skills */}
            {resume.skills.length > 0 && (
              <section className="accountant-section">
                <h2 className="section-title">
                  <span className="title-icon">🔧</span>
                  Professional Skills
                </h2>
                <div className="skills-categories">
                  <div className="skill-category">
                    <h4>Technical Skills</h4>
                    <div className="skills-list">
                      {resume.skills.filter((_, index) => index % 2 === 0).map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{skill.name}</span>
                          {skill.level && (
                            <span className="skill-level">{skill.level}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="skill-category">
                    <h4>Software & Tools</h4>
                    <div className="skills-list">
                      {resume.skills.filter((_, index) => index % 2 === 1).map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span className="skill-name">{skill.name}</span>
                          {skill.level && (
                            <span className="skill-level">{skill.level}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="right-column">
            {/* Key Projects / Audit Engagements */}
            {resume.projects.length > 0 && (
              <section className="accountant-section">
                <h2 className="section-title">
                  <span className="title-icon">📈</span>
                  Key Projects & Engagements
                </h2>
                {resume.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3>{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="project-tools">
                        <strong>Tools Used:</strong>
                        <div className="tools-list">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="tool-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAccountantTemplate;