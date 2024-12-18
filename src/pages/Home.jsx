import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../slider/slider";


function Home(){
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=12")
      .then((res) => setProducts(res.data.products));
  }, []);

  return (
    
    <div className="container mx-auto">
      <Slider />
      <div className="flex justify-between my-10">
        <h1 className="text-3xl">Find your Best Products</h1>
        <Link to={"/products"}>
          <Button>See All</Button>
        </Link>
      </div>

      <Row gutter={16} justify={'center'}>
        {products.map((data) => (
          <ProductCard key={data.id} item={data} />
        ))}
      </Row>
    </div>
  );
}
export default Home;