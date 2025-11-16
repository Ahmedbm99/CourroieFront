import React, { useEffect, useMemo, useState  } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useCart from '../hooks/useCart.js';
import { useLanguage } from '../contexts/LanguageContext';
import BeltServices from '../services/BeltsServices.js';
import { setBelt } from '../store/beltSlice.js'; 

export default function FamilyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const family = useSelector(state => state.family.list);
  const type = useSelector(state => state.type.list);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [profile, setProfile] = useState('');
  const [material, setMaterial] = useState('');
  const [search, setSearch] = useState('');
  const [dimensions, setDimensions] = useState({ length_min: '', width_min: '', thickness_min: '' });
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const { add } = useCart();
const location = useLocation();
const queryParams  = new URLSearchParams(location.search);
const applicationFilter = queryParams.get('application');
  const params = useParams();
  const familyKey = params.id || 'all';
  const typeId = params.typekey || null;
  const [selectedFamily, setSelectedFamily] = useState(null);

useEffect(() => {
  async function fetchProducts() {
    try {
      let response;
      if (familyKey && familyKey !== 'all' && typeId ) {
        response = await BeltServices.getBeltsByFamilyAndType(familyKey, typeId);
      } else {
        if(familyKey && familyKey!== 'all'){
          response = await BeltServices.getBeltsByFamily(familyKey);
          const selected = family.find(f => f.id === familyKey);
          if (selected) {
            setSelectedFamily(selected.id);
}   

        }else

        response = await BeltServices.getAllBelts();
      }

      let data = response.data;

      if (applicationFilter) {
        data = data.filter(p =>
          p.application && p.application.toLowerCase() === applicationFilter.toLowerCase()
        );
      }
      setAllProducts(data);
      setFiltered(data);
      setProducts(data); 
      dispatch(setBelt(data));
    } catch (err) {
      console.error('Error fetching belts:', err);
    }
  }

  fetchProducts();
}, [familyKey, typeId, dispatch, applicationFilter]);

  const lengthOptions = useMemo(() => [...new Set(allProducts.map(p => p.longueur_int_mm).filter(Boolean))].sort((a,b) => a-b), [allProducts]);
  const widthOptions = useMemo(() => [...new Set(allProducts.map(p => p.largeur_mm).filter(Boolean))].sort((a,b) => a-b), [allProducts]);
  const thicknessOptions = useMemo(() => [...new Set(allProducts.map(p => p.epaisseur_mm).filter(Boolean))].sort((a,b) => a-b), [allProducts]);
  const profileOptions = useMemo(() => [...new Set(allProducts.map(p => p.nom).filter(Boolean))], [allProducts]);
const materialOptions = useMemo(() => [...new Set(allProducts.flatMap(p => p.Matieres.flatMap(m=> m.matiere)) .filter(Boolean) )], [allProducts]);
  const getProductName = (product) =>  product.nom;
  const getProductDescription = (product) =>  product.description;
  useEffect(() => {
    let list = [...allProducts];

    if (selectedFamily) list = list.filter(p => p.famille_courroie_id === selectedFamily);
    if (typeId) list = list.filter(p => p.type_courroie_id === parseInt(typeId));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.nom || '').toLowerCase().includes(q) 
      );
    }

    if (profile) list = list.filter(p => (p.nom || '').includes(profile));
