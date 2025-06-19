import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaChartPie,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaBell,
  FaSun,
  FaMoon,
  FaCog,
} from "react-icons/fa";
import { IoPeopleCircleOutline, IoSchoolOutline } from "react-icons/io5";
import { MdMenu, MdClose, MdOutlineClass, MdDashboard } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../_global/component/Toast/ToastProvider";
import useProfile from "../../_global/hooks/useProfile";

// Definisikan warna tema sidebar yang berbeda untuk pemilihan
const sidebarThemes = {
  purple: {
    gradient: "bg-gradient-to-br from-[#6148FF] via-[#5540E0] to-[#4F3BD4]",
    active: "bg-white/20",
    hoverBg: "hover:bg-[#ffffff15]",
    button: "bg-gradient-to-r from-[#FF5630] to-[#E04B2A]",
    text: "text-white",
    icon: "text-white",
    profileBg: "bg-[#ffffff18]",
    border: "border-[#ffffff33]",
  },
  blue: {
    gradient: "bg-gradient-to-br from-[#2563EB] via-[#2057D3] to-[#1E40AF]",
    active: "bg-white/20",
    hoverBg: "hover:bg-[#ffffff15]",
    button: "bg-gradient-to-r from-[#0EA5E9] to-[#0284C7]",
    text: "text-white",
    icon: "text-white",
    profileBg: "bg-[#ffffff18]",
    border: "border-[#ffffff33]",
  },
  teal: {
    gradient: "bg-gradient-to-br from-[#0D9488] via-[#0E8175] to-[#0F766E]",
    active: "bg-white/20",
    hoverBg: "hover:bg-[#ffffff15]",
    button: "bg-gradient-to-r from-[#059669] to-[#047857]",
    text: "text-white",
    icon: "text-white",
    profileBg: "bg-[#ffffff18]",
    border: "border-[#ffffff33]",
  },
};

// Pilih tema sidebar yang ingin digunakan
const currentTheme = sidebarThemes.blue; // Ubah ini menjadi 'purple', 'blue', or 'teal' sesuai keinginan

const AdminLayoutSidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useProfile();
  const { addToast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount] = useState(3); // Example notification count

  // Check screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setMobileMenuOpen(false);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="text-lg" />,
      path: "/admin",
      badge: null,
    },
    {
      key: "Mata Pelajaran",
      label: "Mata Pelajaran",
      icon: <FaBook className="text-lg" />,
      path: "/admin/mata-pelajaran",
      badge: null,
    },
    {
      key: "Siswa",
      label: "Siswa",
      icon: <IoPeopleCircleOutline className="text-lg" />,
      path: "/admin/siswa",
      badge: "10+", // Example badge
    },
    {
      key: "Guru",
      label: "Guru",
      icon: <IoSchoolOutline className="text-lg" />,
      path: "/admin/guru",
      badge: null,
    },
    {
      key: "Kelas",
      label: "Kelas",
      icon: <MdOutlineClass className="text-lg" />,
      path: "/admin/kelas",
      badge: "Baru",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    addToast("Berhasil keluar", "success");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const activeMenu = menuItems.find((item) => item.path === location.pathname);
  const pageTitle = activeMenu?.label || "Dashboard Admin";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } hidden lg:block fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          currentTheme.gradient
        } shadow-lg`}>
        <div
          className={`flex ${
            collapsed ? "justify-center" : "justify-between"
          } items-center p-4 border-b ${currentTheme.border}`}>
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center" : ""
            }`}>
            <img
              src="/logo_smk_maarif.png"
              alt="logo"
              className="w-12 h-12 animate-pulse-slow"
            />
            {!collapsed && (
              <span className={`${currentTheme.text} font-bold text-xl`}>
                Admin Panel
              </span>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className={`${currentTheme.text} ${currentTheme.hoverBg} rounded-full p-2 transition-colors`}>
              <FaChevronDown className="transform rotate-90" />
            </button>
          )}
        </div>

        <div className="py-4 h-[calc(100vh-64px)] flex flex-col justify-between overflow-y-auto scrollbar-thin">
          {/* Menu Items */}
          <ul className="space-y-2 px-3">
            {menuItems.map((menuItem, index) => {
              const isActive = menuItem.path === location.pathname;
              return (
                <li key={index} className="relative">
                  {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-white rounded-tr-md rounded-br-md"></div>
                  )}
                  <Link
                    to={menuItem.path}
                    className={`flex items-center ${
                      collapsed ? "justify-center" : ""
                    } py-3 px-3 ${
                      currentTheme.text
                    } rounded-lg transition-all duration-200 group
                        ${
                          isActive
                            ? `${currentTheme.active} backdrop-blur-lg shadow-lg font-medium`
                            : currentTheme.hoverBg
                        }`}>
                    <div
                      className={`${
                        collapsed ? "mx-auto" : "mr-3"
                      } transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}>
                      {React.cloneElement(menuItem.icon, {
                        className: `text-xl ${
                          isActive
                            ? currentTheme.text
                            : `${currentTheme.text}/80`
                        }`,
                      })}
                    </div>
                    {!collapsed && (
                      <span
                        className={`${
                          isActive
                            ? currentTheme.text
                            : `${currentTheme.text}/80`
                        }`}>
                        {menuItem.label}
                      </span>
                    )}
                    {!collapsed && menuItem.badge && (
                      <div className="ml-auto bg-white text-primary text-xs px-2 py-0.5 rounded-full">
                        {menuItem.badge}
                      </div>
                    )}
                    {collapsed && menuItem.badge && (
                      <div className="absolute top-1 right-1 bg-white text-primary text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        •
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bottom section with user profile */}
          <div className="px-2 pb-4 mt-4">
            {!collapsed ? (
              <div
                className={`${currentTheme.profileBg} rounded-lg p-3 mb-4 backdrop-blur-lg shadow-inner hover-lift cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2563EB] font-bold shadow-md">
                    {profile?.nama?.charAt(0) || "A"}
                  </div>
                  <div>
                    <p
                      className={`${currentTheme.text} text-sm font-medium truncate max-w-[150px]`}>
                      {profile?.nama || "Admin"}
                    </p>
                    <p className={`${currentTheme.text}/70 text-xs`}>
                      {profile?.email || "admin@maarif.com"}
                    </p>
                  </div>
                </div>
                <div
                  className={`mt-3 flex justify-between ${
                    currentTheme.text
                  }/70 pt-2 border-t ${currentTheme.border.replace(
                    "33",
                    "10"
                  )}`}>
                  <button
                    className={`p-1.5 ${currentTheme.hoverBg.replace(
                      "15",
                      "10"
                    )} rounded-full transition-colors`}>
                    <FaBell />
                  </button>
                  <button
                    className={`p-1.5 ${currentTheme.hoverBg.replace(
                      "15",
                      "10"
                    )} rounded-full transition-colors`}>
                    <FaCog />
                  </button>
                  <button
                    className={`p-1.5 ${currentTheme.hoverBg.replace(
                      "15",
                      "10"
                    )} rounded-full transition-colors`}>
                    <FaSun />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2563EB] font-bold shadow-md hover-lift">
                  {profile?.nama?.charAt(0) || "A"}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                collapsed ? "justify-center" : ""
              } py-3 px-4 ${
                currentTheme.button
              } hover:shadow-lg transition-all ${
                currentTheme.text
              } rounded-lg hover:-translate-y-0.5`}>
              <FaSignOutAlt className={`${collapsed ? "mx-auto" : "mr-3"}`} />
              {!collapsed && <span>Logout</span>}
            </button>

            {collapsed && (
              <button
                onClick={toggleSidebar}
                className={`w-full mt-4 flex justify-center py-3 ${currentTheme.text} ${currentTheme.hoverBg} rounded-lg transition-colors`}>
                <FaChevronDown className="transform -rotate-90" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden ${currentTheme.gradient}`}>
        <div className="flex justify-between items-center p-4 border-b border-[#ffffff33]">
          <div className="flex items-center gap-3">
            <img src="/logo_smk_maarif.png" alt="logo" className="w-10 h-10" />
            <span className={`${currentTheme.text} font-bold`}>
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`${currentTheme.text} ${currentTheme.hoverBg} rounded-full p-2`}>
            <MdClose />
          </button>
        </div>

        <div className="py-4 overflow-y-auto h-[calc(100vh-64px)] flex flex-col justify-between">
          <ul className="space-y-2 px-3">
            {menuItems.map((menuItem, index) => {
              const isActive = menuItem.path === location.pathname;
              return (
                <li key={index} className="relative">
                  {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-white rounded-tr-md rounded-br-md"></div>
                  )}
                  <Link
                    to={menuItem.path}
                    className={`flex items-center py-3 px-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-white/20 backdrop-blur-lg shadow-lg font-medium text-white"
                        : "text-white/80 hover:bg-[#ffffff15]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}>
                    <div className="mr-3">
                      {React.cloneElement(menuItem.icon, {
                        className: isActive ? "text-white" : "text-white/80",
                      })}
                    </div>
                    <span>{menuItem.label}</span>
                    {menuItem.badge && (
                      <div className="ml-auto bg-white text-primary text-xs px-2 py-0.5 rounded-full">
                        {menuItem.badge}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-2 pb-4">
            <div
              className={`${currentTheme.profileBg} rounded-lg p-3 mb-4 shadow-inner`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2563EB] font-bold">
                  {profile?.nama?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {profile?.nama || "Admin"}
                  </p>
                  <p className="text-gray-300 text-xs">
                    {profile?.email || "admin@maarif.com"}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-between text-white/70 pt-2 border-t border-white/10">
                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                  <FaBell />
                </button>
                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                  <FaCog />
                </button>
                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                  <FaSun />
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center py-3 px-4 bg-gradient-to-r from-[#FF5630] to-[#E04B2A] text-white rounded-lg">
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}>
        {/* Top header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="flex justify-between items-center py-4 px-6">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-gray-500 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(true)}>
                <MdMenu size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {pageTitle}
                  {activeMenu?.path === "/admin" && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </h1>
                <p className="text-sm text-gray-500">
                  Selamat datang, {profile?.nama || "Admin"}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification icon */}
              <div className="relative">
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                  <FaBell />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Breadcrumb navigation - optional */}
              <div className="hidden md:flex items-center text-sm text-gray-500">
                <span className="mx-2">Admin</span>
                <FaChevronRight className="text-gray-400 mx-1" size={10} />
                <span className="font-medium text-primary">{pageTitle}</span>
              </div>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                  <div className="w-9 h-9 rounded-full bg-[#6148FF] text-white flex items-center justify-center font-medium shadow-sm hover:shadow-md transition-all">
                    {profile?.nama?.charAt(0) || "A"}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border animate-fadeIn">
                    <div className="py-3 px-4 border-b">
                      <p className="text-sm font-medium">
                        {profile?.nama || "Admin"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {profile?.email || "admin@maarif.com"}
                      </p>
                    </div>
                    <div className="py-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaCog className="mr-2 text-gray-500" />
                        Pengaturan
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="bg-[#F5F8FC] min-h-[calc(100vh-76px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutSidebar;
