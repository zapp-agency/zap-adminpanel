// React Core
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

// Third Party Libraries
import { cva, type VariantProps } from 'class-variance-authority';
import gsap from 'gsap';
import { cn } from '@/utils';
import { Cancel01Icon } from 'hugeicons-react';
import { useGSAP } from '@gsap/react';

type defaultvar_types = {
  placement: 'top' | 'center' | 'bottom';
  backdrop: 'opaque' | 'clear' | 'blur';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  radius: 'none' | 'sm' | 'md' | 'lg';
};
const DEFAULT_VARIANTS: defaultvar_types = {
  placement: 'center',
  backdrop: 'opaque',
  size: 'md',
  radius: 'lg',
};

const backdropVariants = cva('fixed inset-0 z-50 flex justify-center', {
  variants: {
    placement: {
      top: 'items-start pt-8',
      center: 'items-center',
      bottom: 'items-end pb-8',
    },
    backdrop: {
      clear: '',
      opaque: 'bg-black/30',
      blur: 'bg-black/30 backdrop-blur-md',
    },
  },
  defaultVariants: {
    placement: DEFAULT_VARIANTS.placement,
    backdrop: DEFAULT_VARIANTS.backdrop,
  },
});

const dialogVariants = cva('px-xl py-lg bg-white flex flex-col gap-lg overflow-hidden w-full', {
  variants: {
    size: {
      xs: 'max-w-[20rem]',
      sm: 'max-w-[24rem]',
      md: 'max-w-[28rem]',
      lg: 'max-w-[32rem]',
      xl: 'max-w-[36rem]',
      '2xl': 'max-w-[42rem]',
      '3xl': 'max-w-[48rem]',
      '4xl': 'max-w-[56rem]',
      '5xl': 'max-w-[64rem]',
      full: 'w-full h-screen !rounded-none',
    },
    radius: {
      none: 'rounded-0',
      sm: 'rounded-3',
      md: 'rounded-4',
      lg: 'rounded-5',
    },
  },
  defaultVariants: {
    size: DEFAULT_VARIANTS.size,
    radius: DEFAULT_VARIANTS.radius,
  },
});

type ModalContextType = {
  size?: VariantProps<typeof dialogVariants>['size'];
  radius?: VariantProps<typeof dialogVariants>['radius'];
  placement?: VariantProps<typeof backdropVariants>['placement'];
  hasClose?: boolean;
  effectiveOnClose: () => void;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextType>({
  hasClose: true,
  placement: DEFAULT_VARIANTS.placement,
  radius: DEFAULT_VARIANTS.radius,
  size: DEFAULT_VARIANTS.size,
  effectiveOnClose: () => {},
  isOpen: false,
});

type ModalProps = VariantProps<typeof backdropVariants> &
  VariantProps<typeof dialogVariants> & {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    hasClose?: boolean;
    children?: React.ReactNode;
    className?: string;
  };

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  placement = DEFAULT_VARIANTS.placement,
  backdrop,
  size = DEFAULT_VARIANTS.size,
  radius = DEFAULT_VARIANTS.radius,
  hasClose = true,
  children,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);
  const effectiveOnClose = useMemo(() => (hasClose ? onClose : () => {}), [hasClose, onClose]);

  const effectivePlacement = size === 'full' ? 'center' : placement;

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        effectiveOnClose();
      }
    };

    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      if (hasClose) {
        document.addEventListener('keydown', handleEscape);
      }
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasClose, effectiveOnClose]);

  // exit animtion for backdrop
  useGSAP(() => {
    if (isOpen) {
      setShowPortal(true);
    } else if (showPortal && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'expo.in',
        onComplete: () => {
          setShowPortal(false);
          previousFocus.current?.focus();
        },
      });
    }
  }, [isOpen, showPortal]);
  // enter animtion for backdrop

  useGSAP(() => {
    if (showPortal && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'expo.out' }
      );
    }
  }, [showPortal]);

  if (!isMounted) return null;
  if (!showPortal) return null;

  return createPortal(
    <ModalContext.Provider
      value={{ size, radius, placement: effectivePlacement, hasClose, effectiveOnClose, isOpen }}
    >
      <div
        ref={overlayRef}
        className={cn(backdropVariants({ placement: effectivePlacement, backdrop }), className)}
        onClick={() => effectiveOnClose()}
      >
        {children}
      </div>
    </ModalContext.Provider>,
    document.body
  );
};

type ModalContentProps = VariantProps<typeof dialogVariants> & {
  children: React.ReactNode;
  className?: string;
};

export const ModalContent: React.FC<ModalContentProps> = ({ children, className }) => {
  const context = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const { size, radius, placement, isOpen } = context;

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElementsString =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll(focusableElementsString);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, []);

  // Exit animation for Dialogue
  useGSAP(() => {
    if (!isOpen && modalRef.current) {
      gsap.to(modalRef.current, {
        scale: placement === 'center' ? 1.24 : 1,
        y: placement === 'top' ? -50 : placement === 'bottom' ? 50 : 0,
        opacity: 0,
        duration: 0.2,
        ease: 'expo.in',
      });
    }
  }, [isOpen, placement]);

  // Enter animation for Dialogue
  useGSAP(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        {
          scale: placement === 'center' ? 1.24 : 1,
          y: placement === 'top' ? -50 : placement === 'bottom' ? 50 : 0,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: 'expo.out',
          onComplete: () => {
            modalRef.current?.focus();
          },
        }
      );
    }
  }, [placement]);

  return (
    <div
      ref={modalRef}
      className={cn(dialogVariants({ size, radius }), className)}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

type ModalHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ className, children }) => {
  const context = useContext(ModalContext);
  const { hasClose, effectiveOnClose } = context;

  return (
    <div
      className={cn('gap-md text-size-16 flex items-center justify-between font-bold', className)}
    >
      {children}
      {hasClose && (
        <Cancel01Icon
          onClick={() => {
            effectiveOnClose();
          }}
          className="cursor-pointer"
          size={16}
        />
      )}
    </div>
  );
};

type ModalBodyProps = {
  className?: string;
  children: React.ReactNode;
};

export const ModalBody: React.FC<ModalBodyProps> = ({ className, children }) => (
  <div className={cn('', className)}>{children}</div>
);

type ModalFooterProps = {
  className?: string;
  children: React.ReactNode;
};

export const ModalFooter: React.FC<ModalFooterProps> = ({ className, children }) => (
  <div className={cn('gap-md flex justify-start', className)}>{children}</div>
);

export default Modal;
