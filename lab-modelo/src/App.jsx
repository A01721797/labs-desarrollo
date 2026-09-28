import { useMemo, useState } from 'react';
import { calculate } from './cocomo.js';
import { EXAMPLES } from './examples.js';
import DriversForm from './components/DriversForm.jsx';
import Results from './components/Results.jsx';

export default function App() {
  const [model, setModel] = useState('basic');
  const [kloc, setKloc] = useState('32');
  const [mode, setMode] = useState('organic');
  const [salary, setSalary] = useState('');
  const [ratings, setRatings] = useState({});

  const { result, error } = useMemo(() => {
    try {
      return { result: calculate({ kloc: parseFloat(kloc), mode, model, ratings, salary: parseFloat(salary) || 0 }) };
    } catch (e) {
      return { error: e.message };
    }
  }, [kloc, mode, model, ratings, salary]);

  const loadExample = (ex) => {
    setKloc(String(ex.kloc));
    setMode(ex.mode);
    setModel(ex.model);
    setRatings(ex.ratings ?? {});
  };

  return (
    <>
      <header>
        <h1>Estimador COCOMO 81</h1>
        <p>Modelos Básico e Intermedio de Boehm: esfuerzo, tiempo de desarrollo, personal y costo.</p>
      </header>
      <main>
        <section aria-labelledby="h-proj">
          <h2 id="h-proj">Proyecto</h2>
          <fieldset className="row">
            <legend>Modelo</legend>
            <label><input type="radio" name="model" checked={model === 'basic'} onChange={() => setModel('basic')} /> Básico</label>
            <label><input type="radio" name="model" checked={model === 'intermediate'} onChange={() => setModel('intermediate')} /> Intermedio (con cost drivers)</label>
          </fieldset>
          <div className="grid">
            <label>Tamaño (KLOC)
              <input type="number" min="0.001" step="any" inputMode="decimal" value={kloc} onChange={(e) => setKloc(e.target.value)} />
            </label>
            <label>Modo de desarrollo
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="organic">Orgánico</option>
                <option value="semidetached">Semi-acoplado</option>
                <option value="embedded">Empotrado</option>
              </select>
            </label>
            <label>Costo por persona-mes (opcional)
              <input type="number" min="0" step="any" inputMode="decimal" placeholder="p. ej. 15000" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </label>
          </div>
          {error && <p className="error" role="alert">{error}</p>}
        </section>

        {model === 'intermediate' && result && (
          <DriversForm
            ratings={ratings}
            eaf={result.eaf}
            onChange={(id, r) => setRatings((prev) => ({ ...prev, [id]: r }))}
            onReset={() => setRatings({})}
          />
        )}

        <section aria-labelledby="h-ex">
          <h2 id="h-ex">Ejemplos precargados</h2>
          <div className="row">
            {EXAMPLES.map((ex) => (
              <button type="button" className="secondary" key={ex.name} onClick={() => loadExample(ex)}>{ex.name}</button>
            ))}
          </div>
        </section>

        {result && <Results result={result} kloc={parseFloat(kloc)} />}
      </main>
    </>
  );
}
