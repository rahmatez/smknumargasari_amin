import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Content from '../../../_global/layout/Content';
import useFetch from '../../../_global/hooks/useFetch';
import TemplateInfoRow from '../../../_global/component/Row/TemplateInfoRow';

const ListMapelContainer = () => {
    const { data, loading, } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/kelas/today')
    const navigate = useNavigate()

    if (data?.length === 0) return null

    return (
        <Content className='bg-[#EBF3FC]'>
            <div className='py-4'>

                <div className="flex flex-grow justify-between items-center w-full">
                    <h2 className="text-xl font-bold">Kelas Hari Ini</h2>
                    <Link
                        to="/siswa/kelas"
                        className="text-sm font-bold"
                    >
                        Lihat Semua
                    </Link>
                </div>
                <div className='flex gap-2'>

                    {data?.map((item, index) => (
                        <div className="bg-white shadow-md rounded-lg p-4 w-96 text-gray-800 mt-4">
                            <h2 className="text-lg font-bold mb-2">{item?.title}</h2>
                            <TemplateInfoRow
                                gap={2}
                                variant=' text-sm'
                                className='text-gray-500'
                                data={[
                                    {
                                        label: 'Guru',
                                        value: item?.user?.nama
                                    },
                                    {
                                        label: 'Mata Pelajaran',
                                        value: item?.user?.mataPelajaranGuru?.[0]?.mataPelajaran?.title
                                    },
                                    {
                                        label: 'Waktu',
                                        value: `Hari Ini • ${item?.scheduleClasses?.[0].startTime} - ${item?.scheduleClasses?.[0].endTime}`
                                    },
                                ]}
                            />

                            <button
                                onClick={() => navigate(`/siswa/kelas/${item?.id}`)}
                                className="w-full bg-[#6148FF] mt-4 text-white py-2 rounded-lg font-semibold  transition duration-200 mb-2"
                            >
                                Lihat Kelas
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </Content>
    );
}

export default ListMapelContainer