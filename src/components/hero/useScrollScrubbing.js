import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll Scrubbing Controller with GSAP ScrollTrigger Pinning
 * 
 * - Pins .hero-pin for 650vh of dedicated scroll range
 * - Pushes any subsequent section completely below the pin-spacer
 * - Normalized targetProgress [0 -> 1] fed from ScrollTrigger.onUpdate
 * - Smooth RAF interpolation:
 *   currentProgress += (targetProgress - currentProgress) * 0.12
 * - Video progression completes at 0.85, followed by a dedicated final hold from 0.85 to 1.00
 * - Natural release to next section only after 1.00 is reached
 * - Seamless reverse scrubbing when scrolling upward
 */
export function useScrollScrubbing({
  containerRef,
  pinRef,
  totalFrames = 240,
  onTick,
}) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const velocityRef = useRef(0);
  const lastProgressRef = useRef(0);
  const rafIdRef = useRef(null);
  const triggerRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initialize GSAP ScrollTrigger Pinning
  useEffect(() => {
    if (!containerRef?.current || !pinRef?.current) return;

    if (isReducedMotion) {
      targetProgressRef.current = 1.0;
      currentProgressRef.current = 1.0;
      currentFrameRef.current = totalFrames - 1;
      return;
    }

    // ScrollTrigger creation with pinSpacing: true
    // 1600vh scroll duration slows down the scroll scrubbing rate by 50%
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: pinRef.current,
      start: 'top top',
      end: '+=1600vh', // Slowed down by 50% for majestic, deliberate frame pacing
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // self.progress is normalized 0.0 to 1.0 across the pinned duration
        targetProgressRef.current = self.progress;
      },
    });

    triggerRef.current = trigger;

    return () => {
      trigger.kill();
      ScrollTrigger.refresh();
    };
  }, [containerRef, pinRef, isReducedMotion, totalFrames]);

  // Main RAF Loop for buttery smooth 60fps interpolation
  useEffect(() => {
    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      if (isReducedMotion) {
        currentProgressRef.current = 1.0;
        currentFrameRef.current = totalFrames - 1;
        velocityRef.current = 0;
        if (onTick) {
          onTick({
            currentProgress: 1.0,
            targetProgress: 1.0,
            videoProgress: 1.0,
            frameIndex: totalFrames - 1,
            velocity: 0,
            isReducedMotion: true,
            isHoldPhase: true,
          });
        }
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // Smooth RAF interpolation:
      // currentProgress += (targetProgress - currentProgress) * 0.08
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.08;
      } else {
        currentProgressRef.current = target;
      }

      const p = currentProgressRef.current;

      // Calculate velocity for spark/particle excitation
      const delta = p - lastProgressRef.current;
      velocityRef.current = delta;
      lastProgressRef.current = p;

      // VIDEO PROGRESSION MAPPING:
      // 40-second journey completes smoothly across progress 0.00 to 0.86.
      // Progress 0.86 to 1.00 is the dedicated FINAL HOLD where frame 239 and CTA settle before release.
      const VIDEO_END_PROGRESS = 0.86;
      const videoProgress = Math.min(1.0, p / VIDEO_END_PROGRESS);
      const isHoldPhase = p >= VIDEO_END_PROGRESS;

      // Exact frame index calculation:
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(videoProgress * (totalFrames - 1)))
      );
      currentFrameRef.current = frameIndex;

      // Invoke RAF tick subscriber
      if (onTick) {
        onTick({
          currentProgress: p,
          targetProgress: target,
          videoProgress,
          frameIndex,
          velocity: velocityRef.current,
          isReducedMotion: false,
          isHoldPhase,
        });
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReducedMotion, onTick, totalFrames]);

  return {
    currentProgressRef,
    targetProgressRef,
    currentFrameRef,
    velocityRef,
    isReducedMotion,
    triggerRef,
  };
}
