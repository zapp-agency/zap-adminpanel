import { useCallback, useState } from 'react';

export function useModalHandler(initialIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), []);

  return { isOpen, onOpen, onClose, onToggle, onOpenChange };
}
