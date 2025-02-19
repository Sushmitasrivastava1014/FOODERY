import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie() {
  const API_ID = import.meta.env.VITE_EDAMAM_ID;
  const API_KEY = import.meta.env.VITE_EDAMAM_KEY;

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=vegetarian&app_id=${API_ID}&app_key=${API_KEY}`;

  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
  
    // Check if the data exists and is not null or undefined
    if (check) {
      try {
        setVeggie(JSON.parse(check)); // Safely parse if it's valid
      } catch (error) {
        console.error("Error parsing veggie data from localStorage:", error);
        // Optionally handle fallback logic if parsing fails, e.g., set an empty array or refetch data
        setVeggie([]);
      }
    } else {
      try {
        const api = await fetch(url);
        const data = await api.json();
  
        // Check if the response is valid before storing it in localStorage
        if (data && data.hits) {
          localStorage.setItem("veggie", JSON.stringify(data.hits));
          setVeggie(data.hits);
        } else {
          console.error("API response doesn't contain valid data.");
          setVeggie([]); // Fallback to an empty array in case the API response is invalid
        }
  
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error fetching veggie recipes:", error);
        setVeggie([]); // Fallback to an empty array in case of API errors
      }
    }
  };
  

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {veggie.map(({ recipe }) => {
            const recipeId = recipe.uri.split("#recipe_")[1]; // ✅ Extract ID
            return (
              <SplideSlide key={recipeId}>
                <Card>
                  <Link to={"/recipe/" + recipeId}>
                    <p>{recipe.label}</p>
                    <img src={recipe.image} alt={recipe.label} />
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
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
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

export default Veggie;
