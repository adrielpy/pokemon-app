import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Pokemonlist = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await api.get("/pokemon?limit=1015");
        setPokemons(response.data.results);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar os Pokémons.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []); 

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div>
          <h1>Lista de Pokémons</h1>
          <ul>
              {pokemons.map((pokemon, index) => (
                  <li key={index}>
                      <span>{pokemon.name}</span>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Pokemonlist;