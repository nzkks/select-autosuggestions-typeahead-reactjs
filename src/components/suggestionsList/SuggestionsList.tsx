type Props<T> = {
  suggestions: T[];
  queryText: string;
  selectedOptionIndex: number;
  dataKey: T | string;
  onSuggestionClick: (suggestion: T) => void;
};

const SuggestionsList = <T,>({ suggestions, queryText, selectedOptionIndex, dataKey, onSuggestionClick }: Props<T>) =>
  suggestions.map((suggestion, index) => {
    const currentSuggestion = typeof dataKey === 'string' ? suggestion[dataKey as keyof T] : suggestion;

    return (
      <li
        key={index}
        className="suggestion-item"
        onClick={() => onSuggestionClick(suggestion)}
        style={{ backgroundColor: index === selectedOptionIndex ? '#3a3a3a' : '' }}
      >
        {getHighlightedText(currentSuggestion as string, queryText)}
      </li>
    );
  });

const getHighlightedText = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => (
        <span
          key={index}
          style={part.toLowerCase() === query.toLowerCase() ? { fontWeight: 'bold', color: '#0070f3' } : {}}
        >
          {part}
        </span>
      ))}
    </span>
  );
};
export default SuggestionsList;
