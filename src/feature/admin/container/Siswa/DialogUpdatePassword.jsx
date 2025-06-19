import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useToast } from '../../../_global/component/Toast/ToastProvider';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const DialogUpdatePassword = ({
    refetch,
    data
}) => {
    const [open, setOpen] = useState(false);
    const { addToast } = useToast()

    const [state, setState] = useState({
        id: 0,
        email: "",
        password: "",
    });

    const disabled = !state.password

    const handleSubmit = () => {
        axios.post(`${import.meta.env.VITE_BACKEND}/users/update-password`, state)
            .then((res) => {
                setOpen(false)
                setState({ email: "", password: "" })
                refetch()
                addToast('Password berhasil diupdate', 'success')
            })
            .catch((err) => {
                console.log(err);
                addToast('Password gagal diupdate', 'error')
            })
    }

    useEffect(() => {
        setState({
            id: data.id,
            email: data.email,
            password: ''
        })
    }, [data])
 
    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                // disabled={item.mataPelajaranGuru?.length > 0}
                className="btn btn-square btn-sm text-white bg-green-500">
                <FiEdit size={20} />
            </button>

            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Update Password
                    </h3>
                    <div className='flex gap-2 flex-col'>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Password Baru</span>
                            </div>
                            <input
                                type="text"
                                value={state.title}
                                onChange={(e) => setState(prev => ({ ...prev, password: e.target.value }))}
                                placeholder="Masukkan Password Baru"
                                className="input input-md input-bordered w-full "
                            />
                        </label>

                        <div className="modal-action">
                            <button
                                onClick={() => {
                                    setOpen(false)
                                }}
                                className="btn btn-neutral w-1/2 text-white">
                                Kembali
                            </button>
                            <button
                                onClick={handleSubmit}
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

export default DialogUpdatePassword