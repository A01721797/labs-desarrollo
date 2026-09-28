// COCOMO 81 (Boehm, 1981): modelo Básico e Intermedio.

// Modos de desarrollo. a/b: coeficientes de esfuerzo; c/d: coeficientes de tiempo.
// Básico usa aBasic; Intermedio usa aInter (el exponente b es el mismo).
export const MODES = {
  organic:      { label: 'Orgánico',    aBasic: 2.4, aInter: 3.2, b: 1.05, c: 2.5, d: 0.38 },
  semidetached: { label: 'Semi-acoplado', aBasic: 3.0, aInter: 3.0, b: 1.12, c: 2.5, d: 0.35 },
  embedded:     { label: 'Empotrado',   aBasic: 3.6, aInter: 2.8, b: 1.20, c: 2.5, d: 0.32 },
};

export const RATINGS = ['VL', 'L', 'N', 'H', 'VH', 'XH'];
export const RATING_LABELS = { VL: 'Muy bajo', L: 'Bajo', N: 'Nominal', H: 'Alto', VH: 'Muy alto', XH: 'Extra alto' };

// Multiplicadores de los 15 cost drivers (Boehm, tabla 8-2).
export const DRIVERS = [
  { id: 'RELY', group: 'Producto',   label: 'Fiabilidad requerida',            m: { VL: 0.75, L: 0.88, N: 1.00, H: 1.15, VH: 1.40 } },
  { id: 'DATA', group: 'Producto',   label: 'Tamaño de la base de datos',      m: { L: 0.94, N: 1.00, H: 1.08, VH: 1.16 } },
  { id: 'CPLX', group: 'Producto',   label: 'Complejidad del producto',        m: { VL: 0.70, L: 0.85, N: 1.00, H: 1.15, VH: 1.30, XH: 1.65 } },
  { id: 'TIME', group: 'Computador', label: 'Restricción de tiempo de ejecución', m: { N: 1.00, H: 1.11, VH: 1.30, XH: 1.66 } },
  { id: 'STOR', group: 'Computador', label: 'Restricción de memoria',          m: { N: 1.00, H: 1.06, VH: 1.21, XH: 1.56 } },
  { id: 'VIRT', group: 'Computador', label: 'Volatilidad de la máquina virtual', m: { L: 0.87, N: 1.00, H: 1.15, VH: 1.30 } },
  { id: 'TURN', group: 'Computador', label: 'Tiempo de respuesta (turnaround)', m: { L: 0.87, N: 1.00, H: 1.07, VH: 1.15 } },
  { id: 'ACAP', group: 'Personal',   label: 'Capacidad de los analistas',      m: { VL: 1.46, L: 1.19, N: 1.00, H: 0.86, VH: 0.71 } },
  { id: 'AEXP', group: 'Personal',   label: 'Experiencia en la aplicación',    m: { VL: 1.29, L: 1.13, N: 1.00, H: 0.91, VH: 0.82 } },
  { id: 'PCAP', group: 'Personal',   label: 'Capacidad de los programadores',  m: { VL: 1.42, L: 1.17, N: 1.00, H: 0.86, VH: 0.70 } },
  { id: 'VEXP', group: 'Personal',   label: 'Experiencia en la máquina virtual', m: { VL: 1.21, L: 1.10, N: 1.00, H: 0.90 } },
  { id: 'LEXP', group: 'Personal',   label: 'Experiencia en el lenguaje',      m: { VL: 1.14, L: 1.07, N: 1.00, H: 0.95 } },
  { id: 'MODP', group: 'Proyecto',   label: 'Prácticas modernas de programación', m: { VL: 1.24, L: 1.10, N: 1.00, H: 0.91, VH: 0.82 } },
  { id: 'TOOL', group: 'Proyecto',   label: 'Uso de herramientas de software', m: { VL: 1.24, L: 1.10, N: 1.00, H: 0.91, VH: 0.82 } },
  { id: 'SCED', group: 'Proyecto',   label: 'Cronograma de desarrollo requerido', m: { VL: 1.23, L: 1.08, N: 1.00, H: 1.04, VH: 1.10 } },
];

/**
 * @param {object} p
 * @param {number} p.kloc            Tamaño en miles de líneas de código (> 0)
 * @param {string} p.mode            'organic' | 'semidetached' | 'embedded'
 * @param {string} [p.model]         'basic' (default) | 'intermediate'
 * @param {object} [p.ratings]       { RELY: 'H', ... }; los omitidos son 'N'
 * @param {number} [p.salary]        Costo por persona-mes (opcional)
 */
export function calculate(p) {
  const mode = MODES[p.mode];
  if (!mode) throw new Error('Modo desconocido: ' + p.mode);
  if (!(p.kloc > 0) || !isFinite(p.kloc)) throw new Error('El tamaño (KLOC) debe ser un número mayor que 0');
  const model = p.model || 'basic';
  if (model !== 'basic' && model !== 'intermediate') throw new Error('Modelo desconocido: ' + model);

  let eaf = 1;
  const applied = [];
  if (model === 'intermediate') {
    for (const drv of DRIVERS) {
      const rating = (p.ratings && p.ratings[drv.id]) || 'N';
      if (!(rating in drv.m)) throw new Error(drv.id + ' no admite el nivel ' + rating);
      eaf *= drv.m[rating];
      applied.push({ id: drv.id, rating, multiplier: drv.m[rating] });
    }
  }

  const a = model === 'basic' ? mode.aBasic : mode.aInter;
  const effort = a * Math.pow(p.kloc, mode.b) * eaf;      // persona-mes
  const time = mode.c * Math.pow(effort, mode.d);          // meses
  const staff = effort / time;                             // personas
  const productivity = (p.kloc * 1000) / effort;           // LOC / persona-mes
  const cost = p.salary > 0 ? effort * p.salary : null;

  return { model, mode: p.mode, a, b: mode.b, c: mode.c, d: mode.d, eaf, applied, effort, time, staff, productivity, cost };
}
