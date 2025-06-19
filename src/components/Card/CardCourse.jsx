import React from "react";
import { Link } from "react-router-dom";
import { MdPerson, MdClass, MdArrowForward } from "react-icons/md";

const CardCourse = ({
  id,
  title,
  description,
  image,
  teacher,
  type,
  navigateUrl,
  className,
}) => {
  // Jika tidak ada gambar, gunakan gambar placeholder
  const courseImage = image || "/images.jpg";

  return (
    <div
      className={`hover-lift card-custom-primary h-full flex flex-col ${className}`}>
      {/* Header Image dengan Gradient Overlay */}
      <div className="h-40 relative overflow-hidden rounded-t-xl">
        <img
          src={courseImage}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0000009c] to-transparent"></div>

        {/* Badge Type */}
        {type && (
          <span className="absolute top-3 right-3 bg-[#6148FF] text-white text-xs font-semibold px-2 py-1 rounded-full">
            {type}
          </span>
        )}

        {/* Title on Image */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-white font-bold text-lg line-clamp-1">{title}</h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {description ||
            "Mata pelajaran ini membantu siswa memahami konsep-konsep penting dalam kurikulum"}
        </p>

        {/* Teacher Info */}
        {teacher && (
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
            <MdPerson size={16} className="text-[#6148FF]" />
            <span>{teacher}</span>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={navigateUrl}
          className="btn-custom-primary w-full flex items-center justify-center gap-2 mt-2">
          Lihat Detail <MdArrowForward />
        </Link>
      </div>
    </div>
  );
};

export default CardCourse;
