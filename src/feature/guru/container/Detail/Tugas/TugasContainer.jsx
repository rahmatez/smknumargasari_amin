import React, { Fragment } from 'react'
import Search from '../../../../_global/component/Input/Search'
import DialogTambahTugas from './DialogTambahTugas'
import TabContentTugas from './TabContentTugas'
import { useParams } from 'react-router-dom'
import useFetch from '../../../../_global/hooks/useFetch'

const TugasContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/' + id + '/tugas')
    return (
        <Fragment>
            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Tugas"
            />
            <div role="tabpanel" className="tab-content ">
                <div className='flex mt-10 justify-between items-center   '>
                    <Search placeholder='Cari Tugas' />
                    <DialogTambahTugas refetch={refetch} />
                </div>
                <TabContentTugas data={data} loading={loading} />
            </div>
        </Fragment>
    )
}

export default TugasContainer