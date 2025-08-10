import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import gsap from 'gsap';
import { cn } from '@/utils';
import { popoverContentVariants } from './popover.style';

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

interface PopOverProps {
  children: ReactNode;
}

export const PopOver = ({ children }: PopOverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: ReactNode;
  className?: string;
}

export const PopoverTrigger = ({ children, className }: PopoverTriggerProps) => {
  const { isOpen, setIsOpen } = useContext(PopoverContext);
  return (
    <div className={cn('cursor-pointer', className)} onClick={() => setIsOpen(!isOpen)}>
      {children}
    </div>
  );
};

function getTransformOrigin(placement: string | undefined): string {
  if (!placement) return 'center center';

  const [side, align = 'center'] = placement.split('-');

  let originX = '50%';
  let originY = '50%';

  switch (side) {
    case 'top':
      originY = '100%';
      originX = align === 'start' ? '0%' : align === 'end' ? '100%' : '50%';
      break;
    case 'bottom':
      originY = '0%';
      originX = align === 'start' ? '0%' : align === 'end' ? '100%' : '50%';
      break;
    case 'left':
      originX = '100%';
      originY = align === 'start' ? '0%' : align === 'end' ? '100%' : '50%';
      break;
    case 'right':
      originX = '0%';
      originY = align === 'start' ? '0%' : align === 'end' ? '100%' : '50%';
      break;
    default:
      return 'center center';
  }

  return `${originX} ${originY}`;
}

interface PopoverContentProps extends VariantProps<typeof popoverContentVariants> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const PopoverContent = ({
  children,
  className,
  placement,
  radius,
  style,
}: PopoverContentProps) => {
  const { isOpen } = useContext(PopoverContext);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else if (visible && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => setVisible(false),
      });
    }
  }, [isOpen, visible]);

  useEffect(() => {
    if (visible && contentRef.current && isOpen) {
      const origin = getTransformOrigin(placement as string);
      gsap.set(contentRef.current, { transformOrigin: origin });

      gsap.fromTo(
        contentRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.32, ease: 'expo.out' }
      );
    }
  }, [visible, isOpen, placement]);

  if (!visible) return null;

  return (
    <div
      ref={contentRef}
      className={cn(popoverContentVariants({ placement, radius }), className)}
      style={style}
    >
      {children}
    </div>
  );
};
