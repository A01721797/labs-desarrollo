import { useMemo, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { PAGE_SIZE } from '../../utils/constants';
import Button from '../common/Button';
import EmptyState from '../common/EmptyState';

// Sortable, paginated table. Sort controls are real buttons; selection uses checkboxes.
export default function DataTable({ caption, columns, rows, selectable, selectedIds = [], onSelectionChange, renderActions, emptyMessage }) {
  const [sort, setSort] = useState({ key: null, dir: 'asc' });

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const factor = sort.dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = a[sort.key] ?? '';
      const bv = b[sort.key] ?? '';
      return (typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv))) * factor;
    });
  }, [rows, sort]);

  const { page, setPage, totalPages, pageItems, total } = usePagination(sorted, PAGE_SIZE);

  const toggleSort = (key) => setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  const toggleRow = (id) => onSelectionChange(selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]);
  const allOnPage = pageItems.length > 0 && pageItems.every((r) => selectedIds.includes(r.id));
  const togglePage = () =>
    onSelectionChange(allOnPage ? selectedIds.filter((id) => !pageItems.some((r) => r.id === id)) : [...new Set([...selectedIds, ...pageItems.map((r) => r.id)])]);

  if (!rows.length) return <EmptyState title="No records found" message={emptyMessage} />;

  return (
    <>
      <div className="table-wrap">
        <table className="table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {selectable && (
                <th scope="col">
                  <input type="checkbox" checked={allOnPage} onChange={togglePage} aria-label="Select all rows on this page" />
                </th>
              )}
              {columns.map((c) => (
                <th key={c.key} scope="col" aria-sort={sort.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}>
                  <button type="button" className="th-button" onClick={() => toggleSort(c.key)}>
                    {c.label}
                    <span aria-hidden="true">{sort.key === c.key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</span>
                  </button>
                </th>
              ))}
              {renderActions && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((row) => (
              <tr key={row.id}>
                {selectable && (
                  <td>
                    <input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => toggleRow(row.id)} aria-label={`Select ${row[columns[0].key]}`} />
                  </td>
                )}
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(row) : row[c.key] ?? '—'}</td>
                ))}
                {renderActions && <td className="row-actions">{renderActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="pagination" aria-label="Pagination">
        <span aria-live="polite">{total} records · page {page} of {totalPages}</span>
        <Button variant="secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </nav>
    </>
  );
}
