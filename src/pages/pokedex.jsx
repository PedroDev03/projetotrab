import React, { useState, useEffect } from "react";
import "../index.css";
import pokelogo from "../assets/pokelogo.png";

const Pokedex = () => {
  const [data, setData] = useState('');
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonShiny, setPokemonShiny] = useState(true);

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
    }
  };

  useEffect(() => {
    if (pokemonName) {
      fetchData();
    }
  }, [pokemonName]);

  const handleInputChange = (event) => {
    const name = event.target.value;
    setPokemonName(name.toLowerCase());
  };

  const typeColors = {
    fire: "orangered",
    water: "dodgerblue",
    grass: "green",
    flying: "gray",
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
    return verify && typeColors.hasOwnProperty(verify) ? typeColors[verify] : "white";
  };
  
  const actualImageShiny = data?.sprites?.front_shiny || pokelogo;
  const actualImage = data?.sprites?.front_default || pokelogo;
  const verify = data.types && (data.types[0].type.name || data.types[1]?.type.name);
  const habilidade = data.abilities && data.abilities[0]?.ability?.name;

  return (
    <div className="container">
      <div className="texto">Digite o nome do Pokémon desejado:</div>
      <div className="card" style={{ backgroundColor: saberTipo(verify) }}>
        <div className="header-card">
          <div className="input-area">
            <input type="text" onChange={handleInputChange} />
            <div className="tipo">Tipo: {verify}</div>
          </div>
          <div className="card-image">
            <img src={actualImage} alt={data.name} />
            <img
              className={pokemonShiny ? "hidden" : "fade-in"}
              src={actualImageShiny}
              alt="Shiny"
              onClick={() => setPokemonShiny(!pokemonShiny)}
            />
          </div>
        </div>
        <div className="card-info">
          {!pokemonShiny && data.name ? <div className="aviso-shiny">shiny</div> : ''}
          <p>Nome: {data.name}</p>
          <p>Altura: {data.height ? data.height / 10 + ' m' : ''}</p>
          <p>Peso: {data.weight ? data.weight / 10 + ' kg' : ''}</p>
          <p>Habilidade: {habilidade}</p>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;