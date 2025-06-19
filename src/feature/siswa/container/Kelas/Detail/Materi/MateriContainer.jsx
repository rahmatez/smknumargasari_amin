import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Search from '../../../../../_global/component/Input/Search'
import useFetch from '../../../../../_global/hooks/useFetch'
import TabContentMateri from './TabContentMateri'

const MateriContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/kelas/' + id + '/materi')
    return (
        <Fragment>
            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Materi"
            />
            <div role="tabpanel" className="tab-content ">
                <div className='flex mt-10 justify-between items-center   '>
                    <Search placeholder='Cari Materi' />
                </div>
                <TabContentMateri data={data} loading={loading} />
            </div>
        </Fragment>
    )
}

export default MateriContainer