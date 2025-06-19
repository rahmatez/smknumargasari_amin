export function formatDateToTime(dateString) {
    const dateObject = new Date(dateString);
    const now = new Date();

    // // Periksa apakah tanggal berbeda hari dengan tanggal saat ini
    // if (
    //     dateObject.getFullYear() === now.getFullYear() &&
    //     dateObject.getMonth() === now.getMonth() &&
    //     dateObject.getDate() === now.getDate()
    // ) {
    //     // Jika tanggal sama, kembalikan format jam
    //     const hours = String(dateObject.getHours()).padStart(2, '0');
    //     const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    //     return `${hours}.${minutes}`;
    //     // return value 15:07
    // }
    // Jika tanggal berbeda, kembalikan format tanggal
    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString('id-ID', { month: 'long' });
    const day = dateObject.getDate();

    return `${day} ${month} ${year} ${dateObject.getHours()}:${dateObject.getMinutes()}`;
    // return value 11 November 2024
}
export function formatDateTime(dateString) {
    const dateObject = new Date(dateString);
    const now = new Date();

    // // Periksa apakah tanggal berbeda hari dengan tanggal saat ini
    // if (
    //     dateObject.getFullYear() === now.getFullYear() &&
    //     dateObject.getMonth() === now.getMonth() &&
    //     dateObject.getDate() === now.getDate()
    // ) {
    //     // Jika tanggal sama, kembalikan format jam
    //     const hours = String(dateObject.getHours()).padStart(2, '0');
    //     const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    //     return `${hours}.${minutes}`;
    //     // return value 15:07
    // }
    // Jika tanggal berbeda, kembalikan format tanggal
    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString('id-ID', { month: 'long' });
    const day = dateObject.getDate();

    return `${day} ${month} ${year}`;
    // return value 11 November 2024
}

export function checkDeadlineStatus(deadlineAt) {
    const deadline = new Date(deadlineAt);
    const now = new Date();

    // Set waktu hari ini ke awal hari (00:00:00)
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));

    if (deadline < startOfToday) {
        return {
            status: "Selesai",
            color: "text-red-800 bg-red-200"
        }; // Deadline sudah lewat
    }

    if (deadline >= startOfToday && deadline < new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)) {
        return {
            status: "Hari Ini",
            color: "text-yellow-800 bg-yellow-200"
        }; // Deadline jatuh pada hari ini
    }

    return {
        status: "Mendatang",
        color: "text-green-800 bg-green-200"
    }; // Deadline masih di masa depan
}

export function formatDateToWIB(isoDateString) {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Konversi string ISO ke objek Date
    const date = new Date(isoDateString);

    // Konversi waktu ke zona WIB (Asia/Jakarta)
    const options = { timeZone: "Asia/Jakarta" };
    const wibDate = new Date(date.toLocaleString("en-US", options));

    // Format bagian tanggal dan waktu
    const dayName = days[wibDate.getDay()];
    const day = wibDate.getDate();
    const monthName = months[wibDate.getMonth()];
    const year = wibDate.getFullYear();
    const hours = String(wibDate.getHours()).padStart(2, "0");
    const minutes = String(wibDate.getMinutes()).padStart(2, "0");

    // Gabungkan ke format yang diinginkan
    return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes} WIB`;
    // Output: Kamis, 28 November 2024 14:35 WIB
}


export function checkSubmissionStatus(createdAt, deadlineAt) {
    const createdDate = new Date(createdAt);
    const deadlineDate = new Date(deadlineAt);

    // Hanya gunakan tanggal tanpa waktu
    const createdDay = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
    const deadlineDay = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());

    if (createdDay < deadlineDay) {
        return {
            status: "Lebih Cepat",
            color: "bg-green-100 text-green-800",
        };
    } else if (createdDay.getTime() === deadlineDay.getTime()) {
        return {
            status: "Tepat Waktu",
            color: "bg-yellow-100 text-yellow-800",
        }
    } else {
        return {
            status: "Terlambat",
            color: "bg-red-100 text-red-800",
        }
    }
}