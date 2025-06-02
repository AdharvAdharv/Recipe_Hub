import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);

  const fetchRecipeDetails = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.meals[0]);
  };

  const fetchOtherRecipes = async () => {
    const fetchedRecipes = [];
    while (fetchedRecipes.length < 8) {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      const newRecipe = data.meals[0];
      if (newRecipe.idMeal !== id && !fetchedRecipes.find(r => r.idMeal === newRecipe.idMeal)) {
        fetchedRecipes.push(newRecipe);
      }
    }
    setOtherRecipes(fetchedRecipes);
  };

  useEffect(() => {
    fetchRecipeDetails();
    fetchOtherRecipes();
  }, [id]);

  if (!recipe) return <div className="text-center text-orange-600 text-2xl mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <Link to="/" className="text-orange-600 hover:underline">&larr; Back to Home</Link>

      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col space-y-8">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full rounded-lg object-contain shadow-lg max-h-[500px] mx-auto"
        />

        <div>
          <h1 className="text-3xl font-bold text-orange-600 mb-4">{recipe.strMeal}</h1>
          <p className="text-gray-700 mb-2"><strong>Category:</strong> {recipe.strCategory}</p>
          <p className="text-gray-700 mb-2"><strong>Area:</strong> {recipe.strArea}</p>
          <p className="text-gray-700 mb-4"><strong>Cooking Instructions:</strong> {recipe.strInstructions}</p>

          <h2 className="text-2xl font-semibold text-orange-500 mb-2">Ingredients:</h2>
          <ul className="list-disc ml-6">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map(num => {
                const ingredient = recipe[`strIngredient${num}`];
                const measure = recipe[`strMeasure${num}`];
                return ingredient && ingredient.trim() !== '' ? (
                  <li key={num} className="text-gray-700">{`${ingredient} - ${measure}`}</li>
                ) : null;
              })}
          </ul>
        </div>
      </div>

      <div className="flex space-x-6 mt-8 justify-center">
        <a
          href={`https://www.instagram.com/search/top/?q=${encodeURIComponent(recipe.strMeal)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-400 text-3xl"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-400 text-3xl"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=Check out this recipe: ${encodeURIComponent(recipe.strMeal)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 text-3xl"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>

        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(recipe.strMeal)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-400 text-3xl"
          aria-label="Pinterest"
        >
          <FaPinterestP />
        </a>
      </div>

      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Explore More Recipes</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
          {otherRecipes.map((r) => (
            <div
              key={r.idMeal}
              className="min-w-[160px] cursor-pointer flex-shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/recipe/${r.idMeal}`)}
              title={r.strMeal}
            >
              <img
                src={r.strMealThumb}
                alt={r.strMeal}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <p className="text-orange-600 font-semibold text-center text-sm truncate">{r.strMeal}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
