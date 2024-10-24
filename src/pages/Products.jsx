import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Row, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";







function Products(){    
    const[products, setProducts] = useState([])
    const[categories, setCategories] = useState([])
    const[skip, setSkip] = useState(0)
    const[limit, setLimit] = useState(20)
    const[total, setTotal] = useState(20)

  

    useEffect(()=>{
        axios
        .get("https://dummyjson.com/products/categories")
        .then((res) => {
          console.log(res)
          setCategories(res.data)
        })
          // setCategories(res.data)})

    }, [])

    useEffect(()=>{
        axios
        .get(`https://dummyjson.com/products?limit=20&skip=${skip}`)
        .then((res) => {
            console.log("data", res.data.products)
            setProducts(res.data.products)
            setTotal(res.data.total)
        })

    }, [skip])

    return (
        <div className="container mx-auto">
      <div className="flex gap-2 justify-between my-10">
        <Input type="search" placeholder="Search"  onChange={(e) => setSearch(e.target.value)} />
        <Select
          showSearch
          className="h-12 w-1/2"
          placeholder="Select Category"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={categories.map((data) => {
            return { label: data.name, value: data.slug };
          })}
          onChange={(value) => {
            console.log(value)
            setSelectedCategory(value)
          }}
        />
        <Button icon={<SearchOutlined />} className="h-12" onClick={(value)=>{
          console.log(selectedCategory)
          // {selectedCategory.map((data)=>(
          //   <ProductCard key={data.id} item={data} />
          // ))}
        }}> 
          Search
        </Button>
      </div>
      <Row gutter={16} justify={"center"}>
        {products.map((data) => (
          <ProductCard key={data.id} item={data} />
        ))}
      </Row>
      <div className="flex justify-center my-8">
        <Pagination
          onChange={(num) => {
            setSkip((num - 1) * 20);
          }}
          defaultCurrent={1}
          pageSize={20}
          total={total}
        />
      </div>
      </div>
    )
};
export default Products;