import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../_global/component/Toast/ToastProvider';
import useFetch from '../../../../_global/hooks/useFetch';

const DialogTambahSiswa = ({
    refetch
}) => {
    const { id } = useParams()
    const { addToast } = useToast();
    const [open, setOpen] = useState(false);

    const { data, loading } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/siswa-not-join/' + id)

    const siswa = data?.map((item, index) => ({
        id: item.id,
        label: item?.nama,
        email: item?.email
    })) || []

    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelect = (optionId) => {
        setSelectedValues([...selectedValues, optionId]);
    }

    const availableOptions = siswa?.filter(
        option => !selectedValues.includes(option.id)
    )

    useEffect(() => {
        setSelectedValues([])
    }, [open])

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND}/guru/kelas/${id}/siswa`,
                { siswaIds: selectedValues }
            );

            addToast('Siswa berhasil ditambahkan', 'success');
            setOpen(false);
            setSelectedValues([]);
            refetch();
        } catch (error) {
            console.error(error);
            addToast('Siswa gagal ditambahkan', 'error');
        } finally {
            setSelectedValues([]);
        }
        setOpen(false);
    };


    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-primary text-white "
            >
                <FaPlus />
                Tambah Siswa
            </button>
            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Siswa
                    </h3>
                    <div className='flex gap-2 flex-col'>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Siswa Tersedia</span>
                            </div>
                            <div className='mt-2 flex flex-col gap-2'>
                                {availableOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => handleSelect(option.id)}
                                        className="
                              flex justify-between items-center 
                              px-3 py-2 rounded-md 
                              hover:bg-gray-100 cursor-pointer
                              transition-colors
                              border border-gray-300
                            "
                                    >
                                        <div>
                                            <p className="font-semibold text-sm">{option.label}</p>
                                            <p className="text-xs text-gray-500">{option.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="divider">Terpilih</div>
                            <div className="mt-2 flex flex-wrap gap-2">

                                {
                                    selectedValues.length > 0
                                    && siswa.filter((option) => selectedValues.includes(option.id)).map((opt) => (
                                        <div
                                            key={opt.id}
                                            className="
                                                   bg-blue-100 text-blue-800 px-3 py-1 rounded 
                                                   flex items-center gap-2 shadow-sm
                                                 "
                                        >
                                            <div>
                                                <p className="font-semibold text-sm">{opt.label}</p>
                                                <p className="text-xs text-gray-500">{opt.email}</p>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </label>

                        <div className="modal-action">
                            <button
                                onClick={() => setOpen(false)}
                                className="btn btn-neutral w-1/2 text-white">
                                Kembali
                            </button>
                            <button
                                disabled={selectedValues.length === 0}
                                onClick={handleSubmit}
                                className="btn btn-contained btn-primary w-1/2 text-white">
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            </dialog>
        </Fragment>
    )
}

export default DialogTambahSiswa