import { type FC, type ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

interface PropTypes {}

const buttonVariants = cva('flex flex-nowrap items-center justify-center gap-2', {
  variants: {
    variant: {
      default: '',
      bordered: 'bg-red-500',
      ghost: 'bg-red-500',
    },
  },
});

const Button: FC<PropTypes> = (): ReactNode => {
  return <div className="border">سلام</div>;
};

export default Button;
