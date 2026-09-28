// Los cuatro primeros son valores de referencia de Boehm; el último ejercita el modelo intermedio.
export const EXAMPLES = [
  { name: '32 KLOC orgánico (básico)', kloc: 32, mode: 'organic', model: 'basic' },
  { name: '400 KLOC orgánico (básico)', kloc: 400, mode: 'organic', model: 'basic' },
  { name: '400 KLOC semi-acoplado (básico)', kloc: 400, mode: 'semidetached', model: 'basic' },
  { name: '400 KLOC empotrado (básico)', kloc: 400, mode: 'embedded', model: 'basic' },
  { name: '300 KLOC empotrado, vuelo (intermedio)', kloc: 300, mode: 'embedded', model: 'intermediate',
    ratings: { RELY: 'VH', CPLX: 'VH', TIME: 'H', ACAP: 'H', PCAP: 'H', TOOL: 'H' } },
];
