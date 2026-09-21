import FormField from './FormField';

export default function FormTextArea({ label, error, required, rows = 4, ...rest }) {
  return (
    <FormField label={label} error={error} required={required}>
      {(a11y) => <textarea rows={rows} {...a11y} {...rest} />}
    </FormField>
  );
}
