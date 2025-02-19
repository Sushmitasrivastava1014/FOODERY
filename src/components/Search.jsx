import styled from 'styled-components';
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'


function Search() {

    const [input, setInput] =  useState("");
    const [filter, setFilter] = useState('');  
    const navigate = useNavigate();
  
    const  submitHandler = (e) => {
        e.preventDefault();
        navigate(`/searched/${input}?filter=${filter}`);
    };

  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch></FaSearch>
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input} placeholder="Search for recipes..." />
        </div>
        <select 
        onChange={(e) => setFilter(e.target.value)} 
        value={filter}
      >
        <option value="">Filter by</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="dairy-free">Dairy-Free</option>
        <option value="low-fat">Low Fat</option>
      </select>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0rem 20rem;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  
  div {
    width: 80%; 
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width: 100%; /* Make the input take full width */
  }
    input::placeholder {
    color: white;
  }


  select {
    padding: 0.75rem;
    font-size: 1.5rem;
    padding: 1rem 1rem;
    border-radius: 1rem;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    cursor: pointer;
    margin-left: 1rem; /* Add some space between the input and select */
    width: 20%; /* Adjust the width of the select dropdown */
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
          
            