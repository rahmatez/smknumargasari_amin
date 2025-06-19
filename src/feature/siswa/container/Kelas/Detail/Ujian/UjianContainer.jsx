import React, { Fragment } from 'react'
import TabContentUjian from './TabContentUjian'
import { useParams } from 'react-router-dom'
import useFetch from '../../../../../_global/hooks/useFetch'

const UjianContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/kelas/' + id + '/ujian')
    return (
        <Fragment>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Ujian" />
            <div role="tabpanel" className="tab-content">
                <TabContentUjian data={data} loading={loading} />
            </div>
        </Fragment>
    )
}

export default UjianContainer