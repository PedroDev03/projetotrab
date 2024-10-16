import React, { useState, useEffect } from "react";
import "./index.css";
import pokelogo from "./assets/pokelogo.png";


export default function App() 
{
  const [data, setData] = useState('');
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonshiny , setPokemonshiny] = useState(false);



    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log(response.status);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        
    
        // throw new Error ('404')
      }
    };


    useEffect(() => {
      fetchData();
    }, [pokemonName]);
  
    const handleInputChange = (event) => {
      const name = event.target.value;
      setPokemonName(name.toLowerCase());
        fetchData();
    };




  const typeColors = {

    fire: "orangered",
    water: "dodgerblue",
    grass: "green",
    flying: "gray", // Se quiser adicionar mais tipos, basta seguir o mesmo padrão
    ice: "lightskyblue", 
    fairy: "lightpink", 
    dark: "darkslateblue",
    poison: "purple", 
     ground: "brown", 
    psychic: "rgb(228, 177, 185)", 
     bug: "lightgreen", 
     ghost: "darkorchid", 
    steel: "darkgrey", 
     dragon: "coral", 
     rock: "darkslategrey", 
     electric: "gold",
     fighting: "goldenrod",
    

    
  };
  


  const saberTipo = (verify) => {
    if (verify && typeColors.hasOwnProperty(verify)) {
      return typeColors[verify];
    } else {
      return "white";
    }
  };
  

  const Imageshiny = data?.sprites?.front_shiny || pokelogo;
  const actualImage = data?.sprites?.front_default  || pokelogo  ;
  const verify = data.types && data.types.length > 0 && data.types[0].type && data.types[0].type.name || data.types && data.types.length > 0 && data.types[1].type && data.types[1].type.name;

  const habilidade = data.abilities && data.abilities.length > 0 && data.abilities[0].ability && data.abilities[0].ability.name ;

  

  return (
    <div className="container">
      <div className="texto">Digite o nome do Pokémon desejado: </div>
      <div class="card" style={{
        backgroundColor:(saberTipo(verify) ) }}>
        <div className="header-card">
          <div className="input-area">
            <input type="text" onChange={handleInputChange} />
            <div className="tipo">Tipo: {verify ? data.types[0].type.name : '' || verify ? data.types[1].type.name : ''}
              
            </div>
          </div>
        
         <div className="card-image ">

    
         <img
           alt={pokemonshiny ? "Shiny" : "Normal"}
           src={pokemonshiny ? Imageshiny : actualImage}
           onClick={() => setPokemonshiny(!pokemonshiny)}
        />
       </div>
       
                   
                  
            

          </div>
       
        <div className="card-info">
        {pokemonshiny && data.name ? <div className="aviso-shiny">shiny</div> : ''}
          <p>Nome: {data.name}</p>
          <p>altura: {data.height ? data.height/10  + ' m' : ''}  </p>
          <p>peso: {data.weight ? data.weight/10  + ' kg' : ''} </p>
          <p>habilidade: {habilidade ? data.abilities[0].ability.name : ''}</p>
          {/* Exibindo os tipos do Pokémon */}
        </div>
      </div>
    </div>
    
  );
}
