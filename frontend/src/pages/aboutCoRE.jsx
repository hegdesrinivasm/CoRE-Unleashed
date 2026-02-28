import React from 'react';
import './aboutCoRE.css';
import core_text from '../assets/core_text.svg';

const AboutCoRE = () => {
  return (
    <section className="about-core-section">
      <div className="about-core-content">
        <h2 className="about-core-title">
          <span className="about-core-title-stencil">ABOUT </span>
          <img 
            src={core_text}
            alt="CoRE" 
            className="about-core-title-logo"
          />
        </h2>

        <div className="about-core-text-content">
          <p className="about-core-paragraph">
            CoRE (Center of Research Excellency) is a community of engineering students who are passionate about learning, growing and exploring various fields of engineering.
          </p>

          <p className="about-core-paragraph">
          Being a part of CoRE means engaging in:
          </p>

          <ul className="about-core-list">
            <li className="about-core-list-item">
              <strong>Events & Activities:</strong> Engaging workshops, hackathons and collaborative sessions.
            </li>
            <li className="about-core-list-item">
              <strong>Community Connections:</strong> A supportive network of peers to exchange ideas and showcase work.
            </li>
            <li className="about-core-list-item">
              <strong>Opportunities for Growth:</strong> A space to experiment, learn new skills and apply them in real - world contexts.
            </li>
          </ul>

          <p className="about-core-paragraph">
            CoRE is more than just a club - it's a movement that encourages students to step beyond academics, collaborate creatively and prepare for future challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCoRE;
