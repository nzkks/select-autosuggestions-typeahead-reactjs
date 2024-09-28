import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import * as _ from 'lodash';
import SuggestionsList from '../suggestionsList/SuggestionsList';
import './autocomplete.css';

type Props<T> = {
  placeholder: string;
  fetchSuggestions?: (query: string) => Promise<T[]>;
  dataKey?: string;
};

const Autocomplete = <T,>({ placeholder = '', fetchSuggestions, dataKey = '' }: Props<T>) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [isOptionClicked, setIsOptionClicked] = useState(false);
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
    if (inputValue.length > 1 && !isOptionClicked) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: T) => {
    setIsOptionClicked(true);
    setInputValue(dataKey ? (suggestion[dataKey as keyof T] as string) : (suggestion as string));
    setSuggestions([]);
  };

  return (
    <div className="container">
      <input type="text" value={inputValue} onChange={handleOnChange} placeholder={placeholder} />

      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list" role="listbox">
          <SuggestionsList suggestions={suggestions} dataKey={dataKey} onSuggestionClick={handleSuggestionClick} />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
