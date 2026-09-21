import ComplianceProgressBar from '../../components/visualizations/ComplianceProgressBar';

// Compliance score = share of controls that passed their last test.
export default function ComplianceScoreCard({ controls }) {
  const tested = controls.filter((c) => c.testResult !== 'Not tested');
  const passed = tested.filter((c) => c.testResult === 'Pass').length;
  const score = tested.length ? (passed / tested.length) * 100 : 0;
  return (
    <section className="panel" aria-labelledby="compliance-score">
      <h2 id="compliance-score">Compliance score</h2>
      <ComplianceProgressBar value={score} label="Controls passing" />
      <p>{passed} of {tested.length} tested controls pass ({controls.length - tested.length} untested).</p>
    </section>
  );
}
