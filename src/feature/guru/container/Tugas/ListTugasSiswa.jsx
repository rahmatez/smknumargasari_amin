import { PDFDownloadLink } from '@react-pdf/renderer'
import React, { Fragment, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useParams } from 'react-router-dom'
import PDFDocument from '../../../_global/component/Template/PDFDocument'
import { checkSubmissionStatus } from '../../../_global/helper/formatter'
import useFetch from '../../../_global/hooks/useFetch'
import useProfile from '../../../_global/hooks/useProfile'
import TableNotSubmitted from '../../component/Table/TableNotSubmitted'
import TableSubmitted from '../../component/Table/TableSubmitted'

const ListTugasSiswa = ({
    deadline
}) => {
    const { id, id_tugas } = useParams()

    const { data, loading, refetch } = useFetch(import.meta.env.VITE_BACKEND + '/guru/kelas/' + id + '/tugas/' + id_tugas + '/siswa')

    const [state, setState] = useState({

        series: [9, 10],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Mengumpulkan', 'Belum Mengumpulkan'],
            colors: ['#22C55E', '#FF5630'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    });


    const formatDate = (dateString) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const date = new Date(dateString);

        // Validasi apakah date valid
        if (isNaN(date)) {
            console.warn(`Invalid date: ${dateString}`);
            return null; // Abaikan jika tanggal tidak valid
        }

        return `${date.getDate()} ${months[date.getMonth()]}`;
    };

    const processData = (data) => {
        const grouped = data.reduce((acc, dateString) => {
            const formattedDate = formatDate(dateString);
            if (formattedDate) {
                // Hanya tambahkan jika tanggal valid
                acc[formattedDate] = (acc[formattedDate] || 0) + 1; // Hitung jumlah item per tanggal
            }
            return acc;
        }, {});

        const labels = Object.keys(grouped); // Label unik (tanggal)
        const seriesData = Object.values(grouped); // Jumlah item per tanggal

        return { labels, seriesData };
    };

    const { labels, seriesData } = processData(data?.submited.map((item) => item.createdAt) || [])


    const [state2, setState2] = React.useState({
        series: [{
            name: "Waktu pengumpulan tugas",
            data: []
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },

            title: {
                text: 'Waktu pengumpulan tugas',
                align: 'center'
            },
            subtitle: {
                text: 'Grafik Waktu Pengumpulan Tugas',
                align: 'center'
            },
            labels: [],
            xaxis: {
                type: 'category',
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
        },


    });

    useEffect(() => {
        setState2(prev => ({
            ...prev,
            series: [{
                name: "Waktu pengumpulan tugas",
                data: seriesData
            }],
            options: {
                ...prev.options,
                xaxis: {
                    categories: labels
                }
            }
        }))
    }, [data])

    useEffect(() => {
        setState({
            ...state,
            series: [data?.submited?.length, data?.notSubmited?.length]
        })
    }, [data])
   const mengumpulkan = data?.submited?.map(item => ({
        nama: item.siswa.nama,
        nilai: item.nilai ?? '-',
        status: checkSubmissionStatus(item.createdAt, deadline).status
    }))

   const belumMengumpulkan = data?.notSubmited?.map(item => ({
        nama: item.user.nama,
        nilai: '-',
        status: '-'
    }))
const profile = useProfile()
    const raport = [...(mengumpulkan || []), ...(belumMengumpulkan || [])]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <Fragment>
            <div className='flex gap-2 bg-white items-center rounded-2xl p-4'>
                <div >
                    <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
                </div>
                <div className='w-full'>
                    <ReactApexChart options={state2.options} series={state2.series} type="area" height={350} />
                </div>
            </div>
            <div className='bg-white rounded-2xl p-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold mb-4'>Daftar Siswa yang sudah mengerjakan</h2>
                    {/* <button className="btn btn-primary btn-sm text-white "
                        onClick={() => PDFDownloadLink({
                            document: <PDFDocument data={data?.submited} />,
                            fileName: 'raport.pdf',
                        })}
                    >Download Raport</button> */}
                    <DownloadButton raport={raport} title={data?.title} />
                </div>
                <TableSubmitted data={data?.submited} deadline={deadline} refetch={refetch} />
            </div>

            <div className='bg-white rounded-2xl p-4'>
                <h2 className='text-xl font-bold mb-4'>Daftar Siswa yang belum mengerjakan</h2>
                <TableNotSubmitted data={data?.notSubmited} />
            </div>
        </Fragment>
    )
}

function DownloadButton({ raport, title }) {
    return (
        <PDFDownloadLink
            document={<PDFDocument data={raport} title={title} />}
            fileName={`Raport-${title} - ${new Date().toLocaleDateString()}.pdf`}
        >
            {({ loading }) =>
                loading ? (
                    'Loading document...'
                ) : (
                    <button className="btn btn-primary btn-sm text-white">
                        Download Raport
                    </button>
                )
            }
        </PDFDownloadLink>
    );
}


export default ListTugasSiswa