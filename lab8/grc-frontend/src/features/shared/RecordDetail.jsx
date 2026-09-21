import Badge from '../../components/common/Badge';
import formatDate from '../../utils/formatDate';

// Generic read view driven by the entity's field config. Feature panels add extras as children.
export default function RecordDetail({ config, record, children }) {
  return (
    <div className="detail">
      <dl className="detail__list">
        {config.fields
          .filter((f) => f.type !== 'file' || record[f.name])
          .map((f) => (
            <div key={f.name}>
              <dt>{f.label}</dt>
              <dd>
                {f.badge ? <Badge label={record[f.name]} /> : f.type === 'date' ? formatDate(record[f.name]) : record[f.name] || '—'}
              </dd>
            </div>
          ))}
      </dl>
      {children}
    </div>
  );
}
