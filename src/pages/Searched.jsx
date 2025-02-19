import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { motion } from 'framer-motion';

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { search } = useParams();
  const location = useLocation();  // Use to extract query parameters
  const filter = new URLSearchParams(location.search).get('filter'); // Get the filter query parameter

  const getSearchedRecipes = async () => {
    const API_ID = import.meta.env.VITE_EDAMAM_ID;
    const API_KEY = import.meta.env.VITE_EDAMAM_KEY;

    let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}`;

    if (filter) {
      apiUrl += `&diet=${filter}`;  // Add filter to API request if available
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.hits) {
        setSearchedRecipes(data.hits.map(hit => hit.recipe));
      }
    } catch (error) {
      console.error('Error fetching searched recipes:', error);
    }
  };

  useEffect(() => {
    if (search) {
      getSearchedRecipes();
    }
  }, [search, filter]);  // Add 'filter' as dependency so it triggers on filter change

  return (
    <Wrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Search Results for "{search}" {filter && ` - Filtered by ${filter}`}</h3>
      <Splide options={{ perPage: 3, arrows: true, pagination: false, drag: 'free', gap: '2rem' }}>
        {searchedRecipes.map((recipe) => {
          const recipeId = recipe.uri.split('#recipe_')[1];

          return (
            <SplideSlide key={recipeId}>
              <Card>
                <Link to={`/recipe/${recipeId}`}>
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
  );
}

const Wrapper = styled(motion.div)`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  img {
    border-radius: 1.5rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.5rem;
    text-align: center;
    font-weight: 600;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Searched;