if (material) {
  list = list.filter(p =>
    (p.Matieres || []).some(m => m.matiere && m.matiere.includes(material))
  );
}
    const { length_min, width_min, thickness_min } = dimensions;
    list = list.filter(p =>
      (!length_min || p.longueur_int_mm?.toString() === length_min) &&
      (!width_min || p.largeur_mm?.toString() === width_min) &&
      (!thickness_min || p.epaisseur_mm?.toString() === thickness_min)
    );

    setFiltered(list);
    setPage(1);
  }, [allProducts, selectedFamily, typeId, profile, material, search, dimensions]);

  // Pagination
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const toShow = filtered.slice(0, endIndex);


  return (
    <>
      <section className="family-hero">
        <div className="container">
  
          <div className="hero-content">
            <h1>{language === 'fr' ? 'Familles de courroies' : 'Belt Families'}</h1>
            <p>{language === 'fr' ? 'Découvrez nos produits' : 'Explore our products'}</p>
          <div className="hero-stats">
              <div className="stat"><span className="stat-number">3</span><span className="stat-label">Familles</span></div>
              <div className="stat"><span className="stat-number">25+</span><span className="stat-label">Produits</span></div>
              <div className="stat"><span className="stat-number">100%</span><span className="stat-label">Qualité</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="family-navigation">
        
        <div className="container">
                        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}
        >
          <i className="fas fa-arrow-left"></i> {t('back')}
        </button>
          <div className="family-tabs">
            <button className={`family-tab ${!selectedFamily ? 'active' : ''}`} onClick={() => {
          setSelectedFamily(null);
          navigate('/family'); 
        }}>
              <i className="fas fa-th"></i>
              <span>{language === 'fr' ? 'Toutes les familles' : 'All families'}</span>
            </button>
            {family.map(f => (
              <button key={f.id} className={`family-tab ${selectedFamily === f.id ? 'active' : ''}`}onClick={() => {
            setSelectedFamily(f.id);
            navigate(`/family/${f.id}`); 
          }}>
                <i className='fas fa-cog'></i>
                <span>{language === 'fr' ? f.nomFrancais : f.nomAnglais}</span>
              </button>
            ))}
          </div>
         
        </div>
      </section>

                    {selectedFamily && (
          <section className="family-navigation">
        <div className="container">
          <div className="type-tabs " >
            
            <button className={`type-tab ${!selectedType ? 'active' : ''}`} onClick={() => {
         setSelectedType(null);
          navigate(`/family/${selectedFamily}`);
        }}>
              <i className="fas fa-th"></i>
              <span>{language === 'fr' ? 'Toutes les Types' : 'All Types'}</span>
            </button>
            
           {type.filter(t => t.famille_id === selectedFamily).map(t => ( 
            <button key={t.id} className={`type-tab ${selectedType === t.id ? 'active' : ''}`}
           onClick={() => {
            setSelectedType(t.id);
            navigate(`/family/${selectedFamily}/${t.id}`); 
          }}>
                <i className='fas fa-cog'></i>
                <span>{language === 'fr' ? t.nomFrancais :t.nomAnglais}</span>
              </button>
            ))}
   
          </div>

        </div>
      </section>
      )}

      <section className="advanced-filters">
        <div className="container ">
          <div className="filters-container">
            <div className="filter-group">
              <div className="search-input">
                <label>{language === 'fr' ? 'Recherche' : 'Search'}</label>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={language === 'fr' ? 'Rechercher un produit' : 'Search products'}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>


          <div className="filter-group">
            <label>{language === 'fr' ? 'Profil' : 'Profile'}</label>
            <select value={profile} onChange={e => setProfile(e.target.value)}>
              <option value="">{language === 'fr' ? 'Tous les profils' : 'All profiles'}</option>
              {profileOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>{language === 'fr' ? 'Matière' : 'Material'}</label>
            <select value={material} onChange={e => setMaterial(e.target.value)}>
              <option value="">{language === 'fr' ? 'Toutes les matières' : 'All materials'}</option>
              {materialOptions.map((m, index) => (
                <option key={`${m}-${index}`} value={m}>{m}</option>
              ))}
            </select>
          </div>


          <div className="filter-group">
            <label>{language === 'fr' ? 'Longueur' : 'Length'}</label>
            <select value={dimensions.length_min} onChange={e => setDimensions({ ...dimensions, length_min: e.target.value })}>
              <option value="">{language === 'fr' ? 'Sélectionner' : 'Select'}</option>
              {lengthOptions.map(l => <option key={l} value={l}>{l} mm</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>{language === 'fr' ? 'Largeur' : 'Width'}</label>
            <select value={dimensions.width_min} onChange={e => setDimensions({ ...dimensions, width_min: e.target.value })}>
              <option value="">{language === 'fr' ? 'Sélectionner' : 'Select'}</option>
              {widthOptions.map(w => <option key={w} value={w}>{w} mm</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>{language === 'fr' ? 'Épaisseur' : 'Thickness'}</label>
            <select value={dimensions.thickness_min} onChange={e => setDimensions({ ...dimensions, thickness_min: e.target.value })}>
              <option value="">{language === 'fr' ? 'Sélectionner' : 'Select'}</option>
              {thicknessOptions.map(t => <option key={t} value={t}>{t} mm</option>)}
            </select>
          </div>
                   <button className="cta-button primary" onClick={() => {
                setProfile(''); setMaterial(''); setSearch('');
                setDimensions({ length_min: '', width_min: '', thickness_min: '' });
                setSelectedFamily(null);
                navigate('/family');
              }}>
                {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
        </div>

        </div>
      </section>

      <section className="products-section">
        <div className="container products-grid">
          {toShow.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <h3>{language === 'fr' ? 'Aucun produit trouvé' : 'No products found'}</h3>
              <button className="cta-button primary" onClick={() => {
                setProfile(''); setMaterial(''); setSearch('');
                setDimensions({ length_min: '', width_min: '', thickness_min: '' });
                setSelectedFamily(null);
                navigate('/family');
              }}>
                {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
            </div>
          ) : (
            toShow.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
{product.Images && product.Images.length > 0 ? (
  <img
    src={`https://ahmedbm99.github.io/CourroieFront${product.Images[0].image_url}`}
    alt={getProductName(product)}
    loading="lazy"
  />
) : null}

                  <div className="product-badge">{getProductName(product)}</div>
                </div>
                <div className="product-info">
                  <h3>{getProductName(product)}</h3>
                  {getProductDescription(product) && <p className="product-description">{getProductDescription(product)}</p>}
                  {product.matiere && <p><b>{language === 'fr' ? 'Matière' : 'Material'}:</b> {product.matiere}</p>}
                  {product.fabricant && <p><b>{language === 'fr' ? 'Fabricant' : 'Manufacturer'}:</b> {product.fabricant}</p>}
                  {product.largeur_mm && <p><b>{language === 'fr' ? 'Largeur' : 'Width'}:</b> {product.largeur_mm} mm</p>}
                  {product.epaisseur_mm && <p><b>{language === 'fr' ? 'Épaisseur' : 'Thickness'}:</b> {product.epaisseur_mm} mm</p>}
                  {product.pas_mm && <p><b>{language === 'fr' ? 'Pas' : 'Pitch'}:</b> {product.pas_mm} mm</p>}


                  <div className="product-actions">
                    <button className="btn-add-cart" onClick={() => add(product)}>
                      <i className="fas fa-cart-plus"></i> {language === 'fr' ? 'Ajouter' : 'Add'}
                    </button>
                   <button className="btn-details" onClick={() => {navigate(`/product/${product.id}`)}}>
                        <i className="fas fa-plus"></i> {language === 'fr' ? 'Details' : 'Details'}
                  
                   </button>

                    <button className="btn-quote" onClick={() => {
                      add(product, 1);
                      window.dispatchEvent(new CustomEvent('open-quote'));
                    }}>
                      <i className="fas fa-file-invoice"></i> {language === 'fr' ? 'Devis' : 'Quote'}
                    </button>
                   

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {endIndex < filtered.length && (
          <div className="load-more-section">
            <button className="cta-button secondary" onClick={() => setPage(p => p + 1)}>
              <i className="fas fa-plus"></i> {language === 'fr' ? 'Charger plus' : 'Load more'}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
