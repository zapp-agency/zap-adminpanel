// React Core
import { type HtmlHTMLAttributes, type ReactNode, useCallback, useEffect, useRef } from 'react';

// Third Party Packages
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

import { useSelector } from 'react-redux';
import type { RootState } from '@/core/store';
import { Cancel01Icon } from 'hugeicons-react';

//utils
import { dismiss } from '@/utils/Toast/toast.util';

// styles
import { alertContainerVariants, alertVariants } from './Toaster.style';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface AlertContainerProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof alertContainerVariants> {}

export interface Toast
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof alertVariants> {
  action?: ReactNode;
  id: string;
  hasClose?: boolean;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  duration?: number;
  onComplete?: (...args: unknown[]) => void;
}

export const Alert = ({
  id,
  action,
  hasClose = true,
  className,
  color = 'primary',
  icon,
  title,
  subtitle,
  radius,
  duration = 6000,
  onComplete,
  position,
  ...props
}: Toast & { position?: AlertContainerProps['position'] }): ReactNode => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const isBottom = position?.includes('bottom');
  const directionY = isBottom ? -100 : 100;

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
  }, [directionY, id, onComplete, wrapperRef, innerRef]);

  useEffect(() => {
    const timer = setTimeout(handleDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, handleDismiss]);
  return (
    <div ref={wrapperRef}>
      <div ref={innerRef} {...props} className={cn(alertVariants({ radius, color }), className)}>
        <div className={`${icon && 'gap-md'} flex items-center`}>
          {icon && (
            <span className="iconContainer p-sm stroke-notchange-white text-notchange-white rounded-full">
              {icon}
            </span>
          )}

          <div className="flex flex-col items-start">
            <h6 className="text-size-16 font-xl">{title}</h6>
            <p className="text-size-14 font-lg">{subtitle}</p>
          </div>
        </div>
        <div className="gap-md flex items-center">
          {action}

          {hasClose && (
            <div
              className="p-sm cursor-pointer"
              onClick={() => {
                handleDismiss();
              }}
            >
              <Cancel01Icon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Toaster = ({ position }: AlertContainerProps): ReactNode => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  return (
    <div className={cn(alertContainerVariants({ position }))}>
      {toasts?.map((toast, index) => (
        <Alert
          key={toast.id}
          {...toast}
          position={position}
          className="relative"
          style={{ zIndex: 1000 - index }}
        />
      ))}
    </div>
  );
};

export { Toaster };
