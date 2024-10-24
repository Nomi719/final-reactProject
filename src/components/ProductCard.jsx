import React, { useContext } from "react";
import { Card, Col, Image } from "antd";
import { CartContext } from "../context/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";



const ProductCard = ({ item }) => {
  const { isItemAdded } = useContext(CartContext);

  const isAdded = isItemAdded(item.id) ? true : false;

  return (

  

  <Col sm={24} md={12} lg={8} xl={6}>
    <Link to={`/product/${item.id}`}>
    <div className="my-2 border-2 hover:opacity-75 cursor-pointer flex flex-col items-center justify-center ">
    {isAdded && (
            <ShoppingCartOutlined className="text-3xl absolute top-5 right-5" />
          )}
      <Image preview={false} src={item.thumbnail} height={200}  />
      <div className="flex justify-between p-3 w-full">
        <h1 className="font-semibold">{item.title}</h1>
        <h1 className="font-semibold">${item.price}</h1>
      </div>
    </div>
    </Link>
  </Col>
);
}
export default ProductCard;