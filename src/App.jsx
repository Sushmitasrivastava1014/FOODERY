import { useState } from 'react'
import { GiKnifeFork } from "react-icons/gi";


import './App.css'
import Axios from 'axios'
import RecipeTile from './RecipeTile';

function App() {
  const[query, setquery]= useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegan");
  
   
      const YOUR_APP_ID = `7af3349b`;
      const YOUR_APP_KEY = "5c251bb4ed810e8f4c1a08f082d06fc9";

      const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${healthLabels}`;

       async function getRecipeInfo() {
          var result = await Axios.get(url);
          setrecipes(result.data.hits);
          console.log(result.data);
        }
        const onSubmit =(e)=>{
          e.preventDefault();
          getRecipeInfo();                                                               
        }
        
        return ( <>
        <div className="app">
          <div className="app__header">
          <GiKnifeFork />
          <h1 className="text-4xl font-bold ">Food Recipe App</h1>
          </div>
          
          <h2 className="text-md text-[rgb(120,120,120)]">Unleash Your Cravings.</h2>
          <div className="flex items-center space-x-2  p-2 ">
          <form className="app__searchForm" onSubmit={onSubmit}>
            <input type="text" className="app__input" placeholder="enter ingredient" value={query} onChange={(e)=>setquery(e.target.value)}/>
            <button type="submit" className="app__submit"  >Search</button>
            <select className="app__healthLabels">
              <option onClick={() => sethealthLabels("vegan")}>vegan</option>  
              <option onClick={() => sethealthLabels("vegetarian")}>vegetarian</option>
              <option onClick={() => sethealthLabels("paleo")}>paleo</option>
              <option onClick={() => sethealthLabels("dairy-free")}>dairy-free</option>
              <option onClick={() => sethealthLabels("gluten-free")}>gluten-free</option>
              <option onClick={() => sethealthLabels("wheat-free")}>wheat-free</option>
              <option onClick={() => sethealthLabels("low-sugar")}>low-sugar</option>
              <option onClick={() => sethealthLabels("egg-free")}>egg-free</option>
              <option onClick={() => sethealthLabels("peanut-free")}>peanut-free</option>
              <option onClick={() => sethealthLabels("tree-nut-free")}>tree-nut-free</option>
              <option onClick={() => sethealthLabels("soy-free")}>soy-free</option>
              <option onClick={() => sethealthLabels("fish-free")}>fish-free</option>
            </select>
            </form>
            </div>
            <div className="app__recipes">
             {recipes.map((recipe)=>{
                return <RecipeTile recipe={recipe} /> 
              })}
            </div>
          </div>
    </>
  );
}

export default App;
