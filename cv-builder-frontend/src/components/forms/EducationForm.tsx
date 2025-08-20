import React, { useState } from 'react';
import { Education } from '../../types';
import './Forms.css';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<Props> = ({ data, onChange }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    current: false,
    gpa: '',
    description: ''
  });

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      onChange([...data, newEducation]);
      setNewEducation({
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        current: false,
        gpa: '',
        description: ''
      });
    }
  };

  const handleRemoveEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <h2>Education</h2>
      
      <div className="existing-items">
        {data.map((edu, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h4>{edu.degree} in {edu.field_of_study}</h4>
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
            <p>{edu.institution}</p>
            <p>{edu.start_date} - {edu.current ? 'Present' : edu.end_date}</p>
            {edu.gpa && <p>GPA: {edu.gpa}</p>}
            {edu.description && <p>{edu.description}</p>}
          </div>
        ))}
      </div>

      <div className="add-new-section">
        <h3>Add New Education</h3>
        
        <div className="form-group">
          <label>Institution *</label>
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
            placeholder="University Name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Degree *</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
              placeholder="Bachelor's, Master's, PhD, etc."
            />
          </div>

          <div className="form-group">
            <label>Field of Study *</label>
            <input
              type="text"
              value={newEducation.field_of_study}
              onChange={(e) => setNewEducation({...newEducation, field_of_study: e.target.value})}
              placeholder="Computer Science, Business, etc."
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="month"
              value={newEducation.start_date}
              onChange={(e) => setNewEducation({...newEducation, start_date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="month"
              value={newEducation.end_date || ''}
              onChange={(e) => setNewEducation({...newEducation, end_date: e.target.value})}
              disabled={newEducation.current}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={newEducation.current}
                onChange={(e) => setNewEducation({...newEducation, current: e.target.checked})}
              />
              Currently Studying
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>GPA</label>
          <input
            type="text"
            value={newEducation.gpa || ''}
            onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
            placeholder="3.8/4.0"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newEducation.description || ''}
            onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
            placeholder="Relevant coursework, honors, activities..."
            rows={3}
          />
        </div>

        <button type="button" onClick={handleAddEducation} className="add-btn">
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm;