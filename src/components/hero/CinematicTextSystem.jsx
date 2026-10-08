import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Users, Sparkles } from 'lucide-react';
import './CinematicTextSystem.css';

/**
 * Calculates smooth continuous opacity, translateY, blur, and scale
 * from progress using cosine interpolation.
 */
function getProgressTransform(progress, enterStart, enterFull, exitStart, exitEnd) {
  let opacity = 0;
  let translateY = 20;
  let blur = 6;
  let scale = 0.98;

  if (progress < enterStart) {
    opacity = 0;
    translateY = 20;
    blur = 6;
    scale = 0.97;
  } else if (progress <= enterFull) {
    const t = (progress - enterStart) / (enterFull - enterStart);
    const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);
    opacity = ease;
    translateY = (1 - ease) * 18;
    blur = (1 - ease) * 6;
    scale = 0.97 + ease * 0.03;
  } else if (progress <= exitStart) {
    opacity = 1;
    translateY = 0;
    blur = 0;
    scale = 1.0;
  } else if (progress <= exitEnd) {
    const t = (progress - exitStart) / (exitEnd - exitStart);
    const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);
    opacity = 1 - ease;
    translateY = -ease * 18;
    blur = ease * 6;
    scale = 1.0 + ease * 0.02;
  } else {
    opacity = 0;
    translateY = -20;
    blur = 6;
    scale = 1.02;
  }

  return {
    opacity: Math.max(0, Math.min(1, opacity)),
    translateY: translateY.toFixed(2),
    blur: blur.toFixed(2),
    scale: scale.toFixed(3),
    visibility: opacity > 0.005 ? 'visible' : 'hidden',
  };
}

