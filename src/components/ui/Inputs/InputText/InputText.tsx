import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

const inputVariants = cva(
  'flex flex-nowrap items-center justify-between text-size-16 font-lg cursor-pointer rounded-6 px-xl',
  {
    variants: {
      variant: {
        flat: `bg-field-input-bg-normal`,
        light: `borders-sm border-secondary-3 bg-transparent hover:border-secondary-5 focus:border-secondary-5 disabled:border-secondary-2  `,
        Outside: 'bg-transparent ',
      },
    },
    defaultVariants: {
      variant: 'flat',
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
  ({ variant, className, error, caption, icon, title, unit, ...props }) => {
    return (
      <>
        {/* {variant === 'Outside' && <label></label>}
        <div className={cn(inputVariants({ variant }), className)}>
          {icon}
          <div>
            {variant === 'flat' || (variant === 'light' && <label></label>)}
            <input {...props} type="text" className="outline-none" />
          </div>
          {caption && <div className="">{caption}</div>}
          {error && <div className="">{error}</div>}
        </div> */}

        <div className="rounded-6 bg-field-input-bg-normal px-xl flex h-18 flex-nowrap items-center justify-between">
          <div className="gap-md flex h-fit items-center">
            {icon}
            <div className="gap-sm flex flex-col content-stretch">
              <span className="font-lg text-size-12">{title}</span>
              <input
                {...props}
                className="placeholder:text-field-input-placeholder-normal text-size-14 w-full font-extrabold outline-none"
              />
            </div>
          </div>
          <span className="text-size-16 font-lg text-field-input-unit-normal">{unit}</span>
        </div>
      </>
    );
  }
);

export { InputText };
