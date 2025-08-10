import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCallback, useEffect } from 'react';

const usePopAnimation = ({
  directionY,
  innerRef,
  wrapperRef,
  dismiss,
  id,
  onComplete,
  duration,
}) => {
  useGSAP(
    () => {
      if (wrapperRef.current && innerRef.current) {
        const height = innerRef.current.clientHeight;
        gsap.set(wrapperRef.current, { height: 0 });
        gsap.to(wrapperRef.current, {
          height,
          duration: 0.48,
          ease: 'expo.out',
        });
        gsap.from(innerRef.current, {
          opacity: 0,
          y: -directionY,
          scale: 0.2,
          duration: 0.48,
          ease: 'expo.out',
        });
      }
    },
    { scope: wrapperRef }
  );
  const handleDismiss = useCallback(() => {
    if (wrapperRef.current && innerRef.current) {
      gsap.to(innerRef.current, {
        opacity: 0,
        y: -directionY,
        scale: 0,
        duration: 0.32,
        ease: 'power2.in',
      });
      gsap.to(wrapperRef.current, {
        height: 0,
        duration: 0.32,
        ease: 'power2.in',
        onComplete: () => {
          dismiss(id);
          if (onComplete) onComplete();
        },
      });
    } else {
      dismiss(id);
      if (onComplete) onComplete();
    }
  }, [directionY, dismiss, id, onComplete, wrapperRef, innerRef]);
  useEffect(() => {
    const timer = setTimeout(handleDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, handleDismiss]);

  return { handleDismiss };
};

export { usePopAnimation };
