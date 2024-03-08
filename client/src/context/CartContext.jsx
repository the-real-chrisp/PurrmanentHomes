import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function removePetFromCart(petId) {
        setCartItems(currItems => {
            if (currItems != null && currItems.length != 0) {
                return currItems.filter(item => item.id !== petId);
            }
            return [];
        })
    }

    function addPetIntoCart(pet) {
        setCartItems(currItems => {
            if (currItems != null && currItems.length < 2 && !currItems.find((element) => element.id === pet.id)) {
                return [...currItems, pet];
            }
            return currItems;
        })
    }

    function getCartItems() {
        return cartItems;
    }

    return (
        <CartContext.Provider value={{ addPetIntoCart, removePetFromCart, getCartItems}}>
            {children}
        </CartContext.Provider>
    )
}