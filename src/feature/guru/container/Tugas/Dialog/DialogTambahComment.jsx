import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../_global/component/Toast/ToastProvider';
import { FaRegCommentDots } from 'react-icons/fa';

const DialogTambahComment = ({
    data,
    refetch
}) => {
    const { id, id_tugas } = useParams()
    const { addToast } = useToast()
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        comment: '',
    })

    useEffect(() => {
        setState({
            comment: data?.comment || '',
        })
    }, [data])

    const handleSubmit = async () => {
        await axios.post(import.meta.env.VITE_BACKEND + `/guru/kelas/${id}/tugas/${id_tugas}/update-comment`,
            {
                comment: state.comment,
                id: data.id
            })
            .then((res) => {
                addToast('Comment berhasil diupdate', 'success')
                setOpen(false)
                setState({
                    comment: '',
                })
                refetch()
            })
            .catch((err) => {
                addToast('Comment gagal diupdate', 'error')
                console.log(err);
                setOpen(false)
            });
    }

    return (
        <Fragment>

            <button
                onClick={() => setOpen(true)}
                className="btn btn-sm text-white bg-[#22C55E]">
                <FaRegCommentDots size={20} />
            </button>
            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Komentar ({data?.siswa?.nama})
                    </h3>
                    <div className='flex gap-2 flex-col'>
                        <label className="form-control w-full mt-8" >

                            {/* <input
                                type="text"
                                inputMode='numeric'
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const sanitizedValue = inputValue ? String(parseInt(inputValue, 10)) : ''; // Hilangkan angka 0 di depan
                                    setState({ ...state, nilai: sanitizedValue });
                                }}
                                placeholder="Nilai"
                                value={state.nilai}
                                className="input input-md input-bordered w-full"
                            /> */}
                            <textarea
                                placeholder="Komentar"
                                value={state.comment}
                                onChange={(e) => setState(prev => ({ ...prev, comment: e.target.value }))}
                                className="textarea textarea-bordered textarea-md w-full " />
                        </label>

                        <div className="modal-action">
                            <button
                                onClick={() => setOpen(false)}
                                className="btn btn-neutral w-1/2 text-white">
                                Kembali
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!state.comment || state.comment === data.comment}
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

export default DialogTambahComment