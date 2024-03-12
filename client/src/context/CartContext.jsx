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
        if (cartItems.find((element) => element.id === pet.id)) {
            return [false, `${pet.name} is already in Cart`];
        }
        if (cartItems != null && cartItems.length == 2) {
            return [false, "You can not add more than two pets in the Cart"];
        }
        setCartItems(currItems => {
            if (currItems != null && currItems.length < 2 && !currItems.find((element) => element.id === pet.id)) {
                return [...currItems, pet];
            }
            return currItems;
        })
        return [true, "Added into Cart"];
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