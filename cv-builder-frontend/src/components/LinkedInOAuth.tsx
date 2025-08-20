import React, { useState, useEffect } from 'react';
import { Resume } from '../types';
import './LinkedInOAuth.css';

interface Props {
  onImportSuccess: (importedData: Partial<Resume>) => void;
}

const LinkedInOAuth: React.FC<Props> = ({ onImportSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Check for OAuth callback on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      // We're returning from LinkedIn OAuth
      handleOAuthCallback(code, state);
      
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startLinkedInAuth = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/linkedin/oauth/login');
      const data = await response.json();

      if (data.auth_url) {
        // Redirect user to LinkedIn for authentication
        window.location.href = data.auth_url;
      } else {
        throw new Error(data.detail || 'Failed to get LinkedIn authorization URL');
      }
    } catch (error: any) {
      console.error('LinkedIn OAuth error:', error);
      setError(error.message || 'Failed to start LinkedIn authentication');
      setLoading(false);
    }
  };

  const handleOAuthCallback = async (code: string, state: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:8000/api/linkedin/oauth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
      );

      const data = await response.json();

      if (data.success && data.data) {
        setSuccess(true);
        onImportSuccess(data.data);
        
        if (data.note) {
          alert(`Success! ${data.message}\n\nNote: ${data.note}`);
        } else {
          alert(`Success! ${data.message}`);
        }
      } else {
        throw new Error(data.error || data.detail || 'Failed to import LinkedIn profile');
      }
    } catch (error: any) {
      console.error('OAuth callback error:', error);
      setError(error.message || 'Failed to complete LinkedIn authentication');
    } finally {
      setLoading(false);
    }
  };

  const isConfigured = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/api/linkedin/oauth/login');
      return response.status !== 500;
    } catch {
      return false;
    }
  };

  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    isConfigured().then(setConfigured);
  }, []);

  if (configured === null) {
    return <div className="linkedin-oauth-loading">Checking LinkedIn configuration...</div>;
  }

  if (!configured) {
    return (
      <div className="linkedin-oauth">
        <div className="linkedin-oauth-header">
          <div className="linkedin-icon">💼</div>
          <div>
            <h3>LinkedIn Integration</h3>
            <p>LinkedIn OAuth not configured</p>
          </div>
        </div>
        <div className="config-message">
          <p>To enable LinkedIn import:</p>
          <ol>
            <li>Create a LinkedIn app at <a href="https://developer.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn Developer Portal</a></li>
            <li>Add your Client ID and Client Secret to the backend configuration</li>
            <li>Set up redirect URL: <code>http://localhost:3000/auth/linkedin/callback</code></li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="linkedin-oauth">
      <div className="linkedin-oauth-header">
        <div className="linkedin-icon">💼</div>
        <div>
          <h3>Import from LinkedIn</h3>
          <p>Sign in with LinkedIn to automatically import your profile data</p>
        </div>
      </div>

      <div className="linkedin-oauth-content">
        <div className="oauth-description">
          <h4>What you'll get:</h4>
          <ul>
            <li>✅ Your name and professional headline</li>
            <li>✅ Current location and industry</li>
            <li>✅ Email address (with permission)</li>
            <li>✅ Professional summary</li>
            <li>✅ Profile picture</li>
          </ul>
          <p className="oauth-note">
            <strong>Note:</strong> The free LinkedIn API provides basic profile information. 
            You can add detailed work experience and education manually after import.
          </p>
        </div>

        <div className="oauth-action">
          <button
            onClick={startLinkedInAuth}
            disabled={loading}
            className="linkedin-signin-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Connecting to LinkedIn...
              </>
            ) : (
              <>
                <div className="linkedin-logo">
                  <span>in</span>
                </div>
                Sign in with LinkedIn
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            LinkedIn profile imported successfully!
          </div>
        )}

        <div className="oauth-privacy">
          <p>
            <strong>Privacy:</strong> We only access basic profile information that you choose to share. 
            You can revoke access anytime in your LinkedIn settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkedInOAuth;