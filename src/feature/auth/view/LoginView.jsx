import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { RiKey2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../_global/component/Toast/ToastProvider';

const LoginView = () => {
  const { addToast } = useToast();
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 12;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(state.email)) {
      addToast('Format email tidak valid', 'error');
      return;
    }

    if (!validatePassword(state.password)) {
      addToast('Password harus 8-12 karakter', 'error');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/users/login`,
        state
      );

      localStorage.setItem('token', response?.data?.data?.token);

      const { role } = jwtDecode(response?.data?.data?.token);


      addToast('Login berhasil!', 'success');

      navigate('/' + role)
    } catch (error) {
      addToast(
        error.response?.data?.message || 'Terjadi kesalahan saat login.',
        'error'
      );
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const hasErrors = !!errors.email || !!errors.password || !state.email || !state.password;

  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="col-span-3 sm:col-span-1 bg-[#EBF3FC] p-4 h-screen flex justify-center items-center">
        <img src='/logo_smk_maarif.png' alt="logo" width={200} height={200} />
      </div>

      <div className="col-span-3 sm:col-span-2 p-4 flex justify-center items-center">
        <div className='w-full sm:w-1/2 flex flex-col gap-4 px-4' >

          <p className='text-3xl font-bold text-primary text-center mb-4'>Login</p>

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
            onClick={handleSubmit} className='w-full btn btn-primary mt-4'>Masuk</button>
          {/* <p className="text-gray-500 text-sm mb-4 text-center leading-none">Belum punya akun? <a className='text-primary hover:underline font-semibold' href="/register">Daftar Sebagai Siswa</a></p> */}
        </div>

      </div>

    </div>

  )
}

export default LoginView