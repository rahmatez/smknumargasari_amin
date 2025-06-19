import React from 'react';
import { useSearchParams } from 'react-router-dom';

const TabContentSiswa = ({
    data,
    loading
}) => {
   
    const [searchParams] = useSearchParams()

    const search = searchParams.get('search') || ''
    const filteredData = data?.filter((item) => item.user.nama.toLowerCase().includes(search?.toLowerCase())) || []

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg" />
            </div>
        )
    }

    return (
        <div className="overflow-x-auto bg-white mt-4 rounded-lg">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Profile</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Telephone</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(({ user }, index) => (

                        <tr key={index}>
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
                                </div>
                            </td>
                            <td>
                                {user.nama}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.telephone}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TabContentSiswa