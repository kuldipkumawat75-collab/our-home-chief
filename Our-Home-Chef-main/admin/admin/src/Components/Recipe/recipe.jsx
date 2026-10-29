import React, { useState } from "react";
import axios from "axios";
import './recipe.css'

function RecipeSimulation() {
  const nutrients = ["calcium", "iron", "zinc"];

  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const toggleNutrient = (nutrient) => {
    if (selectedNutrients.includes(nutrient)) {
      setSelectedNutrients(
        selectedNutrients.filter((n) => n !== nutrient)
      );
    } else {
      setSelectedNutrients([
        ...selectedNutrients,
        nutrient,
      ]);
    }
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/recipe/recommend",
        {
          nutrients: selectedNutrients,
        }
      );

      setIngredients(response.data.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Recipe Simulation</h1>

      <h3>Select Priority Nutrients</h3>

      <div className="chips">
        {nutrients.map((item) => (
          <button
            key={item}
            className={
              selectedNutrients.includes(item)
                ? "chip active"
                : "chip"
            }
            onClick={() => toggleNutrient(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        className="recommendBtn"
        onClick={getRecommendations}
      >
        Get Recommendations
      </button>

      <div className="cards">
        {ingredients.map((item) => (
          <div className="card" key={item.id}>
            <h2>{item.name}</h2>

            <p>Iron: {item.iron} mg</p>
            <p>Calcium: {item.calcium} mg</p>
            <p>Zinc: {item.zinc} mg</p>

            <button>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSimulation;