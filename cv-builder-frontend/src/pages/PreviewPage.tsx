import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Resume } from '../types';
import ResumePreview from '../components/ResumePreview';
import { API_BASE_URL } from '../utils/api';
import './PreviewPage.css';

const PreviewPage: React.FC = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchResume = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resumes/${resumeId}`);
      if (response.ok) {
        const data = await response.json();
        setResume(data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(`${API_BASE_URL}/api/resumes/${resumeId}/download`, '_blank');
  };

  const handleEdit = () => {
    navigate(`/builder/${resume?.template_id}`);
  };

  if (loading) {
    return <div className="loading">Loading resume...</div>;
  }

  if (!resume) {
    return <div className="error">Resume not found</div>;
  }

  return (
    <div className="preview-page">
      <div className="preview-header">
        <div className="preview-actions">
          <button onClick={handleEdit} className="edit-btn">
            Edit Resume
          </button>
          <button onClick={handleDownload} className="download-btn">
            Download PDF
          </button>
        </div>
      </div>
      <div className="preview-container">
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
};

export default PreviewPage;