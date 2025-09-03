import { cva } from 'class-variance-authority';

export const popoverContentVariants = cva(
  'bg-neutral-2 absolute z-10 py-lg px-xl min-w-[150px] borders-sm borders-neutral-3 text-nowrap',
  {
    variants: {
      placement: {
        'top-start': 'bottom-full left-0 mb-2',
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        'top-end': 'bottom-full right-0 mb-2',
        'bottom-start': 'top-full left-0 mt-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        'bottom-end': 'top-full right-0 mt-2',
        'left-start': 'right-full top-0 mr-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        'left-end': 'right-full bottom-0 mr-2',
        'right-start': 'left-full top-0 ml-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
        'right-end': 'left-full bottom-0 ml-2',
      },
      radius: {
        none: 'rounded-0',
        sm: 'rounded-3',
        md: 'rounded-4',
        lg: 'rounded-5',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      placement: 'bottom',
      radius: 'lg',
    },
  }
);
