import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);

      const detailedPokemon = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponce = await Promise.all(detailedPokemon);
      setPokemon(detailedResponce);
      setLoading(false);
      setError(null);
      console.log(detailedResponce);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          {/* <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>
        <div>
          <ul className="cards">
            {pokemon.map((currPokemon) => {
              return (
                <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
