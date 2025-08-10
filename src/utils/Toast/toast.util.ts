import { store } from '@/core/store';
import { addToast, removeToast } from '@/core/store/features/toaster/toastSlice';
import type { Toast } from '@/core/store/types/toast.type';

export const toast = (options: Omit<Toast, 'id'>) => {
  store.dispatch(addToast(options));
};

export const dismiss = (id: string) => {
  store.dispatch(removeToast(id));
};
