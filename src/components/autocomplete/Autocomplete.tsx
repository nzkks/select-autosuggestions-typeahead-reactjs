import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import * as _ from 'lodash';
import SuggestionsList from '../suggestionsList/SuggestionsList';

type Props = {
  placeholder: string;
  fetchSuggestions?: (query: string) => Promise<[]>;
  dataKey?: string;
};

const Autocomplete = ({ placeholder = '', fetchSuggestions, dataKey = '' }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const getSuggestions = async (query: string) => {
    setError('');
    setIsLoading(true);
    try {
      let result;

      if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }

      if (result) {
        console.log(result);
        setSuggestions(result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }

      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    _.debounce(input => getSuggestions(input), 500),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="container">
      <input type="text" value={inputValue} onChange={handleOnChange} placeholder={placeholder} />

      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul role="listbox">
          <SuggestionsList suggestions={suggestions} dataKey={dataKey} />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
