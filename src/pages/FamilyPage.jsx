import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';

export const mockProducts = [
  {
    id: 1,
    nom: 'Courroie Trapézoïdale A100',
    description: 'Courroie trapézoïdale robuste pour moteurs industriels.',
    famille_courroie_id: 'trapezoidales',
    profil: 'A',
    matiere: 'EPDM',
    stock: 15,
    image_url: 'https://www.atecfrance.fr/content/images/product_main/courroie-trapezoidale-linea-00.jpg',
    specifications: 'Longueur: 1000mm, Largeur: 20mm, Epaisseur: 8mm',
    longueur_int_mm: 1000,
    largeur_mm: 20,
    epaisseur_mm: 8
  },
  {
    id: 2,
    nom: 'Courroie Synchrone S8M-200',
    description: 'Courroie synchrone pour transmission de puissance précise.',
    famille_courroie_id: 'synchrones',
    profil: 'S8M',
    matiere: 'PU',
    stock: 5,
    image_url: 'https://deremaux.com/wp-content/uploads/courroie-synchrone-20190322.jpg',
    specifications: 'Pas: 8mm, Largeur: 20mm, Dents: 25',
    longueur_int_mm: 200,
    largeur_mm: 20,
    epaisseur_mm: 5
  },
  {
    id: 3,
    nom: 'Courroie Automobile Renault',
    description: 'Courroie spéciale pour moteurs automobiles Renault.',
    famille_courroie_id: 'automobiles',
    profil: 'Automobile',
    matiere: 'CR Rubber',
    stock: 0,
    image_url: 'https://cdn-s-www.leprogres.fr/images/e4aeb08c-147f-42b9-9f43-85ca2addf3be/NW_raw/une-courroie-crantee-et-ses-deux-galets-tendeurs-changez-toutes-les-pieces-necessaires-il-en-va-de-la-bonne-sante-de-votre-automobile-photo-dr-1604394025.jpg',
    specifications: 'Longueur: 1200mm, Largeur: 25mm',
    longueur_int_mm: 1200,
    largeur_mm: 25,
    epaisseur_mm: 8
  },
  {
    id: 4,
    nom: 'Courroie Variateur V50',
    description: 'Courroie pour variateurs industriels haute performance.',
    famille_courroie_id: 'variateur',
    profil: 'V',
    matiere: 'Polyester',
    stock: 20,
    image_url: 'https://via.placeholder.com/400x200.png?text=Courroie+Variateur+V50',
    specifications: 'Longueur: 500mm, Largeur: 15mm',
    longueur_int_mm: 500,
    largeur_mm: 15,
    epaisseur_mm: 5
  },
  {
    id: 5,
    nom: 'Courroie Spéciale Machine CNC',
    description: 'Solution sur mesure pour machines spéciales.',
    famille_courroie_id: 'speciales',
    profil: 'CNC',
    matiere: 'Kevlar',
    stock: 8,
    image_url: 'https://via.placeholder.com/400x200.png?text=Courroie+CNC',
    specifications: 'Longueur: 800mm, Largeur: 20mm',
    longueur_int_mm: 800,
    largeur_mm: 20,
    epaisseur_mm: 6
  },
  {
    id: 6,
    nom: 'Courroie Étroit E30',
    description: 'Courroie étroite pour applications industrielles compactes.',
    famille_courroie_id: 'etroites',
    profil: 'E30',
    matiere: 'Fibre de verre',
    stock: 12,
    image_url: 'https://via.placeholder.com/400x200.png?text=Courroie+E30',
    specifications: 'Longueur: 300mm, Largeur: 10mm',
    longueur_int_mm: 300,
    largeur_mm: 10,
    epaisseur_mm: 4
  }
];

