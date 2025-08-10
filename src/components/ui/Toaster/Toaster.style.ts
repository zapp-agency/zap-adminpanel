import { cva } from 'class-variance-authority';

export const alertContainerVariants = cva('fixed  flex flex-col gap-md px-lg py-md min-w-[420px]', {
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

export const alertVariants = cva(
  'flex items-center justify-between gap-28 w-full  px-lg py-md  borders-sm ',
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
