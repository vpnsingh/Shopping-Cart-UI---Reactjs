export const addItemToCart = (item, next) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count: 1
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}

export const loadMyCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            console.log(JSON.parse(localStorage.getItem("cart")))
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, id) => {
            if(product._id === productId){
                cart.splice(id, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

export const cartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        let cart = [];
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}