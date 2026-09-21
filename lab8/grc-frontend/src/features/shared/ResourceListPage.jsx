import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Drawer from '../../components/common/Drawer';
import Loader from '../../components/common/Loader';
import BulkActionsBar from '../../components/table/BulkActionsBar';
import DataTable from '../../components/table/DataTable';
import TableColumnConfig from '../../components/table/TableColumnConfig';
import TableFilters from '../../components/table/TableFilters';
import useDebounce from '../../hooks/useDebounce';
import exportToCsv from '../../utils/exportToCsv';
import formatDate from '../../utils/formatDate';

// The "register": search, filter, sort, paginate, bulk-select, export, peek in a drawer, delete.
export default function ResourceListPage({ config, resource, DetailPanel }) {
  const { items, loading, error, remove, removeMany } = resource;
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [hidden, setHidden] = useState([]);
  const [selected, setSelected] = useState([]);
  const [peek, setPeek] = useState(null);
  const [toDelete, setToDelete] = useState(null); // record | 'bulk' | null
  const q = useDebounce(search).trim().toLowerCase();

  const rows = useMemo(() => {
    const decorated = items.map((r) => (config.decorate ? config.decorate(r) : r));
    return decorated.filter(
      (r) =>
        Object.entries(filterValues).every(([k, v]) => !v || r[k] === v) &&
        (!q || Object.values(r).some((v) => typeof v === 'string' && v.toLowerCase().includes(q))),
    );
  }, [items, config, q, filterValues]);

  const columns = config.columns
    .filter((c) => !hidden.includes(c.key))
    .map((c) => ({
      ...c,
      render: c.badge ? (r) => <Badge label={r[c.key]} /> : c.date ? (r) => formatDate(r[c.key]) : undefined,
    }));

  const confirmDelete = async () => {
    const target = toDelete;
    setToDelete(null);
    if (target === 'bulk') {
      await removeMany(selected);
      setSelected([]);
    } else {
      await remove(target.id);
      setSelected((s) => s.filter((id) => id !== target.id));
    }
  };

  const exportRows = (subset) => exportToCsv(`${config.path}.csv`, config.columns, subset);

  return (
    <section>
      <header className="page-header">
        <h1>{config.title}</h1>
        <div className="actions">
          <Button variant="secondary" onClick={() => exportRows(rows)} disabled={!rows.length}>Export CSV</Button>
          <Link className="btn btn--primary" to={`/${config.path}/new`}>New {config.noun.toLowerCase()}</Link>
        </div>
      </header>

      <TableFilters
        search={search}
        onSearchChange={setSearch}
        filters={config.filters}
        values={filterValues}
        onFilterChange={(name, value) => setFilterValues((v) => ({ ...v, [name]: value }))}
      />
      <TableColumnConfig
        columns={config.columns}
        hidden={hidden}
        onToggle={(key) => setHidden((h) => (h.includes(key) ? h.filter((x) => x !== key) : [...h, key]))}
      />
      <BulkActionsBar
        count={selected.length}
        onClear={() => setSelected([])}
        onDelete={() => setToDelete('bulk')}
        onExport={() => exportRows(rows.filter((r) => selected.includes(r.id)))}
      />

      {loading && <Loader />}
      {error && <p role="alert" className="field__error">{error}</p>}
      {!loading && !error && (
        <DataTable
          caption={config.title}
          columns={columns}
          rows={rows}
          selectable
          selectedIds={selected}
          onSelectionChange={setSelected}
          emptyMessage="Try changing the filters or create a new record."
          renderActions={(row) => (
            <>
              <Button variant="ghost" onClick={() => setPeek(row)} aria-label={`View ${row[config.titleField]}`}>View</Button>
              <Link className="btn btn--ghost" to={`/${config.path}/${row.id}/edit`} aria-label={`Edit ${row[config.titleField]}`}>Edit</Link>
              <Button variant="ghost" onClick={() => setToDelete(row)} aria-label={`Delete ${row[config.titleField]}`}>Delete</Button>
            </>
          )}
        />
      )}

      <Drawer isOpen={!!peek} onClose={() => setPeek(null)} title={peek?.[config.titleField] ?? ''}>
        {peek && (
          <>
            <DetailPanel record={peek} />
            <Link className="btn btn--secondary" to={`/${config.path}/${peek.id}`}>Open full page</Link>
          </>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!toDelete}
        message={toDelete === 'bulk' ? `Delete ${selected.length} selected records? This cannot be undone.` : `Delete "${toDelete?.[config.titleField]}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </section>
  );
}
