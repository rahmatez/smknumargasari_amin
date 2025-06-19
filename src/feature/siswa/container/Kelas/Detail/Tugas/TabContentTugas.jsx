import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import TemplateInfoRow from '../../../../../_global/component/Row/TemplateInfoRow'
import { checkDeadlineStatus, formatDateToTime } from '../../../../../_global/helper/formatter'

const TabContentTugas = ({
    data,
    loading,
}) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const search = searchParams.get('search') || ''

    const filteredData = data?.filter((item) => item.title.toLowerCase().includes(search?.toLowerCase()))

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <div className="flex py-4 grid grid-cols-3 gap-4 flex-wrap justify-center items-start space-x-2">
            {
                filteredData?.map((item, index) => (
                    <div className="card card-compact bg-base-100  shadow-xl" key={index}>
                        <div className="card-body ">
                            <div className="flex flex-col gap-2">
                                <span className={`flex items-center gap-2 justify-center text-xs font-medium px-2 py-1 rounded ${checkDeadlineStatus(item?.deadlineAt).color}`}>
                                    <span>Deadline: {checkDeadlineStatus(item?.deadlineAt).status}</span>
                                </span>
                                <h2 className="card-title">{item?.title}</h2>

                                <p className='mb-2 line-clamp-3'>{item?.description}</p>
                                <TemplateInfoRow
                                    gap={1}
                                    variant='text-sm text-base'
                                    data={[
                                        {
                                            label: 'Dibuat',
                                            value: formatDateToTime(item?.createdAt)
                                        },
                                        {
                                            label: 'Batas Pengumpulan',
                                            value: formatDateToTime(item?.deadlineAt)
                                        }
                                    ]} />



                                <button
                                    onClick={() => navigate('/siswa/kelas/' + id + '/tugas/' + item?.id)}
                                    className="btn w-full mt-2 btn-md text-white btn-primary">
                                    Lihat Detail
                                </button>
                            </div>

                        </div>
                    </div>))
            }
        </div>
    )
}

export default TabContentTugas