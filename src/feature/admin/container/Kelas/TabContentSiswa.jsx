import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../../../_global/component/Toast/ToastProvider';

const TabContentSiswa = ({
    data,
    loading,
    refetch
}) => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const { addToast } = useToast()

    const search = searchParams.get('search') || ''
    const filteredData = data?.filter((item) => item.user.nama.toLowerCase().includes(search?.toLowerCase())) || []

    const handleDelete = async (su) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND}/guru/kelas/${id}/siswa`,
                { data: { siswaIds: [su] } }
            );

            addToast('Siswa berhasil dihapus', 'success');
            refetch();
        } catch (error) {
            console.error(error);
            addToast('Siswa gagal dihapus', 'error');
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
        <div className="overflow-x-auto bg-white mt-4 rounded-lg">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Profile</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>NISN</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(({ user }, index) => (

                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                // src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                src='/default-profile.png'
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.nama}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.telephone}
                            </td>
                            <td>
                                {user.nis}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="btn btn-square btn-sm text-white bg-red-500">
                                    <MdDeleteOutline size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TabContentSiswa