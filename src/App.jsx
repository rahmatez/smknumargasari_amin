import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./feature/_global/layout/Navbar";
import DetailGuruAdminView from "./feature/admin/view/DetailGuruAdminView";
import ListGuruAdminView from "./feature/admin/view/ListGuruAdminView";
import ListKelasAdminView from "./feature/admin/view/ListKelasView";
import ListMataPelajaranAdminView from "./feature/admin/view/ListMataPelajaranView";
import ListSiswaAdminView from "./feature/admin/view/ListSiswaAdminView";
import MainAdminView from "./feature/admin/view/MainAdminView";
import DetailKelasGuruView from "./feature/guru/view/DetailKelasGuru";
import MainGuruView from "./feature/guru/view/MainGuruView";
import TugasKelasGuruView from "./feature/guru/view/TugasKelasGuruView";
import Class from "./pages/Course/Class";
// import Home from "./feature/siswa/view/BerandaSiswaView";
import LoginView from "./feature/auth/view/LoginView";
import RegisterView from "./feature/auth/view/RegisterView";
import JadwalSiswaView from "./feature/siswa/view/JadwalSiswaView";
import BerandaSiswaView from "./feature/siswa/view/BerandaSiswaView";
import { Fragment } from "react";
import KelasSiswaView from "./feature/siswa/view/KelasSiswaView";
import DetailKelasSiswaView from "./feature/siswa/view/DetailKelasSiswaView";
import DetailTugasSiswaView from "./feature/siswa/view/DetailTugasSiswa";
import AdminLayoutSidebar from "./feature/admin/layout/AdminLayoutSidebar";
// import { PDFViewer } from "@react-pdf/renderer";
// import PDFDocument from "./feature/_global/component/Template/PDFDocument";
// import { dummyData } from "./feature/guru/constant/constant";
import DetailKelasAdminView from "./feature/admin/view/DetailKelasAdminView";
import ListKelasAdminDetailView from "./feature/admin/view/ListKelasDetailView";
import Footer from "./feature/_global/component/Footer/Footer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginView />
    },
    // {
    //   path: "/register",
    //   element: <RegisterView />
    // },
    {
      path: "/siswa",
      element:
        <Fragment>
          <Navbar />
          <Outlet />
          <Footer/>
        </Fragment>
      ,
      children: [
        {
          index: true,
          element: <BerandaSiswaView />,
        },
        {
          path: "jadwal",
          element: <JadwalSiswaView />,
        },
        {
          path: "kelas",
          element: <KelasSiswaView />,
        },
        {
          path: "kelas/:id",
          element: <DetailKelasSiswaView />,
        },
        {
          path: "kelas/:id/tugas/:id_tugas",
          element: <DetailTugasSiswaView />,
        },

      ]
    },
    {
      path: "/admin",
      element: (
        <AdminLayoutSidebar>
          <Outlet />
        </AdminLayoutSidebar>
      ),
      children: [
        {
          index: true,
          element: <MainAdminView />,
        },
        {
          path: "siswa",
          element: <ListSiswaAdminView />,
        },
        {
          path: "mata-pelajaran",
          element: <ListMataPelajaranAdminView />,
        },
        {
          path: "kelas",
          element: <ListKelasAdminView />,
        },
        {
          path: "data-kelas",
          element: <ListKelasAdminDetailView />,
        },
        {
          path: "kelas/:id",
          element: <DetailKelasAdminView />,
        },
        {
          path: "guru",
          element: <ListGuruAdminView />,
        },
        {
          path: "guru/:id",
          element: <DetailGuruAdminView />,
        },
      ],
    },
    {
      path: "/guru",
      element:
        <Fragment>
          <Navbar />
          <Outlet />
          <Footer/>
        </Fragment>
      ,
      children: [
        {
          index: true,
          element: <MainGuruView />
        },
        {
          path: "kelas/:id",
          element: <DetailKelasGuruView />,
        },
        {
          path: "kelas/:id/tugas/:id_tugas",
          element: <TugasKelasGuruView />,
        },

      ],
    },
    // {
    //   path: "/guru/kelas/:id/tugas/:id_tugas/raport",
    //   element: (
    //     <PDFViewer style={{ width: "100%", height: "100vh" }}>
    //       <PDFDocument data={dummyData} />
    //     </PDFViewer>
    //   ),
    // },
    {
      path: "/class",
      element: (
        <>
          <Navbar />
          <Class />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
