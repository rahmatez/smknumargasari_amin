// import axios from 'axios';
// import React, { Fragment, useState } from 'react'
// import { FaPlus } from 'react-icons/fa';
// import { useToast } from '../../../_global/component/Toast/ToastProvider';
// import useFetch from '../../../_global/hooks/useFetch';

// const DialogTambahKelas = ({
//     refetch,
//     data
// }) => {
//     const [open, setOpen] = useState(false);
//     const { addToast } = useToast()

//     const [state, setState] = useState({
//         title: "",
//         description: "",
//     });

//     const [jadwal, setJadwal] = useState({
//         dayId: 1,
//         startTime: "",
//         endTime: "",
//     });

//     const [guru, setGuru] = useState(0);

//     const disabled = !state.title || !state.description || !guru || !jadwal.dayId || !jadwal.startTime || !jadwal.endTime

//     const handleSubmit = () => {
//         axios.post(import.meta.env.VITE_BACKEND + `/admin/kelas`, state)
//             .then((res) => {
//                 const id = res?.data?.data?.id
//                 axios.patch(import.meta.env.VITE_BACKEND + `/admin/kelas/${id}/guru`, { guruId: guru }).then(() => {
//                     setState({ title: "", description: "" })
//                     addToast('Kelas berhasil dibuat', 'success')
//                 }).catch((err) => {
//                     console.log(err)
//                 })

//                 axios.post(import.meta.env.VITE_BACKEND + `/admin/kelas/${id}/jadwal`, jadwal).then(() => {
//                     setOpen(false)
//                     setJadwal({ dayId: 1, startTime: "", endTime: "" })
//                     refetch()
//                     addToast('Kelas berhasil dijadwalkan', 'success')
//                 }).catch((err) => {
//                     console.log(err)
//                 })
//             })
//             .catch((err) => {
//                 console.log(err);
//                 addToast('Kelas gagal dibuat', 'error')
//             })
//     }

//     const { data: listGuru } = useFetch(import.meta.env.VITE_BACKEND + '/admin/guru')
//     const { data: listHari } = useFetch(import.meta.env.VITE_BACKEND + '/hari')


//     return (
//         <Fragment>
//             <button
//                 onClick={() => setOpen(true)}
//                 className="btn btn-primary text-white "
//             >
//                 <FaPlus />
//                 Tambah Kelas Baru
//             </button>

//             <dialog open={open} className="modal " onClose={() => setOpen(false)}>
//                 <div className="modal-box ">

//                     <form method="dialog">
//                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                     </form>
//                     <h3 className="font-bold text-lg text-center text-primary">
//                         Tambah Kelas Baru
//                     </h3>
//                     <div className='flex gap-2 flex-col'>

//                         <label className="form-control w-full" >
//                             <div className="label">
//                                 <span className="label-text font-bold">Nama Kelas</span>
//                             </div>
//                             <input
//                                 type="text"
//                                 onChange={(e) => setState({ ...state, title: e.target.value })}
//                                 placeholder="Nama Kelas"
//                                 className="input input-md input-bordered w-full "
//                             />
//                         </label>

//                         <label className="form-control w-full" >
//                             <div className="label">
//                                 <span className="label-text font-bold">Nama Guru</span>
//                             </div>
//                             <select
//                                 className="select select-bordered w-full "
//                                 value={state.mapel}
//                                 onChange={(e) => setGuru(Number(e.target.value))}
//                             >
//                                 <option disabled selected value="">
//                                     Pilih Nama Guru
//                                 </option>
//                                 {listGuru?.map((item) => (
//                                     <option key={item.id} value={item.id}>
//                                         {item.nama} - {item.email}
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>

//                         <label className="form-control w-full" >
//                             <div className="label">
//                                 <span className="label-text font-bold">Hari</span>
//                             </div>
//                             <select
//                                 className="select select-bordered w-full "
//                                 value={jadwal.dayId}
//                                 onChange={(e) => setJadwal(prev => ({ ...prev, dayId: Number(e.target.value) }))}
//                             >
//                                 <option disabled selected value="">
//                                     Pilih Hari
//                                 </option>
//                                 {listHari?.map((item) => (
//                                     <option key={item.id} value={item.id}>
//                                         {item.title}
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>

//                         <label className="form-control w-full" >
//                             <div className="label">
//                                 <span className="label-text font-bold">Jam</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <input
//                                     type="time"
//                                     onChange={(e) => setJadwal(prev => ({ ...prev, startTime: e.target.value }))}
//                                     placeholder="Mulai"
//                                     className="input input-md input-bordered w-full "
//                                 />
//                                 -
//                                 <input
//                                     type="time"
//                                     onChange={(e) => setJadwal(prev => ({ ...prev, endTime: e.target.value }))}
//                                     placeholder="Selesai"
//                                     className="input input-md input-bordered w-full "
//                                 />
//                             </div>
//                         </label>

