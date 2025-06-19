import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Search from '../../../../_global/component/Input/Search'
import useFetch from '../../../../_global/hooks/useFetch'
import TabContentSiswa from './TabContentSiswa'

const SiswaContainer = () => {
    const { id } = useParams()
    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/' + id + '/siswa')
    return (
        <Fragment>
            <input defaultChecked type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Siswa" />
            <div role="tabpanel" className="tab-content ">
                <div className='flex mt-10 justify-between items-center   '>
                    <Search placeholder='Cari Nama Siswa' />
                    {/* <DialogTambahSiswa refetch={refetch} /> */}
                </div>
                <TabContentSiswa data={data} loading={loading} refetch={refetch}/>
            </div>
        </Fragment>
    )
}

export default SiswaContainer