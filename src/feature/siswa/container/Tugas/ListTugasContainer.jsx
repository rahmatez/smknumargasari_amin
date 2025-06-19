import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Content from '../../../_global/layout/Content';
import { FaBookBookmark } from 'react-icons/fa6';
import TemplateInfoRow from '../../../_global/component/Row/TemplateInfoRow';
import { IoPersonCircle } from 'react-icons/io5';
import useFetch from '../../../_global/hooks/useFetch';
import { checkDeadlineStatus, formatDateToWIB } from '../../../_global/helper/formatter';

const ListTugasContainer = () => {
    const { data, loading, } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/tugas/today')
    const navigate = useNavigate()

    if (data?.length === 0) return null

    return (
        <Content>
            <div className='py-4'>

                <div className="flex flex-grow justify-between items-center w-full">
                    <h2 className="text-xl font-bold">Tugas Mendatang</h2>
                    {/* <Link
                        to="/class"
                        className=" font-extrabold text-xs max-w-fit text-darkblue"
                    >
                        Lihat Semua
                    </Link> */}
                </div>
                <div className='flex gap-2 mt-4 overflow-x-scroll'>

                    {data?.map((item, index) => (
                        <div className="bg-white shadow min-w-[500px] m-2 rounded-lg p-4 text-gray-800 gap-2 flex flex-col">
                            <span className={`flex items-center gap-2 justify-center text-xs font-medium px-2 py-1 rounded ${checkDeadlineStatus(item?.deadlineAt).color}`}>
                                <span>Deadline: {checkDeadlineStatus(item?.deadlineAt).status}</span>
                            </span>
                            <h2 className="text-lg font-bold">{item?.title}</h2>
                            <div className='flex gap-2 flex-wrap'>
                                <div className="flex items-center">
                                    <span className="bg-green-100 flex items-center gap-2 text-green-800 text-sm font-medium px-2 py-1 rounded">
                                        <FaBookBookmark />
                                        <span>{item?.class?.title}</span>
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="bg-blue-100 flex items-center gap-2 text-green-800 text-sm font-medium px-2 py-1 rounded">
                                        <IoPersonCircle />
                                        <span>{item?.class?.user?.nama}</span>
                                    </span>
                                </div>
                            </div>

                            <TemplateInfoRow
                                variant='text-sm'
                                gap={2}
                                className=' text-gray-500'
                                data={[
                                    {
                                        label: 'Dibuat',
                                        value: formatDateToWIB(item?.createdAt)
                                    },
                                    {
                                        label: 'Batas Pengumpulan',
                                        value: formatDateToWIB(item?.deadlineAt)
                                    }
                                ]}
                            />

                            <button
                                onClick={() => navigate(`/siswa/kelas/${item?.classId}/tugas/${item?.id}`)}
                                className="w-full bg-[#6148FF] mt-4 text-white py-2 rounded-lg font-semibold  transition duration-200 mb-2"
                            >
                                Lihat Tugas
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="flex flex-col justify-center items-center w-full p-2 px-3 lg:px-0">

                    <div className="flex flex-wrap justify-center items-center space-x-2 ">
                        <div className="bg-white shadow-md rounded-lg p-12 w-96 text-gray-800 mt-4">
                            <h2 className="text-lg font-bold mb-2">IPA</h2>
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                <div className="mr-2">
                                    <span>Anwar Fuadi, S.Pd</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <div className="mr-2">
                                    <span>Hari Ini • 08.00–10.00</span>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mb-2">
                                Ikuti Kelas
                            </button>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-12 w-96 text-gray-800 mt-4 ">
                            <h2 className="text-lg font-bold mb-2">IPA</h2>
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                <div className="mr-2">
                                    <span>Anwar Fuadi, S.Pd</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <div className="mr-2">
                                    <span>Hari Ini • 08.00–10.00</span>
                                </div>
                            </div>
                            <button className="w-full bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                                Ikuti Kelas
                            </button>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-12 w-96 text-gray-800 mt-4 ">
                            <h2 className="text-lg font-bold mb-2">IPA</h2>
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                <div className="mr-2">
                                    <span>Anwar Fuadi, S.Pd</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <div className="mr-2">
                                    <span>Hari Ini • 08.00–10.00</span>
                                </div>
                            </div>
                            <button className="w-full bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                                Ikuti Kelas
                            </button>
                        </div>
                    </div>
                </div> */}

        </Content>
    );
}

export default ListTugasContainer