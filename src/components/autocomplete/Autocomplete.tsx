import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOptionClicked(false);
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
        setSuggestions(result);
        setIsOpen(true);
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
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: T) => {
    setIsOptionClicked(true);
    setInputValue(dataKey ? (suggestion[dataKey as keyof T] as string) : (suggestion as string));
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0 && isOpen) {
      if (event.key === 'ArrowUp') {
        setSelectedOptionIndex(prev => (prev === -1 ? suggestions.length - 1 : prev - 1));
      } else if (event.key === 'ArrowDown') {
        setSelectedOptionIndex(prev => (prev === suggestions.length - 1 ? -1 : prev + 1));
      } else if (event.key === 'Enter') {
        if (selectedOptionIndex !== -1) {
          const selectedSuggestion = suggestions[selectedOptionIndex];
          handleSuggestionClick(selectedSuggestion);
        }
      } else if (event.key === 'Escape') {
        setInputValue('');
        setSuggestions([]);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        onChange={handleOnChange}
        onKeyDown={handleKeydown}
        placeholder={placeholder}
      />

      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list" role="listbox">
          <SuggestionsList
            suggestions={suggestions}
            queryText={inputValue}
            selectedOptionIndex={selectedOptionIndex}
            dataKey={dataKey}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
