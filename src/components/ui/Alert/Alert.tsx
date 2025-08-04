import {
  type HTMLAttributes,
  type HtmlHTMLAttributes,
  type ReactNode,
  forwardRef,
  useEffect,
} from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import Button from '../Button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/core/store';
import { useToast } from '@/core/hooks/useToaster';

const alertContainerVariants = cva('fixed z-100 flex flex-col gap-md px-lg py-md', {
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
  'flex items-center justify-between min-w-[420px]  gap-lg px-lg py-md  borders-sm ',
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

export interface Toast
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof alertVariants> {
  action?: (...args: any[]) => any;
  id: string;
  actionText?: string;
  hasClose?: boolean;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  duration?: number;
}

const Alert = forwardRef<HTMLDivElement, Toast>(
  (
    {
      id,
      action,
      actionText,
      hasClose = true,
      className,
      color = 'primary',
      icon,
      title,
      subtitle,
      radius,
      duration = 3000,
      ...props
    },
    ref
  ): ReactNode => {
    const { dismiss } = useToast();

    useEffect(() => {
      const timer = setTimeout(() => dismiss(id), duration);
      return () => clearTimeout(timer);
    }, [id, duration, dismiss]);

    return (
      <div ref={ref} {...props} className={cn(alertVariants({ radius, color }), className)}>
        <div className={`${icon && 'gap-md'}" items-center" flex`}>
          <div className="rounded-full *:stroke-white"></div>
          {icon}
          <div className="flex flex-col items-start">
            <h6 className="text-size-16 font-xl">{title}</h6>
            <p className="text-size-14 font-lg">{subtitle}</p>
          </div>
        </div>
        <div className="gap-md flex items-center">
          {action && <Button>{actionText}</Button>}
          <HugeiconsIcon
            icon={Cancel01Icon}
            onClick={() => {
              dismiss(id);
            }}
          />
        </div>
      </div>
    );
  }
);

const Toaster = forwardRef<HTMLDivElement, AlertContainerProps>(({ position }, ref): ReactNode => {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  return (
    <div ref={ref} className={cn(alertContainerVariants({ position }))}>
      {toasts?.map((toast) => <Alert key={toast.id} {...toast} />)}
    </div>
  );
});

export { Toaster };
