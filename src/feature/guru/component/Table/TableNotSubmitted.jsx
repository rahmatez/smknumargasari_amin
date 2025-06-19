import React from 'react'
import { dummySiswa } from '../../constant/constant'

import { BsCloudDownload } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { formatDateToWIB } from '../../../_global/helper/formatter';


const TableNotSubmitted = ({
    data
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                // src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                src='/default-profile.png'
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold"
                                        >
                                            {item.user.nama}
                                        </div>
                                        <div className="text-sm opacity-50">
                                            {item.user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableNotSubmitted