type Props = {
  suggestions: [];
  dataKey?: string;
};

const SuggestionsList = ({ suggestions, dataKey = '' }: Props) => {
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return <li key={index}>{currentSuggestion}</li>;
      })}
    </>
  );
};

export default SuggestionsList;
