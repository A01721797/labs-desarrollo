import FormField from './FormField';

export default function FormInput({ label, error, required, type = 'text', ...rest }) {
  return (
    <FormField label={label} error={error} required={required}>
      {(a11y) => <input type={type} {...a11y} {...rest} />}
    </FormField>
  );
}
