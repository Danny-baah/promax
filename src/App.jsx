import { CinematicHero } from './components/hero/CinematicHero';
import { AboutOverlaySection } from './components/about/AboutOverlaySection';
import { ServicesSection } from './components/services/ServicesSection';
import './App.css';

function App() {
  return (
    <div className="app-root">
      {/* 1. Cinematic Scroll-Driven Electrical Hero (Remains fixed in background) */}
      <CinematicHero />

      {/* 2. Section 2: Premium Architectural Overlay Section (Scrolls directly on top of the hero) */}
      <AboutOverlaySection />

      {/* 3. Section 3: Unsere Leistungen (Services - Continues normal scroll flow) */}
      <ServicesSection />
    </div>
  );
}

export default App;
