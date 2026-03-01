import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import AboutCoRE from "./pages/aboutCoRE"
import Rules from "./components/rules"
import Round2 from "./components/round2"
import LazySection from "./components/LazySection"

// Main landing page with scrollable sections
function LandingPage() {
  return (
    <div className="h-[100dvh] overflow-y-auto scroll-smooth snap-y snap-mandatory">
      {/* Section 1 - Home (Load immediately, it's above the fold) */}
      <section className="snap-start snap-always h-[100dvh] bg-black text-white">
        <Home />
      </section>

      {/* Section 2 - About CoRE (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg text-white">
        <AboutCoRE />
      </LazySection>

      {/* Section 3 - Rules (Round 1) (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg">
        <Rules />
      </LazySection>

      {/* Section 4 - Round 2 (Lazy load when scrolling) */}
      <LazySection className="snap-start snap-always h-[100dvh] event-section-bg">
        <Round2 />
      </LazySection>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
