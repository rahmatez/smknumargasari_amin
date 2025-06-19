import React, { Fragment, useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import useUploadFile from '../../../../_global/hooks/useUploadFile';
import UploadFile from '../../../../_global/component/Input/UploadFile';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../_global/component/Toast/ToastProvider';


const DialogTambahMateri = ({
    refetch
}) => {
    const [open, setOpen] = useState(false);
    const { uploadFile, response, error, isLoading } = useUploadFile();
    const [fileRawList, setFileRawList] = useState([]);
    const [state, setState] = useState({
        title: "",
        description: "",
    });

    const { id } = useParams()
    const { addToast } = useToast()
    const handleUpload = () => {
        if (fileRawList.length) {
            uploadFile("/upload/single/materi", fileRawList[0], 'image');
        } else {
            addToast('File tidak boleh kosong', 'error')
        }
    };

    useEffect(() => {
        if (response) {
            axios.post(import.meta.env.VITE_BACKEND + `/guru/kelas/${id}/materi`, { ...state, ...response })
                .then((res) => {
                    addToast('Materi berhasil ditambahkan', 'success')
                    setOpen(false)
                    setFileRawList([])
                    setState({ title: "", description: "" })
                    refetch()
                })
                .catch((err) => console.log(err));
        }
    }, [response])

    const disabled = !state.title || !state.description || fileRawList.length === 0


    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-primary text-white "
            >
                <FaPlus />
                Tambah Materi
            </button>
            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Materi
                    </h3>
                    <div className='flex gap-2 flex-col'>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Judul</span>
                            </div>
                            <input
                                type="text"
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                                placeholder="Judul"
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
                                onChange={(e) => setState({ ...state, description: e.target.value })}
                                placeholder="Deskripsi"
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
                                onClick={() => handleUpload()}
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

export default DialogTambahMateri