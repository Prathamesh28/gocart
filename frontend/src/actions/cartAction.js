import Cookie from "js-cookie"
const { default: Axios } = require("axios");
const { ADD_TO_CART, CART_REMOVE_ITEM } = require("../constants/cartConstants");
const  addToCart = (productId,qty) => async (dispatch,getState) => {
    try {
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({type: ADD_TO_CART, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }});
        
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        
    }
}

const removeFromCart = (productId) => (dispatch,getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId})
    const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
}
export {addToCart, removeFromCart}