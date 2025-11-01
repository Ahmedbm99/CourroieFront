import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../services/apiService.js';
import useCart from '../hooks/useCart.js';
import { families as familiesMeta } from '../data/families.js';
import { useLanguage } from '../contexts/LanguageContext';

const families = Object.fromEntries(Object.entries(familiesMeta).map(([k,v]) => [k, { name: v.title, profiles: v.profiles }]));

export default function FamilyPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(params.familyKey || 'all');
  const [profile, setProfile] = useState('');
  const [material, setMaterial] = useState('');
  const [stock, setStock] = useState('');
  const [search, setSearch] = useState('');
  const [showDimensionSearch, setShowDimensionSearch] = useState(false);
  const [dimensions, setDimensions] = useState({
    length_min: '',
    length_max: '',
    width_min: '',
    width_max: '',
    thickness_min: '',
    thickness_max: ''
  });
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const { add } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      await apiService.healthCheck();
      const filters = {};
      if (dimensions.length_min || dimensions.length_max) {
        if (dimensions.length_min) filters.length_min = dimensions.length_min;
        if (dimensions.length_max) filters.length_max = dimensions.length_max;
      }
      if (dimensions.width_min || dimensions.width_max) {
        if (dimensions.width_min) filters.width_min = dimensions.width_min;
        if (dimensions.width_max) filters.width_max = dimensions.width_max;
      }
      if (dimensions.thickness_min || dimensions.thickness_max) {
        if (dimensions.thickness_min) filters.thickness_min = dimensions.thickness_min;
        if (dimensions.thickness_max) filters.thickness_max = dimensions.thickness_max;
      }
      if (family && family !== 'all') {
        filters.category = family;
        const byCat = await apiService.getProducts(filters);
        setAllProducts(byCat);
        setFiltered(byCat);
      } else {
        const products = await apiService.getProducts(filters);
        setAllProducts(products);
        setFiltered(products);
      }
    })();
  }, [family, dimensions]);

  useEffect(() => {
    // keep URL in sync with selection
    if (family && family !== 'all') navigate(`/family/${family}`, { replace: true });
    else navigate('/family', { replace: true });
  }, [family, navigate]);

  useEffect(() => {
    let list = [...allProducts];
    if (family !== 'all') list = list.filter(p => p.category === family);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.profile.toLowerCase().includes(q));
    }
    if (profile) list = list.filter(p => p.profile.includes(profile));
    if (material) list = list.filter(p => (p.material || '').includes(material));
    if (stock === 'in-stock') list = list.filter(p => p.stock > 10);
    else if (stock === 'low-stock') list = list.filter(p => p.stock > 0 && p.stock <= 10);
    else if (stock === 'out-of-stock') list = list.filter(p => p.stock === 0);
    setFiltered(list);
    setPage(1);
  }, [allProducts, family, profile, material, stock, search]);

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const toShow = filtered.slice(0, endIndex);

  const profileOptions = useMemo(() => {
    if (family === 'all') {
      const set = new Set();
      Object.values(families).forEach(f => f.profiles.forEach(p => set.add(p)));
      return Array.from(set).sort();
    }
    return families[family]?.profiles || [];
  }, [family]);

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

      <section className="family-navigation">
        <div className="container">
          <div className="family-tabs">
            {['all','trapezoidales','etroites','automobiles','synchrones','variateur','speciales'].map(key => (
              <button key={key} className={`family-tab ${family === key ? 'active' : ''}`} data-family={key} onClick={() => setFamily(key)}>
                <i className={`fas ${key==='automobiles'?'fa-car':'fa-cog'}`}></i>
                <span>{key==='all'? t('allFamilies'): families[key]?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="advanced-filters">
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="searchFilter">{t('search')}</label>
              <div className="search-input">
                <input type="text" id="searchFilter" placeholder={t('searchProducts')} value={search} onChange={e => setSearch(e.target.value)} />
                <i className="fas fa-search"></i>
              </div>
            </div>
            <div className="filter-group">
              <label htmlFor="profileFilter">{t('profile')}</label>
              <select id="profileFilter" value={profile} onChange={e => setProfile(e.target.value)}>
                <option value="">{t('allProfiles')}</option>
                {profileOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="materialFilter">{t('materials')}</label>
              <select id="materialFilter" value={material} onChange={e => setMaterial(e.target.value)}>
                <option value="">{t('allMaterials')}</option>
                {['CR Rubber','EPDM','PU','Kevlar','Polyester','Fibre de verre'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="stockFilter">Stock</label>
              <select id="stockFilter" value={stock} onChange={e => setStock(e.target.value)}>
                <option value="">{t('allStock')}</option>
                <option value="in-stock">{t('inStock')}</option>
                <option value="low-stock">{t('inStock')}</option>
                <option value="out-of-stock">{t('outOfStock')}</option>
              </select>
            </div>
            <div className="filter-actions">
              <button id="clearFilters" className="btn-secondary" onClick={() => { setFamily('all'); setProfile(''); setMaterial(''); setStock(''); setSearch(''); setDimensions({ length_min: '', length_max: '', width_min: '', width_max: '', thickness_min: '', thickness_max: '' }); }}>{t('clear')}</button>
              <button id="applyFilters" className="cta-button primary" onClick={() => { /* computed reactively */ }}>{t('apply')}</button>
            </div>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => setShowDimensionSearch(!showDimensionSearch)}
              style={{
                background: showDimensionSearch ? '#2563eb' : 'white',
                color: showDimensionSearch ? 'white' : '#2563eb',
                border: '2px solid #2563eb',
                borderRadius: '8px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fas fa-ruler-combined"></i>
              {showDimensionSearch ? t('hide') : t('dimensionSearch')}
              <i className={`fas fa-chevron-${showDimensionSearch ? 'up' : 'down'}`} style={{ marginLeft: '5px' }}></i>
            </button>
          </div>
          {showDimensionSearch && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '25px',
              marginTop: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ color: '#1e293b', marginBottom: '20px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-ruler-combined" style={{ color: '#2563eb' }}></i>
                {t('searchByDimensions')}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                    <i className="fas fa-arrows-alt-h" style={{ marginRight: '8px', color: '#2563eb' }}></i>
                    {t('length')} (mm)
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="number" placeholder={t('min')} value={dimensions.length_min} onChange={e => setDimensions({...dimensions, length_min: e.target.value})} style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }} min="0" step="0.1" />
                    <span style={{ color: '#64748b' }}>-</span>
                    <input type="number" placeholder={t('max')} value={dimensions.length_max} onChange={e => setDimensions({...dimensions, length_max: e.target.value})} style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }} min="0" step="0.1" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                    <i className="fas fa-arrows-alt-v" style={{ marginRight: '8px', color: '#2563eb' }}></i>
                    {t('width')} (mm)
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="number" placeholder={t('min')} value={dimensions.width_min} onChange={e => setDimensions({...dimensions, width_min: e.target.value})} style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }} min="0" step="0.1" />
                    <span style={{ color: '#64748b' }}>-</span>
                    <input type="number" placeholder={t('max')} value={dimensions.width_max} onChange={e => setDimensions({...dimensions, width_max: e.target.value})} style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }} min="0" step="0.1" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                    <i className="fas fa-compress" style={{ marginRight: '8px', color: '#2563eb' }}></i>
                    {t('thickness')} (mm)
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="number" placeholder={t('min')} value={dimensions.thickness_min} onChange={e => setDimensions({...dimensions, thickness_min: e.target.value})} style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }} min="0" step="0.1" />
                    <span style={{ color: '#64748b' }}>-</span>
                    <input type="number" placeholder={t('max')} value={dimensions.thickness_max} onChange={e => setDimensions({...dimensions, thickness_max: e.target.value})} style={{ width: '100%', padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }} min="0" step="0.1" />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setDimensions({ length_min: '', length_max: '', width_min: '', width_max: '', thickness_min: '', thickness_max: '' })} style={{ padding: '10px 20px', background: '#f1f5f9', border: 'none', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600' }}>
                  <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
                  {t('reset')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="products-display">
        <div className="container">
          <div className="products-header">
            <div className="products-info">
              <h2 id="familyTitle">{family==='all'? t('allFamilies'): (families[family]?.name || t('families'))}</h2>
              <p id="productsCount">{t('showingProducts')} {Math.min(page*productsPerPage, filtered.length)} {t('on')} {filtered.length} {t('productsCount')}</p>
            </div>
            <div className="view-controls">
              <button className={`view-btn ${view==='grid'?'active':''}`} data-view="grid" onClick={() => setView('grid')}><i className="fas fa-th"></i></button>
              <button className={`view-btn ${view==='list'?'active':''}`} data-view="list" onClick={() => setView('list')}><i className="fas fa-list"></i></button>
            </div>
          </div>
          <div id="productsContainer" className={`products-container ${view}-view`}>
            {toShow.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-search"></i>
                <h3>{t('noProductsFound')}</h3>
                <p>{t('tryModifyFilters')}</p>
                <button className="cta-button primary" onClick={() => { setFamily('all'); setProfile(''); setMaterial(''); setStock(''); setSearch(''); }}>{t('resetFilters')}</button>
              </div>
            ) : toShow.map(product => (
              <div className="product-card" data-id={product.id} data-family={product.category} key={product.id}>
                <div className="product-image">
                  <img src={product.image_url} alt={product.name} loading="lazy" />
                  <div className="product-badge">{product.profile}</div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-profile">{t('profile')}: {product.profile}</div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-specs">{product.specifications}</div>
                  <div className="product-actions">
                    <button className="btn-add-cart" onClick={() => add(product)}>
                      <i className="fas fa-cart-plus"></i> {t('add')}
                    </button>
                    <button className="btn-quote" onClick={() => { add(product, 1); window.dispatchEvent(new CustomEvent('open-quote')); }}>
                      <i className="fas fa-file-invoice"></i> {t('quote')}
                    </button>
                    <button className="btn-details" onClick={() => navigate(`/product/${product.id}`)}>{t('details')}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more-section">
            {endIndex < filtered.length && (
              <button id="loadMoreBtn" className="cta-button secondary" onClick={() => setPage(p => p + 1)}>
                <i className="fas fa-plus"></i> {t('loadingMore')}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function stockStatus(stock){ if (stock===0) return 'Rupture'; if (stock<10) return 'Stock faible'; return 'En stock'; }
function stockClass(stock){ if (stock===0) return 'out-of-stock'; if (stock<10) return 'low-stock'; return 'in-stock'; }

