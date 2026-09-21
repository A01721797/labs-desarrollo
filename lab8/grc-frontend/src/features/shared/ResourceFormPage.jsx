import { useNavigate, useParams } from 'react-router-dom';
import EntityForm from '../../components/forms/EntityForm';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';

// One page for Create and Edit: presence of :id decides.
export default function ResourceFormPage({ config, resource, api, renderExtra }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data, loading, error } = useFetch(() => (isEdit ? api.get(id) : Promise.resolve(config.initialValues)), [id]);

  const goBack = () => navigate(`/${config.path}`);
  const handleSubmit = async (values) => {
    if (isEdit) await resource.update(id, values);
    else await resource.create(values);
    goBack();
  };

  return (
    <section>
      <h1>{isEdit ? `Edit ${config.noun.toLowerCase()}` : `New ${config.noun.toLowerCase()}`}</h1>
      {loading && <Loader />}
      {error && <p role="alert" className="field__error">{error}</p>}
      {data && (
        <EntityForm
          fields={config.fields}
          initialValues={{ ...config.initialValues, ...data }}
          onSubmit={handleSubmit}
          onCancel={goBack}
          submitLabel={isEdit ? 'Save changes' : 'Create'}
        >
          {renderExtra}
        </EntityForm>
      )}
    </section>
  );
}
