import { useNavigate } from "react-router-dom";

const Class = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements[0].value;

    navigate(`/class?name=${searchQuery}`);
  };
  return (
    <div className="bg-[#EBF3FC] min-h-screen">
      <div className="flex flex-col justify-center items-center w-full p-2 px-3 lg:px-0">
        <div className="flex flex-grow justify-between items-center mt-[30px] w-full max-w-[1000px]">
          <h1 className="text-base lg:text-[24px] font-bold">Mata Pelajaran</h1>
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex flex-row"
          >
            <input
              type="search"
              placeholder="Cari Kelas"
              className="w-full outline-none focus:outline-none px-4 py-[6px] border-2 rounded-2xl border-darkblue"
            />
            <button
              type="submit"
              className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-darkblue p-1"
            >
              <img src="/icon/search.svg" alt="search icon" />
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center space-x-2">
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-96 p-3 mt-4 py-2 w-[100%]">
          {/* Header */}
          <div className="bg-green-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Rabu, 16 Oktober</h2>
            <p className="text-sm">08:00–10:00</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">IPA</h3>
            <p className="text-gray-700 mb-1">
              Guru: <span className="font-semibold">Anwar Fuadi, S.Pd</span>
            </p>
            <p className="text-gray-700 mb-4">
              Jumlah Siswa: <span className="font-semibold">36</span>
            </p>
            <button className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded">
              Lihat Kelas
            </button>
          </div>
        </div>
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-96 p-3 mt-4 py-2 w-[100%]">
          {/* Header */}
          <div className="bg-green-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Rabu, 16 Oktober</h2>
            <p className="text-sm">08:00–10:00</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">IPA</h3>
            <p className="text-gray-700 mb-1">
              Guru: <span className="font-semibold">Anwar Fuadi, S.Pd</span>
            </p>
            <p className="text-gray-700 mb-4">
              Jumlah Siswa: <span className="font-semibold">36</span>
            </p>
            <button className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded">
              Lihat Kelas
            </button>
          </div>
        </div>
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-96 p-3 mt-4 py-2 w-[100%]">
          {/* Header */}
          <div className="bg-green-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Rabu, 16 Oktober</h2>
            <p className="text-sm">08:00–10:00</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">IPA</h3>
            <p className="text-gray-700 mb-1">
              Guru: <span className="font-semibold">Anwar Fuadi, S.Pd</span>
            </p>
            <p className="text-gray-700 mb-4">
              Jumlah Siswa: <span className="font-semibold">36</span>
            </p>
            <button className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded">
              Lihat Kelas
            </button>
          </div>
        </div>
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-96 p-3 mt-4 py-2 w-[100%]">
          {/* Header */}
          <div className="bg-orange-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Rabu, 16 Oktober</h2>
            <p className="text-sm">08:00–10:00</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">IPA</h3>
            <p className="text-gray-700 mb-1">
              Guru: <span className="font-semibold">Anwar Fuadi, S.Pd</span>
            </p>
            <p className="text-gray-700 mb-4">
              Jumlah Siswa: <span className="font-semibold">36</span>
            </p>
            <button className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded">
              Lihat Kelas
            </button>
          </div>
        </div>
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-96 p-3 mt-4 py-2 w-[100%]">
          {/* Header */}
          <div className="bg-orange-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Rabu, 16 Oktober</h2>
            <p className="text-sm">08:00–10:00</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">IPA</h3>
            <p className="text-gray-700 mb-1">
              Guru: <span className="font-semibold">Anwar Fuadi, S.Pd</span>
            </p>
            <p className="text-gray-700 mb-4">
              Jumlah Siswa: <span className="font-semibold">36</span>
            </p>
            <button className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded">
              Lihat Kelas
            </button>
          </div>
        </div>
        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow-md w-96 p-3 mt-4 py-2 w-[100%]">
          {/* Header */}
          <div className="bg-orange-500 text-white text-center py-4">
            <h2 className="text-lg font-bold">Rabu, 16 Oktober</h2>
            <p className="text-sm">08:00–10:00</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">IPA</h3>
            <p className="text-gray-700 mb-1">
              Guru: <span className="font-semibold">Anwar Fuadi, S.Pd</span>
            </p>
            <p className="text-gray-700 mb-4">
              Jumlah Siswa: <span className="font-semibold">36</span>
            </p>
            <button className="w-full text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 rounded">
              Lihat Kelas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Class;
