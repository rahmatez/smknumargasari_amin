import React, { useState } from "react";
import {
  FaPlus,
  FaChalkboardTeacher,
  FaFilter,
  FaEye,
  FaLaptop,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../_global/hooks/useFetch";
import Search from "../../_global/component/Input/Search";
import DialogTambahAkunGuru from "../container/Guru/DialogTambahAkunGuru";
import DialogUpdatePassword from "../container/Guru/DialogUpdatePassword";

const ListGuruAdminView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [subjectFilter, setSubjectFilter] = useState("all");
  const { data, loading, refetch } = useFetch(
    import.meta.env.VITE_BACKEND + "/admin/guru"
  );

  // Process subjects for filtering
  const subjects = data
    ? [
        ...new Set(
          data
            .map((item) => item?.mataPelajaranGuru?.[0]?.mataPelajaran?.title)
            .filter(Boolean)
        ),
      ]
    : [];

  // Create subject stats
  const subjectStats =
    data?.reduce((acc, item) => {
      const subject = item?.mataPelajaranGuru?.[0]?.mataPelajaran?.title;
      if (subject) {
        acc[subject] = (acc[subject] || 0) + 1;
      }
      return acc;
    }, {}) || {};

  const filteredData =
    data?.filter((item) => {
      const matchesSearch = item.nama
        .toLowerCase()
        .includes(search?.toLowerCase());

      if (subjectFilter === "all") return matchesSearch;

      const matchesSubject =
        item?.mataPelajaranGuru?.[0]?.mataPelajaran?.title === subjectFilter;

      return matchesSearch && matchesSubject;
    }) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data guru...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-76px)]">
      <div className="max-w-[95%] mx-auto py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Guru</h1>
          <p className="text-gray-500 mt-1">
            Kelola akun guru dan mata pelajaran yang diampu
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary animate-fadeIn">
            <div className="flex items-center">
              <div className="bg-primary-50 p-3 rounded-lg mr-4">
                <FaChalkboardTeacher className="text-primary-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Guru</p>
                <h3 className="text-2xl font-bold">{data?.length || 0}</h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg mr-4">
                <FaLaptop className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Mata Pelajaran</p>
                <h3 className="text-2xl font-bold">{subjects.length || 0}</h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg mr-4">
                <FaPhoneAlt className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dengan Kontak</p>
                <h3 className="text-2xl font-bold">
                  {data?.filter((teacher) => teacher.telephone).length || 0}
                </h3>
              </div>
            </div>
          </div>

          {Object.keys(subjectStats).length > 0 && (
            <div
              className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 animate-fadeIn"
              style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center">
                <div className="bg-purple-50 p-3 rounded-lg mr-4">
                  <FaChalkboardTeacher className="text-purple-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guru Terbanyak</p>
                  <h3 className="text-2xl font-bold">
                    {Object.entries(subjectStats).sort(
                      (a, b) => b[1] - a[1]
                    )[0]?.[0] || "-"}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex items-center">
            <Search placeholder="Cari nama guru" />
          </div>

          <div className="flex items-center gap-3">
            {subjects.length > 0 && (
              <div className="dropdown dropdown-end">
                <button className="btn btn-outline border-gray-300 btn-sm flex gap-2 items-center">
                  <FaFilter /> Filter Mata Pelajaran
                </button>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72">
                  <li>
                    <a
                      onClick={() => setSubjectFilter("all")}
                      className={subjectFilter === "all" ? "active" : ""}>
                      Semua Mata Pelajaran
                    </a>
                  </li>
                  {subjects.map((subject, idx) => (
                    <li key={idx}>
                      <a
                        onClick={() => setSubjectFilter(subject)}
                        className={subjectFilter === subject ? "active" : ""}>
                        {subject}{" "}
                        <span className="text-xs ml-1 opacity-70">
                          ({subjectStats[subject] || 0})
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <DialogTambahAkunGuru refetch={refetch} />
          </div>
        </div>

        {subjectFilter !== "all" && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 animate-fadeIn">
            <div className="flex gap-2 items-center">
              <FaFilter className="text-blue-500" />
              <p className="text-blue-700">
                Menampilkan guru mata pelajaran{" "}
                <span className="font-medium">{subjectFilter}</span>
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
                    Mata Pelajaran
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
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
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
                        <div className="text-sm text-gray-900">
                          {user.telephone || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.mataPelajaranGuru?.[0]?.mataPelajaran?.title ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.mataPelajaranGuru[0].mataPelajaran.title}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            Belum ada
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          {/* Password update button */}
                          <DialogUpdatePassword refetch={refetch} data={user} />

                          {/* View details button */}
                          <button
                            onClick={() => navigate(`/admin/guru/${user.id}`)}
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
                        <FaChalkboardTeacher className="text-gray-300 text-4xl mb-3" />
                        <p className="text-lg font-medium">
                          {search || subjectFilter !== "all"
                            ? "Tidak ada guru yang sesuai dengan pencarian"
                            : "Belum ada guru"}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          {search || subjectFilter !== "all"
                            ? "Coba ubah filter pencarian"
                            : "Tambahkan akun guru baru dengan menekan tombol Tambah"}
                        </p>
                        {!search && subjectFilter === "all" && (
                          <DialogTambahAkunGuru refetch={refetch} />
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

export default ListGuruAdminView;
