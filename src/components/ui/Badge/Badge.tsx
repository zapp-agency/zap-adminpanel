import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

import type { ReactNode } from 'react';

const badgeVariants = cva('absolute flex items-center justify-center rounded-full  truncate ', {
  variants: {
    placement: {
      'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
      'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
      'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
    },
    variant: {
      solid: '',
      light: '',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: {
      sm: 'min-w-[16px] min-h-[16px] px-1 !text-size-12',
      md: 'min-w-[20px] min-h-[20px] px-1 !text-size-14',
      lg: 'min-w-[24px] min-h-[24px] px-1 !text-size-14',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'default',
      className: 'text-badge-solid-text-default bg-badge-solid-background-default',
    },
    {
      variant: 'solid',
      color: 'primary',
      className: 'text-badge-solid-text-primary bg-badge-solid-background-primary',
    },
    {
      variant: 'solid',
      color: 'secondary',
      className: 'text-badge-solid-text-secondary bg-badge-solid-background-secondary',
    },
    {
      variant: 'solid',
      color: 'success',
      className: 'text-badge-solid-text-success bg-badge-solid-background-success',
    },
    {
      variant: 'solid',
      color: 'warning',
      className: 'text-badge-solid-text-warning bg-badge-solid-background-warning',
    },
    {
      variant: 'solid',
      color: 'danger',
      className: 'text-badge-solid-text-danger bg-badge-solid-background-danger',
    },
    {
      variant: 'light',
      color: 'default',
      className: 'text-badge-light-text-default bg-badge-light-background-default',
    },
    {
      variant: 'light',
      color: 'primary',
      className: 'text-badge-light-text-primary bg-badge-light-background-primary',
    },
    {
      variant: 'light',
      color: 'secondary',
      className: 'text-badge-light-text-secondary bg-badge-light-background-secondary',
    },
    {
      variant: 'light',
      color: 'success',
      className: 'text-badge-light-text-success bg-badge-light-background-success',
    },
    {
      variant: 'light',
      color: 'warning',
      className: 'text-badge-light-text-warning bg-badge-light-background-warning',
    },
    {
      variant: 'light',
      color: 'danger',
      className: 'text-badge-light-text-danger bg-badge-light-background-danger',
    },
  ],
  defaultVariants: {
    placement: 'top-right',
    size: 'sm',
    color: 'default',
    variant: 'solid',
  },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  badgeContent?: ReactNode;
  className?: string;
  containerClassName?: string;
}

const Badge = ({
  children,
  badgeContent,
  placement,
  size,
  color,
  containerClassName,
  className,
  variant,
}: BadgeProps) => {
  return (
    <div className={cn('relative inline-block', containerClassName)}>
      {children}
      <div className={cn(badgeVariants({ placement, size, color, variant }), className)}>
        <span className="leading-[120%]">{badgeContent}</span>
      </div>
    </div>
  );
};

export { Badge };
