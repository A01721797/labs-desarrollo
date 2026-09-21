import Button from '../common/Button';

export default function BulkActionsBar({ count, onDelete, onExport, onClear }) {
  if (!count) return null;
  return (
    <div className="bulk" role="region" aria-label="Bulk actions">
      <strong>{count} selected</strong>
      <Button variant="secondary" onClick={onExport}>Export selected</Button>
      <Button variant="danger" onClick={onDelete}>Delete selected</Button>
      <Button variant="ghost" onClick={onClear}>Clear</Button>
    </div>
  );
}
