import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetch from '../../_global/hooks/useFetch';
import TemplateInfoRow from '../../_global/component/Row/TemplateInfoRow';
import Search from '../../_global/component/Input/Search';
import Content from '../../_global/layout/Content';
import { IoIosArrowBack } from 'react-icons/io';

const KelasSiswaView = () => {
    const navigate = useNavigate()
    const isToday = new Date().getDay();

    const [searchParams] = useSearchParams()

    const search = searchParams.get('search') || ''

    const { data, loading } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/kelas')

    const filteredData = data?.filter((item) => item.title.toLowerCase().includes(search?.toLowerCase())) || []

    return (
        <Content className='bg-[#EBF3FC] min-h-screen'>
            <button
                onClick={() => navigate(`/siswa`)}
                className="btn mt-4 btn-primary rounded btn-sm"
            >
                <IoIosArrowBack size={20} />
                Kembali
            </button>
            <div className=" max-w-[90vw] mx-auto">
                <div className="flex flex-grow justify-between items-start w-full mt-4">
                    <h1 className="text-base lg:text-[24px] font-bold">Jadwal Mapel Harian</h1>
                    {/* <div className="relative flex flex-row">
                        <Search placeholder="Cari nama kelas" />
                    </div> */}
                </div>

                {loading &&
                    <div className="flex justify-center items-center h-screen">
                        <span className="loading loading-dots loading-lg" />
                    </div>}

                <div className="flex grid md:grid-cols-3  grid-cols-1 gap-4 flex-wrap justify-center items-center space-x-2">
                    {!loading && filteredData?.map((item) => (
                        <div
                            key={item.id}
                            style={{ backgroundColor: ` ${isToday === item?.scheduleClasses?.[0]?.day?.id ? '#22C55E' : '#FF5630'}` }}
                            className={`bg-white border border-gray-200 rounded-lg rounded-tr-3xl shadow-md w-96 mt-4  w-[100%]`}>
                            {/* Header */}
                            <div className={`flex py-4 flex-col items-center justify-center  text-white py-2 rounded-t-lg`}>
                                <h2 className="text-lg font-bold">{item?.scheduleClasses?.[0]?.day?.title}</h2>
                                <h2 className="text-lg font-bold">{item?.scheduleClasses?.[0]?.startTime
                                } - {item?.scheduleClasses?.[0]?.endTime}</h2>
                                <p>{item.jam}</p>
                            </div>
                            <div className='bg-white max-height-80 px-4 py-6 rounded-b-lg'>
                                {/* Content */}
                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>

                                <TemplateInfoRow
                                    gap={1}
                                    variant=' text-sm'
                                    className='text-gray-700'
                                    data={[
                                        {
                                            label: 'Guru',
                                            value: item.user.nama,
                                        },
                                        {
                                            label: 'Mata Pelajaran',
                                            value: item.user.mataPelajaranGuru[0].mataPelajaran.title,
                                        },
                                        {
                                            label: 'Jumlah Siswa',
                                            value: item._count.classStudent,
                                        },
                                    ]}
                                />
                                <button
                                    onClick={() => navigate(`/siswa/kelas/${item.id}`)}
                                    className="w-full mt-4 text-white bg-[#6148FF] rounded-lg hover:bg-[#6148FF] font-bold py-2 rounded">
                                    Detail Kelas
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </Content>

    );
}

export default KelasSiswaView