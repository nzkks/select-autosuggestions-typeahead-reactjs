import './App.css';
import Autocomplete from './components/autocomplete/Autocomplete';

const App = () => {
  return (
    <>
      <h3>Select with auto-suggesstions and typeahead</h3>

      <Autocomplete placeholder="Enter recipe name..." />
    </>
  );
};

export default App;
