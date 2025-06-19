import React, { useState } from "react";
import {
  FaUserGraduate,
  FaUsers,
  FaFilter,
  FaIdCard,
  FaPhoneAlt,
  FaEye,
  FaTag,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../_global/hooks/useFetch";
import Search from "../../_global/component/Input/Search";
import DialogTambahAkunSiswa from "../container/Siswa/DialogTambahAkunSiswa";
import DialogUpdatePassword from "../container/Siswa/DialogUpdatePassword";

const ListSiswaAdminView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data, loading, refetch } = useFetch(
    import.meta.env.VITE_BACKEND + "/admin/siswa"
  );
  const [filter, setFilter] = useState("all");

  // Calculate gender distribution
  const genderCounts =
    data?.reduce((acc, student) => {
      // This is a hypothetical field - replace with actual gender field if available
      const gender = student.gender || "Unknown";
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {}) || {};

  const filteredData =
    data?.filter((item) => {
      // Base search by name
      const matchesSearch = item.nama
        .toLowerCase()
        .includes(search?.toLowerCase());

      if (filter === "all") return matchesSearch;

      // Additional filters could be added here based on any student attribute
      if (filter === "withNISN") return matchesSearch && !!item.nis;
      if (filter === "withoutNISN") return matchesSearch && !item.nis;
      if (filter === "withPhone") return matchesSearch && !!item.telephone;
      if (filter === "withoutPhone") return matchesSearch && !item.telephone;

      return matchesSearch;
    }) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data siswa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-76px)]">
      <div className="max-w-[95%] mx-auto py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Siswa</h1>
          <p className="text-gray-500 mt-1">
            Kelola data dan akun semua siswa sekolah
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary animate-fadeIn">
            <div className="flex items-center">
              <div className="bg-primary-50 p-3 rounded-lg mr-4">
                <FaUsers className="text-primary-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Siswa</p>
                <h3 className="text-2xl font-bold">{data?.length || 0}</h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg mr-4">
                <FaIdCard className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dengan NISN</p>
                <h3 className="text-2xl font-bold">
                  {data?.filter((student) => student.nis).length || 0}
                </h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg mr-4">
                <FaPhoneAlt className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dengan Kontak</p>
                <h3 className="text-2xl font-bold">
                  {data?.filter((student) => student.telephone).length || 0}
                </h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center">
              <div className="bg-yellow-50 p-3 rounded-lg mr-4">
                <FaTag className="text-yellow-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Data Belum Lengkap</p>
                <h3 className="text-2xl font-bold">
                  {data?.filter((student) => !student.nis || !student.telephone)
                    .length || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex items-center">
            <Search placeholder="Cari nama siswa" />
          </div>

          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline border-gray-300 btn-sm flex gap-2 items-center">
                <FaFilter /> Filter
              </button>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "active" : ""}>
                    Semua Siswa
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilter("withNISN")}
                    className={filter === "withNISN" ? "active" : ""}>
                    Dengan NISN
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilter("withoutNISN")}
                    className={filter === "withoutNISN" ? "active" : ""}>
                    Tanpa NISN
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilter("withPhone")}
                    className={filter === "withPhone" ? "active" : ""}>
                    Dengan Telephone
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilter("withoutPhone")}
                    className={filter === "withoutPhone" ? "active" : ""}>
                    Tanpa Telephone
                  </a>
                </li>
              </ul>
            </div>
            <DialogTambahAkunSiswa refetch={refetch} />
          </div>
        </div>

        {filter !== "all" && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 animate-fadeIn">
            <div className="flex gap-2 items-center">
              <FaFilter className="text-blue-500" />
              <p className="text-blue-700">
                Filter aktif:{" "}
                <span className="font-medium">
                  {filter === "withNISN" && "Siswa dengan NISN"}
                  {filter === "withoutNISN" && "Siswa tanpa NISN"}
                  {filter === "withPhone" && "Siswa dengan nomor telepon"}
                  {filter === "withoutPhone" && "Siswa tanpa nomor telepon"}
                </span>
              </p>
            </div>
          </div>
        )}

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
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telephone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NISN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                            {user.nama.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.nama}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.telephone ? (
                          <div className="text-sm text-gray-900">
                            {user.telephone}
                          </div>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Belum ada
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.nis ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {user.nis}
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Tidak ada
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {/* Password update button */}
                          <DialogUpdatePassword refetch={refetch} data={user} />

                          {/* View details button - could be implemented if there's a details page */}
                          <button
                            onClick={() => navigate(`/admin/siswa/${user.id}`)}
                            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                            title="Lihat Detail">
                            <FaEye size={16} />
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
                        <FaUserGraduate className="text-gray-300 text-4xl mb-3" />
                        <p className="text-lg font-medium">
                          {search || filter !== "all"
                            ? "Tidak ada siswa yang sesuai dengan pencarian"
                            : "Belum ada siswa"}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          {search || filter !== "all"
                            ? "Coba ubah filter pencarian"
                            : "Tambahkan akun siswa baru dengan menekan tombol Tambah"}
                        </p>
                        {!search && filter === "all" && (
                          <DialogTambahAkunSiswa refetch={refetch} />
                        )}
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

export default ListSiswaAdminView;
