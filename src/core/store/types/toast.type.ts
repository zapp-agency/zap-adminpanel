import type { ReactNode } from '@tanstack/react-router';

export type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'secondary';

export interface Toast {
  id: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  hasClose?: boolean;
  icon?: ReactNode;
  color?: ToastVariant;
  className?: string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full' | null | undefined;
  duration?: number;
  onComplete?: (...args: unknown[]) => void;
}
export interface UseToastReturn {
  toast: (options: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}
