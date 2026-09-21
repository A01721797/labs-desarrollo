import { acknowledge } from '../../../api/policyApi';
import Button from '../../../components/common/Button';
import { useToast } from '../../../context/ToastContext';
import { OWNERS } from '../../../utils/constants';

// Tracks who has read/signed off. Toggling saves straight to the API.
export default function PolicyAcknowledgementTracker({ policy, onChange }) {
  const { notify } = useToast();
  const acked = policy.acknowledgedBy ?? [];

  const toggle = async (name) => {
    const next = acked.includes(name) ? acked.filter((n) => n !== name) : [...acked, name];
    await acknowledge(policy.id, next);
    notify('Acknowledgement updated');
    onChange?.();
  };

  return (
    <>
      <h3>Acknowledgements ({acked.length}/{OWNERS.length})</h3>
      <ul className="plain-list">
        {OWNERS.map((name) => (
          <li key={name}>
            {name} — {acked.includes(name) ? 'Acknowledged' : 'Pending'}{' '}
            <Button variant="ghost" onClick={() => toggle(name)} aria-label={`${acked.includes(name) ? 'Revoke' : 'Mark acknowledged'} for ${name}`}>
              {acked.includes(name) ? 'Revoke' : 'Mark acknowledged'}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
