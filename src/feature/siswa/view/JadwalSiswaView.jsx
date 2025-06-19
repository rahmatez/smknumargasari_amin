import React, { useState } from "react";
import { formatDateTime } from "../../_global/helper/formatter";
import TemplateInfoRow from "../../_global/component/Row/TemplateInfoRow";
import useFetch from "../../_global/hooks/useFetch";
import Content from "../../_global/layout/Content";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  MdDateRange,
  MdAccessTime,
  MdPerson,
  MdClass,
  MdInfo,
} from "react-icons/md";

const listDays = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const getDayName = (dateString) => {
  const date = new Date(dateString);
  return listDays[date.getDay()];
};

const JadwalSiswaView = () => {
  const { data, loading, refetch } = useFetch(
    import.meta.env.VITE_BACKEND + "/siswa/ujian"
  );
  const [selectedSchedule, setSelectedSchedule] = useState("jadwal");
  const navigate = useNavigate();

  const handleScheduleChange = (event) => {
    setSelectedSchedule(event.target.value);
  };

  if (loading) {
    return (
      <Content className="min-h-screen py-8">
        <div className="flex justify-center items-center h-96">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-[#6148FF]"></span>
            <p className="text-gray-500 animate-pulse">
              Memuat jadwal ujian...
            </p>
          </div>
        </div>
      </Content>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Content className="min-h-screen py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Jadwal Ujian</h1>
          <button
            onClick={() => navigate(-1)}
            className="btn bg-[#6148FF] hover:bg-[#4F3BD4] text-white rounded-lg gap-2 btn-sm">
            <IoIosArrowBack size={18} />
            Kembali
          </button>
        </div>

        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="card w-full max-w-md bg-[#EBF3FC] border-2 border-[#6148FF] shadow-xl hover-lift animate-fadeIn">
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-[#6148FF15] p-6 mb-4">
                <MdDateRange className="h-12 w-12 text-[#6148FF]" />
              </div>
              <h2 className="card-title text-xl font-bold text-[#6148FF]">
                Tidak Ada Data
              </h2>
              <p className="text-gray-600">
                Tidak ada jadwal ujian tersedia saat ini
              </p>
              <button
                onClick={() => refetch()}
                className="btn btn-sm bg-[#6148FF] text-white hover:bg-[#4F3BD4] mt-4">
                Muat Ulang
              </button>
            </div>
          </div>
        </div>
      </Content>
    );
  }

  const today = new Date().getDay();

  const days = [
    { name: "Senin" },
    { name: "Selasa" },
    { name: "Rabu" },
    { name: "Kamis" },
    { name: "Jumat" },
    { name: "Sabtu" },
  ];

  const ujianByDay = days.map((day) => ({
    ...day,
    exams: data.filter((exam) => getDayName(exam.dateTime) === day.name),
  }));

  return (
    <Content className="min-h-screen py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <MdDateRange className="text-[#6148FF]" size={28} />
          Jadwal Ujian
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="btn bg-[#6148FF] hover:bg-[#4F3BD4] text-white rounded-lg gap-2 btn-sm self-start">
          <IoIosArrowBack size={18} />
          Kembali
        </button>
      </div>

      {/* Penjelasan & Petunjuk */}
      <div className="bg-blue-50 border-l-4 border-[#6148FF] p-4 rounded-r-lg mb-8 shadow-sm">
        <div className="flex items-start gap-3">
          <MdInfo className="text-[#6148FF] mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-gray-800">Informasi Jadwal</h3>
            <p className="text-sm text-gray-600">
              Berikut adalah jadwal ujian yang akan datang berdasarkan hari.
              Hari ini adalah{" "}
              <span className="font-semibold text-[#6148FF]">
                {listDays[today]}
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Kontainer dengan scroll horizontal yang ditingkatkan */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="flex w-full overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-[#6148FF] scrollbar-track-gray-100">
          {ujianByDay.map((day) => (
            <div
              className="w-[300px] flex-shrink-0 animate-fadeIn hover-lift"
              key={day.name}>
              <div
                className={`text-lg font-bold flex justify-center w-full py-3 rounded-xl mb-4 transition-all ${
                  day.name === listDays[today]
                    ? "bg-[#6148FF] text-white shadow-md"
                    : "border-2 border-[#6148FF] text-[#6148FF] hover:bg-[#6148FF10]"
                }`}>
                {day.name}
              </div>
              {day.exams.length > 0 ? (
                <div className="space-y-3">
                  {day.exams.map((exam) => (
                    <div
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                      key={exam.id}>
                      <div className="h-2 bg-gradient-to-r from-[#6148FF] to-[#4F3BD4]" />
                      <div className="p-4 w-full gap-3 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800">
                            {exam.title}
                          </h3>
                          <span
                            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                              exam.type === "UTS"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                            {exam.type}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MdClass className="text-gray-500" size={16} />
                            <span className="text-gray-700">
                              {exam?.class?.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MdPerson className="text-gray-500" size={16} />
                            <span className="text-gray-700">
                              {exam?.class?.user?.nama}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MdDateRange className="text-gray-500" size={16} />
                            <span className="text-gray-700">
                              {formatDateTime(exam.dateTime)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MdAccessTime className="text-gray-500" size={16} />
                            <span className="text-gray-700">{`${exam.startTime} WIB - ${exam.endTime} WIB`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-200">
                  <p className="text-gray-500">Tidak ada ujian</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Content>
  );
};

export default JadwalSiswaView;
