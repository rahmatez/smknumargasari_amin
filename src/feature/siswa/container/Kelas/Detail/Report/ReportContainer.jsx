import React, { Fragment } from 'react'
import TabContentReport from './TabContentReport'
import { useParams } from 'react-router-dom'
import useFetch from '../../../../../_global/hooks/useFetch'

const ReportContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/tugas/' + id + '/statistik')
    return (
        <Fragment>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Rapot" />
            <div role="tabpanel" className="tab-content ">
                <TabContentReport data={data} />
            </div>

        </Fragment>
    )
}

export default ReportContainer