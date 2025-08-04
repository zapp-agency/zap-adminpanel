import { useDispatch } from 'react-redux';
import { addToast, removeToast } from '../store/features/toaster/toastSlice';
import type { UseToastReturn } from '../store/types/toast.type';

export const useToast = (): UseToastReturn => {
  const dispatch = useDispatch();
  return {
    toast: (options) => dispatch(addToast(options)),
    dismiss: (id) => dispatch(removeToast(id)),
  };
};
