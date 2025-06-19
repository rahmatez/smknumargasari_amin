import React from "react";
import { FaPlus, FaBook, FaEdit, FaFilter } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../_global/hooks/useFetch";
import { MdDeleteOutline } from "react-icons/md";
import Search from "../../_global/component/Input/Search";
import DialogTambahMataPelajaran from "../container/Mata Pelajaran/DialogTambahMataPelajaran";
import { useToast } from "../../_global/component/Toast/ToastProvider";
import axios from "axios";
import DialogUpdateMataPelajaran from "../container/Mata Pelajaran/DialogUpdateMataPelajaran";

const ListMataPelajaranAdminView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const search = searchParams.get("search") || "";
  const { data, loading, refetch } = useFetch(
    import.meta.env.VITE_BACKEND + "/mata-pelajaran/statistik"
  );

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/mata-pelajaran/${id}`
      );
      refetch();
      addToast("Mata Pelajaran berhasil dihapus", "success");
    } catch (error) {
      console.error(error);
      addToast("Mata Pelajaran gagal dihapus", "error");
    }
  };

  const filteredData =
    data?.filter((item) =>
      item.title.toLowerCase().includes(search?.toLowerCase())
    ) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data mata pelajaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-76px)]">
      <div className="max-w-[95%] mx-auto py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mata Pelajaran</h1>
          <p className="text-gray-500 mt-1">
            Kelola semua mata pelajaran yang ada di sekolah
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary animate-fadeIn">
            <div className="flex items-center">
              <div className="bg-primary-50 p-3 rounded-lg mr-4">
                <FaBook className="text-primary-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Mata Pelajaran</p>
                <h3 className="text-2xl font-bold">{data?.length || 0}</h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg mr-4">
                <FaBook className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Mata Pelajaran Aktif</p>
                <h3 className="text-2xl font-bold">
                  {data?.filter((item) => item.isActive).length || 0}
                </h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center">
              <div className="bg-orange-50 p-3 rounded-lg mr-4">
                <FaBook className="text-orange-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Mata Pelajaran Non-aktif
                </p>
                <h3 className="text-2xl font-bold">
                  {data?.filter((item) => !item.isActive).length || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex items-center">
            <Search placeholder="Cari Mata Pelajaran" />
          </div>

          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline border-gray-300 btn-sm flex gap-2 items-center">
                <FaFilter /> Filter
              </button>
              <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <div className="p-2">
                  <label className="flex items-center mb-2">
                    <input type="checkbox" className="mr-2" /> Aktif
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Tidak Aktif
                  </label>
                </div>
              </div>
            </div>
            <DialogTambahMataPelajaran refetch={refetch} />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Guru
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Kelas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {item?.mataPelajaranGuru?.length || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {item?.mataPelajaranGuru?.reduce(
                            (total, mapel) =>
                              total + mapel?.user?._count?.classes,
                            0
                          ) || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                          {item.isActive ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <DialogUpdateMataPelajaran
                            data={item}
                            refetch={refetch}
                          />
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={item.mataPelajaranGuru?.length > 0}
                            className={`p-2 rounded-md text-white transition-all ${
                              item.mataPelajaranGuru?.length > 0
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                            title={
                              item.mataPelajaranGuru?.length > 0
                                ? "Tidak dapat dihapus karena sedang digunakan"
                                : "Hapus"
                            }>
                            <MdDeleteOutline size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FaBook className="text-gray-300 text-4xl mb-3" />
                        <p className="text-lg font-medium">
                          Tidak ada mata pelajaran
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          Tambahkan mata pelajaran baru dengan menekan tombol
                          Tambah
                        </p>
                        <DialogTambahMataPelajaran refetch={refetch} />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMataPelajaranAdminView;
