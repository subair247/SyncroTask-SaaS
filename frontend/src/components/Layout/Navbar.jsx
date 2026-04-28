import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
            <h1 className="text-xl font-bold text-blue-600">SyncroTask SaaS</h1>
            <button 
                onClick={logout}
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;