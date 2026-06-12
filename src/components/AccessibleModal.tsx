import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
  backdrop?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

const AccessibleModal = React.forwardRef<HTMLDivElement, AccessibleModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'md',
      closeButton = true,
      backdrop = true,
    },
    ref,
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [previousOverflow, setPreviousOverflow] = useState<string>('');

    useEffect(() => {
      if (!isOpen) return;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      setPreviousOverflow(document.body.style.overflow);
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener('keydown', handleEscape);
      modalRef.current?.addEventListener('keydown', handleFocusTrap);

      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        modalRef.current?.removeEventListener('keydown', handleFocusTrap);
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = '';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="presentation"
        onClick={(e) => backdrop && e.target === e.currentTarget && onClose()}
      >
        {backdrop && (
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}

        <div
          ref={(el) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                ref.current = el;
              }
            }
            if (el) modalRef.current = el;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${title.replace(/\s+/g, '-')}`}
          className={`relative z-10 bg-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl p-6 ${sizeClasses[size]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          tabIndex={-1}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              id={`modal-title-${title.replace(/\s+/g, '-')}`}
              className="text-2xl font-bold text-gray-900"
            >
              {title}
            </h2>
            {closeButton && (
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex items-center justify-center p-1 rounded-lg hover:bg-white/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="button"
              >
                <X size={24} className="text-gray-600" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="text-gray-700">{children}</div>
        </div>
      </div>
    );
  },
);

AccessibleModal.displayName = 'AccessibleModal';

export default AccessibleModal;
