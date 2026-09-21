import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import controlApi from '../../../api/controlApi';
import RecordDetail from '../../shared/RecordDetail';
import { riskConfig } from '../riskConstants';
import RiskScoreCalculator from './RiskScoreCalculator';

export default function RiskDetailPanel({ record }) {
  const [controls, setControls] = useState([]);
  useEffect(() => {
    // Demo linkage: controls owned by the same person mitigate the risk.
    controlApi.list().then((all) => setControls(all.filter((c) => c.owner === record.owner)));
  }, [record.owner]);

  return (
    <RecordDetail config={riskConfig} record={record}>
      <RiskScoreCalculator values={record} />
      <h3>Linked controls</h3>
      {controls.length ? (
        <ul>
          {controls.map((c) => (
            <li key={c.id}><Link to={`/controls/${c.id}`}>{c.name}</Link></li>
          ))}
        </ul>
      ) : (
        <p>No linked controls.</p>
      )}
      <h3>History</h3>
      <p>Created {new Date(record.createdAt ?? Date.now()).toLocaleDateString()} · Updated {new Date(record.updatedAt ?? Date.now()).toLocaleDateString()}</p>
    </RecordDetail>
  );
}
