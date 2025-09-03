import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils';

const buttonVariants = cva(
  'flex flex-nowrap items-center justify-center gap-sm text-size-16 font-lg cursor-pointer',
  {
    variants: {
      variant: {
        default: '',
        outline: `borders-sm bg-transparent`,
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'px-md py-sm',
        md: 'px-lg py-md',
        lg: 'px-xl py-lg',
      },
      radius: {
        none: 'rounded-none',
        small: 'rounded-1',
        medium: 'rounded-3',
        large: 'rounded-5',
        full: 'rounded-full',
      },
      iconOnly: {
        true: true,
        false: false,
      },
      color: {
        default: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        error: '',
      },
    },
    compoundVariants: [
      // defaults variants
      {
        variant: 'default',
        color: 'primary',
        className:
          'bg-button-primary-normal hover:bg-button-primary-hover disabled:bg-button-primary-disable focus:bg-button-primary-onClick text-content-white',
      },
      {
        variant: 'default',
        color: 'success',
        className:
          'bg-button-success-normal hover:bg-button-success-hover disabled:bg-button-success-disable focus:bg-button-success-onClick text-content-white',
      },
      {
        variant: 'default',
        color: 'default',
        className:
          'bg-button-default-normal hover:bg-button-default-hover disabled:bg-button-default-disable focus:bg-button-default-onClick text-content-white',
      },
      {
        variant: 'default',
        color: 'warning',
        className:
          'bg-button-warning-normal hover:bg-button-warning-hover disabled:bg-button-warning-disable focus:bg-button-warning-onClick text-content-white',
      },
      {
        variant: 'default',
        color: 'error',
        className:
          'bg-button-danger-normal hover:bg-button-danger-hover disabled:bg-button-danger-disable focus:bg-button-danger-onClick text-content-white',
      },
      {
        variant: 'default',
        color: 'secondary',
        className:
          'bg-button-secondary-normal hover:bg-button-secondary-hover disabled:bg-button-secondary-disable focus:bg-button-secondary-onClick text-content-white',
      },
      // outline variants
      {
        variant: 'outline',
        color: 'primary',
        className:
          'border-button-primary-normal   hover:border-button-primary-hover focus:border-button-primary-onClick disabled:border-button-primary-disable text-button-primary-normal hover:text-button-primary-hover focus:text-button-primary-onClick disabled:text-button-primary-disable',
      },
      {
        variant: 'outline',
        color: 'success',
        className:
          'border-button-success-normal   hover:border-button-success-hover focus:border-button-success-onClick disabled:border-button-success-disable text-button-success-normal hover:text-button-success-hover focus:text-button-success-onClick disabled:text-button-success-disable',
      },
      {
        variant: 'outline',
        color: 'default',
        className:
          'border-button-default-normal   hover:border-button-default-hover focus:border-button-default-onClick disabled:border-button-default-disable text-button-default-normal hover:text-button-default-hover focus:text-button-default-onClick disabled:text-button-default-disable',
      },
      {
        variant: 'outline',
        color: 'warning',
        className:
          'border-button-warning-normal   hover:border-button-warning-hover focus:border-button-warning-onClick disabled:border-button-warning-disable text-button-warning-normal hover:text-button-warning-hover focus:text-button-warning-onClick disabled:text-button-warning-disable',
      },
      {
        variant: 'outline',
        color: 'error',
        className:
          'border-button-danger-normal hover:border-button-danger-hover focus:border-button-danger-onClick disabled:border-button-danger-disable text-button-danger-normal hover:text-button-danger-hover focus:text-button-danger-onClick disabled:text-button-danger-disable',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className:
          'border-button-secondary-normal hover:border-button-secondary-hover focus:border-button-secondary-onClick disabled:border-button-secondary-disable text-button-secondary-normal hover:text-button-secondary-hover focus:text-button-secondary-onClick disabled:text-button-secondary-disable',
      },
      // ghost variants
      {
        variant: 'ghost',
        color: 'primary',
        className:
          'text-button-primary-normal hover:text-button-primary-hover hover:bg-button-primary-backgroundLight focus:bg-button-primary-backgroundLight focus:text-button-primary-onClick disabled:text-button-primary-disable disabled:bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'success',
        className:
          'text-button-success-normal hover:text-button-success-hover hover:bg-button-success-backgroundLight focus:bg-button-success-backgroundLight focus:text-button-success-onClick disabled:text-button-success-disable disabled:bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'default',
        className:
          'text-button-default-normal hover:text-button-default-hover hover:bg-button-default-backgroundLight focus:bg-button-default-backgroundLight focus:text-button-default-onClick disabled:text-button-default-disable disabled:bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className:
          'text-button-warning-normal hover:text-button-warning-hover hover:bg-button-warning-backgroundLight focus:bg-button-warning-backgroundLight focus:text-button-warning-onClick disabled:text-button-warning-disable disabled:bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'error',
        className:
          'text-button-danger-normal hover:text-button-danger-hover hover:bg-button-danger-backgroundLight focus:bg-button-danger-backgroundLight focus:text-button-danger-onClick disabled:text-button-danger-disable disabled:bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className:
          'text-button-secondary-normal hover:text-button-secondary-hover hover:bg-button-secondary-backgroundLight focus:bg-button-secondary-backgroundLight focus:text-button-secondary-onClick disabled:text-button-secondary-disable disabled:bg-transparent',
      },
      // is icon only sizes
      {
        iconOnly: true,
        size: 'sm',
        className: 'p-sm',
      },
      {
        iconOnly: true,
        size: 'md',
        className: 'p-md',
      },
      {
        iconOnly: true,
        size: 'lg',
        className: 'p-lg',
      },
      // default radius based on size when radius is not explicitly set
      {
        size: 'sm',
        radius: undefined,
        className: 'rounded-3',
      },
      {
        size: 'md',
        radius: undefined,
        className: 'rounded-4',
      },
      {
        size: 'lg',
        radius: undefined,
        className: 'rounded-5',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      color: 'primary',
      iconOnly: false,
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  startContent?: ReactNode;
  endContent?: ReactNode;
}

const Button = ({
  endContent,
  startContent,
  className,
  size = 'sm',
  variant = 'default',
  children,
  iconOnly = false,
  color = 'primary',
  radius,
  ...props
}: ButtonProps): ReactNode => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ size, variant, iconOnly, color, radius }), className)}
    >
      {startContent}
      {children}
      {endContent}
    </button>
  );
};

export { Button };
