import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from "./pages/Home"
import AboutCoRE from "./pages/aboutCoRE"
import Rules from "./components/rules"
import Round2 from "./components/round2"
import LoadingSpinner from "./components/LoadingSpinner"
import LazySection from "./components/LazySection"

// Lazy load route components that aren't part of the main landing page
const Login = lazy(() => import("./components/login"))
const Signup = lazy(() => import("./components/signup"))
const Registration = lazy(() => import("./components/registration"))

// Main landing page with scrollable sections
function LandingPage() {
  return (
    <div className="scroll-smooth">
      {/* Section 1 - Home (Load immediately, it's above the fold) */}
      <section className="bg-black text-white">
        <Home />
      </section>

      {/* Section 2 - About CoRE (Lazy load when scrolling) */}
      <LazySection className="bg-black text-white">
        <AboutCoRE />
      </LazySection>

      {/* Section 3 - Rules (Round 1) (Lazy load when scrolling) */}
      <LazySection>
        <Rules />
      </LazySection>

      {/* Section 4 - Round 2 (Lazy load when scrolling) */}
      <LazySection>
        <Round2 />
      </LazySection>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Suspense>
  );
}
