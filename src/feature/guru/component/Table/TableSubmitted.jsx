import React from 'react';

import { BsCloudDownload } from "react-icons/bs";
import { FaRegCommentDots, FaRegEye } from "react-icons/fa";
import { checkSubmissionStatus, formatDateToWIB } from '../../../_global/helper/formatter';
import DialogUpdateNilai from '../../container/Tugas/Dialog/DialogUpdateNilai';
import axios from 'axios';
import DialogTambahComment from '../../container/Tugas/Dialog/DialogTambahComment';
import { useNavigate } from 'react-router-dom';

const TableSubmitted = ({
    data,
    deadline,
    refetch
}) => {
    const navigate = useNavigate()
    const handleDownload = async (url, folder = 'tugas-siswa') => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND}/backdoor/download/${folder}/${url}`, {
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

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tanggal dan Jam Pengumpulan</th>
                        <th className='text-center'>Nilai</th>
                        <th className='text-center'>Komentar</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
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
                                    <div>
                                        <div className="font-bold"
                                        >
                                            {item?.siswa?.nama}
                                        </div>
                                        <div className="text-sm opacity-50">
                                            {item?.siswa?.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {formatDateToWIB(item.createdAt)}
                            </td>
                            <td className='text-center'>
                                {item.nilai ? item.nilai : '-'}
                            </td>
                            <td className='text-center'>
                                {item.comment ? item.comment : '-'}
                            </td>
                            <td>
                                <span className={` flex items-center gap-2 justify-center text-xs font-medium px-2 py-1 rounded-full ${checkSubmissionStatus(item.createdAt, deadline).color}`}>
                                    <span>{checkSubmissionStatus(item.createdAt, deadline).status}</span>
                                </span>
                            </td>
                            <td className='flex flex-col gap-4'>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => window.open(import.meta.env.VITE_BACKEND + '/assets/tugas-siswa/' + item.filename)}
                                        className="btn btn-sm text-white bg-[#0324fc]">
                                        <FaRegEye size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDownload(item.filename)}
                                        className="btn btn-sm text-white bg-[#866FF9]">
                                        <BsCloudDownload size={20} />
                                    </button>
                                    <DialogTambahComment data={item} refetch={refetch} />
                                </div>
                                <DialogUpdateNilai data={item} refetch={refetch} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSubmitted