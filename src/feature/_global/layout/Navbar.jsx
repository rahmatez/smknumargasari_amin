import {
  MdLogin,
  MdMenu,
  MdClose,
  MdDashboard,
  MdDateRange,
  MdClass,
} from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import { useToast } from "../component/Toast/ToastProvider";
import { useState, useEffect } from "react";

const Navbar = () => {
  const profile = useProfile();
  const pathname = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Deteksi scroll untuk memberikan efek pada navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    addToast("Berhasil keluar", "success");
  };

  const handleNavigateLogin = () => {
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname.includes(path)
      ? "text-[#6148FF] font-bold"
      : "text-gray-700 hover:text-[#6148FF]";
  };

  return (
    <div
      className={`navbar justify-between z-20 sticky top-0 transition-all duration-300 ${
        scrolled ? "py-2 bg-white shadow-md" : "py-4 bg-white"
      }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/" + pathname} className="flex items-center gap-3">
            <img src="/logo_smk_maarif.png" alt="logo" className="w-12 h-12" />
            <span className="hidden md:block text-[#6148FF] font-bold text-lg">
              SMK Maarif NU
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center gap-6">
          {profile && profile.role === "siswa" && (
            <>
              <Link
                to="/siswa"
                className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all ${isActive(
                  "/siswa$"
                )}`}>
                <MdDashboard size={18} />
                <span>Beranda</span>
              </Link>
              <Link
                to="/siswa/jadwal"
                className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all ${isActive(
                  "/siswa/jadwal"
                )}`}>
                <MdDateRange size={18} />
                <span>Jadwal</span>
              </Link>
              <Link
                to="/siswa/kelas"
                className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all ${isActive(
                  "/siswa/kelas"
                )}`}>
                <MdClass size={18} />
                <span>Kelas</span>
              </Link>
            </>
          )}

          {/* Guru & Admin menu dapat ditambahkan disini dengan kondisi serupa */}
        </div>

        {/* Profile/Login Button */}
        <div className="flex items-center">
          {profile ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring-2 ring-[#6148FF] ring-offset-2">
                <div className="w-10 rounded-full">
                  <img src="/default-profile.png" alt="Profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-4 shadow-lg menu dropdown-content bg-white rounded-xl w-64 border border-gray-100">
                <div className="flex gap-3 items-center mb-3 pb-3 border-b border-gray-100">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src="/default-profile.png" alt="Profile" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-md text-[#6148FF]">
                      {profile?.nama}
                    </p>
                    <div className="badge badge-primary badge-sm capitalize">
                      {profile?.role}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {profile?.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm text-white w-full rounded-lg hover:opacity-80">
                  Keluar
                </button>
              </ul>
            </div>
          ) : (
            <button
              onClick={handleNavigateLogin}
              className="btn bg-[#6148FF] hover:bg-[#4F3BD4] text-white rounded-lg gap-2 shadow-lg">
              <MdLogin size={20} />
              <span className="hidden md:inline">Masuk</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden ml-4 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && profile && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-30 p-4 border-t border-gray-100 animate-fadeIn">
          {profile.role === "siswa" && (
            <div className="flex flex-col">
              <Link
                to="/siswa"
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all ${isActive(
                  "/siswa$"
                )}`}
                onClick={() => setMobileMenuOpen(false)}>
                <MdDashboard size={20} />
                <span>Beranda</span>
              </Link>
              <Link
                to="/siswa/jadwal"
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all ${isActive(
                  "/siswa/jadwal"
                )}`}
                onClick={() => setMobileMenuOpen(false)}>
                <MdDateRange size={20} />
                <span>Jadwal</span>
              </Link>
              <Link
                to="/siswa/kelas"
                className={`flex items-center gap-2 py-3 px-4 rounded-lg transition-all ${isActive(
                  "/siswa/kelas"
                )}`}
                onClick={() => setMobileMenuOpen(false)}>
                <MdClass size={20} />
                <span>Kelas</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
