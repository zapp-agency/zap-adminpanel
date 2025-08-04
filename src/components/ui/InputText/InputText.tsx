import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

const inputVariants = cva(
  'flex flex-nowrap items-center justify-center gap-sm text-size-16 font-lg cursor-pointer ',
  {
    variants: {
      variant: {
        Primary: ``,
        Secondary: `borders-sm border-secondary-3 bg-transparent hover:border-secondary-5 focus:border-secondary-5 disabled:border-secondary-2 `,
        Outside: 'bg-transparent ',
      },
    },
    defaultVariants: {
      variant: 'Primary',
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  title?: string;
  icon?: ReactNode;
  unit?: ReactNode;
  caption?: string;
  error?: string;
}

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, error, caption, ...props }) => {
    return (
      <>
        {variant === 'Outside' && <label></label>}
        <div>
          {variant === 'Primary' || (variant === 'Secondary' && <label></label>)}
          <input {...props} type="text" className={cn(inputVariants({ variant }), className)} />
          {caption && <div className="">{caption}</div>}
          {error && <div className="">{error}</div>}
        </div>
      </>
    );
  }
);

export {InputText};
