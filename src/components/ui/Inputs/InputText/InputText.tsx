import { type ComponentType, type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';
import InputCaption from '../Caption/Caption';
import InputError from '../Error/Error';

const inputVariants = cva(
  'px-xl flex h-18 flex-nowrap items-center justify-between rounded-6 borders-sm border-transparent duration-200   ',
  {
    variants: {
      variant: {
        solid: `bg-field-input-bg-normal  hover:border-field-input-border-hover focus-within:border-field-input-border-focus has-[input:disabled]:bg-field-input-bg-disable has-[input:disabled]:border-transparent `,
        light: `bg-transparent`,
        // Outside: '',
      },
      titilePlacmet: {
        inside: '',
        outside: '',
      },
    },
    defaultVariants: {
      variant: 'solid',
      titilePlacmet: 'inside',
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  title?: string;
  Icon?: ComponentType<{ className: string }>;
  unit?: ReactNode;
  caption?: string;
  error?: string;
}

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'solid',
    titilePlacmet = 'inside',
    className,
    error,
    caption,
    title,
    unit,
    Icon,
    disabled = false,
    ...props
  }) => {
    return (
      <div className="gap-sm flex flex-col">
        {titilePlacmet === 'outside' && (
          <span
            className={`font-lg text-size-12 ${disabled ? 'text-field-input-title-disable' : 'text-field-input-title-normal'}`}
          >
            {title}
          </span>
        )}

        <label className={cn(inputVariants({ variant }), className)}>
          <div className="gap-md flex h-fit items-center">
            {Icon && (
              <Icon
                className={`size-6 ${disabled ? 'text-field-input-icon-disable' : 'text-field-input-icon-normal'} `}
              />
            )}

            <div className="gap-sm flex flex-col content-stretch">
              {titilePlacmet === 'inside' && (
                <span
                  className={`font-lg text-size-12 ${disabled ? 'text-field-input-title-disable' : 'text-field-input-title-normal'}`}
                >
                  {title}
                </span>
              )}

              <input
                {...props}
                disabled={disabled}
                className="disabled:placeholder:text-field-input-placeholder-disable placeholder:text-field-input-placeholder-normal text-size-14 w-full font-extrabold outline-none"
              />
            </div>
          </div>
          <span
            className={`text-size-16 font-lg ${disabled ? 'text-field-input-unit-disable' : 'text-field-input-unit-normal'}`}
          >
            {unit}
          </span>
        </label>
        <InputError>{error}</InputError>
        <InputCaption>{caption}</InputCaption>
      </div>
    );
  }
);

export { InputText };
