import { useState } from 'react';
import auditApi from '../../../api/auditApi';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import FormInput from '../../../components/forms/FormInput';
import FormSelect from '../../../components/forms/FormSelect';
import { useToast } from '../../../context/ToastContext';
import { SEVERITIES } from '../../../utils/constants';

// Nested CRUD: findings are stored on, and scoped to, their parent audit.
export default function AuditFindingsList({ audit, onChange }) {
  const { notify } = useToast();
  const findings = audit.findings ?? [];
  const [draft, setDraft] = useState({ title: '', severity: '' });
  const [error, setError] = useState('');

  const save = async (next, message) => {
    await auditApi.update(audit.id, { findings: next });
    notify(message);
    onChange?.();
  };

  const add = async (e) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.severity) {
      setError('Title and severity are required');
      return;
    }
    setError('');
    await save([...findings, { id: crypto.randomUUID(), ...draft, status: 'Open' }], 'Finding added');
    setDraft({ title: '', severity: '' });
  };

  return (
    <>
      <h3>Findings ({findings.length})</h3>
      {findings.length ? (
        <ul className="plain-list">
          {findings.map((f) => (
            <li key={f.id}>
              {f.title} <Badge label={f.severity} /> <Badge label={f.status} />{' '}
              <Button variant="ghost" onClick={() => save(findings.map((x) => (x.id === f.id ? { ...x, status: x.status === 'Open' ? 'Closed' : 'Open' } : x)), 'Finding updated')} aria-label={`${f.status === 'Open' ? 'Close' : 'Reopen'} finding ${f.title}`}>
                {f.status === 'Open' ? 'Close' : 'Reopen'}
              </Button>
              <Button variant="ghost" onClick={() => save(findings.filter((x) => x.id !== f.id), 'Finding deleted')} aria-label={`Delete finding ${f.title}`}>Delete</Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No findings yet.</p>
      )}
      <form onSubmit={add} noValidate className="form form--inline">
        <FormInput label="New finding" required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} error={error && !draft.title.trim() ? error : undefined} />
        <FormSelect label="Severity" required options={SEVERITIES} value={draft.severity} onChange={(e) => setDraft({ ...draft, severity: e.target.value })} error={error && !draft.severity ? error : undefined} />
        <Button type="submit">Add finding</Button>
      </form>
    </>
  );
}
