import axios from "axios";
import React, { Fragment, useState } from "react";
import { FaPlus, FaBook, FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useToast } from "../../../_global/component/Toast/ToastProvider";

const DialogTambahMataPelajaran = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [touched, setTouched] = useState(false);

  const [state, setState] = useState({
    title: "",
    isActive: true,
  });

  const isValid = state.title && state.title.length >= 3;
  const showError = touched && !isValid;

  const handleSubmit = async () => {
    if (!isValid) {
      setTouched(true);
      return;
    }

    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND + `/mata-pelajaran`, state);
      setOpen(false);
      setState({ title: "", isActive: true });
      setTouched(false);
      refetch();
      addToast("Mata Pelajaran berhasil ditambahkan", "success");
    } catch (err) {
      console.error(err);
      addToast("Mata Pelajaran gagal ditambahkan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setState({ title: "", isActive: true });
    setTouched(false);
  };

  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary text-white gap-2 shadow-sm hover:shadow-md transition-all">
        <FaPlus />
        Tambah Mata Pelajaran
      </button>

      <dialog
        open={open}
        className="modal modal-bottom sm:modal-middle"
        onClose={handleClose}>
        <div className="modal-box bg-white rounded-xl shadow-lg">
          <form method="dialog">
            <button
              className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleClose}>
              <MdClose size={20} className="text-gray-500" />
            </button>
          </form>

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-50 p-3 rounded-full">
              <FaBook className="text-primary-500 text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-800">
                Tambah Mata Pelajaran
              </h3>
              <p className="text-sm text-gray-500">
                Masukkan informasi mata pelajaran baru
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Nama Mata Pelajaran <span className="text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  value={state.title}
                  type="text"
                  onChange={(e) =>
                    setState({ ...state, title: e.target.value })
                  }
                  onBlur={() => setTouched(true)}
                  placeholder="Contoh: Matematika, Bahasa Indonesia, dll"
                  className={`input input-md input-bordered w-full pl-3 pr-10 ${
                    showError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : touched && isValid
                      ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                      : "focus:border-primary focus:ring-primary"
                  }`}
                />
                {touched &&
                  (isValid ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
                      <FaCheck size={16} />
                    </div>
                  ) : (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                      <MdClose size={18} />
                    </div>
                  ))}
              </div>
              {showError && (
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    Nama mata pelajaran harus diisi minimal 3 karakter
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="cursor-pointer label justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={state.isActive}
                  onChange={(e) =>
                    setState({ ...state, isActive: e.target.checked })
                  }
                />
                <span className="label-text">Aktifkan mata pelajaran ini</span>
              </label>
            </div>
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
                  ? "bg-primary-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
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

export default DialogTambahMataPelajaran;
