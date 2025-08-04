import { type HTMLAttributes, type HtmlHTMLAttributes, type ReactNode, forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

const alertContainerVariants = cva('fixed z-100 flex flex-col gap-lg px-lg py-md', {
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
  'flex items-center justify-between min-w-[420px]  gap-lg px-lg py-md  border-sm ',
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
          'bg-alert-primary-background border-alert-primary-normal *:stroke-alert-primary-normal text-alert-primary-normal',
        secondary:
          'bg-alert-secondary-background border-alert-secondary-normal *:stroke-alert-secondary-normal text-alert-secondary-normal',
        success:
          'bg-alert-success-background border-alert-success-normal *:stroke-alert-success-normal text-alert-success-normal',
        warning:
          'bg-alert-warning-background border-alert-warning-normal *:stroke-alert-warning-normal text-alert-warning-normal',
        danger:
          'bg-alert-danger-background  border-alert-danger-normal  *:stroke-alert-danger-normal text-alert-danger-normal',
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

interface AlertProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof alertVariants> {
  action?: (...args: any[]) => any;
  hasClose?: boolean;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  position?:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right';
}

const AlertContainer = forwardRef<HTMLDivElement, AlertContainerProps>(
  ({ position, children }, ref): ReactNode => {
    return (
      <div ref={ref} className={cn(alertContainerVariants({ position }))}>
        {children}
      </div>
    );
  }
);

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      action,
      hasClose = true,
      className,
      color = 'primary',
      icon,
      title,
      subtitle,
      radius,
      position = 'top-center',
      ...props
    },
    ref
  ): ReactNode => {
    return (
      <AlertContainer position={position}>
        <div ref={ref} {...props} className={cn(alertVariants({ radius, color }), className)}>
          <div className="gap-md flex items-center">
            <div className="rounded-full *:stroke-white"></div>
            {icon}
            <div className="flex flex-col items-start">
              <h6 className="text-size-16 font-xl">{title}</h6>
              <p className="text-size-14 font-lg">{subtitle}</p>
            </div>
          </div>
          <div className="gap-md border-sm flex items-center">
            <HugeiconsIcon icon={Cancel01Icon} />
          </div>
        </div>
        <div className=""></div>
      </AlertContainer>
    );
  }
);

export { Alert };
