import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

function CartContextProvider({children}){
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(()=> {
        const items = localStorage.getItem('cart');
        if(items){
            setCart([...JSON.parse(items)]);
            }
            setIsLoaded(false);

            }, []);

    useEffect(()=>{
        if(!isLoaded){
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    },[cart])


    // Add item to cart

    function addToCart(item) {
        const arr = [...cart];
        const itemInd = arr.findIndex((data) => data.id == item.id);
        if (itemInd == -1) {
          arr.push({ ...item, quantity: 1 });
        } else {
          arr[itemInd].quantity++;
        }
        setCart([...arr]);
      }

    //update cart
    function updateCart(id, type){
        const arr = [...cart]
        const itemIndex = arr.findIndex((data)=>data.id==id)
        if(type == "plus"){
            arr[itemIndex].quantity++;
        } else{
            arr[itemIndex].quantity--;
        }
        setCart([...arr]);
        }

    // remove cart
    function removeCart(id){
        const arr = [...cart]
        const itemIndex = arr.findIndex((data)=>data.id==id)
        arr.splice(itemIndex, 1);
        setCart([...arr]);
        }

        //clearCart
        function clearCart(id) {
          setCartItems([]);
        }
    
        //isItemAdded

        function isItemAdded(id) {
            const arr = [...cart];
            const itemInd = arr.findIndex((data) => data.id == id);
            if (itemInd == -1) {
              return null;
            } else {
              return arr[itemInd];
            }
          }
return(
    <CartContext.Provider 
    value = {{cart, isItemAdded, removeCart, addToCart, updateCart, clearCart}}>
        {children}
    </CartContext.Provider>
)
}



export default CartContextProvider;