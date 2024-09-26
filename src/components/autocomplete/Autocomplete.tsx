import { ChangeEvent, useState } from 'react';

type Props = {
  placeholder: string;
};

const Autocomplete = ({ placeholder = '' }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <input type="text" value={inputValue} onChange={handleOnChange} placeholder={placeholder} />
    </div>
  );
};

export default Autocomplete;
