// import { useEffect, useState } from 'react'
// import axios from 'axios'

// const useFetch = (url) => {
//     const [data, setData] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(url, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 })
//                 setData(response.data.data)
//                 setLoading(false)
//             } catch (error) {
//                 setError(error)
//                 setLoading(false)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchData()
//     }, [url])
//     return { data, loading, error }
// }

// export default useFetch

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        const scrollPosition = window.scrollY; // Simpan posisi scroll
        setLoading(true);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(response.data.data);
            setError(null);
        } catch (err) {
            setError(err);
            setData(null);
        } finally {
            setLoading(false);
            window.scrollTo(0, scrollPosition); // Kembalikan posisi scroll
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
