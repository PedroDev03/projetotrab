import React, { useState, useEffect } from "react";
import "./index.css";
  import pokelogo from "./assets/pokelogo.png";
export default function App() {
  const [data, setData] = useState(null);
  const [pokemonName, setPokemonName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [pokemonName, data]);

  const handleInputChange = (event) => {
    const name = event.target.value;
    setPokemonName(name.toLowerCase());
  };

  if (!data) {
    return <>Carregando...</>;
  }

  const actualImage = data?.sprites?.front_default || pokelogo;
  const verify = data.types && data.types.length > 0 && data.types[0].type && data.types[0].type.name ;
  return (
    <div className="container">
      <div className="texto">Digite o nome do Pokémon desejado: </div>
      <div class="card" style={{
        backgroundColor:(verify === 'fire' ) ? 'red' : 'white'
        }}>
        <div className="header-card">
          <div className="input-area">
            <input type="text" onChange={handleInputChange} />
            <div className="tipo">Tipo: {verify ? data.types[0].type.name : ''}</div>
          </div>
        
         <div className="card-image">
             {
              pokemonName === '' ? (
                <img src={pokelogo}/>
                
              ) : (
                <img src={actualImage}/>
              )
             }
             

          </div>
        </div>
        <div className="card-info">
          <p>Nome: {data.name}</p>
          <p>altura: {data.height}</p>
          <p>peso: {data.weight}</p>

          {/* Exibindo os tipos do Pokémon */}
        </div>
      </div>
    </div>
    
  );
}
