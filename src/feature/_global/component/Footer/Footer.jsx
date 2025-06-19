import React from "react";
import { useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Cek apakah path-nya adalah /siswa
  const isSiswaPage = location.pathname === "/siswa";

  if (isSiswaPage) {
    return null; // Sembunyikan footer hanya di halaman /siswa
  }

  return (
    <footer className="bg-gradient-to-r from-[#4F3BD4] to-[#6148FF] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo_smk_maarif.png"
                alt="logo"
                className="w-16 h-16"
              />
              <div>
                <h3 className="font-bold text-xl">SMK MAARIF NU</h3>
                <p className="text-xs text-gray-200">Margasari</p>
              </div>
            </div>
            <p className="text-sm text-gray-200 mt-2">
              Platform pembelajaran digital untuk memudahkan proses belajar
              mengajar di SMK MAARIF NU Margasari
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white pb-2">
              Kontak
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MdLocationOn className="text-gray-200" size={18} />
                <p className="text-sm">
                  JL. Raya Selatan Margasari, Desa Margasari, Kabupaten Tegal,
                  52463
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className="text-gray-200" size={18} />
                <p className="text-sm">(0283) 3447350</p>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="text-gray-200" size={18} />
                <p className="text-sm">smkmaarifnumargasari@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white pb-2">
              Tautan
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-200 hover:text-white hover:underline transition">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-200 hover:text-white hover:underline transition">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-200 hover:text-white hover:underline transition">
                  Program Keahlian
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-200 hover:text-white hover:underline transition">
                  Berita
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-200 hover:text-white hover:underline transition">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white pb-2">
              Media Sosial
            </h3>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition">
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition">
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition">
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition">
                <FaYoutube size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-200">
              Ikuti kami untuk mendapatkan informasi terbaru tentang kegiatan
              sekolah
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white border-opacity-20">
        <div className="container mx-auto py-4 px-4 md:px-8 text-center text-sm text-gray-300">
          © {currentYear} SMK MAARIF NU Margasari. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
