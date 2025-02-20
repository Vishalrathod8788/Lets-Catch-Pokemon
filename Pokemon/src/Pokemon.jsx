import { useEffect } from "react";
import "./index.css";

export const Pokemon = () => {
  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detaiedPokemon = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });
      console.log(detaiedPokemon);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Hey! Pokemon</h1>
    </div>
  );
};
