import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";






function ProductDetail(){
    const {id} = useParams();
    const { addToCart, isItemAdded } = useContext(CartContext);
    const [product, setProduct] = useState({});

    useEffect(()=>{ 
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
        
    }, [])
    console.log("products details",product)

    return(
        <div className="h-screen w-screen flex justify-center items-center flex-col">
            <Image
            preview={false}
            width={400}
            height={400}
            src={product?.thumbnail} />
            <h1 className="text-5xl font-mono font-bold my-10">
                {product?.title}
            </h1>
            <Button onClick={()=> addToCart(product)}>
                {isItemAdded(product.id)
                ? `Added(${isItemAdded(product.id).quantity})`
                : "Add to Cart"}
                
            </Button>
        </div>
    )
}
export default ProductDetail;