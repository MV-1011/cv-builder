import React, { useState } from 'react';
import { Experience } from '../../types';
import './Forms.css';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<Props> = ({ data, onChange }) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    company: '',
    position: '',
    location: '',
    start_date: '',
    end_date: '',
    current: false,
    description: '',
    achievements: []
  });
  const [newAchievement, setNewAchievement] = useState('');

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      onChange([...data, newExperience]);
      setNewExperience({
        company: '',
        position: '',
        location: '',
        start_date: '',
        end_date: '',
        current: false,
        description: '',
        achievements: []
      });
      setNewAchievement('');
    }
  };

  const handleRemoveExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleAddAchievement = () => {
    if (newAchievement) {
      setNewExperience({
        ...newExperience,
        achievements: [...newExperience.achievements, newAchievement]
      });
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: newExperience.achievements.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="form-container">
      <h2>Work Experience</h2>
      
      <div className="existing-items">
        {data.map((exp, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h4>{exp.position} at {exp.company}</h4>
              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
            <p>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</p>
            {exp.location && <p>{exp.location}</p>}
            <p>{exp.description}</p>
            {exp.achievements.length > 0 && (
              <ul>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="add-new-section">
        <h3>Add New Experience</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
              placeholder="Company Name"
            />
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              value={newExperience.position}
              onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
              placeholder="Job Title"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={newExperience.location || ''}
            onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
            placeholder="City, Country"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="month"
              value={newExperience.start_date}
              onChange={(e) => setNewExperience({...newExperience, start_date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="month"
              value={newExperience.end_date || ''}
              onChange={(e) => setNewExperience({...newExperience, end_date: e.target.value})}
              disabled={newExperience.current}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={newExperience.current}
                onChange={(e) => setNewExperience({...newExperience, current: e.target.checked})}
              />
              Current Job
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
            placeholder="Describe your responsibilities and role..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Key Achievements</label>
          <div className="achievements-list">
            {newExperience.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span>{achievement}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  className="remove-small-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="input-with-button">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add an achievement..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
            />
            <button type="button" onClick={handleAddAchievement} className="add-small-btn">
              Add
            </button>
          </div>
        </div>

        <button type="button" onClick={handleAddExperience} className="add-btn">
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;