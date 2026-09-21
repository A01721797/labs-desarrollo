// Search box + one <select> per configured filter (status, severity, framework, owner…).
export default function TableFilters({ search, onSearchChange, filters = [], values, onFilterChange }) {
  return (
    <div className="filters" role="search">
      <div className="field">
        <label htmlFor="table-search">Search</label>
        <input id="table-search" type="search" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search records…" />
      </div>
      {filters.map((f) => (
        <div className="field" key={f.name}>
          <label htmlFor={`filter-${f.name}`}>{f.label}</label>
          <select id={`filter-${f.name}`} value={values[f.name] ?? ''} onChange={(e) => onFilterChange(f.name, e.target.value)}>
            <option value="">All</option>
            {f.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
