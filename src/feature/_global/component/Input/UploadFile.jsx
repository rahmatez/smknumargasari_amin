import React, { useRef, useState } from "react";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const UploadFile = ({
    supportFile,
    setFileRawList,
    fileRawList = [],
    maxSize = 15, // default maxSize 15MB
    limit = 1,
    resolution,
}) => {
    const [errorMessage, setErrorMessage] = useState([]);
    const inputRef = useRef(null);

    const maxSizeInBytes = maxSize * 1048576;

    const handleFileChange = (files) => {
        if (!files?.length) return;

        const remainingSlot = limit - fileRawList.length;
        const validFiles = Array.from(files).slice(0, remainingSlot);
        const newErrorMessage = [];

        validFiles.forEach((file) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (file.size > maxSizeInBytes) {
                newErrorMessage.push(`File ${file.name} melebihi batas ukuran dokumen ${maxSize}MB.`);
            } else if (!supportFile.includes(fileExtension)) {
                newErrorMessage.push(`File ${file.name} tidak dizinkan.`);
            } else {
                setFileRawList((prev) => [...prev, file]);
            }
        });

        setErrorMessage(newErrorMessage);
    };

    const handleDeleteFile = (index) => {
        setFileRawList((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            {fileRawList.length > 0 ? (
                <div className="grid gap-2 " >
                    {fileRawList.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-lg shadow">
                            <div className="flex items-center gap-2">
                                <IoDocumentAttachOutline size={20} />
                                <div className="text-xs">
                                    <p className="font-semibold text-gray-900 truncate w-40">{file.name}</p>
                                    <p className="text-gray-400">{(file.size / 1048576).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button
                                className="text-red-500 text-xs font-medium"
                                onClick={(e) => handleDeleteFile(idx)}
                            >
                                <TiDelete size={24}/>
                            </button>
                        </div>
                    ))}
                </div>
            ) :
                <div className="w-full py-9 bg-gray-50 rounded-xl border border-gray-300 gap-3 grid border-dashed">


                    {/* Error Messages */}
                    {errorMessage.length > 0 && (
                        <div className="grid gap-1 text-center">
                            {errorMessage.map((msg, idx) => (
                                <p key={idx} className="text-red-500 text-xs">
                                    {msg}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* File List */}


                    {/* Drag and Drop Instructions */}
                    <div className="grid gap-2">
                        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                            Taruh PDF disini
                        </h4>
                        <div className="flex items-center justify-center">
                            <label>
                                <input
                                    type="file"
                                    hidden
                                    accept="application/pdf"
                                    onChange={(e) => handleFileChange(e.target.files)}
                                />
                                <div
                                    className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                                    Pilih File
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UploadFile;
