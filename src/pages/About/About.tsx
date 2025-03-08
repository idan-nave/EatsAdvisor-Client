import React from 'react'
import './about.css'

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About EatsAdvisor</h1>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          EatsAdvisor is dedicated to making dining out easier for everyone, especially those with dietary restrictions, 
          allergies, or specific preferences. We believe that everyone deserves to enjoy a meal without worry.
        </p>
      </section>
      
      <section className="about-section">
        <h2>How It Works</h2>
        <p>
          Simply upload a photo of any menu, and our advanced AI will analyze it to identify dishes that match your 
          dietary preferences. We'll highlight options that are safe for you to eat and flag potential concerns.
        </p>
        <ol className="how-it-works-steps">
          <li>Sign in with your Google account</li>
          <li>Set up your dietary preferences and restrictions</li>
          <li>Upload a photo of any restaurant menu</li>
          <li>Receive personalized recommendations based on your profile</li>
        </ol>
      </section>
      
      <section className="about-section">
        <h2>Our Technology</h2>
        <p>
          EatsAdvisor uses cutting-edge optical character recognition (OCR) and natural language processing (NLP) 
          to analyze menu items. Our system is constantly learning and improving to provide more accurate recommendations.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Privacy & Security</h2>
        <p>
          We take your privacy seriously. Your dietary information is stored securely and is only used to provide 
          personalized recommendations. We never share your personal data with third parties without your explicit consent.
        </p>
      </section>
      
      <div className="copyright">
        © {new Date().getFullYear()} EatsAdvisor. All rights reserved.
      </div>
    </div>
  )
}

export default About
