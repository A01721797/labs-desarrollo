import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';

export default function ResourceDetailPage({ config, api, resource, DetailPanel }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useFetch(() => api.get(id), [id]);
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    setConfirming(false);
    await resource.remove(id);
    navigate(`/${config.path}`);
  };

  return (
    <section>
      <nav aria-label="Breadcrumb"><Link to={`/${config.path}`}>← {config.title}</Link></nav>
      {loading && <Loader />}
      {error && <p role="alert" className="field__error">{error}</p>}
      {data && (
        <>
          <header className="page-header">
            <h1>{data[config.titleField]}</h1>
            <div className="actions">
              <Link className="btn btn--secondary" to={`/${config.path}/${id}/edit`}>Edit</Link>
              <Button variant="danger" onClick={() => setConfirming(true)}>Delete</Button>
            </div>
          </header>
          <DetailPanel record={data} onChange={refresh} />
        </>
      )}
      <ConfirmDialog isOpen={confirming} message={`Delete "${data?.[config.titleField]}"? This cannot be undone.`} onConfirm={handleDelete} onCancel={() => setConfirming(false)} />
    </section>
  );
}
