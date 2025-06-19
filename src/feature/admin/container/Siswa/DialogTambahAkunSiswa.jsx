import axios from "axios";
import React, { Fragment, useState } from "react";
import {
  FaPlus,
  FaUserGraduate,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
  FaIdCard,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useToast } from "../../../_global/component/Toast/ToastProvider";

const DialogTambahAkunSiswa = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    nama: false,
    email: false,
    password: false,
    telephone: false,
    nis: false,
  });

  const [state, setState] = useState({
    nama: "",
    email: "",
    password: "",
    telephone: "",
    nis: "",
  });

  // Validations
  const validations = {
    nama: (value) => value.length >= 3,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    password: (value) => value.length >= 8 && value.length <= 20,
    telephone: (value) => /^[0-9]{10,13}$/.test(value),
    nis: (value) => value.length >= 5,
  };

  const errors = {
    nama:
      touched.nama && !validations.nama(state.nama)
        ? "Nama harus minimal 3 karakter"
        : "",
    email:
      touched.email && !validations.email(state.email)
        ? "Format email tidak valid"
        : "",
    password:
      touched.password && !validations.password(state.password)
        ? "Password harus 8-20 karakter"
        : "",
    telephone:
      touched.telephone && !validations.telephone(state.telephone)
        ? "Nomor telepon harus 10-13 digit"
        : "",
    nis:
      touched.nis && !validations.nis(state.nis)
        ? "NIS minimal 5 karakter"
        : "",
  };

  const isFormValid =
    validations.nama(state.nama) &&
    validations.email(state.email) &&
    validations.password(state.password) &&
    validations.telephone(state.telephone) &&
    validations.nis(state.nis);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "telephone" && !/^[0-9]{0,13}$/.test(value)) {
      return; // Only allow numbers and max 13 chars
    }

    setState((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      // Mark all fields as touched to show validation errors
      setTouched({
        nama: true,
        email: true,
        password: true,
        telephone: true,
        nis: true,
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/admin/guru/register/siswa`,
        state
      );
      addToast("Akun siswa berhasil dibuat", "success");
      setOpen(false);
      setState({
        nama: "",
        email: "",
        password: "",
        telephone: "",
        nis: "",
      });
      setTouched({
        nama: false,
        email: false,
        password: false,
        telephone: false,
        nis: false,
      });
      refetch();
    } catch (error) {
      console.error(error);
      addToast(
        error.response?.data?.message || "Terjadi kesalahan saat mendaftar",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      nama: "",
      email: "",
      password: "",
      telephone: "",
      nis: "",
    });
    setTouched({
      nama: false,
      email: false,
      password: false,
      telephone: false,
      nis: false,
    });
  };

  // Helper for input field rendering
  const renderField = ({ label, field, type = "text", placeholder, icon }) => {
    const isValid = touched[field] && validations[field](state[field]);
    const hasError = touched[field] && !validations[field](state[field]);

    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium text-gray-700">
            {label} <span className="text-red-500">*</span>
          </span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
          {field === "password" ? (
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-md input-bordered w-full pl-10 pr-10 ${
                  hasError
                    ? "border-red-300 focus:border-red-500"
                    : isValid
                    ? "border-green-300 focus:border-green-500"
                    : ""
                }`}
                placeholder={placeholder}
                value={state[field]}
                onChange={handleChange(field)}
                onBlur={handleBlur(field)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          ) : (
            <input
              type={type}
              className={`input input-md input-bordered w-full pl-10 pr-10 ${
                hasError
                  ? "border-red-300 focus:border-red-500"
                  : isValid
                  ? "border-green-300 focus:border-green-500"
                  : ""
              }`}
              placeholder={placeholder}
              value={state[field]}
              onChange={handleChange(field)}
              onBlur={handleBlur(field)}
            />
          )}
          {touched[field] &&
            (validations[field](state[field]) ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
                <FaCheck size={18} />
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                <MdClose size={18} />
              </div>
            ))}
        </div>
        {errors[field] && (
          <label className="label">
            <span className="label-text-alt text-red-500">{errors[field]}</span>
          </label>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary text-white gap-2 shadow-sm hover:shadow-md transition-all">
        <FaPlus />
        Tambah Akun Siswa
      </button>

      <dialog
        open={open}
        className="modal modal-bottom sm:modal-middle"
        onClose={handleClose}>
        <div className="modal-box bg-white rounded-xl shadow-lg max-w-2xl">
          <form method="dialog">
            <button
              className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleClose}>
              <MdClose size={20} className="text-gray-500" />
            </button>
          </form>

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-full">
              <FaUserGraduate className="text-blue-500 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-800">
                Tambah Akun Siswa
              </h3>
              <p className="text-sm text-gray-500">
                Masukkan informasi untuk akun siswa baru
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField({
              label: "Nama Lengkap",
              field: "nama",
              placeholder: "Masukkan nama lengkap siswa",
              icon: <FaUserGraduate className="text-gray-400" />,
            })}

            {renderField({
              label: "Email",
              field: "email",
              placeholder: "email@example.com",
              icon: <span className="text-gray-400">@</span>,
            })}

            {renderField({
              label: "Password",
              field: "password",
              type: "password",
              placeholder: "Min. 8 karakter",
              icon: <span className="text-gray-400">🔒</span>,
            })}

            {renderField({
              label: "Nomor Telepon",
              field: "telephone",
              placeholder: "Contoh: 08123456789",
              icon: <FaPhoneAlt className="text-gray-400" />,
            })}

            {renderField({
              label: "Nomor Induk Siswa (NIS)",
              field: "nis",
              placeholder: "Masukkan NIS",
              icon: <FaIdCard className="text-gray-400" />,
            })}
          </div>

          <div className="modal-action flex gap-3 mt-8 border-t pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-lg text-white ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-colors flex justify-center items-center gap-2`}>
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FaCheck size={16} />
                  <span>Simpan</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="modal-backdrop bg-black/30" onClick={handleClose}></div>
      </dialog>
    </Fragment>
  );
};

export default DialogTambahAkunSiswa;
