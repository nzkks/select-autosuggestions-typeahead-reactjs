import './App.css';
import Autocomplete from './components/autocomplete/Autocomplete';

const App = () => {
  const handleFetchSuggestions = async (query: string) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result.recipes;
  };

  return (
    <>
      <h3>Select with auto-suggesstions and typeahead</h3>

      <Autocomplete placeholder="Enter recipe name..." fetchSuggestions={handleFetchSuggestions} dataKey={'name'} />
    </>
  );
};

export default App;
