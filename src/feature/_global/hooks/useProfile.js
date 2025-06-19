import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProfile = () => {
    const navigate = useNavigate();
    
    // Mendapatkan token dari localStorage
    const token = localStorage.getItem('token');

    // Default profil jika token tidak ada atau tidak valid
    let profile = null;

    // Cek validitas token
    const isTokenValid = () => {
        if (!token) return false;
        
        try {
            const decoded = jwtDecode(token);
            // Cek apakah token sudah expired
            if (decoded.exp * 1000 < Date.now()) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        // Redirect ke login jika token tidak valid
        if (!isTokenValid()) {
            // Clear token yang tidak valid
            localStorage.removeItem('token');
            navigate('/');
        }
    }, [navigate]);

    try {
        // Decode token jika ada dan valid
        if (token && isTokenValid()) {
            const decodedToken = jwtDecode(token);
            profile = {
                ...decodedToken
            };
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
    }

    return profile;
};

export default useProfile