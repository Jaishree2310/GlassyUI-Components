import React, { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
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

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
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
    const focusTrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isOpen) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdrop && e.target === e.currentTarget) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      if (modalRef.current) {
        modalRef.current.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = previousOverflow;
      };
    }, [isOpen, onClose, backdrop]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={(e) => backdrop && e.target === e.currentTarget && onClose()}
      >
        {backdrop && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
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
          aria-labelledby={`modal-title-${title}`}
          className={`relative z-10 bg-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl p-6 ${sizeClasses[size]} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          tabIndex={-1}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              id={`modal-title-${title}`}
              className="text-2xl font-bold text-gray-900"
            >
              {title}
            </h2>
            {closeButton && (
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex items-center justify-center p-1 rounded-lg hover:bg-white/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X size={24} className="text-gray-600" />
              </button>
            )}
          </div>

          <div className="text-gray-700">{children}</div>

          <div ref={focusTrapRef} tabIndex={0} aria-hidden="true" />
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
