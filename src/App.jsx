import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import { Link } from "react-router-dom";


function App() {
  return (
    <StyledDiv className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={'/'}>Foodery</Logo>
          <TagLine>Unleash your craving</TagLine>
          </Nav>
          <Search  /> 
          <Pages /> 
      </BrowserRouter>
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
border: 2px solid #ddd; /* Adds a border */
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Adds a soft shadow */
border-radius: 10px; /* Rounded corners */
padding: 20px;
margin: 20px;
background: #fff; /* White background */
`;         
        

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Lobster Two', cursive;
  
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 3rem;
  }
`;
const TagLine = styled.h3`
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  color: #777;  /* Lighter than the logo */
  margin-top: 0.2rem;
`;
const FilterDropdown = styled.select`
  margin-left: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
`;



export default App;