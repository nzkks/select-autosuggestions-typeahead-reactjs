type Props<T> = {
  suggestions: T[];
  dataKey: T | string;
  onSuggestionClick: (suggestion: T) => void;
};

const SuggestionsList = <T,>({ suggestions, dataKey, onSuggestionClick }: Props<T>) => {
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = typeof dataKey === 'string' ? suggestion[dataKey as keyof T] : suggestion;

        return (
          <li key={index} className="suggestion-item" onClick={() => onSuggestionClick(suggestion)}>
            {currentSuggestion as string}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionsList;
