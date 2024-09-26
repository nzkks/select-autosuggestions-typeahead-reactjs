import Autocomplete from '../autocomplete/Autocomplete';

const RecipeSelection = () => {
  const handleFetchSuggestions = async (query: string) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result.recipes;
  };

  return <Autocomplete placeholder="Enter recipe name..." fetchSuggestions={handleFetchSuggestions} dataKey={'name'} />;
};

export default RecipeSelection;
