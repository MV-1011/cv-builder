import React, { useState } from 'react';
import { Project } from '../../types';
import './Forms.css';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm: React.FC<Props> = ({ data, onChange }) => {
  const [newProject, setNewProject] = useState<Project>({
    name: '',
    description: '',
    technologies: [],
    link: '',
    start_date: '',
    end_date: ''
  });
  const [newTechnology, setNewTechnology] = useState('');

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      onChange([...data, newProject]);
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        link: '',
        start_date: '',
        end_date: ''
      });
      setNewTechnology('');
    }
  };

  const handleRemoveProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleAddTechnology = () => {
    if (newTechnology) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTechnology]
      });
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="form-container">
      <h2>Projects</h2>
      
      <div className="existing-items">
        {data.map((project, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h4>{project.name}</h4>
              <button
                type="button"
                onClick={() => handleRemoveProject(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
            <p>{project.description}</p>
            {project.technologies.length > 0 && (
              <div className="tech-tags">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="add-new-section">
        <h3>Add New Project</h3>
        
        <div className="form-group">
          <label>Project Name *</label>
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            placeholder="Project Title"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            placeholder="Describe the project, your role, and achievements..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Technologies Used</label>
          <div className="tech-list">
            {newProject.technologies.map((tech, index) => (
              <span key={index} className="tech-chip">
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(index)}
                  className="remove-chip-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="input-with-button">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add technology (e.g., React, Node.js)"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
            />
            <button type="button" onClick={handleAddTechnology} className="add-small-btn">
              Add
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Project Link</label>
          <input
            type="url"
            value={newProject.link || ''}
            onChange={(e) => setNewProject({...newProject, link: e.target.value})}
            placeholder="https://github.com/username/project"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="month"
              value={newProject.start_date || ''}
              onChange={(e) => setNewProject({...newProject, start_date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="month"
              value={newProject.end_date || ''}
              onChange={(e) => setNewProject({...newProject, end_date: e.target.value})}
            />
          </div>
        </div>

        <button type="button" onClick={handleAddProject} className="add-btn">
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;