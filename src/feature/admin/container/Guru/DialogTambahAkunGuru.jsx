import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useToast } from '../../../_global/component/Toast/ToastProvider';
import useFetch from '../../../_global/hooks/useFetch';

const DialogTambahAkunGuru = ({
    refetch
}) => {
    const [open, setOpen] = useState(false);
    const { addToast } = useToast();
    const [state, setState] = useState({
        nama: '',
        email: '',
        password: '',
        telephone: '',
    });

    const [errors, setErrors] = useState({
        nama: '',
        email: '',
        password: '',
        telephone: '',
    });
    const [mapel, setMapel] = useState(0);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 12;
    };
    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        return nameRegex.test(name);
    }

    const validateTelephone = (telephone) => {
        const telephoneRegex = /^[0-9]+$/;
        return telephoneRegex.test(telephone);
    }
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setState((prev) => ({ ...prev, email: value }));

        // if (!validateEmail(value)) {
        //     setErrors((prev) => ({ ...prev, email: 'Format email tidak valid' }));
        // } else {
        //     setErrors((prev) => ({ ...prev, email: '' }));
        // }
    };

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setState((prev) => ({ ...prev, password: value }));

        // if (!validatePassword(value)) {
        //     setErrors((prev) => ({
        //         ...prev,
        //         password: 'Password harus 8-12 karakter',
        //     }));
        // } else {
        //     setErrors((prev) => ({ ...prev, password: '' }));
        // }
    };


    const handleChangeName = (e) => {
        const value = e.target.value;
        // if (!validateName(value)) {
        //     setErrors((prev) => ({
        //         ...prev,
        //         nama: 'Format nama tidak valid',
        //     }));
        // } else {
        //     setErrors((prev) => ({ ...prev, nama: '' }));
        // }

        setState((prev) => ({ ...prev, nama: value }));
    };

    // const handleChangeTelephone = (e) => {
    //     const value = e.target.value;
    //     // if (!validateTelephone(value)) {
    //     //     setErrors((prev) => ({
    //     //         ...prev,
    //     //         telephone: 'Format nomor telepon tidak valid',
    //     //     }));
    //     // } else {
    //     //     setErrors((prev) => ({ ...prev, telephone: '' }));
    //     // }

    //     setState((prev) => ({ ...prev, telephone: value }));
    // };

    const handleChangeTelephone = (e) => {
        const value = e.target.value;
    
        // Batasi input hanya angka dan maksimal 13 karakter
        const isValid = /^[0-9]{0,13}$/.test(value);
    
        if (!isValid) {
          setErrors((prev) => ({
            ...prev,
            telephone: 'Nomor telepon hanya boleh berisi angka dan maksimal 13 karakter',
          }));
          return; // Jangan set state jika tidak valid
        }
    
        setErrors((prev) => ({ ...prev, telephone: '' })); // Reset error jika valid
        setState((prev) => ({ ...prev, telephone: value })); // Update state
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND}/admin/guru/register/guru`,
                state
            );
            console.log(response?.data?.data?.id)

            await axios.post(import.meta.env.VITE_BACKEND + `/admin/guru/mata-pelajaran`, {
                userId: response?.data?.data?.id,
                mataPelajaranId: mapel
            })

            addToast('Akun berhasil dibuat', 'success');

        } catch (error) {
            console.log(error)
            addToast(
                error.response?.data?.message || 'Terjadi kesalahan saat mendaftar',
                'error'
            );
        } finally {
            setOpen(false);
            refetch()
        }
    };


    const hasErrors = !!errors.email || !!errors.password || !!errors.telephone || !!errors.nama || !state.email || !state.password || !state.nama || !state.telephone || !mapel

    const { data: dataMapel } = useFetch(import.meta.env.VITE_BACKEND + '/mata-pelajaran')

    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-primary text-white "
            >
                <FaPlus />
                Tambah Akun Guru
            </button>

            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Akun Guru
                    </h3>
                    <div className='flex gap-2 flex-col'>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Nama</span>
                            </div>
                            <input
                                type="text"
                                className="input input-md input-bordered w-full "
                                placeholder="Nama Lengkap"
                                value={state.nama}
                                onChange={handleChangeName}
                            />
                        </label>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Email</span>
                            </div>
                            <input
                                type="text"
                                className="input input-md input-bordered w-full "
                                placeholder="Email"
                                value={state.email}
                                onChange={handleChangeEmail}
                            />
                        </label>
                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Password</span>
                            </div>
                            <input
                                type={'text'}
                                className="input input-md input-bordered w-full "
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChangePassword}
                            />
                        </label>
                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Telephone</span>
                            </div>
                            <input
                                type="text"
                                className="input input-md input-bordered w-full "
                                placeholder="Nomor Handphone"
                                value={state.telephone}

                                onChange={handleChangeTelephone}
                            />
                        </label>
                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Mata Pelajaran</span>
                            </div>
                            <select
                                className="select select-bordered w-full "
                                value={state.mapel}
                                onChange={(e) => setMapel(Number(e.target.value))}
                            >
                                <option disabled selected value="">
                                    Pilih Mata Pelajaran
                                </option>
                                {dataMapel?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
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
                                disabled={hasErrors}
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

export default DialogTambahAkunGuru