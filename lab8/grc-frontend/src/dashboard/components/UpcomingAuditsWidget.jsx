import AuditList from '../../features/audits/components/AuditList';

export default function UpcomingAuditsWidget({ audits }) {
  const upcoming = audits.filter((a) => a.status !== 'Completed').sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 5);
  return (
    <section className="panel" aria-labelledby="upcoming-audits">
      <h2 id="upcoming-audits">Upcoming audits</h2>
      {upcoming.length ? <AuditList audits={upcoming} /> : <p>No upcoming audits.</p>}
    </section>
  );
}
