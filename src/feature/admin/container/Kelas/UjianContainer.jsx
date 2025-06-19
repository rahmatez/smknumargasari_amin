import React, { Fragment } from 'react'
import TabContentUjian from './TabContentUjian'
import { FaPlus } from 'react-icons/fa'
// import DialogTambahUjian from './DialogTambahUjian'
import { useParams } from 'react-router-dom'
import useFetch from '../../../_global/hooks/useFetch'
import DialogTambahUjian from './DialogTambahUjian'

const UjianContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/' + id + '/ujian')

    return (
        <Fragment>
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Ujian" />
            <div role="tabpanel" className="tab-content">
                <div className='flex mt-10 justify-end items-center   '>
                    <DialogTambahUjian refetch={refetch} />
                </div>

                <TabContentUjian data={data} loading={loading} />
            </div>
        </Fragment>
    )
}

export default UjianContainer