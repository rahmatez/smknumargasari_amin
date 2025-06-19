import React, { useState } from "react";
import {
  FaEye,
  FaPlus,
  FaChalkboard,
  FaFilter,
  FaCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../_global/hooks/useFetch";
import { formatDateToTime } from "../../_global/helper/formatter";
import Search from "../../_global/component/Input/Search";
import DialogTambahKelas from "../container/Kelas/DialogTambahKelas";

const ListKelasAdminView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const { data, loading, refetch } = useFetch(
    import.meta.env.VITE_BACKEND + "/admin/kelas"
  );
  const [filterDay, setFilterDay] = useState("all");

  const filteredData =
    data?.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search?.toLowerCase());

      if (filterDay === "all") return matchesSearch;

      const matchesDay = item?.scheduleClasses?.some(
        (schedule) =>
          schedule.day?.title.toLowerCase() === filterDay.toLowerCase()
      );

      return matchesSearch && matchesDay;
    }) || [];

  // Group classes by days for stats
  const dayStats =
    data?.reduce((acc, item) => {
      if (item?.scheduleClasses?.length > 0) {
        const day = item.scheduleClasses[0]?.day?.title;
        if (day) {
          acc[day] = (acc[day] || 0) + 1;
        }
      }
      return acc;
    }, {}) || {};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data kelas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-76px)]">
      <div className="max-w-[95%] mx-auto py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Kelas</h1>
          <p className="text-gray-500 mt-1">
            Kelola semua kelas yang ada di sekolah
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary animate-fadeIn">
            <div className="flex items-center">
              <div className="bg-primary-50 p-3 rounded-lg mr-4">
                <FaChalkboard className="text-primary-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Kelas</p>
                <h3 className="text-2xl font-bold">{data?.length || 0}</h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-lg mr-4">
                <FaUserGraduate className="text-purple-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Guru Mengajar</p>
                <h3 className="text-2xl font-bold">
                  {new Set(data?.map((item) => item?.user?.id).filter(Boolean))
                    .size || 0}
                </h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg mr-4">
                <FaCalendarAlt className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hari Paling Padat</p>
                <h3 className="text-2xl font-bold">
                  {Object.entries(dayStats).sort(
                    (a, b) => b[1] - a[1]
                  )[0]?.[0] || "-"}
                </h3>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-lg mr-4">
                <FaChalkboard className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Mata Pelajaran</p>
                <h3 className="text-2xl font-bold">
                  {new Set(
                    data
                      ?.map(
                        (item) =>
                          item?.user?.mataPelajaranGuru?.[0]?.mataPelajaran
                            ?.title
                      )
                      .filter(Boolean)
                  ).size || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex items-center">
            <Search placeholder="Cari nama kelas" />
          </div>

          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline border-gray-300 btn-sm flex gap-2 items-center">
                <FaFilter /> Filter Hari
              </button>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a
                    onClick={() => setFilterDay("all")}
                    className={filterDay === "all" ? "active" : ""}>
                    Semua Hari
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilterDay("Senin")}
                    className={filterDay === "Senin" ? "active" : ""}>
                    Senin
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilterDay("Selasa")}
                    className={filterDay === "Selasa" ? "active" : ""}>
                    Selasa
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilterDay("Rabu")}
                    className={filterDay === "Rabu" ? "active" : ""}>
                    Rabu
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilterDay("Kamis")}
                    className={filterDay === "Kamis" ? "active" : ""}>
                    Kamis
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilterDay("Jumat")}
                    className={filterDay === "Jumat" ? "active" : ""}>
                    Jumat
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setFilterDay("Sabtu")}
                    className={filterDay === "Sabtu" ? "active" : ""}>
                    Sabtu
                  </a>
                </li>
              </ul>
            </div>
            <DialogTambahKelas refetch={refetch} data={data} />
          </div>
        </div>

        {filterDay !== "all" && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 animate-fadeIn">
            <div className="flex gap-2 items-center">
              <FaFilter className="text-blue-500" />
              <p className="text-blue-700">
                Menampilkan kelas pada hari{" "}
                <span className="font-medium">{filterDay}</span>
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
                    Nama Kelas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guru
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Guru
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jadwal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dibuat
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.user?.nama || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {item?.user?.email || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.user?.mataPelajaranGuru?.[0]?.mataPelajaran
                            ?.title || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.scheduleClasses?.length > 0 ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item?.scheduleClasses?.[0]?.day?.title},{" "}
                            {item?.scheduleClasses?.[0]?.startTime} -{" "}
                            {item?.scheduleClasses?.[0]?.endTime}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDateToTime(item?.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/admin/kelas/${item.id}`)}
                          className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          title="Lihat Detail">
                          <FaEye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FaChalkboard className="text-gray-300 text-4xl mb-3" />
                        <p className="text-lg font-medium">
                          {search || filterDay !== "all"
                            ? "Tidak ada kelas yang sesuai dengan pencarian"
                            : "Belum ada kelas"}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          {search || filterDay !== "all"
                            ? "Coba ubah filter pencarian"
                            : "Tambahkan kelas baru dengan menekan tombol Tambah"}
                        </p>
                        {!search && filterDay === "all" && (
                          <DialogTambahKelas refetch={refetch} data={data} />
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

export default ListKelasAdminView;
