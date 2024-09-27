type Props<T> = {
  suggestions: T[];
  dataKey: T | string;
};

const SuggestionsList = <T,>({ suggestions, dataKey }: Props<T>) => {
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = typeof dataKey === 'string' ? suggestion[dataKey as keyof T] : suggestion;

        return <li key={index}>{currentSuggestion as string}</li>;
      })}
    </>
  );
};

export default SuggestionsList;
