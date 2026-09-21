import { useId } from 'react';

// Shared wrapper: label <-> control association, required marker, error linkage.
export default function FormField({ label, error, required, children }) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {children({
        id,
        required,
        'aria-required': required || undefined,
        'aria-invalid': !!error,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <span id={errorId} role="alert" className="field__error">
          {error}
        </span>
      )}
    </div>
  );
}
