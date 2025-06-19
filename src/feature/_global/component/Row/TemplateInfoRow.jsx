const TemplateInfoRow = ({ data, className = "", classNameValue = "", classNameLabel = "", gap = 4, variant = "text-base" }) => {
    const labels = data?.map((item) => item.label);
    const values = data?.map((item) => item.value);
  
    return (
      <div className={`flex gap-${gap} ${className}`}>
        {/* Kolom Label */}
        <div className={`flex flex-col gap-${gap} ${classNameLabel} `}>
          {labels.map((label, index) => (
            <span key={index} className={`${variant}`}>
              {label}
            </span>
          ))}
        </div>
  
        {/* Kolom Separator */}
        <div className={`flex flex-col gap-${gap}`}>
          {labels.map((_, index) => (
            <span key={index} className={`${variant}`}>
              :
            </span>
          ))}
        </div>
  
        {/* Kolom Value */}
        <div className={`flex flex-col gap-${gap} ${classNameValue}`}>
          {values.map((value, index) => (
            <span key={index} className={`${variant}`}>
              {value}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default TemplateInfoRow;
  