import { OWNERS } from '../../utils/constants';
import FormSelect from './FormSelect';

// Static user lookup for now; replace OWNERS with a fetched user list.
export default function OwnerPicker({ label = 'Owner', options = OWNERS, ...props }) {
  return <FormSelect label={label} options={options} placeholder="Assign owner…" {...props} />;
}
