import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { RiKey2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../_global/component/Toast/ToastProvider';
import { FaUserCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";


const RegisterView = () => {
  const { addToast } = useToast();
  const navigate = useNavigate()
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

    if (!validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Format email tidak valid' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, password: value }));

    if (!validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password harus 8-12 karakter',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };


  const handleChangeName = (e) => {
    const value = e.target.value;
    if (!validateName(value)) {
      setErrors((prev) => ({
        ...prev,
        nama: 'Format nama tidak valid',
      }));
    } else {
      setErrors((prev) => ({ ...prev, nama: '' }));
    }

    setState((prev) => ({ ...prev, nama: value }));
  };

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
        `${import.meta.env.VITE_BACKEND}/siswa/register/siswa`,
        state
      );


      addToast('Akun berhasil dibuat', 'success');

      navigate('/')
    } catch (error) {
      console.log(error)
      addToast(
        error.response?.data?.message || 'Terjadi kesalahan saat mendaftar',
        'error'
      );
    } finally {
      // setState({
      //   nama: '',
      //   email: '',
      //   password: '',
      //   telephone: '',
      // });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const hasErrors = !!errors.email || !!errors.password || !!errors.telephone || !!errors.nama || !state.email || !state.password || !state.nama || !state.telephone

  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="col-span-3 sm:col-span-1 bg-[#EBF3FC] p-4 h-screen flex justify-center items-center">
        <img src='/logo_smk_maarif.png' alt="logo" width={200} height={200} />

      </div>

      <div className="col-span-3 sm:col-span-2 p-4 flex justify-center items-center">
        <div className='w-full sm:w-1/2 flex flex-col gap-4 px-4' >

          <p className='text-3xl font-bold text-primary leading-none text-center'>Daftar</p>
          <p className='text-sm font-semibold italic text-primary leading-none text-center mb-4'>(Siswa)</p>

          <label className="input input-bordered flex items-center gap-2">
            <FaUserCircle />
            <input
              type="text"
              className="grow"
              placeholder="Nama Lengkap"
              value={state.nama}
              onChange={handleChangeName}
            />
          </label>
          {errors.nama && (
            <p className="text-red-500 text-xs mb-4 leading-none">{errors.nama}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <MdAttachEmail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={state.email}
              onChange={handleChangeEmail}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs mb-4 leading-none">{errors.email}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <FaPhone />
            <input
              type="text"
              className="grow"
              placeholder="Nomor Handphone"
              value={state.telephone}
              onChange={handleChangeTelephone}
            />
          </label>
          {errors.telephone && (
            <p className="text-red-500 text-xs mb-4 leading-none">{errors.telephone}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <RiKey2Fill />
            <input
              type={showPassword ? 'text' : 'password'}
              className="grow"
              placeholder="Password"
              value={state.password}
              onChange={handleChangePassword}
            />
            {showPassword ? (
              <FaRegEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash onClick={() => setShowPassword(true)} />
            )}
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs mb-4 leading-none">{errors.password}</p>
          )}
          <button
            disabled={hasErrors}
            onClick={handleSubmit} className='w-full btn btn-primary mt-4'>Daftar</button>
          <p className="text-gray-500 text-sm mb-4 text-center leading-none">Sudah punya akun? <a className='text-primary hover:underline font-semibold' href="/">Masuk ke akun</a></p>
        </div>

      </div>

    </div>

  )
}

export default RegisterView