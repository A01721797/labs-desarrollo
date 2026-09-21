import { useEffect, useState } from 'react';
import Loader from '../components/common/Loader';
import RiskHeatMap from '../components/visualizations/RiskHeatMap';
import StatusDonutChart from '../components/visualizations/StatusDonutChart';
import auditApi from '../api/auditApi';
import controlApi from '../api/controlApi';
import riskApi from '../api/riskApi';
import ComplianceScoreCard from './components/ComplianceScoreCard';
import OpenRisksSummary from './components/OpenRisksSummary';
import UpcomingAuditsWidget from './components/UpcomingAuditsWidget';

const countBy = (items, key, labels) => labels.map((label) => ({ label, value: items.filter((i) => i[key] === label).length }));

export default function DashboardPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([riskApi.list(), controlApi.list(), auditApi.list()]).then(([risks, controls, audits]) => setData({ risks, controls, audits }));
  }, []);

  if (!data) return <Loader />;
  const { risks, controls, audits } = data;
  return (
    <section>
      <h1>Dashboard</h1>
      <div className="grid">
        <ComplianceScoreCard controls={controls} />
        <OpenRisksSummary risks={risks} />
        <UpcomingAuditsWidget audits={audits} />
        <section className="panel" aria-labelledby="heat">
          <h2 id="heat">Risk heat map</h2>
          <RiskHeatMap risks={risks} />
        </section>
        <section className="panel" aria-labelledby="status">
          <h2 id="status">Risks by status</h2>
          <StatusDonutChart title="Risk status" data={countBy(risks, 'status', ['Open', 'Mitigating', 'Closed'])} />
        </section>
        <section className="panel" aria-labelledby="tests">
          <h2 id="tests">Control tests</h2>
          <StatusDonutChart title="Control test results" data={countBy(controls, 'testResult', ['Fail', 'Not tested', 'Pass'])} />
        </section>
      </div>
    </section>
  );
}