export const CinematicTextSystem = forwardRef(function CinematicTextSystem(
  { isReducedMotion },
  ref
) {
  const state1Ref = useRef(null);
  const state2Ref = useRef(null);
  const state3Ref = useRef(null);
  const state4Ref = useRef(null);
  const state5Ref = useRef(null);
  const state6Ref = useRef(null);
  const state7Ref = useRef(null);
  const finalStateRef = useRef(null);

  const applyTransform = (el, transform) => {
    if (!el) return;
    el.style.opacity = transform.opacity;
    el.style.transform = `translate3d(0, ${transform.translateY}px, 0) scale(${transform.scale})`;
    el.style.filter = `blur(${transform.blur}px)`;
    el.style.visibility = transform.visibility;
    el.style.pointerEvents = transform.opacity > 0.8 ? 'auto' : 'none';
  };

  const update = (videoProgress) => {
    if (isReducedMotion) {
      applyTransform(state1Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(state2Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(state3Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(state4Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(state5Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(state6Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(state7Ref.current, { opacity: 0, translateY: 0, blur: 0, scale: 1, visibility: 'hidden' });
      applyTransform(finalStateRef.current, { opacity: 1, translateY: 0, blur: 0, scale: 1, visibility: 'visible' });
      return;
    }

    // STATE 1 — ENERGY (0–3s spark in darkness: videoProgress 0.00–0.08)
    const s1 = getProgressTransform(videoProgress, -0.05, 0.01, 0.065, 0.095);
    applyTransform(state1Ref.current, s1);

    // STATE 2 — LIGHT (3–9s spark forms bulb: videoProgress 0.08–0.22)
    const s2 = getProgressTransform(videoProgress, 0.085, 0.12, 0.19, 0.23);
    applyTransform(state2Ref.current, s2);

    // STATE 3 — SPACE (9–14s glowing bulb in interior: videoProgress 0.22–0.35)
    const s3 = getProgressTransform(videoProgress, 0.22, 0.26, 0.33, 0.37);
    applyTransform(state3Ref.current, s3);

    // STATE 4 — WHAT'S BEHIND THE WALL (14–22s camera through wall reveals wiring: videoProgress 0.35–0.54)
    const s4 = getProgressTransform(videoProgress, 0.36, 0.41, 0.50, 0.55);
    applyTransform(state4Ref.current, s4);

    // STATE 5 — SYSTEM (22–29s traveling through wiring to breaker: videoProgress 0.54–0.72)
    const s5 = getProgressTransform(videoProgress, 0.54, 0.59, 0.68, 0.73);
    applyTransform(state5Ref.current, s5);

    // STATE 6 — POWER (29–32s breaker panel energy focus: videoProgress 0.72–0.81)
    const s6 = getProgressTransform(videoProgress, 0.72, 0.75, 0.79, 0.83);
    applyTransform(state6Ref.current, s6);

    // STATE 7 — BUILDING (32–36s camera pulls through cutaway house: videoProgress 0.81–0.89)
    const s7 = getProgressTransform(videoProgress, 0.82, 0.85, 0.88, 0.91);
    applyTransform(state7Ref.current, s7);

    // FINAL HERO STATE (36–40s exterior house reveal & dedicated hold phase: videoProgress 0.90–1.00)
    // Fades in smoothly as exterior house settles and remains firmly 100% visible throughout hold
    const sFinal = getProgressTransform(videoProgress, 0.89, 0.95, 1.05, 1.05);
    applyTransform(finalStateRef.current, sFinal);
  };

  useImperativeHandle(ref, () => ({
    updateProgress: (videoProgress) => {
      update(videoProgress);
    },
  }));

  useEffect(() => {
    update(0);
  }, [isReducedMotion]);

  return (
    <div className="cinematic-text-layer">
      {/* STATE 1 — ENERGY */}
      <div ref={state1Ref} className="text-state text-state-narrative">
        <span className="eyebrow-accent">ELEKTROTECHNIK</span>
        <h1 className="hero-headline">
          ALLES BEGINNT
          <br />
          MIT ENERGIE.
        </h1>
        <p className="narrative-supporting">Jede Lösung beginnt mit einem präzisen Impuls.</p>
      </div>

      {/* STATE 2 — LIGHT */}
      <div ref={state2Ref} className="text-state text-state-narrative">
        <span className="eyebrow-accent">LICHT</span>
        <h2 className="hero-headline">
          AUS ENERGIE
          <br />
          WIRD LICHT.
        </h2>
        <p className="narrative-supporting">Wir schaffen Systeme, die Räume zum Leben erwecken.</p>
      </div>

      {/* STATE 3 — SPACE */}
      <div ref={state3Ref} className="text-state text-state-narrative">
        <span className="eyebrow-accent">LEBENSRÄUME</span>
        <h2 className="hero-headline">
          ENERGIE, DIE
          <br />
          RÄUME VERÄNDERT.
        </h2>
        <p className="narrative-supporting">Komfort, Sicherheit und intelligente Technik beginnen im Detail.</p>
      </div>

      {/* STATE 4 — WHAT'S BEHIND THE WALL */}
      <div ref={state4Ref} className="text-state text-state-narrative technical-mode">
        <span className="eyebrow-accent">PRÄZISION</span>
        <h2 className="hero-headline">
          DIE WICHTIGSTE
          <br />
          TECHNIK LIEGT DAHINTER.
        </h2>
        <p className="narrative-supporting">Durchdachte Elektroplanung sorgt dafür, dass alles zuverlässig funktioniert.</p>
      </div>

      {/* STATE 5 — SYSTEM */}
      <div ref={state5Ref} className="text-state text-state-narrative">
        <span className="eyebrow-accent">SYSTEME</span>
        <h2 className="hero-headline">
          ALLES MUSS
          <br />
          ZUSAMMENSPIELEN.
        </h2>
        <p className="narrative-supporting">Von der Installation bis zur Steuerung – jedes Detail zählt.</p>
      </div>

      {/* STATE 6 — POWER */}
      <div ref={state6Ref} className="text-state text-state-narrative">
        <span className="eyebrow-accent">KONTROLLE</span>
        <h2 className="hero-headline">
          PRÄZISE GESTEUERT.
          <br />
          SICHER VERSORGT.
        </h2>
        <p className="narrative-supporting">Zuverlässige Systeme für moderne Gebäude und anspruchsvolle Projekte.</p>
      </div>

      {/* STATE 7 — BUILDING */}
      <div ref={state7Ref} className="text-state text-state-narrative">
        <span className="eyebrow-accent">VOM SYSTEM ZUM ERGEBNIS</span>
        <h2 className="hero-headline">
          TECHNIK, DIE
          <br />
          IM HINTERGRUND ARBEITET.
        </h2>
        <p className="narrative-supporting">Damit Menschen einfach leben, arbeiten und sich auf das Wesentliche konzentrieren können.</p>
      </div>

      {/* FINAL HERO STATE (MATCHING ATTACHED REFERENCE IMAGE) */}
      <div ref={finalStateRef} className="text-state text-state-final">
        <div className="final-hero-left">
          <span className="eyebrow-accent eyebrow-final">SMARTE LÖSUNGEN. HELLERE RÄUME.</span>
          <h1 className="final-main-headline">
            ENERGIE FÜR
            <br />
            BESSERES LEBEN.
          </h1>
          <p className="final-description">
            Moderne Elektrolösungen für Wohn-, Gewerbe- und Industrieprojekte – entwickelt für Sicherheit, Effizienz und eine bessere Zukunft.
          </p>

          <div className="final-actions-group">
            <a href="#contact" className="primary-coral-cta">
              <span>ANGEBOT ANFRAGEN</span>
              <ArrowRight className="cta-arrow-icon" size={16} />
            </a>
            <a href="#work" className="secondary-action-btn">
              <span>UNSERE ARBEIT ENTDECKEN</span>
            </a>
          </div>
        </div>

        {/* RESTRAINED FEATURE STRIP AT BOTTOM */}
        <div className="final-feature-strip" aria-label="Qualitätsmerkmale">
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={18} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">SICHERE INSTALLATIONEN</span>
              <span className="feature-subtitle">Zuverlässig geplant</span>
            </div>
          </div>

          <div className="feature-separator" />

          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Zap size={18} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">ENERGIEEFFIZIENZ</span>
              <span className="feature-subtitle">Effizient gedacht</span>
            </div>
          </div>

          <div className="feature-separator" />

          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Users size={18} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">FACHKOMPETENZ</span>
              <span className="feature-subtitle">Erfahrenes Team</span>
            </div>
          </div>

          <div className="feature-separator" />

          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Sparkles size={18} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">INDIVIDUELLE LÖSUNGEN</span>
              <span className="feature-subtitle">Für jedes Projekt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
