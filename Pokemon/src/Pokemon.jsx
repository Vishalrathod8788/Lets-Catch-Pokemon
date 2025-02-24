import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
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

  // Search Functionality
  const searchData = pokemon.filter((currPokemon) => {
    return currPokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  // Show message if no pokemon found matching search
  const noResultsMessage =
    search && searchData.length === 0 ? (
      <div className="not-found">
        <h2>No Pokemon found matching {search}</h2>
        <p>Try searching for a different Pokemon name</p>
      </div>
    ) : null;

  if (loading) {
    return (
      <div className="loader">
        <div style={{ alignItems: "center" }} className="pokemon-loader"></div>
        <h1 className="loading-text">Loading...</h1>
      </div>
    );
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
        {noResultsMessage}
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((currPokemon) => {
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

//   if (loading) {
//     return (
//       <div className="loader">
//         <div style={{ alignItems: "center" }} className="pokemon-loader"></div>
//         <h1 className="loading-text">Loading...</h1>
//       </div>
//     );
//   }

//   if (error) {
//     return <h1>{error.message}</h1>;
//   }
//   return (
//     <>
//       <section className="container">
//         <header>
//           <h1> Lets Catch Pokémon</h1>
//         </header>
//         <div className="pokemon-search">
//           <input
//             type="text"
//             placeholder="search Pokemon"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div>
//           <ul className="cards">
//             {searchData.map((currPokemon) => {
//               return (
//                 <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
//               );
//             })}
//           </ul>
//         </div>
//       </section>
//     </>
//   );
// };
