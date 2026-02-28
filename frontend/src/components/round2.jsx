import React from 'react'
import '../assets/fonts/fonts.css'

const Round2 = () => {
  return (
    <main className="round2-page">
      <section className="round2-content h-full flex flex-col">
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

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full sm:w-auto px-4 sm:px-0 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center sm:-translate-x-40 sm:-translate-y-15">
            <button
              className="w-full sm:w-auto bg-white text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-gray-100 transition-colors"
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
              onClick={() => window.open('https://drive.google.com/file/d/1_8RhqN2ud7jOgF6RCR6AhRcBuWhIibHF/view?usp=sharing', '_blank', 'noopener,noreferrer')}
            >
              Download Brochure
            </button>
            <button
              className="w-full sm:w-auto bg-[#E8B88A] text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-[#d9a87b] transition-colors"
              style={{ fontFamily: 'Poppins', fontWeight: 700 }}
              onClick={() => window.open('https://corevcet.wixsite.com/core/unleashed', '_blank', 'noopener,noreferrer')}
            >
              Register Now
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Round2
