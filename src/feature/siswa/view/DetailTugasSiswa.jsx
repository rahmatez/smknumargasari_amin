import React, { Fragment, useEffect, useState } from 'react';
import { IoIosArrowBack, IoMdDownload } from 'react-icons/io';
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import TemplateInfoRow from '../../_global/component/Row/TemplateInfoRow';
import { checkDeadlineStatus, checkSubmissionStatus, formatDateToTime, formatDateToWIB } from '../../_global/helper/formatter';
import useFetch from '../../_global/hooks/useFetch';
import { BsCloudDownload } from 'react-icons/bs';
import UploadFile from '../../_global/component/Input/UploadFile';
import useUploadFile from '../../_global/hooks/useUploadFile';
import { useToast } from '../../_global/component/Toast/ToastProvider';
import axios from 'axios';
import Content from '../../_global/layout/Content';

const DetailTugasSiswaView = () => {
    const { id, id_tugas } = useParams()
    const navigate = useNavigate()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/kelas/' + id + '/tugas/' + id_tugas)
    const [fileRawList, setFileRawList] = useState([]);
    const { uploadFile, response, error, isLoading } = useUploadFile();


    const { addToast } = useToast()
    const handleUpload = () => {
        if (fileRawList.length) {
            uploadFile("/upload/single/tugas-siswa", fileRawList[0], 'image');
        } else {
            addToast('File tidak boleh kosong', 'error')
        }
    };

    useEffect(() => {
        if (response) {
            axios.post(import.meta.env.VITE_BACKEND + `/siswa/kelas/${id}/tugas/${id_tugas}`,
                { ...response },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
                .then((res) => {
                    addToast('Tugas berhasil disubmit', 'success')
                    setFileRawList([])
                    refetch()
                })
                .catch((err) => console.log(err));
        }
    }, [response])

    const disabled = fileRawList.length === 0

    const handleDownload = async (url, folder = 'tugas') => {
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

    if (loading) {
        return (
            <div className="flex justify-center items-center ">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <Fragment>
            <Content className='bg-[#EBF3FC]'>
                <button
                    onClick={() => navigate(-1)}
                    className="btn mt-4 btn-primary rounded btn-sm"
                >
                    <IoIosArrowBack size={20} />
                    Kembali
                </button>

                <div className=" max-w-[90vw] py-4 mx-auto flex flex-col gap-6">
                    <div className="card bg-base-100 shadow-xl bg-gradient-to-l from-indigo-500">
                        <div className="card-body">
                            <h2 className="text-3xl font-bold">{data?.title}</h2>
                            <div>
                                <TemplateInfoRow
                                    gap={2}
                                    variant=' text-base'
                                    data={[
                                        {
                                            label: 'Dibuat',
                                            value: formatDateToWIB(data?.createdAt)
                                        },
                                        {
                                            label: 'Batas Pengumpulan',
                                            value: formatDateToWIB(data?.deadlineAt)
                                        },
                                    ]} />

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded-2xl p-4'>
                        <h2 className='text-xl font-bold'>Deskripsi Tugas</h2>
                        <p>{data?.description}</p>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded-2xl p-4'>
                        <h2 className='text-xl font-bold'>Dokumen yang Dilampirkan</h2>
                        <div className="grid gap-2 " >
                            <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow">
                                <div className="flex items-center gap-2">
                                    <IoDocumentAttachOutline size={20} />
                                    <div className="text-xs">
                                        <p className="font-semibold text-gray-900 line-clamp-1">{data.original_filename}</p>
                                        <p className="text-gray-400">{(data.size_file / 1048576).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDownload(data.filename)}
                                    className="btn btn-sm text-white btn-primary flex items-center">
                                    <BsCloudDownload size={20} />
                                    <p> Unduh Dokumen</p>
                                </button>

                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded-2xl p-4'>
                        <div className='flex justify-between'>
                            <h2 className='text-xl font-bold'>Kumpulkan Tugas </h2>
                            <div className='flex gap-4'>
                                <span className={`flex items-center gap-2 justify-center text-xs font-medium px-2 py-1 rounded ${checkDeadlineStatus(data?.deadlineAt).color}`}>
                                    <span>Deadline: {checkDeadlineStatus(data?.deadlineAt).status}</span>
                                </span>
                                {data.submitted && <span className={` flex items-center gap-2 justify-center text-xs font-medium px-2 py-1 rounded ${checkSubmissionStatus(data.submitted.createdAt, data.deadlineAt).color}`}>
                                    <span>
                                        Status: {checkSubmissionStatus(data.submitted.createdAt, data.deadlineAt).status}
                                    </span>
                                </span>}
                            </div>
                        </div>

                        {data.submitted ?
                            <div className="grid gap-2 " >
                                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow">
                                    <div className="flex items-center gap-2">
                                        <IoDocumentAttachOutline size={20} />
                                        <div className="text-xs">
                                            <p className="font-semibold text-gray-900 line-clamp-1">{data.submitted.original_filename}</p>
                                            <p className="text-gray-400">{(data.submitted.size_file / 1048576).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(data.submitted.filename, 'tugas-siswa')}
                                        className="btn btn-sm text-white btn-primary flex items-center">
                                        <BsCloudDownload size={20} />
                                        <p> Unduh Dokumen</p>
                                    </button>

                                </div>

                            </div>
                            :
                            <Fragment>

                                <UploadFile
                                    supportFile={["pdf"]}
                                    setFileRawList={setFileRawList}
                                    fileRawList={fileRawList}
                                    limit={1}
                                    maxSize={5}
                                    resolution={["pdf"]}
                                />
                                <button
                                    onClick={handleUpload}
                                    disabled={disabled}
                                    className='btn btn-primary w-full mt-4'
                                >
                                    Submit
                                </button>
                            </Fragment>
                        }
                    </div>

                </div>
            </Content>
        </Fragment>
    )
}

export default DetailTugasSiswaView