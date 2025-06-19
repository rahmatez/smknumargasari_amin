import React, { Fragment, useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../../../_global/component/Toast/ToastProvider';
import useUploadFile from '../../../_global/hooks/useUploadFile';

const initialState = {
    title: "",
    description: "",
    dateTime: '',
    startTime: '',
    type: 'UTS',
    endTime: ''
}
const DialogTambahUjian = ({
    refetch
}) => {
    const [open, setOpen] = useState(false);
    const { uploadFile, response, error, isLoading } = useUploadFile();
    const [fileRawList, setFileRawList] = useState([]);
    const [state, setState] = useState(initialState);

    const { id } = useParams()
    const { addToast } = useToast()

    const handleUpload = () => {
        // if (fileRawList.length) {
        //     uploadFile("/upload/single/ujian", fileRawList[0], 'image');
        // } else {
        //     addToast('File tidak boleh kosong', 'error')
        // }
        axios.post(import.meta.env.VITE_BACKEND + `/guru/kelas/${id}/ujian`, { ...state, ...response })
            .then((res) => {
                addToast('Ujian berhasil ditambahkan', 'success')
                setOpen(false)
                setFileRawList([])
                setState(initialState)
                refetch()
            })
            .catch((err) => console.log(err));
    };

    // useEffect(() => {
    //     if (response) {
    //         axios.post(import.meta.env.VITE_BACKEND + `/guru/kelas/${id}/ujian`, { ...state, ...response })
    //             .then((res) => {
    //                 addToast('Ujian berhasil ditambahkan', 'success')
    //                 setOpen(false)
    //                 setFileRawList([])
    //                 setState(initialState)
    //                 refetch()
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [response])

    const isEndTimeValid = () => {
        if (!state.startTime || !state.endTime) return false; // Pastikan keduanya diisi

        // Pisahkan jam dan menit dari string waktu
        const [startHour, startMinute] = state.startTime.split(":").map(Number);
        const [endHour, endMinute] = state.endTime.split(":").map(Number);

        // Buat objek Date dengan tanggal acuan (misal: 1970-01-01)
        const startTime = new Date(1970, 0, 1, startHour, startMinute);
        const endTime = new Date(1970, 0, 1, endHour, endMinute);

        // Periksa apakah endTime lebih besar dari startTime
        return endTime > startTime;
    };


    const disabled =
        !state.title ||
        !state.description ||
        !state.type ||
        !state.dateTime ||
        !state.startTime ||
        !state.endTime ||
        !isEndTimeValid();

    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-primary text-white "
            >
                <FaPlus />
                Tambah Jadwal Ujian
            </button>
            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Jadwal Ujian
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
                                <span className="label-text font-bold">Tipe</span>
                            </div>
                            <select
                                className="select select-bordered"
                                value={state.type}
                                placeholder="Tipe"
                                onChange={(e) => setState({ ...state, type: e.target.value })}
                            >
                                <option value="UTS">UTS</option>
                                <option value="UAS">UAS</option>
                            </select>

                        </label>
                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Tanggal Ujian</span>
                            </div>
                            <input
                                type="date"
                                value={state.dateTime}
                                onChange={(e) => setState({ ...state, dateTime: e.target.value })}
                                placeholder="Batas Pengumpulan"
                                className="input input-md input-bordered w-full "
                            />
                        </label>
                        <div className='flex gap-2'>
                            <label className="form-control w-full" >
                                <div className="label">
                                    <span className="label-text font-bold">Waktu Mulai</span>
                                </div>
                                <input
                                    type="time"
                                    value={state.startTime}
                                    onChange={(e) => setState({ ...state, startTime: e.target.value })}
                                    placeholder="Batas Pengumpulan"
                                    className="input input-md input-bordered w-full "
                                />
                            </label>
                            <label className="form-control w-full" >
                                <div className="label">
                                    <span className="label-text font-bold">Waktu Selesai</span>
                                </div>
                                <input
                                    type="time"
                                    value={state.endTime}
                                    onChange={(e) => setState({ ...state, endTime: e.target.value })}
                                    placeholder="Batas Pengumpulan"
                                    className="input input-md input-bordered w-full "
                                />
                                {state.endTime && !isEndTimeValid() && <p className='text-error text-xs mt-3'>Waktu selesai harus lebih besar dari waktu mulai</p>}
                            </label>
                        </div>
                        {/* <label className="form-control w-full" >
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
                        </label> */}

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

                </div>
            </dialog>


        </Fragment>
    )
}

export default DialogTambahUjian