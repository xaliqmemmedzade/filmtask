import React, { useEffect, useState } from 'react'

function MovieCard({ title, poster_path, release_date, overview, onAddToCart }) {
  const imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <img 
        src={imgUrl} 
        alt={title} 
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-400">Release Date: {release_date}</p>
      <p className="text-sm text-gray-400">Overview: {overview}</p>
      <button 
        onClick={onAddToCart} 
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
      >
        Add to Cart
      </button>
    </div>
  );
}

function Products() {
  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=fa1192549721df01a1fb28a7788e6608")
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

 
  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (movie) => {
    setCart([...cart, movie]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Popular Movies</h1>

      
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
          className="w-full md:w-1/2 p-2 text-lg rounded-lg bg-gray-700 text-white focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <MovieCard 
              key={index}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              overview={movie.overview}
              onAddToCart={() => addToCart(movie)}
            />
          ))
        ) : (
          <p className="text-center text-lg text-gray-400">No movies found</p>
        )}
      </div>

      <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-400">Your cart is empty</p>
        ) : (
          cart.map((movie, index) => (
            <div key={index} className="flex items-center mb-4">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">Release Date: {movie.release_date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
