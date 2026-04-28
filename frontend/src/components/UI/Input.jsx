const Input = ({ type, placeholder, value, onChange, required = false }) => (
    <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);

export default Input;