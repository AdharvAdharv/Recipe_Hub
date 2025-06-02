import React, { useEffect, useState } from 'react';
import RecipeCard from '../Components/RecipeCard';
import SearchBar from '../Components/SearchBar';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState(" Recipe Hub");

  const fetchRandomRecipes = async () => {
    const randomRecipes = [];
    for (let i = 0; i < 6; i++) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      randomRecipes.push(data.meals[0]);
    }
    setRecipes(randomRecipes);
    setTitle(" Recipe Hub");
  };

  const handleSearch = async (keyword) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    const data = await response.json();
    if (data.meals) {
      setRecipes(data.meals);
      setTitle(`Search Results for "${keyword}"`);
    } else {
      setRecipes([]);
      setTitle(`No recipes found for "${keyword}"`);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="min-h-screen bg-orange-50 p-6"
  >
   
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8">{title}</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    
    </motion.div>
  );
};

export default HomePage;
