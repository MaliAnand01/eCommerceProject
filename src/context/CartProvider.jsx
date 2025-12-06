import { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import { cartReducer, initialState } from "../reducer/cartReducer";

const CartProvider = ({ children }) => {
  const getInitialState = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return initialState;
      }
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (product, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity },
    });
  };

  const removeItem = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId },
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
