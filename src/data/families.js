export const families = {
  trapezoidales: {
    key: 'trapezoidales',
    title: 'Courroies trapézoïdales classiques',
    profiles: ['Z','A','B','C','D','E'],
    description: [
      'Transmission fiable et économique',
      'Convient aux pompes, compresseurs et ventilateurs',
      'Fabriquée en caoutchouc CR avec cordons polyester'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
  },
  etroites: {
    key: 'etroites',
    title: 'Courroies trapézoïdales étroites',
    profiles: ['SPZ','SPA','SPB','SPC','3V','5V','8V','XPZ','XPA','XPB','XPC'],
    description: [
      'Rendement supérieur (+3 % à +5 %)',
      'Construction : EPDM + Kevlar',
      'Versions crantées : XPZ / XPA / XPB / XPC'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
  },
  automobiles: {
    key: 'automobiles',
    title: 'Courroies automobiles et Poly-V',
    profiles: ['AV10','AV13','AV17','AVX10','AVX13','AVX17','PH','PJ','PK','PL','PM'],
    description: [
      'Résistent jusqu’à 130 °C',
      'Application : alternateurs, pompes à eau, climatisation',
      'Construction : EPDM + Kevlar',
      'Poly-V: Compactes et silencieuses, idéales pour moteurs modernes'
    ],
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80'
  },
  synchrones: {
    key: 'synchrones',
    title: 'Courroies synchrones (dentées)',
    profiles: ['T5','T10','AT10','HTD 3M','HTD 5M','HTD 8M','HTD 14M'],
    description: [
      'Transmission sans glissement',
      'Caoutchouc néoprène (CR) + fibre de verre',
      'Versions : PU revêtues, Open-End, Double denture (DD)'
    ],
    image: 'https://images.unsplash.com/photo-1618832515490-9a3f9a588df2?auto=format&fit=crop&w=1200&q=80'
  },
  variateur: {
    key: 'variateur',
    title: 'Courroies variateur et agricoles',
    profiles: ['13x6','22x8','28x8','32x10','HB','HC','HI','HK'],
    description: [
      'Largeur variable → transmission progressive (Néoprène + Kevlar)',
      'Agricoles: Résistent à la poussière et à la chaleur',
      'Applications : tracteurs, moissonneuses, presses'
    ],
    image: 'https://images.unsplash.com/photo-1519092437326-bfd121eb53ae?auto=format&fit=crop&w=1200&q=80'
  },
  speciales: {
    key: 'speciales',
    title: 'Courroies spéciales',
    profiles: ['PU Linatex','PU PVC','PU Tissu','Kevlar','Acier'],
    description: [
      'PU avec revêtement (Linatex / PVC / Tissu) : convoyeurs',
      'Caoutchouc dentée revêtue Linatex rouge : forte adhérence',
      'Courroies plates soudables PU ou PVC : machines d’emballage',
      'Renforcées Kevlar / acier : haute résistance mécanique'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
  }
};

export const materialsTable = [
  { element: 'Corps', matter: 'CR Rubber / EPDM / PU', function: 'Résistance à la chaleur et flexibilité' },
  { element: 'Cordon', matter: 'Kevlar / Polyester / Fibre de verre', function: 'Traction et stabilité' },
  { element: 'Tissu', matter: 'Nylon / Coton / Linatex', function: 'Protection et adhérence' },
  { element: 'Revêtement', matter: 'PU / PVC / Linatex', function: 'Adapté à chaque application' }
];

export const applicationsList = [
  { icon: 'fa-industry', title: 'Industrie', desc: 'Machines, pompes, compresseurs' },
  { icon: 'fa-car', title: 'Automobile', desc: 'Moteurs, alternateurs, climatisation' },
  { icon: 'fa-tractor', title: 'Agriculture', desc: 'Tracteurs, moissonneuses' },
  { icon: 'fa-robot', title: 'Automation', desc: 'Robots, CNC, emballage' },
  { icon: 'fa-conveyor-belt', title: 'Convoyeurs', desc: 'Transport de produits' }
];

