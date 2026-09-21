import { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import FileUploadField from './FileUploadField';
import FormDatePicker from './FormDatePicker';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import OwnerPicker from './OwnerPicker';

const INPUTS = { text: FormInput, number: FormInput, select: FormSelect, date: FormDatePicker, textarea: FormTextArea, owner: OwnerPicker };

// Config-driven Create/Edit form. `fields` come from each feature's constants file.
export default function EntityForm({ fields, initialValues, onSubmit, onCancel, submitLabel = 'Save', children }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const formRef = useRef(null);

  // After errors render, move focus to the first invalid field (keyboard/screen-reader users)
  useEffect(() => {
    if (Object.keys(errors).length) formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [errors]);

  const set = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    fields.forEach((f) => {
      if (f.required && !String(values[f.name] ?? '').trim()) next[f.name] = `${f.label} is required`;
    });
    setErrors(next);
    if (Object.keys(next).length) {
      return;
    }
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="form">
      {fields.map((f) => {
        if (f.type === 'file') {
          return <FileUploadField key={f.name} label={f.label} value={values[f.name]} onChange={(v) => set(f.name, v)} />;
        }
        const Input = INPUTS[f.type] ?? FormInput;
        return (
          <Input
            key={f.name}
            label={f.label}
            required={f.required}
            error={errors[f.name]}
            options={f.options}
            value={values[f.name] ?? ''}
            onChange={(e) => set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
            {...(f.type === 'number' ? { min: f.min, max: f.max } : {})}
          />
        );
      })}
      {children?.(values)}
      <div className="actions">
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : submitLabel}</Button>
      </div>
    </form>
  );
}
