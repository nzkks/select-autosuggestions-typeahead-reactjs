import './App.css';
import RecipeSelection from './components/recipeSelection/RecipeSelection';

const App = () => {
  return (
    <>
      <h3>Select with auto-suggesstions and typeahead</h3>

      <RecipeSelection />
    </>
  );
};

export default App;
