import React, { Fragment } from 'react'
import Search from '../../../../_global/component/Input/Search'
import DialogTambahMateri from './DialogTambahMateri'
import TabContentMateri from './TabContentMateri'
import useFetch from '../../../../_global/hooks/useFetch'
import { useParams } from 'react-router-dom'

const MateriContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/' + id + '/materi')
    return (
        <Fragment>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Materi" />
            <div role="tabpanel" className="tab-content ">
                <div className='flex mt-10 justify-between items-center   '>
                    <Search placeholder='Cari Materi' />
                    <DialogTambahMateri refetch={refetch} />
                </div>
                <TabContentMateri data={data} loading={loading} />
            </div>
        </Fragment>
    )
}

export default MateriContainer