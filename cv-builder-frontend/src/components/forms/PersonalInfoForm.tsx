import React from 'react';
import { PersonalInfo } from '../../types';
import './Forms.css';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="form-container">
      <h2>Personal Information</h2>
      
      <div className="form-group">
        <label htmlFor="full_name">Full Name *</label>
        <input
          type="text"
          id="full_name"
          value={data.full_name}
          onChange={(e) => handleChange('full_name', e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 234 567 8900"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={data.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="123 Main Street"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={data.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="New York"
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={data.country || ''}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder="USA"
          />
        </div>

        <div className="form-group">
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            value={data.postal_code || ''}
            onChange={(e) => handleChange('postal_code', e.target.value)}
            placeholder="10001"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github">GitHub</label>
          <input
            type="url"
            id="github"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="website">Personal Website</label>
        <input
          type="url"
          id="website"
          value={data.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="https://johndoe.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a brief summary about yourself, your experience, and career objectives..."
          rows={5}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;