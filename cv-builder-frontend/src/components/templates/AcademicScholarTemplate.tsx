import React from 'react';
import { Resume } from '../../types';
import './AcademicScholarTemplate.css';

interface Props {
  resume: Resume;
}

const AcademicScholarTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="academic-scholar-template">
      <div className="academic-header">
        <h1 className="scholar-name">{resume.personal_info.full_name || 'Your Name'}</h1>
        <div className="academic-title">
          {(resume.experience.length > 0 && resume.experience[0].position) || 'Academic Professional'}
        </div>
        
        <div className="contact-info-row">
          {resume.personal_info.email && (
            <span className="contact-detail">
              <span className="label">Email:</span> {resume.personal_info.email}
            </span>
          )}
          {resume.personal_info.phone && (
            <span className="contact-detail">
              <span className="label">Phone:</span> {resume.personal_info.phone}
            </span>
          )}
          {resume.personal_info.linkedin && (
            <span className="contact-detail">
              <span className="label">LinkedIn:</span>
              <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                {resume.personal_info.linkedin.replace('https://linkedin.com/in/', '')}
              </a>
            </span>
          )}
        </div>
        
        <div className="address-row">
          {(resume.personal_info.address || resume.personal_info.city || resume.personal_info.country) && (
            <span className="address-detail">
              {resume.personal_info.address && `${resume.personal_info.address}, `}
              {resume.personal_info.city && `${resume.personal_info.city}, `}
              {resume.personal_info.country}
              {resume.personal_info.postal_code && ` ${resume.personal_info.postal_code}`}
            </span>
          )}
          {resume.personal_info.website && (
            <span className="website-detail">
              <span className="label">Website:</span>
              <a href={resume.personal_info.website} target="_blank" rel="noopener noreferrer">
                {resume.personal_info.website}
              </a>
            </span>
          )}
        </div>
      </div>

      <div className="academic-body">
        {resume.personal_info.summary && (
          <section className="academic-section">
            <h2 className="section-heading">PROFESSIONAL PROFILE</h2>
            <p className="summary-text">{resume.personal_info.summary}</p>
          </section>
        )}

        {resume.education.length > 0 && (
          <section className="academic-section">
            <h2 className="section-heading">EDUCATION</h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="education-entry">
                <div className="edu-header">
                  <div className="edu-title">
                    <strong className="degree-name">{edu.degree}</strong>
                    {edu.field_of_study && <span className="field-study"> in {edu.field_of_study}</span>}
                  </div>
                  <div className="edu-dates">
                    {edu.start_date} – {edu.current ? 'Present' : edu.end_date}
                  </div>
                </div>
                <div className="institution-name">{edu.institution}</div>
                {edu.gpa && (
                  <div className="edu-details">GPA: {edu.gpa}</div>
                )}
                {edu.description && (
                  <div className="edu-description">{edu.description}</div>
                )}
              </div>
            ))}
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="academic-section">
            <h2 className="section-heading">ACADEMIC & PROFESSIONAL EXPERIENCE</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="experience-entry">
                <div className="exp-header">
                  <div className="exp-title">
                    <strong className="position-name">{exp.position}</strong>
                  </div>
                  <div className="exp-dates">
                    {exp.start_date} – {exp.current ? 'Present' : exp.end_date}
                  </div>
                </div>
                <div className="institution-employer">
                  {exp.company}
                  {exp.location && <span className="location"> • {exp.location}</span>}
                </div>
                {exp.description && (
                  <p className="exp-description">{exp.description}</p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="achievements-list">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Publications Section (using projects as publications for academic context) */}
        {resume.projects && resume.projects.length > 0 && (
          <section className="academic-section">
            <h2 className="section-heading">RESEARCH & PUBLICATIONS</h2>
            {resume.projects.map((project, index) => (
              <div key={index} className="publication-entry">
                <div className="pub-title">
                  <strong>{project.name}</strong>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="pub-link">
                      [Link]
                    </a>
                  )}
                </div>
                <div className="pub-description">{project.description}</div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="pub-keywords">
                    <span className="keywords-label">Keywords:</span>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="keyword">
                        {tech}{i < project.technologies.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}
                {(project.start_date || project.end_date) && (
                  <div className="pub-date">
                    {project.end_date || project.start_date}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="academic-columns">
          <div className="left-column">
            {resume.skills.length > 0 && (
              <section className="academic-section">
                <h2 className="section-heading">AREAS OF EXPERTISE</h2>
                <div className="expertise-grid">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="expertise-item">
                      <span className="expertise-name">{skill.name}</span>
                      {skill.level && (
                        <span className="expertise-level">({skill.level})</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resume.certifications && resume.certifications.length > 0 && (
              <section className="academic-section">
                <h2 className="section-heading">CERTIFICATIONS & HONORS</h2>
                {resume.certifications.map((cert, index) => (
                  <div key={index} className="certification-entry">
                    <div className="cert-title">{cert.name}</div>
                    <div className="cert-details">
                      {cert.issuer} • {cert.date}
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          <div className="right-column">
            {resume.languages && resume.languages.length > 0 && (
              <section className="academic-section">
                <h2 className="section-heading">LANGUAGES</h2>
                <div className="languages-grid">
                  {resume.languages.map((lang, index) => (
                    <div key={index} className="language-entry">
                      <span className="lang-name">{lang.name}</span>
                      <span className="lang-level">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resume.references && resume.references.length > 0 && (
              <section className="academic-section">
                <h2 className="section-heading">REFERENCES</h2>
                {resume.references.map((ref, index) => (
                  <div key={index} className="reference-entry">
                    <div className="ref-name">{ref.name}</div>
                    <div className="ref-position">{ref.position}</div>
                    <div className="ref-company">{ref.company}</div>
                    {ref.email && (
                      <div className="ref-contact">Email: {ref.email}</div>
                    )}
                    {ref.phone && (
                      <div className="ref-contact">Phone: {ref.phone}</div>
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

export default AcademicScholarTemplate;