import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useFetch from "../../_global/hooks/useFetch";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaLayerGroup,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle,
} from "react-icons/fa";

const StatCard = ({ title, value, icon, color, secondaryValue, trend }) => {
  // Random dummy data for trending comparison
  const trendPercentage = trend || Math.floor(Math.random() * 10) + 1;
  const isPositive = trend !== undefined ? trend > 0 : Math.random() > 0.5;

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border-b-4 border-${color} h-full`}>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value || 0}</h3>

            {secondaryValue && (
              <div
                className={`flex items-center mt-2 text-sm ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}>
                {isPositive ? (
                  <FaArrowUp className="mr-1" />
                ) : (
                  <FaArrowDown className="mr-1" />
                )}
                {/* <span>
                  {trendPercentage}% {isPositive ? "meningkat" : "menurun"}
                </span> */}
              </div>
            )}
          </div>
          <div className={`bg-${color} bg-opacity-10 p-3 rounded-lg`}>
            {React.cloneElement(icon, { className: `text-${color} text-2xl` })}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainAdminView = () => {
  const [chartOptions, setChartOptions] = useState({
    bar: {
      series: [
        {
          name: "Jumlah Guru",
          data: [],
          color: "#6148FF",
        },
        {
          name: "Jumlah Siswa",
          data: [],
          color: "#22C55E",
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
          fontFamily: "Poppins, sans-serif",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 8,
            borderRadiusApplication: "end",
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: "#6B7280",
              fontFamily: "Poppins, sans-serif",
            },
          },
        },
        yaxis: {
          title: {
            text: "Jumlah",
            style: {
              color: "#6B7280",
              fontFamily: "Poppins, sans-serif",
            },
          },
          labels: {
            style: {
              colors: "#6B7280",
              fontFamily: "Poppins, sans-serif",
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          theme: "light",
          y: {
            formatter: function (val) {
              return val + " orang";
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    pie: {
      series: [],
      options: {
        chart: {
          fontFamily: "Poppins, sans-serif",
          toolbar: {
            show: false,
          },
        },
        labels: ["Guru", "Siswa"],
        colors: ["#6148FF", "#22C55E"],
        legend: {
          position: "bottom",
          fontFamily: "Poppins, sans-serif",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        plotOptions: {
          pie: {
            donut: {
              size: "50%",
              labels: {
                show: true,
                total: {
                  show: true,
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  },
                },
              },
            },
          },
        },
        dataLabels: {
          formatter: function (val, opts) {
            return opts.w.globals.seriesTotals[opts.seriesIndex];
          },
        },
      },
    },
  });

  const { data, loading } = useFetch(
    import.meta.env.VITE_BACKEND + "/admin/dashboard"
  );

  useEffect(() => {
    if (data) {
      // Update bar chart data
      setChartOptions((prev) => ({
        ...prev,
        bar: {
          ...prev.bar,
          series: [
            {
              name: "Jumlah Guru",
              data: data?.mataPelajaran?.map(
                (item) => item?.mataPelajaranGuru?.length
              ) || [0],
              color: "#6148FF",
            },
            {
              name: "Jumlah Siswa",
              data: data?.mataPelajaran?.map((item) =>
                item?.mataPelajaranGuru?.reduce(
                  (total, item) => total + item?.user?._count?.classes,
                  0
                )
              ) || [0],
              color: "#22C55E",
            },
          ],
          options: {
            ...prev.bar.options,
            xaxis: {
              ...prev.bar.options.xaxis,
              categories: data?.mataPelajaran?.map((item) => item?.title),
            },
          },
        },
        pie: {
          ...prev.pie,
          series: [data?.totalGuru || 0, data?.totalSiswa || 0],
        },
      }));
    }
  }, [data]);

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-500">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Dashboard Statistik
        </h1>
        <p className="text-gray-500">{currentDate}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Mata Pelajaran"
          value={data?.totalMapel || 0}
          icon={<FaBookOpen />}
          color="primary"
          secondaryValue="8 mata pelajaran"
        />
        <StatCard
          title="Kelas"
          value={data?.totalKelas || 0}
          icon={<FaLayerGroup />}
          color="secondary"
          secondaryValue="2 kelas baru"
          trend={5}
        />
        <StatCard
          title="Guru"
          value={data?.totalGuru || 0}
          icon={<FaChalkboardTeacher />}
          color="success"
          secondaryValue="1 guru baru"
          trend={2}
        />
        <StatCard
          title="Siswa"
          value={data?.totalSiswa || 0}
          icon={<FaUserGraduate />}
          color="info"
          secondaryValue="10 siswa baru"
          trend={8}
        />
      </div>

      {/* Info Cards */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
        <div className="flex gap-3">
          <FaInfoCircle className="text-blue-500 text-lg mt-1" />
          <div>
            <p className="font-medium text-blue-800">Informasi Dashboard</p>
            <p className="text-blue-700 text-sm">
              Data yang ditampilkan adalah statistik terkini berdasarkan
              database sistem pada tanggal {new Date().toLocaleDateString()}.
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">
              Distribusi Guru dan Siswa per Mata Pelajaran
            </h2>
          </div>

          <div className="chart-container" style={{ minHeight: "350px" }}>
            {data?.mataPelajaran?.length > 0 ? (
              <Chart
                options={chartOptions.bar.options}
                series={chartOptions.bar.series}
                type="bar"
                height={350}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Tidak ada data untuk ditampilkan
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">
              Perbandingan Jumlah Guru dan Siswa
            </h2>
          </div>

          <div className="chart-container" style={{ minHeight: "350px" }}>
            <Chart
              options={chartOptions.pie.options}
              series={chartOptions.pie.series}
              type="donut"
              height={350}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktivitas
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengguna
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4 whitespace-nowrap">
                  Penambahan Siswa Baru
                </td>
                <td className="py-3 px-4 whitespace-nowrap">Admin</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Sukses
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 whitespace-nowrap">
                  Update Jadwal Pelajaran
                </td>
                <td className="py-3 px-4 whitespace-nowrap">Admin</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Diproses
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 whitespace-nowrap">
                  Penambahan Guru Baru
                </td>
                <td className="py-3 px-4 whitespace-nowrap">Admin</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Sukses
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainAdminView;
