import React, { useState } from "react";
import axios from "axios";
import './AddFood.css'


const AddFood = () => {

 

  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    newPrice: "",
    category: "Breakfast",
    isTodaysMeal: false,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("newPrice", data.newPrice);
    formData.append("category", data.category);
    formData.append("isTodaysMeal", data.isTodaysMeal);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        formData
      );

      if (response.data.success) {
        alert("Food Added Successfully");

        setData({
          name: "",
          newPrice: "",
          category: "Breakfast",
          isTodaysMeal: false,
        });

        setImage(false);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="add-food">
<form onSubmit={onSubmitHandler}>

<h2>Add Food</h2>

<div className="form-group">
<label>Food Image</label>
<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>
</div>

<div className="form-group">
<label>Food Name</label>
<input
type="text"
name="name"
value={data.name}
onChange={onChangeHandler}
/>
</div>


<div className="price-box">

<div className="form-group">
<label>New Price</label>
<input
type="number"
name="newPrice"
value={data.newPrice}
onChange={onChangeHandler}
/>
</div>

</div>

<div className="form-group">
<label>Category</label>

<select
name="category"
value={data.category}
onChange={onChangeHandler}
>
<option>Breakfast</option>
<option>Lunch</option>
<option>Dinner</option>
</select>

</div>

<div className="checkbox">

<input
type="checkbox"
name="isTodaysMeal"
checked={data.isTodaysMeal}
onChange={onChangeHandler}
/>

<label>Today's Meal</label>

</div>

<button type="submit">
Add Food
</button>

</form>
</div>
  );
};

export default AddFood;