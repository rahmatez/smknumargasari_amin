import axios from 'axios';
import React from 'react';
import { BsCloudDownload } from "react-icons/bs";
import { useParams, useSearchParams } from 'react-router-dom';

const TabContentMateri = ({
    data,
    loading,
}) => {
    const [searchParams] = useSearchParams()

    const search = searchParams.get('search') || ''

    const filteredData = data?.filter((item) => item.title.toLowerCase().includes(search?.toLowerCase())) || []

    const handleDownload = async (url) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/backdoor/download/materi/${url}`, {
                responseType: 'blob', // Untuk memastikan file diterima sebagai binary data
            });

            // Membuat link untuk mendownload file
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;

            // Nama file, Anda bisa menyesuaikan ini berdasarkan header respons jika tersedia
            const contentDisposition = response.headers['content-disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : url;

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Gagal mendownload file.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <div className="flex py-4 grid grid-cols-4 gap-4 flex-wrap justify-center items-start space-x-2">
            {
                filteredData?.map((item, index) => (
                    <div className="card card-compact bg-base-100  shadow-xl" key={index}>
                        <div className="card-body">
                            <h2 className="card-title">{item.title}</h2>
                            <p className='text-sm text-base line-clamp-3'>{item.description}</p>
                            <p>{item.type_file.split('/').pop().toUpperCase()}</p>
                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => handleDownload(item.filename)}
                                    className="btn btn-circle">
                                    <BsCloudDownload size={20} />
                                </button>
                            </div>
                        </div>
                    </div>))
            }
        </div>
    )
}

export default TabContentMateri