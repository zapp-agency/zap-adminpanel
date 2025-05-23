import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

const buttonVariants = cva(
  'flex flex-nowrap items-center justify-center gap-sm text-size-16 font-lg cursor-pointer ',
  {
    variants: {
      variant: {
        default: ``,
        outline: `borders-sm border-neutral-3 bg-transparent hover:border-neutral-5 focus:border-neutral-5 disabled:border-neutral-2 `,
        ghost: 'bg-transparent ',
      },
      size: {
        sm: 'px-md py-sm rounded-3',
        md: 'px-lg py-md rounded-4',
        lg: 'px-xl py-lg rounded-5',
      },
      iconOnly: {
        true: true,
        false: false,
      },
      color: {
        primary: '',
        neutral: '',
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
          'bg-primary-9 hover:bg-primary-10 disabled:bg-primary-7 focus:bg-primary-11 text-content-white',
      },
      {
        variant: 'default',
        color: 'success',
        className:
          'bg-success-9 hover:bg-success-10 disabled:bg-success-7 focus:bg-success-11 text-content-white',
      },
      {
        variant: 'default',
        color: 'neutral',
        className:
          'bg-neutral-9 hover:bg-neutral-10 disabled:bg-neutral-7 focus:bg-neutral-11 text-content-white',
      },
      {
        variant: 'default',
        color: 'warning',
        className:
          'bg-warning-9 hover:bg-warning-10 disabled:bg-warning-7 focus:bg-warning-11 text-content-white',
      },
      {
        variant: 'default',
        color: 'error',
        className:
          'bg-error-9 hover:bg-error-10 disabled:bg-error-7 focus:bg-error-11 text-content-white',
      },
      // outline variants
      {
        variant: 'outline',
        color: 'primary',
        className:
          'text-primary-9 hover:text-primary-10 focus:text-primary-10 disabled:text-primary-7',
      },
      {
        variant: 'outline',
        color: 'success',
        className:
          'text-success-9 hover:text-success-10 focus:text-success-10 disabled:text-success-7',
      },
      {
        variant: 'outline',
        color: 'neutral',
        className:
          'text-neutral-9 hover:text-neutral-10 focus:text-neutral-10 disabled:text-neutral-7',
      },
      {
        variant: 'outline',
        color: 'warning',
        className:
          'text-warning-9 hover:text-warning-10 focus:text-warning-10 disabled:text-warning-7',
      },
      {
        variant: 'outline',
        color: 'error',
        className: 'text-error-9 hover:text-error-10 focus:text-error-10 disabled:text-error-7',
      },
      // ghost variants
      {
        variant: 'ghost',
        color: 'primary',
        className:
          ' text-primary-9 hover:text-primary-10 hover:bg-primary-4 focus:bg-primary-4 focus:text-primary-11 disabled:text-primary -11 bg:transparent-7 ',
      },
      {
        variant: 'ghost',
        color: 'success',
        className:
          'text-success-9 hover:text-success-10 hover:bg-success-4 focus:bg-success-4 focus:text-success-11 disabled:text-success-7 disabled:bg-transparent ',
      },
      {
        variant: 'ghost',
        color: 'neutral',
        className:
          ' text-neutral-9 hover:text-neutral-10 hover:bg-neutral-4 focus:bg-neutral-4 focus:text-neutral-11 disabled:text-neutral-7 disabled:bg-transparent ',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className:
          ' text-warning-9 hover:text-warning-10 hover:bg-warning-4 focus:bg-warning-4 focus:text-warning-11 disabled:text-warning-7 disabled:bg-transparent ',
      },
      {
        variant: 'ghost',
        color: 'error',
        className:
          ' text-error-9 hover:text-error-10  hover:bg-error-4  focus:bg-error-4 focus:text-error-11 disabled:text-error-7 disabled:bg-transparent',
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      endContent,
      startContent,
      className,
      size = 'sm',
      variant = 'default',
      children,
      iconOnly = false,
      color = 'primary',
      ...props
    },
    ref
  ): ReactNode => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(buttonVariants({ size, variant, iconOnly, color }), className)}
      >
        {startContent}
        {children}
        {endContent}
      </button>
    );
  }
);

export { Button };
