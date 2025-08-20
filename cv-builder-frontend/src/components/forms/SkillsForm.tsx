import React, { useState } from 'react';
import { Skill } from '../../types';
import './Forms.css';

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const SkillsForm: React.FC<Props> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    level: 'Intermediate'
  });

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleAddSkill = () => {
    if (newSkill.name) {
      onChange([...data, newSkill]);
      setNewSkill({
        name: '',
        level: 'Intermediate'
      });
    }
  };

  const handleRemoveSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <h2>Skills</h2>
      
      <div className="skills-grid">
        {data.map((skill, index) => (
          <div key={index} className="skill-chip">
            <span>{skill.name}</span>
            {skill.level && <span className="skill-level">({skill.level})</span>}
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="remove-chip-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="add-new-section">
        <h3>Add New Skill</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Skill Name *</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
              placeholder="e.g., JavaScript, Project Management, Photoshop"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
          </div>

          <div className="form-group">
            <label>Proficiency Level</label>
            <select
              value={newSkill.level || 'Intermediate'}
              onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
            >
              {skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="button" onClick={handleAddSkill} className="add-btn">
          Add Skill
        </button>
      </div>

      <div className="skill-suggestions">
        <h4>Suggested Skills by Category:</h4>
        <div className="suggestion-categories">
          <div className="suggestion-category">
            <h5>Programming</h5>
            <p>JavaScript, Python, Java, C++, React, Node.js, SQL, Git</p>
          </div>
          <div className="suggestion-category">
            <h5>Design</h5>
            <p>Photoshop, Illustrator, Figma, Sketch, UI/UX Design</p>
          </div>
          <div className="suggestion-category">
            <h5>Business</h5>
            <p>Project Management, Excel, Data Analysis, Marketing, Sales</p>
          </div>
          <div className="suggestion-category">
            <h5>Soft Skills</h5>
            <p>Leadership, Communication, Teamwork, Problem Solving</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;