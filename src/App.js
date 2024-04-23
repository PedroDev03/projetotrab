import React, { useState, useEffect } from "react";
import Optionselect from "./components/optionselect";





export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/pessoa");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
  
    <div className="container">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <div>{item.nome}</div>
            <div>{item.idade}</div>
            <Optionselect name={item.nome} idade={item.idade} index={index}/> 
          </div>
        ))
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  
    </>
  );
}