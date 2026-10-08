import { ArrowRight } from 'lucide-react';
import './ServicesSection.css';

const SERVICES_DATA = [
  {
    id: '01',
    number: '01',
    title: 'ELEKTROINSTALLATION',
    description: 'Präzise Lösungen für Wohn-, Gewerbe- und Industrieprojekte.',
    image: '/services/service_01_installation.webp',
    imageAlt: 'Moderne Architekturvilla mit Außenbeleuchtung',
    link: '#contact',
    // Custom SVG Icon matching reference: Minimal architectural house with electrical node
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="service-card-icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L4 14V28H28V14L16 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 28V18H20V28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 11V15M14 13H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '02',
    number: '02',
    title: 'SMART HOME & AUTOMATION',
    description: 'Intelligente Steuerung für mehr Komfort, Sicherheit und Effizienz.',
    image: '/services/service_02_smarthome.webp',
    imageAlt: 'Modernes Smart-Home-Bedienpanel im Wohnbereich',
    link: '#contact',
    // Custom SVG Icon matching reference: Smart connected home with automation keyhole/hub
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="service-card-icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 5L5 14V27H27V14L16 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="18" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 21.2V24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '03',
    number: '03',
    title: 'ENERGIE & E-MOBILITÄT',
    description: 'Zukunftssichere Energiesysteme mit Solartechnik, Energiemanagement und Ladeinfrastruktur.',
    image: '/services/service_03_emobility.webp',
    imageAlt: 'Elektrofahrzeug-Ladestation an moderner Architektur',
    link: '#contact',
    // Custom SVG Icon matching reference: Clean energy leaf with electrical power arc
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="service-card-icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 26C6 26 8 14 19 8C19 8 26 15 22 22C18 29 6 26 6 26Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 26C11 21 16 17 22 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 7L13 13H17L14 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: '04',
    number: '04',
    title: 'WARTUNG & SERVICE',
    description: 'Zuverlässiger Betrieb durch professionelle Wartung, schnelle Fehlerbehebung und langfristige Betreuung.',
    image: '/services/service_04_maintenance.webp',
    imageAlt: 'Elektrotechniker bei der professionellen Schaltschrankwartung',
    link: '#contact',
    // Custom SVG Icon matching reference: Precision technical gear with maintenance service hub
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="service-card-icon" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 3V6M16 26V29M3 16H6M26 16H29M6.8 6.8L8.9 8.9M23.1 23.1L25.2 25.2M6.8 25.2L8.9 23.1M23.1 8.9L25.2 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="services-section" id="services" aria-label="Unsere Leistungen">
      {/* --------------------------------------------------
          1. HEADER ZONE (With Architectural Watermark "02")
      -------------------------------------------------- */}
      <div className="services-header-container">
        {/* Subtle Architectural Outline Ghost Watermark "02" */}
        <span className="services-watermark-number" aria-hidden="true">
          02
        </span>

        <div className="services-header-inner">
          {/* Left Title Column */}
          <div className="services-title-col">
            <div className="services-eyebrow-row">
              <span className="terracotta-dash" />
              <span className="services-eyebrow-text">UNSERE LEISTUNGEN</span>
            </div>

            <h2 className="services-main-headline">
              Elektrotechnik,
              <br />
              <span className="terracotta-highlight">die weiterdenkt.</span>
            </h2>
          </div>

          {/* Right Editorial Copy & Discover CTA Column */}
          <div className="services-action-col">
            <p className="services-header-description">
              Von der Planung bis zur Umsetzung bieten wir maßgeschneiderte
              Elektrolösungen für private, gewerbliche und industrielle Projekte –
              zuverlässig, effizient und zukunftssicher.
            </p>

            <a href="#services" className="discover-all-btn">
              <div className="discover-icon-circle">
                <ArrowRight size={15} className="discover-arrow" />
              </div>
              <span className="discover-label">ALLE LEISTUNGEN ENTDECKEN</span>
            </a>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          2. 4-COLUMN EDITORIAL SERVICE CARDS SHOWCASE
      -------------------------------------------------- */}
      <div className="services-cards-grid">
        {SERVICES_DATA.map((service, index) => (
          <article
            key={service.id}
            className={`service-card ${index === 0 ? 'first-card' : ''} ${index === SERVICES_DATA.length - 1 ? 'last-card' : ''}`}
          >
            {/* Image Preview with Architectural Frame & Subtle Diagonal Bevel */}
            <div className="card-media-wrapper">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="card-preview-img"
                loading="lazy"
              />
              <div className="card-media-overlay" />
            </div>

            {/* Service Details & Typography */}
            <div className="card-content-wrapper">
              {/* Number with terracotta dash */}
              <div className="card-number-row">
                <span className="card-number-digits">{service.number}</span>
                <span className="card-number-dash" />
              </div>

              {/* Icon & Title */}
              <div className="card-title-row">
                <div className="card-icon-box">{service.icon}</div>
                <h3 className="card-service-title">{service.title}</h3>
              </div>

              {/* Description */}
              <p className="card-service-desc">{service.description}</p>

              {/* Link CTA with arrow */}
              <div className="card-cta-footer">
                <a href={service.link} className="card-learn-more-link">
                  <span>MEHR ERFAHREN</span>
                  <ArrowRight size={13} className="learn-arrow" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* --------------------------------------------------
          3. ARCHITECTURAL BOTTOM TRUST & PHILOSOPHY STRIP
      -------------------------------------------------- */}
      <footer className="services-footer-strip">
        <div className="footer-strip-inner">
          <div className="strip-item">
            <span className="terracotta-dash-sm" />
            <span className="strip-text">ZUVERLÄSSIG &nbsp;·&nbsp; EFFIZIENT &nbsp;·&nbsp; ZUKUNFTSSICHER</span>
          </div>

          <div className="strip-item right-align">
            <span className="terracotta-dash-sm" />
            <span className="strip-text">TECHNIK FÜR BESSERE LEBENSRÄUME</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
