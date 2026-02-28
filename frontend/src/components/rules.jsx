import React from 'react'
import desktop_bg from '../assets/background_about.png'
import mobile_bg from '../assets/Mobile.png'
import '../assets/fonts/fonts.css'

const Rules = () => {
  return (
    <main 
      className="rules-page" 
      style={{
        backgroundImage: `url(${desktop_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .rules-page {
            background-image: url(${mobile_bg}) !important;
            background-position: top center !important;
          }
        }
      `}</style>
      <section className="rules-content">
        <h1 className="rules-heading">RULES :</h1>

        <div className="rules-section">
          <h2 className="round2-heading">
            ROUND 1:
          </h2>

          <div className="rules-list">
            <ul>
              <li>
                <strong>Format:</strong> Online Idea Submission.
              </li>
              <li>
                <strong>Theme:</strong> Open Innovation (Software Domain). You are free to choose any field or category.
              </li>
              <li>
                <strong>Submission:</strong> Teams must submit a PowerPoint Presentation detailing their proposed solution. (Template link to be provided)
              </li>
              <li>
                <strong>Selection:</strong> The top 25 Teams will be shortlisted to compete in the onsite finale.
              </li>
            </ul>
          </div>

          <div className="rules-pro-tip">
            <ul>
              <li>
                <strong>Pro-Tip:</strong> Want an edge? Teams that include a GitHub link to a working prototype or MVP in their submission will earn brownie points during evaluation.
              </li>
            </ul>
          </div>

          <div className="rules-download">
            <a href="#" className="rules-download-btn">
              Download Template
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Rules
