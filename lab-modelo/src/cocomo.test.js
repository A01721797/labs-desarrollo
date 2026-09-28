import { test } from 'vitest';
import assert from 'node:assert/strict';
import { calculate } from './cocomo.js';

function close(actual, expected, tol, msg) {
  assert.ok(Math.abs(actual - expected) <= tol, `${msg}: obtenido ${actual}, esperado ${expected} ±${tol}`);
}

test('COCOMO reproduce los valores de referencia de Boehm', () => {
  // Básico, proyecto de 400 KLOC (ejemplo clásico, Wikipedia / Boehm)
  let r = calculate({ kloc: 400, mode: 'organic' });
  close(r.effort, 1295.31, 0.01, 'orgánico E');
  close(r.time, 38.07, 0.01, 'orgánico D');
  close(r.staff, 34, 0.1, 'orgánico N');
  r = calculate({ kloc: 400, mode: 'semidetached' });
  close(r.effort, 2462.79, 0.01, 'semi E');
  close(r.time, 38.45, 0.01, 'semi D');
  close(r.staff, 64, 0.1, 'semi N');
  r = calculate({ kloc: 400, mode: 'embedded' });
  close(r.effort, 4772.81, 0.01, 'empotrado E');
  close(r.time, 37.59, 0.01, 'empotrado D');
  close(r.staff, 127, 0.1, 'empotrado N');

  // Básico, 32 KLOC orgánico (Boehm): 91.3 PM, 13.9 meses, 6.6 personas
  r = calculate({ kloc: 32, mode: 'organic' });
  close(r.effort, 91.3, 0.1, '32 KLOC E');
  close(r.time, 13.9, 0.05, '32 KLOC D');
  close(r.staff, 6.6, 0.05, '32 KLOC N');

  // Intermedio con todo Nominal: EAF = 1, E = 3.2·KLOC^1.05
  r = calculate({ kloc: 32, mode: 'organic', model: 'intermediate' });
  close(r.eaf, 1, 1e-12, 'EAF nominal');
  close(r.effort, 3.2 * Math.pow(32, 1.05), 1e-9, 'intermedio nominal');

  // Intermedio, 300 KLOC empotrado (sistema de control de vuelo), RELY=VH, CPLX=VH, TIME=H, ACAP=H, PCAP=H, TOOL=H
  // EAF = 1.40·1.30·1.11·0.86·0.86·0.91 = 1.3597…; E = 2.8·300^1.20·EAF
  r = calculate({ kloc: 300, mode: 'embedded', model: 'intermediate',
    ratings: { RELY: 'VH', CPLX: 'VH', TIME: 'H', ACAP: 'H', PCAP: 'H', TOOL: 'H' } });
  const eaf = 1.40 * 1.30 * 1.11 * 0.86 * 0.86 * 0.91;
  close(r.eaf, eaf, 1e-12, 'EAF combinado');
  close(r.effort, 2.8 * Math.pow(300, 1.2) * eaf, 1e-6, 'intermedio combinado E');

  // Costo
  r = calculate({ kloc: 10, mode: 'organic', salary: 5000 });
  close(r.cost, r.effort * 5000, 1e-6, 'costo');

  // Validaciones
  assert.throws(() => calculate({ kloc: 0, mode: 'organic' }), /KLOC/);
  assert.throws(() => calculate({ kloc: 10, mode: 'x' }), /Modo/);
  assert.throws(() => calculate({ kloc: 10, mode: 'organic', model: 'intermediate', ratings: { DATA: 'VL' } }), /DATA/);
});
