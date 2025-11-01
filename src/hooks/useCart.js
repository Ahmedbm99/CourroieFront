import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kortibelt_cart';

export default function useCart() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const total = useMemo(() => items.reduce((s, p) => s + ((p.price || 0) * p.quantity), 0), [items]);

  function add(product, quantity = 1) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { ...product, quantity }];
    });
  }
  function remove(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }
  function update(id, quantity) {
    if (quantity <= 0) return remove(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  }
  function clear() { setItems([]); }

  return { items, total, add, remove, update, clear, isCartOpen, setCartOpen };
}

