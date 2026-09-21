import FormField from './FormField';

// Stores only the file name (no upload backend yet); swap onChange for a real upload.
export default function FileUploadField({ label, value, onChange, error }) {
  return (
    <FormField label={label} error={error}>
      {(a11y) => (
        <>
          <input type="file" {...a11y} onChange={(e) => onChange(e.target.files?.[0]?.name ?? '')} />
          {value && <span className="field__hint">Current file: {value}</span>}
        </>
      )}
    </FormField>
  );
}
