type Props = {
  placeholder: string;
};

const Autocomplete = ({ placeholder = '' }: Props) => {
  return (
    <div className="container">
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default Autocomplete;
