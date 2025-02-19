import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Popular() 
{

  const [popular, setPopular] = useState([]);
  

  const getPopular = async () => {
    try {
      console.log("Fetching popular recipes...");
  
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=vegetarian&app_id=${import.meta.env.VITE_EDAMAM_ID}&app_key=${import.meta.env.VITE_EDAMAM_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);  // Log API response
  
      if (!data.hits || data.hits.length === 0) {
        console.error("No recipes found in API response!");
        return;
      }
  
      // Extract only recipe details
      const recipes = data.hits.map(hit => hit.recipe);
      console.log("Extracted Recipes:", recipes);
  
      // Save to state and local storage
      setPopular(recipes);
      localStorage.setItem("popular", JSON.stringify(recipes));
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    getPopular();
  },[]);
   

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide options={{perPage: 4, arrows: false, pagination: false, drag: 'free', gap: "5rem"}}>
          {popular.map((recipe, index) => {
             const recipeId = recipe.uri.split("#recipe_")[1];
            console.log(`Rendering Recipe: ${recipe.label}, Image: ${recipe.image}`);  // Debug log

            return (
            <SplideSlide key={recipeId || index}> 
              <Card>
              <Link to={`/recipe/${recipeId}`}>
              <p>{recipe.label || "No title"}</p>
              {recipe.image ? (<img src={recipe.image} alt={recipe.label} />) : (<p>No Image Available</p> 
              )}
                
          <Gradient />
        </Link>
      </Card>
    </SplideSlide>
  );
})}

        </Splide>
      </Wrapper>
    </div>
  );

}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img 
  { 
    border-radius: 2rem; 
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p
  {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%; 
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;