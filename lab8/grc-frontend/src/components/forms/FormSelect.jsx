import FormField from './FormField';

export default function FormSelect({ label, error, required, options, placeholder = 'Select…', ...rest }) {
  return (
    <FormField label={label} error={error} required={required}>
      {(a11y) => (
        <select {...a11y} {...rest}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}
    </FormField>
  );
}
