import React from 'react';
import { Resume } from '../../types';
import './SalesExecutiveTemplate.css';

interface Props {
  resume: Resume;
}

const SalesExecutiveTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="sales-executive-template">
      <div className="sales-header">
        <div className="header-content">
          <div className="name-section">
            <h1>{resume.personal_info.full_name || 'Your Name'}</h1>
          </div>
          <div className="header-bottom">
            <div className="summary-section">
              <p className="sales-title">
                {resume.personal_info.summary || 'Sales Professional | Business Development Executive'}
              </p>
            </div>
            <div className="contact-section">
              <div className="contact-bar">
                {resume.personal_info.email && (
                  <span className="contact-item">
                    <span className="icon">✉</span> {resume.personal_info.email}
                  </span>
                )}
                {resume.personal_info.phone && (
                  <span className="contact-item">
                    <span className="icon">📱</span> {resume.personal_info.phone}
                  </span>
                )}
                {resume.personal_info.city && resume.personal_info.country && (
                  <span className="contact-item">
                    <span className="icon">📍</span> {resume.personal_info.city}, {resume.personal_info.country}
                  </span>
                )}
                {resume.personal_info.linkedin && (
                  <span className="contact-item">
                    <span className="icon">🔗</span>
                    <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sales-body">
        {/* Sales Experience */}
        {resume.experience.length > 0 && (
          <section className="sales-section">
            <h2 className="section-title">Professional Experience</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="sales-experience-item">
                <div className="exp-header">
                  <div className="exp-left">
                    <h3>{exp.position}</h3>
                    <p className="company-info">
                      <strong>{exp.company}</strong>
                      {exp.location && <span> • {exp.location}</span>}
                    </p>
                  </div>
                  <div className="exp-right">
                    <span className="period">
                      {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <p className="role-description">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <div className="achievements-section">
                    <h4>Key Achievements & Metrics:</h4>
                    <ul className="sales-achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>
                          <span className="achievement-marker">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="sales-columns">
          <div className="main-column">
            {/* Key Accounts / Projects */}
            {resume.projects.length > 0 && (
              <section className="sales-section">
                <h2 className="section-title">Key Accounts & Projects</h2>
                <div className="accounts-grid">
                  {resume.projects.map((project, index) => (
                    <div key={index} className="account-card">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="industries">
                          <strong>Industries/Products:</strong>
                          <div className="industry-tags">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="industry-tag">{tech}</span>
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

          <div className="side-column">
            {/* Core Competencies */}
            {resume.skills.length > 0 && (
              <section className="sales-section">
                <h2 className="section-title">Core Competencies</h2>
                <div className="competencies-grid">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="competency-item">
                      <span className="competency-icon">★</span>
                      <span className="competency-name">{skill.name}</span>
                      {skill.level && (
                        <div className="competency-level">
                          <div className="level-bar">
                            <div 
                              className="level-fill"
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
              </section>
            )}

            {/* Education & Training */}
            {resume.education.length > 0 && (
              <section className="sales-section">
                <h2 className="section-title">Education & Training</h2>
                {resume.education.map((edu, index) => (
                  <div key={index} className="education-card">
                    <h3>{edu.degree}</h3>
                    {edu.field_of_study && <p className="field">{edu.field_of_study}</p>}
                    <p className="institution">{edu.institution}</p>
                    <p className="edu-period">
                      {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                    </p>
                    {edu.gpa && <p className="performance">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>

        {/* Sales Performance Metrics Section */}
        <section className="sales-section metrics-section">
          <h2 className="section-title">Sales Performance Highlights</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">📈</div>
              <h4>Revenue Growth</h4>
              <p>Consistently exceeded sales targets</p>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🤝</div>
              <h4>Client Relations</h4>
              <p>Built strong B2B partnerships</p>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🎯</div>
              <h4>Target Achievement</h4>
              <p>High conversion rates</p>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🏆</div>
              <h4>Awards & Recognition</h4>
              <p>Top performer awards</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SalesExecutiveTemplate;