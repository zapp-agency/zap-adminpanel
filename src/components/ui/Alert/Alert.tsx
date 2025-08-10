// React Core
import { type HtmlHTMLAttributes, type ReactNode, useEffect, useRef } from 'react';

// Third Party Utilities
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

// Third Party Hooks
import { useSelector } from 'react-redux';

// Redux
import type { RootState } from '@/core/store';
import { Cancel01Icon } from 'hugeicons-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { dismiss } from '@/utils/Toast/toast.util';

const alertContainerVariants = cva('fixed  flex flex-col gap-md px-lg py-md max-w-[420px] w-full', {
  variants: {
    position: {
      'top-left': 'top-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0 flex-col-reverse',
      'bottom-center': 'bottom-0 left-1/2 flex-col-reverse -translate-x-1/2',
      'bottom-right': 'bottom-0 right-0 flex-col-reverse',
    },
  },
  defaultVariants: {
    position: 'top-center',
  },
});

const alertVariants = cva(
  'flex items-center justify-between  w-full gap-lg px-lg py-md  borders-sm ',
  {
    variants: {
      radius: {
        none: 'rounded-0',
        sm: 'rounded-3',
        md: 'rounded-4',
        lg: 'rounded-5',
        full: 'rounded-full',
      },
      color: {
        primary:
          'bg-alert-primary-background border-alert-primary-normal *:stroke-alert-primary-normal text-alert-primary-normal [&_.iconContainer]:bg-alert-primary-normal',
        secondary:
          'bg-alert-secondary-background border-alert-secondary-normal *:stroke-alert-secondary-normal text-alert-secondary-normal [&_.iconContainer]:bg-alert-secondary-normal',
        success:
          'bg-alert-success-background border-alert-success-normal *:stroke-alert-success-normal text-alert-success-normal [&_.iconContainer]:bg-alert-success-normal',
        warning:
          'bg-alert-warning-background border-alert-warning-normal *:stroke-alert-warning-normal text-alert-warning-normal [&_.iconContainer]:bg-alert-warning-normal',
        danger:
          'bg-alert-danger-background  border-alert-danger-normal  *:stroke-alert-danger-normal text-alert-danger-normal [&_.iconContainer]:bg-alert-danger-normal',
      },
    },
    defaultVariants: {
      color: 'primary',
      radius: 'lg',
    },
  }
);

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

const Alert = ({
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

  const dismissRef = useRef(dismiss);
  const idRef = useRef(id);
  const onCompleteRef = useRef(onComplete);

  const isBottom = position?.includes('bottom');
  const directionY = useRef(isBottom ? -100 : 100);
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
          y: -directionY.current,
          scale: 0.2,
          duration: 0.48,
          ease: 'expo.out',
        });
      }
    },
    { scope: wrapperRef }
  );
  const handleDismiss = () => {
    if (wrapperRef.current && innerRef.current) {
      gsap.to(innerRef.current, {
        opacity: 0,
        y: -directionY.current,
        scale: 0,
        duration: 0.46,
        ease: 'expo.in',
      });
      gsap.to(wrapperRef.current, {
        height: 0,
        duration: 0.46,
        ease: 'expo.in',
        onComplete: () => {
          dismissRef.current(idRef.current);
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });
    } else {
      dismissRef.current(idRef.current);
      if (onCompleteRef.current) onCompleteRef.current();
    }
  };
  useEffect(() => {
    const timer = setTimeout(handleDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration]);

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
