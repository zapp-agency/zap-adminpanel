import { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import gsap from 'gsap';
import { cn } from '@/utils';

const skeletonVariants = cva('bg-neutral-3 relative overflow-hidden', {
  variants: {
    radius: {
      none: 'rounded-0',
      sm: 'rounded-3',
      md: 'rounded-4',
      lg: 'rounded-5',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    radius: 'lg',
  },
});

interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: string;
  height?: string;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}

const Skeleton = ({
  radius,
  width = '100%',
  height = '120px',
  className,
  innerClassName,
  style,
}: SkeletonProps) => {
  const skeletonInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skeletonInnerRef.current) {
      const animation = gsap.fromTo(
        skeletonInnerRef.current,
        { x: '100%', y: '-60%' },
        {
          x: '-120%',
          y: '20%',
          duration: 1.15,
          repeat: -1,
          ease: 'sine.inOut',
        }
      );

      return () => {
        animation.kill();
      };
    }
  }, []);

  return (
    <div
      className={cn(skeletonVariants({ radius }), className)}
      style={{
        width: width,
        height: height,
        ...style,
      }}
    >
      <div
        className={cn(
          'via-neutral-5 h-[500%] w-full -rotate-45 bg-linear-to-l from-transparent from-20% via-50% to-transparent to-90%',
          innerClassName
        )}
        ref={skeletonInnerRef}
      />
    </div>
  );
};

export { Skeleton };
