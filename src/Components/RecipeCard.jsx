import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-72 m-4 hover:scale-105 transition duration-300 cursor-pointer">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-bold text-orange-600 mb-2">{recipe.strMeal}</h2>
          <p className="text-sm text-gray-600">Category: {recipe.strCategory}</p>
          <p className="text-sm text-gray-600">Area: {recipe.strArea}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