export default function FamilyPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const familyKey = params.familyKey || 'all';
  const typeId = params.typeId || null;
  const [profile, setProfile] = useState('');
  const [material, setMaterial] = useState('');
  const [stock, setStock] = useState('');
  const [search, setSearch] = useState('');
  const [dimensions, setDimensions] = useState({
    length_min: '',
    width_min: '',
    thickness_min: ''
  });
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const { add } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    setAllProducts(mockProducts);
    setFiltered(mockProducts);
  }, []);

  const lengthOptions = useMemo(() => {
    const set = new Set();
    allProducts.forEach(p => p.longueur_int_mm && set.add(p.longueur_int_mm));
    return Array.from(set).sort((a, b) => a - b);
  }, [allProducts]);

  const widthOptions = useMemo(() => {
    const set = new Set();
    allProducts.forEach(p => p.largeur_mm && set.add(p.largeur_mm));
    return Array.from(set).sort((a, b) => a - b);
  }, [allProducts]);

  const thicknessOptions = useMemo(() => {
    const set = new Set();
    allProducts.forEach(p => p.epaisseur_mm && set.add(p.epaisseur_mm));
    return Array.from(set).sort((a, b) => a - b);
  }, [allProducts]);

  useEffect(() => {
    let list = [...allProducts];

    if (familyKey !== 'all') list = list.filter(p => p.famille_courroie_id === familyKey);
    if (typeId) list = list.filter(p => p.type_courroie_id === typeId);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.nom.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.profil || '').toLowerCase().includes(q)
      );
    }

    if (profile) list = list.filter(p => (p.profil || '').includes(profile));
    if (material) list = list.filter(p => (p.matiere || '').includes(material));

    const { length_min, width_min, thickness_min } = dimensions;
    list = list.filter(p =>
      (!length_min || p.longueur_int_mm.toString() === length_min) &&
      (!width_min || p.largeur_mm.toString() === width_min) &&
      (!thickness_min || p.epaisseur_mm.toString() === thickness_min)
    );

    setFiltered(list);
    setPage(1);
  }, [allProducts, familyKey, typeId, profile, material, stock, search, dimensions]);
const profileOptions = useMemo(() => {
  const set = new Set();
  allProducts.forEach(p => p.profil && set.add(p.profil));
  return Array.from(set);
}, [allProducts]);

const materialOptions = useMemo(() => {
  const set = new Set();
  allProducts.forEach(p => p.matiere && set.add(p.matiere));
  return Array.from(set);
}, [allProducts]);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const toShow = filtered.slice(0, endIndex);

  return (
    <>
      <section className="family-hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t('familiesTitle')}</h1>
            <p>{t('familiesDescription')}</p>
            <div className="hero-stats">
              <div className="stat"><span className="stat-number">6</span><span className="stat-label">{t('families')}</span></div>
              <div className="stat"><span className="stat-number">25+</span><span className="stat-label">{t('productsCount')}</span></div>
              <div className="stat"><span className="stat-number">100%</span><span className="stat-label">{t('quality')}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="advanced-filters">
        <div className='container'>
          <div className="filters-container">
            <div className="filter-group">
              <label>{t('search')}</label>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('searchProducts')} />
            </div>
              <div className="filter-group">
                <label>{t('profile')}</label>
                <select value={profile} onChange={e => setProfile(e.target.value)}>
                  <option value="">{t('allProfiles')}</option>
                  {profileOptions.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>{t('materials')}</label>
                <select value={material} onChange={e => setMaterial(e.target.value)}>
                  <option value="">{t('allMaterials')}</option>
                  {materialOptions.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            <div className="filter-group">
              <label>{t('length')}</label>
              <select value={dimensions.length_min} onChange={e => setDimensions({...dimensions, length_min: e.target.value})}>
                <option value="">{t('select')}</option>
                {lengthOptions.map(l => <option key={l} value={l}>{l} mm</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>{t('width')}</label>
              <select value={dimensions.width_min} onChange={e => setDimensions({...dimensions, width_min: e.target.value})}>
                <option value="">{t('select')}</option>
                {widthOptions.map(w => <option key={w} value={w}>{w} mm</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>{t('thickness')}</label>
              <select value={dimensions.thickness_min} onChange={e => setDimensions({...dimensions, thickness_min: e.target.value})}>
                <option value="">{t('select')}</option>
                {thicknessOptions.map(t => <option key={t} value={t}>{t} mm</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        {toShow.length === 0 ? (
          <div className="empty-state">{t('noProductsFound')}</div>
        ) : (
          <div className="products-grid">
            {toShow.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.nom} />
                <h3>{product.nom}</h3>
                <p>{product.profil}</p>
                <button onClick={() => add(product)}>{t('addToCart')}</button>
              </div>
            ))}
          </div>
        )}
        {endIndex < filtered.length && (
          <button onClick={() => setPage(p => p + 1)}>{t('loadMore')}</button>
        )}
      </section>
    </>
  );
}
