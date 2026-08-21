import { createContext, useReducer, useEffect } from 'react';

import {
  cartReducer,
  calculateCartTotals,
  DEFAULT_INITIAL_ITEMS,
} from './cartReducer';

const CartContext = createContext(null);

const STORAGE_KEY = 'urbannest_parcel_cart_v1';

/**
 * Initial cart state
 */
function getInitialState() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedItems = JSON.parse(saved);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          const { totalCount, subtotal } = calculateCartTotals(parsedItems);
          return {
            items: parsedItems,
            totalCount,
            subtotal,
            isDrawerOpen: false,
          };
        }
      }
    } catch {
      // Ignore localStorage parse errors and fallback
    }
  }

  const { totalCount, subtotal } = calculateCartTotals(DEFAULT_INITIAL_ITEMS);
  return {
    items: DEFAULT_INITIAL_ITEMS,
    totalCount,
    subtotal,
    isDrawerOpen: false,
  };
}

/**
 * Cart Context Provider
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Sync to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage unavailable / quota exceeded
    }
  }, [state.items]);

  const addItem = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: product, quantity });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openDrawer = () => {
    dispatch({ type: 'OPEN_DRAWER' });
  };

  const closeDrawer = () => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };

  const toggleDrawer = () => {
    dispatch({ type: 'TOGGLE_DRAWER' });
  };

  const value = {
    items: state.items,
    totalCount: state.totalCount,
    subtotal: state.subtotal,
    isDrawerOpen: state.isDrawerOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext };
export default CartContext;

