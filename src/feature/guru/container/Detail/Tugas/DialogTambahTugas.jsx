import React, { Fragment, useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoDocumentAttachOutline } from "react-icons/io5";
import useUploadFile from '../../../../_global/hooks/useUploadFile';
import { useToast } from '../../../../_global/component/Toast/ToastProvider';
import { useParams } from 'react-router-dom';
import UploadFile from '../../../../_global/component/Input/UploadFile';
import axios from 'axios';


const DialogTambahTugas = ({
    refetch
}) => {
    const [open, setOpen] = useState(false);
    const { uploadFile, response, error, isLoading } = useUploadFile();
    const [fileRawList, setFileRawList] = useState([]);
    const [state, setState] = useState({
        title: "",
        description: "",
        deadlineAt: '',
    });

    const { id } = useParams()
    const { addToast } = useToast()
    const handleUpload = () => {
        if (fileRawList.length) {
            uploadFile("/upload/single/tugas", fileRawList[0], 'image');
        } else {
            addToast('File tidak boleh kosong', 'error')
        }
    };

    useEffect(() => {
        if (response) {
            axios.post(import.meta.env.VITE_BACKEND + `/guru/kelas/${id}/tugas`,
                { ...state, deadlineAt: new Date(state.deadlineAt).toISOString(), ...response })
                .then((res) => {
                    addToast('Tugas berhasil ditambahkan', 'success')
                    setOpen(false)
                    setFileRawList([])
                    setState({ title: "", description: "", deadlineAt: '' })
                    refetch()
                })
                .catch((err) => console.log(err));
        }
    }, [response])

    const handleChangeDate = (e) => {
        const localDateTime = e.target.value; // Nilai dari input
        const date = new Date(localDateTime); // Konversi ke objek Date
        const isoString = date.toISOString(); // Konversi ke format ISO 8601 dengan zona waktu UTC

        setState({ ...state, deadlineAt: isoString }); // Perbarui state
    };

    const isDeadlineValid = () => {
        if (!state.deadlineAt) return false; // Jika deadline kosong, tidak valid
        const deadline = new Date(state.deadlineAt); // Konversi string ke Date
        const now = new Date(); // Waktu sekarang
        return deadline > now; // Valid jika deadline lebih besar dari waktu sekarang
    };

    const disabled =
        !state.title ||
        !state.description ||
        fileRawList.length === 0 ||
        !state.deadlineAt ||
        !isDeadlineValid();

    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-primary text-white "
            >
                <FaPlus />
                Tambah Tugas
            </button>
            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Tugas
                    </h3>
                    <div className='flex gap-2 flex-col'>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Judul</span>
                            </div>
                            <input
                                type="text"
                                value={state.title}
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                                placeholder="Judul"
                                className="input input-md input-bordered w-full "
                            />

                        </label>
                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Batas Pengumpulan</span>
                            </div>
                            <input
                                type="datetime-local"
                                value={state.deadlineAt}
                                onChange={(e) => setState({ ...state, deadlineAt: e.target.value })}
                                placeholder="Batas Pengumpulan"
                                className="input input-md input-bordered w-full "
                            />
                        </label>
                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Dokumen</span>
                            </div>
                            <UploadFile
                                supportFile={["pdf"]}
                                setFileRawList={setFileRawList}
                                fileRawList={fileRawList}
                                limit={1}
                                maxSize={5}
                                resolution={["pdf"]}
                            />
                        </label>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Deskripsi</span>
                            </div>
                            <textarea
                                placeholder="Deskripsi"
                                value={state.description}
                                onChange={(e) => setState({ ...state, description: e.target.value })}
                                className="textarea textarea-bordered textarea-md w-full " />
                        </label>
                        <div className="modal-action">
                            <button
                                onClick={() => {
                                    setOpen(false)
                                    setFileRawList([])
                                }}
                                className="btn btn-neutral w-1/2 text-white">
                                Kembali
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={disabled}
                                className="btn btn-contained btn-primary w-1/2 text-white">
                                Simpan
                            </button>
                        </div>
                    </div>
                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}

                </div>
            </dialog>


        </Fragment>
    )
}

export default DialogTambahTugas