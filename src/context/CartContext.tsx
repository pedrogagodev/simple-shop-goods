
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { toast } from '@/components/ui/sonner';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (product: Product, quantity: number, size: string) => {
    setItems(prevItems => {
      // Check if item with same product ID and size already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size
      );
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Quantidade atualizada no carrinho');
        return updatedItems;
      } else {
        // Add new item
        toast.success('Produto adicionado ao carrinho');
        return [...prevItems, { product, quantity, size }];
      }
    });
  };
  
  const removeFromCart = (productId: number, size: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.product.id === productId && item.size === size))
    );
    toast.info('Produto removido do carrinho');
  };
  
  const updateQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.info('Carrinho esvaziado');
  };
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
