import React from 'react';
import { Resume } from '../../types';
import './LegalProfessionalTemplate.css';

interface Props {
  resume: Resume;
}

const LegalProfessionalTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="legal-professional-template">
      <div className="legal-header">
        <div className="header-top">
          <h1>{resume.personal_info.full_name || 'Your Name'}</h1>
          <p className="legal-designation">
            {resume.personal_info.summary?.split('.')[0] || 'Attorney at Law | Legal Counsel'}
          </p>
        </div>
        <div className="header-contact">
          <div className="contact-row">
            {resume.personal_info.email && (
              <span className="contact-item">
                <strong>Email:</strong> {resume.personal_info.email}
              </span>
            )}
            {resume.personal_info.phone && (
              <span className="contact-item">
                <strong>Phone:</strong> {resume.personal_info.phone}
              </span>
            )}
          </div>
          <div className="contact-row">
            {resume.personal_info.city && resume.personal_info.country && (
              <span className="contact-item">
                <strong>Address:</strong> {resume.personal_info.city}, {resume.personal_info.country}
              </span>
            )}
            {resume.personal_info.linkedin && (
              <span className="contact-item">
                <strong>LinkedIn:</strong> 
                <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                  {resume.personal_info.linkedin.replace('https://www.linkedin.com/in/', '')}
                </a>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="legal-body">
        {/* Professional Profile */}
        {resume.personal_info.summary && (
          <section className="legal-section">
            <h2 className="section-title">
              <span className="title-line"></span>
              Professional Profile
              <span className="title-line"></span>
            </h2>
            <p className="professional-profile">
              {resume.personal_info.summary}
            </p>
          </section>
        )}

        {/* Legal Experience */}
        {resume.experience.length > 0 && (
          <section className="legal-section">
            <h2 className="section-title">
              <span className="title-line"></span>
              Legal Experience
              <span className="title-line"></span>
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="legal-experience-item">
                <div className="exp-header">
                  <div className="exp-title">
                    <h3>{exp.position}</h3>
                    <p className="firm-name">{exp.company}</p>
                    {exp.location && <p className="location">{exp.location}</p>}
                  </div>
                  <div className="exp-date">
                    {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                  </div>
                </div>
                {exp.description && (
                  <p className="exp-description">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <div className="case-highlights">
                    <h4>Notable Cases & Achievements:</h4>
                    <ul className="legal-achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>
                          <span className="bullet">•</span>
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

        <div className="legal-grid">
          <div className="left-section">
            {/* Education & Bar Admissions */}
            {resume.education.length > 0 && (
              <section className="legal-section">
                <h2 className="section-title">
                  <span className="title-line"></span>
                  Education & Bar Admissions
                  <span className="title-line"></span>
                </h2>
                {resume.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h3>{edu.degree}</h3>
                    {edu.field_of_study && (
                      <p className="specialization">{edu.field_of_study}</p>
                    )}
                    <p className="institution">{edu.institution}</p>
                    <p className="edu-date">
                      {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                    </p>
                    {edu.gpa && <p className="honors">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Practice Areas */}
            {resume.skills.length > 0 && (
              <section className="legal-section">
                <h2 className="section-title">
                  <span className="title-line"></span>
                  Practice Areas & Expertise
                  <span className="title-line"></span>
                </h2>
                <div className="practice-areas">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="practice-item">
                      <span className="practice-icon">⚖</span>
                      <div className="practice-details">
                        <span className="practice-name">{skill.name}</span>
                        {skill.level && (
                          <span className="expertise-level">{skill.level}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="right-section">
            {/* Notable Cases / Pro Bono Work */}
            {resume.projects.length > 0 && (
              <section className="legal-section">
                <h2 className="section-title">
                  <span className="title-line"></span>
                  Notable Cases & Pro Bono Work
                  <span className="title-line"></span>
                </h2>
                {resume.projects.map((project, index) => (
                  <div key={index} className="case-item">
                    <h3>{project.name}</h3>
                    <p className="case-description">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="case-areas">
                        <strong>Areas of Law:</strong>
                        <div className="area-tags">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="area-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="case-link">
                        View Details →
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Professional Associations */}
            <section className="legal-section">
              <h2 className="section-title">
                <span className="title-line"></span>
                Professional Associations
                <span className="title-line"></span>
              </h2>
              <div className="associations-list">
                <div className="association-item">
                  <span className="assoc-icon">🏛</span>
                  <span>State Bar Association Member</span>
                </div>
                <div className="association-item">
                  <span className="assoc-icon">📚</span>
                  <span>Legal Research Society</span>
                </div>
                <div className="association-item">
                  <span className="assoc-icon">⚖</span>
                  <span>Professional Law Society</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalProfessionalTemplate;