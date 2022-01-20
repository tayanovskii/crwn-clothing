import CartActionsTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const initialState = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CartActionsTypes.TOGGLE_CART_HIDDEN:
            return { ...state, hidden: !state.hidden }
        case CartActionsTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, payload)
            }
        case CartActionsTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== payload.id)
            }
        case CartActionsTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, payload)
            }
        default:
            return state;
    }
}

export default cartReducer;
