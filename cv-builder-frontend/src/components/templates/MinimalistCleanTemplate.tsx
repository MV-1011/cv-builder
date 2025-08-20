import React from 'react';
import { Resume } from '../../types';
import './MinimalistCleanTemplate.css';

interface Props {
  resume: Resume;
}

const MinimalistCleanTemplate: React.FC<Props> = ({ resume }) => {
  return (
    <div className="minimalist-clean-template">
      <header className="minimal-header">
        <h1 className="minimal-name">{resume.personal_info.full_name || 'Your Name'}</h1>
        <div className="minimal-contact">
          {resume.personal_info.email && <span>{resume.personal_info.email}</span>}
          {resume.personal_info.phone && <span>{resume.personal_info.phone}</span>}
          {resume.personal_info.city && resume.personal_info.country && (
            <span>{resume.personal_info.city}, {resume.personal_info.country}</span>
          )}
          {resume.personal_info.linkedin && (
            <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {resume.personal_info.summary && (
        <section className="minimal-section">
          <p className="minimal-summary">{resume.personal_info.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">Experience</h2>
          <div className="minimal-content">
            {resume.experience.map((exp, index) => (
              <div key={index} className="minimal-experience">
                <div className="minimal-exp-header">
                  <div className="minimal-exp-left">
                    <h3 className="minimal-position">{exp.position}</h3>
                    <div className="minimal-company">{exp.company}</div>
                  </div>
                  <div className="minimal-exp-right">
                    <div className="minimal-date">
                      {exp.start_date} – {exp.current ? 'Present' : exp.end_date}
                    </div>
                    {exp.location && <div className="minimal-location">{exp.location}</div>}
                  </div>
                </div>
                {exp.description && <p className="minimal-description">{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="minimal-achievements">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">Education</h2>
          <div className="minimal-content">
            {resume.education.map((edu, index) => (
              <div key={index} className="minimal-education">
                <div className="minimal-edu-header">
                  <div className="minimal-edu-left">
                    <h3 className="minimal-degree">{edu.degree}</h3>
                    <div className="minimal-field">{edu.field_of_study}</div>
                    <div className="minimal-institution">{edu.institution}</div>
                  </div>
                  <div className="minimal-edu-right">
                    <div className="minimal-date">
                      {edu.start_date} – {edu.current ? 'Present' : edu.end_date}
                    </div>
                    {edu.gpa && <div className="minimal-gpa">GPA: {edu.gpa}</div>}
                  </div>
                </div>
                {edu.description && <p className="minimal-description">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">Skills</h2>
          <div className="minimal-content">
            <div className="minimal-skills">
              {resume.skills.map((skill, index) => (
                <span key={index} className="minimal-skill">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">Projects</h2>
          <div className="minimal-content">
            {resume.projects.map((project, index) => (
              <div key={index} className="minimal-project">
                <div className="minimal-project-header">
                  <h3 className="minimal-project-name">{project.name}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="minimal-project-link">
                      View
                    </a>
                  )}
                </div>
                <p className="minimal-description">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="minimal-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="minimal-tech">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistCleanTemplate;