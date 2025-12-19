'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('hike');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse stored cart:", e);
            }
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) {
            localStorage.setItem('hike', JSON.stringify(cartItems));
        }
    }, [cartItems, hydrated]);

    const addToCart = (item) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.ticketId === item?.ticketId && i.startDate === item?.startDate);
            if (existingItem) {
                return prev.map(i =>
                    i.ticketId === item.ticketId
                        ? { ...i, quantity: (i.quantity || 1) + 1 }
                        : i
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId, startDate) => {
        setCartItems(prev => prev.filter(item => item?.id !== itemId || item?.startDate !== startDate));
    };

    const updateQuantity = (itemId, quantity, startDate) => {
        setCartItems(prev => {
            if (quantity <= 0) {
                return prev.filter(item => item?.id !== itemId);
            }
            return prev.map(item =>
                item?.id === itemId && item?.startDate === startDate ? { ...item, quantity } : item
            );
        });
    };

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + (item?.quantity || 1), 0);
    };


    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}