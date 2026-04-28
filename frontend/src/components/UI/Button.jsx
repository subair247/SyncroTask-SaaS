const Button = ({ children, onClick, variant = "primary", type = "button" }) => {
    const styles = variant === "primary" 
        ? "bg-blue-600 text-white hover:bg-blue-700" 
        : "bg-red-500 text-white hover:bg-red-600";
    
    return (
        <button 
            type={type}
            onClick={onClick} 
            className={`${styles} px-4 py-2 rounded transition-colors text-sm font-medium`}
        >
            {children}
        </button>
    );
};

export default Button;