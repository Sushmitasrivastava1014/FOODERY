import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from 'react';
import { motion } from 'framer-motion';

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    
    useEffect(() => {
      const API_ID = import.meta.env.VITE_EDAMAM_ID;
      const API_KEY = import.meta.VITE_EDAMAM_KEY;

      

      const fetchRecipeDetails = async(name) => {
        

        const data = await fetch(
  `https://api.edamam.com/api/recipes/v2?type=public&q=${params.name}&app_id=${API_ID}&app_key=${API_KEY}`
);

        const detailData = await data.json();
        setDetails(detailData);
      };

        fetchRecipeDetails();
    }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>
          Instructions
          </Button>

        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>
          Ingredients
        </Button>
        
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
         )}

         {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => 
              <li key={ingredient.id}>{ingredient.original}</li>
            )}
          </ul>

         )};
        
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  overflow: hidden;

  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;