import { useEffect, useId, useRef } from 'react';
import Button from './Button';

// Side panel for record details without leaving the list.
export default function Drawer({ isOpen, onClose, title, children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.activeElement;
    ref.current?.focus();
    return () => previous?.focus?.();
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="overlay overlay--right" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside
        ref={ref}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      >
        <header className="drawer__header">
          <h2 id={titleId}>{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close panel">
            <span aria-hidden="true">✕</span>
          </Button>
        </header>
        {children}
      </aside>
    </div>
  );
}
