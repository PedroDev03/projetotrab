import React, { useState, useEffect } from "react";
import "./index.css";

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
  }, [pokemonName]);

  const handleInputChange = (event) => {
    const name = event.target.value;
    setPokemonName(name.toLowerCase());
  };

  if (!data) {
    return <>Carregando...</>;
  }

  const actualImage = data?.sprites?.front_default || ''

  return (
    <div className="container">
      <div className="texto">Digite o nome do Pokémon desejado: </div>
      <div className="cards">
        <div className="header-card">
          <div className="input-area">
            <input type="text" onChange={handleInputChange} />
          </div>

          <div className="card-info">
            <p>Nome: {data.name}</p>
            <p>altura: {data.height}</p>
            <p>peso: {data.weight}</p>

            {/* Exibindo os tipos do Pokémon */}
          </div>
        </div>
        <div className="card-image">
          <img src={actualImage} />
        </div>
      </div>
    </div>
  );
}
