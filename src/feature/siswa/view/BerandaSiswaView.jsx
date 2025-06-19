import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ListMapelContainer from "../container/Mapel/ListMapelContainer";
import ListTugasContainer from "../container/Tugas/ListTugasContainer";
import {
  MdClass,
  MdDateRange,
  MdChevronRight,
  MdNotifications,
} from "react-icons/md";
import useProfile from "../../_global/hooks/useProfile";

const BerandaSiswaView = () => {
  const profile = useProfile();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Tugas Matematika telah diberi nilai",
      time: "1 jam lalu",
      isNew: true,
    },
    {
      id: 2,
      text: "Materi baru telah ditambahkan pada kelas Bahasa Indonesia",
      time: "3 jam lalu",
      isNew: true,
    },
    {
      id: 3,
      text: "Jadwal UTS sudah tersedia",
      time: "1 hari lalu",
      isNew: false,
    },
  ]);

  // Waktu saat ini untuk greeting
  const hours = new Date().getHours();
  let greeting;
  if (hours < 12) {
    greeting = "Pagi";
  } else if (hours < 15) {
    greeting = "Siang";
  } else if (hours < 19) {
    greeting = "Sore";
  } else {
    greeting = "Malam";
  }

  return (
    <Fragment>
      {/* Hero Section - Improved with better gradients and layout */}
      <div className="bg-gradient-to-br from-[#6148FF] to-[#4F3BD4] text-white py-8 md:py-16 px-4 md:px-8 rounded-b-3xl shadow-lg mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            {/* Greeting & Profile Section */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-slideUp">
              <h2 className="text-lg font-medium mb-2">Selamat {greeting},</h2>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {profile?.nama || "Siswa"}
              </h1>
              <p className="text-white text-opacity-80 mb-6">
                Siap untuk terus belajar? Ada beberapa tugas yang perlu
                diselesaikan.
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  to="/siswa/kelas"
                  className="btn-custom-secondary bg-white text-[#6148FF] rounded-lg px-4 py-2 font-semibold flex items-center gap-2 hover-scale">
                  <MdClass size={20} />
                  <span>Kelas Saya</span>
                </Link>
                <Link
                  to="/siswa/jadwal"
                  className="btn-custom-secondary bg-white/20 text-white border-white rounded-lg px-4 py-2 font-semibold flex items-center gap-2 hover-scale">
                  <MdDateRange size={20} />
                  <span>Jadwal</span>
                </Link>
              </div>
            </div>

            {/* Illustration/Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src="/people_dasboard.png"
                className="w-3/4 md:w-4/5 max-w-md rounded-lg shadow-xl hover-lift"
                alt="Learning Illustration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 pb-16">
        {/* Map Pelajaran Container dengan styling lebih baik */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Mata Pelajaran</h2>
            <Link
              to="/siswa/kelas"
              className="flex items-center gap-1 text-sm text-[#6148FF] hover:underline">
              Lihat semua <MdChevronRight />
            </Link>
          </div>
          <ListMapelContainer />
        </div>

        {/* List Tugas Container dengan styling lebih baik */}
        <div className="animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tugas Terbaru</h2>
            <Link
              to="/siswa/tugas"
              className="flex items-center gap-1 text-sm text-[#6148FF] hover:underline">
              Lihat semua <MdChevronRight />
            </Link>
          </div>
          <ListTugasContainer />
        </div>
      </div>
    </Fragment>
  );
};

export default BerandaSiswaView;
