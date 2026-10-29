import React, { useState, useEffect } from "react";
import "./Listofproduct.css";
import axios from "axios";

const Listofproduct = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/food/get-food");

      if (res.data.success) {
        setProducts(res.data.data || []);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeproduct = async (id) => {
    await fetch(`http://localhost:4000/removeproduct/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  return (
    <div className="product-list">
      <h1>All Product List</h1>

      <div className="product-list-format">
        <p>Product</p>
        <p>Title</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproduct">
        {products.map((item, i) => (
          <div key={i} className="product-list-format listproduct-format">
           <img className="product-image" src={`http://localhost:4000/image/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.newPrice}</p>
            <p>{item.category}</p>
            <p>{item.isTodayMeal}</p>
                    <p onClick={() => removeproduct(item._id)}>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listofproduct;

