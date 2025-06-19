
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from '../../_global/hooks/useFetch';
import TabContentSiswa from "../container/Kelas/Detail/Siswa/TabContentSiswa";
import Search from "../../_global/component/Input/Search";
import MateriContainer from "../container/Kelas/Detail/Materi/MateriContainer";
import SiswaContainer from "../container/Kelas/Detail/Siswa/SiswaContainer";
import TugasContainer from "../container/Kelas/Detail/Tugas/TugasContainer";
import Content from "../../_global/layout/Content";
import ReportContainer from "../container/Kelas/Detail/Report/ReportContainer";
import UjianContainer from "../container/Kelas/Detail/Ujian/UjianContainer";
import TemplateInfoRow from "../../_global/component/Row/TemplateInfoRow";
import useProfile from "../../_global/hooks/useProfile";
// import TabContentMateri from "../container/Kelas/Detail/Materi/TabContentMateri";
// import TabContentSiswa from "../container/Detail/Siswa/TabContentSiswa";
// import TabContentTugas from "../container/Detail/Tugas/TabContentTugas";
// import Search from "../component/Search/Search";


const DetailKelasSiswaView = () => {
    const { id } = useParams()
    const profile = useProfile()
    const { data, loading } = useFetch(import.meta.env.VITE_BACKEND + '/siswa/kelas/' + id)

    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <Content className='bg-[#EBF3FC]'>
            <button
                onClick={() => navigate(`/siswa/kelas`)}
                className="btn mt-4 btn-primary rounded btn-sm"
            >
                <IoIosArrowBack size={20} />
                Kembali
            </button>
            <div className=" max-w-[90vw] py-4 mx-auto flex flex-col gap-6">
                <div className="card bg-base-100 shadow-xl bg-gradient-to-l from-indigo-500">
                    <div className="card-body">
                        <h2 className="text-3xl font-bold">{data?.title}</h2>
                        <TemplateInfoRow
                            classNameLabel="whitespace-nowrap"
                            data={[
                                {
                                    label: "Nama",
                                    value: profile?.nama
                                },
                                {
                                    label: "Mata Pelajaran",
                                    value: data?.user?.mataPelajaranGuru?.[0]?.mataPelajaran?.title
                                },
                                {
                                    label: "Deskripsi",
                                    value: data?.description
                                },
                            ]}
                        />
                    </div>
                </div>

                <div role="tablist" className="tabs tabs-lifted">
                    <SiswaContainer />
                    {/* <SiswaContainer /> */}
                    <MateriContainer />
                    <TugasContainer />
                    {/* <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Tugas"
                    />
                    <div role="tabpanel" className="tab-content ">
                        <div className='flex mt-10 justify-between items-center   '>
                            <Search />
                            <DialogTambahTugas />
                        </div>
                        <TabContentTugas />
                    </div> */}


                    <UjianContainer />
                    <ReportContainer />
                </div>
            </div>

        </Content>

    );
}

export default DetailKelasSiswaView