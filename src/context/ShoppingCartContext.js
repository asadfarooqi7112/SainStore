import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart"; 
import { useLocalStorage } from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id) {
        id = parseInt(id);
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id) {
        id = parseInt(id);
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) === undefined) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id) {
        id = parseInt(id);
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id);
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id) {
        id = parseInt(id);
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id);
        });
    }

    function emptyCart() {
        setCartItems([]);
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                emptyCart,
                cartItems,
                openCart,
                closeCart,
                cartQuantity
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
