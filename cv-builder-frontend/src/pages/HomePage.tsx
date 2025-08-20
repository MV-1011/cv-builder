import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Build Your Professional CV in Minutes</h1>
          <p>Create a stunning resume with our free, easy-to-use CV builder. Choose from professional templates and land your dream job.</p>
          <div className="hero-buttons">
            <Link to="/templates" className="btn btn-primary">
              Browse Templates
            </Link>
            <Link to="/builder" className="btn btn-secondary">
              Start Building
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features">
        <h2>Why Choose Our CV Builder?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Professional Templates</h3>
            <p>Choose from a variety of professionally designed templates that suit your industry.</p>
          </div>
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Simple drag-and-drop interface makes creating your CV quick and painless.</p>
          </div>
          <div className="feature-card">
            <h3>ATS-Friendly</h3>
            <p>Our templates are optimized to pass through Applicant Tracking Systems.</p>
          </div>
          <div className="feature-card">
            <h3>Free to Download</h3>
            <p>Download your CV in PDF format completely free. No hidden charges.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;