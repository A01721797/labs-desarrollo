// Show/hide columns via a native <details> disclosure (keyboard accessible for free).
export default function TableColumnConfig({ columns, hidden, onToggle }) {
  return (
    <details className="column-config">
      <summary>Columns</summary>
      <fieldset>
        <legend className="sr-only">Visible columns</legend>
        {columns.map((c) => (
          <label key={c.key} className="check">
            <input type="checkbox" checked={!hidden.includes(c.key)} onChange={() => onToggle(c.key)} />
            {c.label}
          </label>
        ))}
      </fieldset>
    </details>
  );
}