//                         <label className="form-control w-full" >
//                             <div className="label">
//                                 <span className="label-text font-bold">Deskripsi</span>
//                             </div>
//                             <textarea
//                                 onChange={(e) => setState({ ...state, description: e.target.value })}
//                                 placeholder="Deskripsi"
//                                 className="textarea textarea-bordered textarea-md w-full " />
//                         </label>

//                         <div className="modal-action">
//                             <button
//                                 onClick={() => {
//                                     setOpen(false)
//                                 }}
//                                 className="btn btn-neutral w-1/2 text-white">
//                                 Kembali
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={disabled}
//                                 className="btn btn-contained btn-primary w-1/2 text-white">
//                                 Simpan
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </dialog>
//         </Fragment >
//     )
// }

// export default DialogTambahKelas
import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useToast } from '../../../_global/component/Toast/ToastProvider';
import useFetch from '../../../_global/hooks/useFetch';

const DialogTambahKelas = ({
    refetch,
    data
}) => {
    const [open, setOpen] = useState(false);
    const { addToast } = useToast()

    const [state, setState] = useState({
        title: "",
        description: "",
    });

    const [jadwal, setJadwal] = useState({
        dayId: 1,
        startTime: "",
        endTime: "",
    });

    const [guru, setGuru] = useState(0);




    // Cek validasi waktu
    const hasInvalidTime = () => {
        if (!jadwal.startTime || !jadwal.endTime) return false;
        const timeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };
        return timeToMinutes(jadwal.startTime) >= timeToMinutes(jadwal.endTime);
    };


    // Fungsi untuk mengecek konflik jadwal
    const checkScheduleConflict = (guruId, dayId, startTime, endTime) => {
        if (!data || !Array.isArray(data)) return false;

        // Konversi waktu ke format yang bisa dibandingkan (dalam menit)
        const timeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const newStartMinutes = timeToMinutes(startTime);
        const newEndMinutes = timeToMinutes(endTime);

        // Cek setiap kelas yang ada
        for (const kelas of data) {
            // Skip jika bukan guru yang sama
            if (kelas.userId !== guruId) continue;

            // Cek setiap jadwal kelas
            for (const schedule of kelas.scheduleClasses) {
                // Skip jika bukan hari yang sama
                if (schedule.day && schedule.day.title) {
                    // Mapping dayId ke nama hari (sesuaikan dengan struktur data Anda)
                    const dayMapping = {
                        1: "Senin",
                        2: "Selasa",
                        3: "Rabu",
                        4: "Kamis",
                        5: "Jumat",
                        6: "Sabtu",
                        7: "Minggu"
                    };

                    if (schedule.day.title !== dayMapping[dayId]) continue;
                }

                const existingStartMinutes = timeToMinutes(schedule.startTime);
                const existingEndMinutes = timeToMinutes(schedule.endTime);

                // Cek apakah ada overlap waktu
                const hasOverlap = (
                    (newStartMinutes >= existingStartMinutes && newStartMinutes < existingEndMinutes) ||
                    (newEndMinutes > existingStartMinutes && newEndMinutes <= existingEndMinutes) ||
                    (newStartMinutes <= existingStartMinutes && newEndMinutes >= existingEndMinutes)
                );

                if (hasOverlap) {
                    return {
                        conflict: true,
                        conflictClass: kelas.title,
                        conflictTime: `${schedule.startTime} - ${schedule.endTime}`,
                        conflictDay: schedule.day.title
                    };
                }
            }
        }

        return { conflict: false };
    };

    // Cek konflik jadwal untuk disable button
    const hasScheduleConflict = () => {
        if (!guru || !jadwal.dayId || !jadwal.startTime || !jadwal.endTime) return false;
        return checkScheduleConflict(guru, jadwal.dayId, jadwal.startTime, jadwal.endTime).conflict;
    };

    const disabled = !state.title || !state.description || !guru || !jadwal.dayId || !jadwal.startTime || !jadwal.endTime || hasScheduleConflict() || hasInvalidTime()

    const handleSubmit = () => {
        // Validasi konflik jadwal sebelum submit
        const conflictCheck = checkScheduleConflict(guru, jadwal.dayId, jadwal.startTime, jadwal.endTime);

        if (conflictCheck.conflict) {
            addToast(
                `Jadwal bentrok! Guru sudah mengajar kelas "${conflictCheck.conflictClass}" pada hari ${conflictCheck.conflictDay} jam ${conflictCheck.conflictTime}`,
                'error'
            );
            return;
        }

        // Validasi waktu mulai harus lebih kecil dari waktu selesai
        const timeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const startMinutes = timeToMinutes(jadwal.startTime);
        const endMinutes = timeToMinutes(jadwal.endTime);

        if (startMinutes >= endMinutes) {
            addToast('Waktu mulai harus lebih awal dari waktu selesai', 'error');
            return;
        }

        // Lanjutkan dengan proses submit jika tidak ada konflik
        axios.post(import.meta.env.VITE_BACKEND + `/admin/kelas`, state)
            .then((res) => {
                const id = res?.data?.data?.id
                axios.patch(import.meta.env.VITE_BACKEND + `/admin/kelas/${id}/guru`, { guruId: guru }).then(() => {
                    setState({ title: "", description: "" })
                    addToast('Kelas berhasil dibuat', 'success')
                }).catch((err) => {
                    console.log(err)
                })

                axios.post(import.meta.env.VITE_BACKEND + `/admin/kelas/${id}/jadwal`, jadwal).then(() => {
                    setOpen(false)
                    setJadwal({ dayId: 1, startTime: "", endTime: "" })
                    setGuru(0)
                    refetch()
                    addToast('Kelas berhasil dijadwalkan', 'success')
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err);
                addToast('Kelas gagal dibuat', 'error')
            })
    }

    const { data: listGuru } = useFetch(import.meta.env.VITE_BACKEND + '/admin/guru')
    const { data: listHari } = useFetch(import.meta.env.VITE_BACKEND + '/hari')


    // Fungsi untuk menampilkan peringatan jika ada konflik saat user mengisi form
    const getScheduleWarning = () => {
        if (!guru || !jadwal.dayId || !jadwal.startTime || !jadwal.endTime) return null;

        const conflictCheck = checkScheduleConflict(guru, jadwal.dayId, jadwal.startTime, jadwal.endTime);

        if (conflictCheck.conflict) {
            return (
                <div className="alert alert-warning mt-2">
                    <span>⚠️ Peringatan: Guru sudah mengajar kelas "{conflictCheck.conflictClass}" pada hari {conflictCheck.conflictDay} jam {conflictCheck.conflictTime}</span>
                </div>
            );
        }
        return null;
    };

    return (
        <Fragment>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-primary text-white "
            >
                <FaPlus />
                Tambah Kelas Baru
            </button>

            <dialog open={open} className="modal " onClose={() => setOpen(false)}>
                <div className="modal-box ">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-primary">
                        Tambah Kelas Baru
                    </h3>
                    <div className='flex gap-2 flex-col'>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Nama Kelas</span>
                            </div>
                            <input
                                type="text"
                                onChange={(e) => setState({ ...state, title: e.target.value })}
                                placeholder="Nama Kelas"
                                className="input input-md input-bordered w-full "
                            />
                        </label>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Nama Guru</span>
                            </div>
                            <select
                                className="select select-bordered w-full "
                                value={guru}
                                onChange={(e) => setGuru(Number(e.target.value))}
                            >
                                <option disabled value={0}>
                                    Pilih Nama Guru
                                </option>
                                {listGuru?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nama} - {item.email}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Hari</span>
                            </div>
                            <select
                                className="select select-bordered w-full "
                                value={jadwal.dayId}
                                onChange={(e) => setJadwal(prev => ({ ...prev, dayId: Number(e.target.value) }))}
                            >
                                <option disabled value="">
                                    Pilih Hari
                                </option>
                                {listHari?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Jam</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="time"
                                    value={jadwal.startTime}
                                    onChange={(e) => setJadwal(prev => ({ ...prev, startTime: e.target.value }))}
                                    placeholder="Mulai"
                                    className="input input-md input-bordered w-full "
                                />
                                -
                                <input
                                    type="time"
                                    value={jadwal.endTime}
                                    onChange={(e) => setJadwal(prev => ({ ...prev, endTime: e.target.value }))}
                                    placeholder="Selesai"
                                    className="input input-md input-bordered w-full "
                                />
                            </div>
                        </label>

                        {/* Tampilkan peringatan konflik jadwal */}
                        {getScheduleWarning()}

                        <label className="form-control w-full" >
                            <div className="label">
                                <span className="label-text font-bold">Deskripsi</span>
                            </div>
                            <textarea
                                value={state.description}
                                onChange={(e) => setState({ ...state, description: e.target.value })}
                                placeholder="Deskripsi"
                                className="textarea textarea-bordered textarea-md w-full " />
                        </label>

                        <div className="modal-action">
                            <button
                                onClick={() => {
                                    setOpen(false)
                                    setState({ title: "", description: "" })
                                    setJadwal({ dayId: 1, startTime: "", endTime: "" })
                                    setGuru(0)
                                }}
                                className="btn btn-neutral w-1/2 text-white">
                                Kembali
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={disabled}
                                className="btn btn-contained btn-primary w-1/2 text-white">
                                Simpan
                            </button>
                        </div>
                    </div>

                </div>
            </dialog>
        </Fragment >
    )
}

export default DialogTambahKelas