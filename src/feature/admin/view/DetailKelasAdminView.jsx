
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from '../../_global/hooks/useFetch';
// import DialogTambahSiswa from "../container/Detail/Dialog/DialogTambahSiswa";
// import Search from "../../_global/component/Input/Search";
// import MateriContainer from "../container/Detail/Materi/MateriContainer";
// import TabContentSiswa from "../container/Detail/Siswa/TabContentSiswa";
// import TugasContainer from "../container/Detail/Tugas/TugasContainer";
import Content from "../../_global/layout/Content";
import SiswaContainer from "../container/Kelas/SiswaContainer";
import UjianContainer from "../container/Kelas/UjianContainer";


const DetailKelasAdminView = () => {
    const { id } = useParams()
    const { data, loading } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/' + id)

    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <>
            {/* <button
                onClick={() => navigate(`/guru`)}
                className="btn mt-4 btn-primary rounded btn-sm"
            >
                <IoIosArrowBack size={20} />
                Kembali
            </button> */}
            <div className=" py-4 mx-auto flex flex-col gap-6">
                <div className="card bg-base-100 shadow-xl bg-gradient-to-l from-indigo-500">
                    <div className="card-body">
                        <h2 className="text-3xl font-bold">{data?.title}</h2>
                        <p>Mata Pelajaran: {data?.user?.mataPelajaranGuru?.[0]?.mataPelajaran?.title}</p>
                        <p>Deskripsi: {data?.description}</p>
                    </div>
                </div>

                <div role="tablist" className="tabs tabs-lifted">
                    <SiswaContainer />
                    <UjianContainer />
                </div>
            </div>

        </>

    );
}

export default DetailKelasAdminView