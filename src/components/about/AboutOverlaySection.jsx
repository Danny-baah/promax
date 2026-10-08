import { ShieldCheck, Leaf, Settings, Building2, ArrowRight } from 'lucide-react';
import './AboutOverlaySection.css';

export function AboutOverlaySection() {
  return (
    <section className="about-overlay-section" id="about" aria-label="Über uns">
      {/* --------------------------------------------------
          CENTER ZONE: Luxury Architectural Interior Photography
      -------------------------------------------------- */}
      <div className="about-center-media">
        <img
          src="/about/architectural_interior.webp"
          alt="Moderne Architektur und Elektrotechnik Innenraum"
          className="about-interior-img"
        />
      </div>

      {/* --------------------------------------------------
          LEFT ZONE: Light Architectural Information Panel
      -------------------------------------------------- */}
      <div className="about-left-panel">
        {/* Diagonal SVG Background with Razor-Sharp Coral Accent Line */}
        <svg className="left-panel-bg-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon points="0,0 100,0 74,100 0,100" fill="#F8F7F3" />
          <line x1="100" y1="0" x2="74" y2="100" stroke="#D87558" strokeWidth="0.5" />
        </svg>

        <div className="left-panel-content">
          {/* Eyebrow with coral accent dash */}
          <div className="about-eyebrow-row">
            <span className="coral-line" />
            <span className="about-eyebrow-text">ÜBER UNS</span>
          </div>

          {/* Headline matching reference */}
          <h2 className="about-main-headline">
            Technik mit
            <br />
            <span className="coral-highlight">echtem Mehrwert.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="about-body-text">
            Wir stehen für moderne Elektrotechnik, die Menschen,
            Räume und Unternehmen sicher, effizient und
            zukunftsfähig macht. Mit Erfahrung, Präzision und Leidenschaft
            realisieren wir individuelle Lösungen – von der Planung
            bis zur Umsetzung.
          </p>

          {/* Statistics Strip */}
          <div className="about-stats-row">
            <div className="stat-col">
              <span className="stat-number">10+</span>
              <span className="stat-label">
                Jahre
                <br />
                Erfahrung
              </span>
            </div>

            <div className="stat-divider" />

            <div className="stat-col">
              <span className="stat-number">250+</span>
              <span className="stat-label">
                Erfolgreiche
                <br />
                Projekte
              </span>
            </div>

            <div className="stat-divider" />

            <div className="stat-col">
              <span className="stat-number">100%</span>
              <span className="stat-label">
                Zuverlässigkeit
                <br />
                &amp; Qualität
              </span>
            </div>
          </div>

          {/* Primary Coral Pill CTA */}
          <a href="#contact" className="about-cta-btn">
            <span>MEHR ÜBER UNS</span>
            <ArrowRight size={15} className="cta-arrow" />
          </a>
        </div>
      </div>

      {/* --------------------------------------------------
          RIGHT ZONE: Dark Benefits / Information Panel
      -------------------------------------------------- */}
      <div className="about-right-panel">
        {/* Diagonal SVG Background with Razor-Sharp Coral Accent Line */}
        <svg className="right-panel-bg-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon points="36,0 100,0 100,100 0,100" fill="#121B26" />
          <line x1="36" y1="0" x2="0" y2="100" stroke="#D87558" strokeWidth="0.5" />
        </svg>

        <div className="right-panel-content">
          {/* Benefit 01 */}
          <div className="benefit-item">
            <div className="benefit-icon-box">
              <ShieldCheck size={26} className="benefit-icon" />
            </div>
            <div className="benefit-text">
              <h4 className="benefit-title">SICHERE INSTALLATIONEN</h4>
              <p className="benefit-desc">Nach höchsten Standards.</p>
            </div>
          </div>

          <div className="benefit-divider" />

          {/* Benefit 02 */}
          <div className="benefit-item">
            <div className="benefit-icon-box">
              <Leaf size={26} className="benefit-icon" />
            </div>
            <div className="benefit-text">
              <h4 className="benefit-title">ENERGIEEFFIZIENTE LÖSUNGEN</h4>
              <p className="benefit-desc">Für eine nachhaltige Zukunft.</p>
            </div>
          </div>

          <div className="benefit-divider" />

          {/* Benefit 03 */}
          <div className="benefit-item">
            <div className="benefit-icon-box">
              <Settings size={26} className="benefit-icon" />
            </div>
            <div className="benefit-text">
              <h4 className="benefit-title">ERFAHRENES TEAM</h4>
              <p className="benefit-desc">Kompetent. Zuverlässig. Engagiert.</p>
            </div>
          </div>

          <div className="benefit-divider" />

          {/* Benefit 04 */}
          <div className="benefit-item">
            <div className="benefit-icon-box">
              <Building2 size={26} className="benefit-icon" />
            </div>
            <div className="benefit-text">
              <h4 className="benefit-title">INDIVIDUELLE KONZEPTE</h4>
              <p className="benefit-desc">Für Wohn-, Gewerbe- und Industrieprojekte.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
