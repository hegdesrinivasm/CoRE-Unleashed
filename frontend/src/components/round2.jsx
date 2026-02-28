import React from 'react'
import round2_bg from '../assets/background_about.png'
import mobile_bg from '../assets/Mobile.png'
import '../assets/fonts/fonts.css'

const Round2 = () => {
  return (
    <main
      className="round2-page"
      style={{
        backgroundImage: `url(${round2_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .round2-page {
            background-image: url(${mobile_bg}) !important;
            background-position: top center !important;
          }
        }
      `}</style>
      <section className="round2-content">
        <h2 className="round2-heading">ROUND 2: </h2>

        <div className="round2-list">
          <ul>
            <li>
              <strong>Duration:</strong> 36 Hours (Non-stop).
            </li>
            <li>
              <strong>Challenge:</strong> 5 distinct Problem Statements will be revealed on the spot.
            </li>
            <li>
              <strong>Task:</strong> Teams must choose one problem statement and build a working prototype within the 36-hour window.
            </li>
            <li>
              <strong>Venue:</strong> VCET Campus.
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Round2
