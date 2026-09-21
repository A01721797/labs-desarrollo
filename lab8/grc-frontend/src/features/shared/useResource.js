import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext';

// List + CRUD with a local cache; reports every outcome through toasts.
export default function useResource(api, noun) {
  const { notify } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await api.list());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const run = async (action, success) => {
    try {
      const result = await action();
      notify(success);
      return result;
    } catch (e) {
      notify(`${noun}: ${e.message}`, 'error');
      throw e;
    }
  };

  const create = (payload) =>
    run(() => api.create(payload), `${noun} created`).then((item) => {
      setItems((prev) => [item, ...prev]);
      return item;
    });

  const update = (id, payload) =>
    run(() => api.update(id, payload), `${noun} updated`).then((item) => {
      setItems((prev) => prev.map((x) => (x.id === id ? item : x)));
      return item;
    });

  const remove = (id) =>
    run(() => api.remove(id), `${noun} deleted`).then(() => setItems((prev) => prev.filter((x) => x.id !== id)));

  const removeMany = async (ids) => {
    await run(() => Promise.all(ids.map((id) => api.remove(id))), `${ids.length} records deleted`);
    setItems((prev) => prev.filter((x) => !ids.includes(x.id)));
  };

  return { items, loading, error, refresh, create, update, remove, removeMany };
}
