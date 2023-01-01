import axios from 'axios';
import { useEffect, useState } from 'react';

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {
  const [count, setCount] = useState(0);
  const [pokemons,setPokemons] = useState([]);

  useEffect(() =>{
    axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => {
      
      const sortedArray = [...response.data.results]

      sortedArray.sort((a,b) =>{
        return a.name.localeCompare(b.name)
      })
      setCount(response.data.count)
      setPokemons(sortedArray)
    })
  },[])

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <h2>Quantidade de registros : {count}</h2>
     
      {
        pokemons.map((item) => (  
            <Pokemon key={item.name} data={item} />    
        ))
      }
    </>
  );
}

const Pokemon = ({data}) => { 

  const [details,setDetails] = useState(null)

  useEffect(() =>{
    axios.get(data.url)
    .then((response) => setDetails(response.data))
  },[])

  if(details == null){
    return <div>-</div>
  }

 return (
  <div style={{display:'flex', alignItems:'center'}}>
   <img src={details.sprites.front_default} alt={details.name} />
    {details.name} - {details.base_experience}
   </div>
 )
}

export default App;
