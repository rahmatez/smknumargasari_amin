import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../_global/component/Toast/ToastProvider';

const DialogUpdateNilai = ({
    data,
    refetch
}) => {
    const { id, id_tugas } = useParams()
    const { addToast } = useToast()
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        nilai: 0,
    })

    useEffect(() => {
        setState({
            nilai: data.nilai,
        })
    }, [data])

    const handleSubmit = async () => {
        await axios.post(import.meta.env.VITE_BACKEND + `/guru/kelas/${id}/tugas/${id_tugas}/update-nilai`,
            {
                nilai: Number(state.nilai),
                id: data.id
            })
            .then((res) => {
                addToast('Nilai berhasil diupdate', 'success')
                setOpen(false)
                setState({
                    nilai: 0,
                })
                refetch()
            })
            .catch((err) => {
                addToast('Nilai gagal diupdate', 'error')
                console.log(err);
                setOpen(false)
            });
    }

    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-sm text-white bg-[#FFB922]">
                Update Nilai
            </button>
            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Update Nilai {data?.siswa?.nama}
                    </h3>
                    <div className='flex gap-2 flex-col'>
                        <label className="form-control w-full mt-8" >

                            <input
                                type="number"
                                inputMode='numeric'
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const sanitizedValue = inputValue ? String(parseInt(inputValue, 10)) : ''; // Hilangkan angka 0 di depan
                                    setState({ ...state, nilai: sanitizedValue });
                                }}
                                placeholder="Nilai"
                                value={state.nilai}
                                className="input input-md input-bordered w-full"
                            />

                        </label>

                        <div className="modal-action">
                            <button
                                onClick={() => setOpen(false)}
                                className="btn btn-neutral w-1/2 text-white">
                                Kembali
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!state.nilai}
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

export default DialogUpdateNilai