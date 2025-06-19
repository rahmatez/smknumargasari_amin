import { jwtDecode } from 'jwt-decode';
import React from 'react'

const useProfile = () => {
    // Mendapatkan token dari localStorage
    const token = localStorage.getItem('token');

    // Default profil jika token tidak ada atau tidak valid
    let profile

    try {
        // Decode token jika ada
        if (token) {
            const decodedToken = jwtDecode(token);
            profile = {
                ...decodedToken
            };
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        // Jika terjadi error saat decode, gunakan profil default
    }

    return profile;
};

export default useProfile