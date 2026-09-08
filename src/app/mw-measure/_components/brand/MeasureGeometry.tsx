import React from 'react';

interface MeasureGeometryProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

// Official MW Measure Geometry (management-approved):
// - Dark Navy background (#0b162c)
// - Outer Circle: white ring
// - Inner Circle: solid royal blue (#1e68e5) disc
export const MeasureGeometry: React.FC<MeasureGeometryProps> = ({
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const sizeMap = {
    xs: { box: 'w-5 h-5', textSize: 'text-[9px]' },
    sm: { box: 'w-7 h-7', textSize: 'text-[10px]' },
    md: { box: 'w-10 h-10', textSize: 'text-xs' },
    lg: { box: 'w-14 h-14', textSize: 'text-sm' },
    xl: { box: 'w-20 h-20', textSize: 'text-base' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div className="rounded-full bg-[#0b162c] flex items-center justify-center p-1 shadow-sm">
        <svg viewBox="0 0 80 80" className={current.box} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="33" stroke="#ffffff" strokeWidth="6" />
          <circle cx="40" cy="40" r="21.5" fill="#1e68e5" />
        </svg>
      </div>

      {showLabel && (
        <span className={`font-semibold tracking-normal text-white mt-1.5 ${current.textSize}`}>
          Measure
        </span>
      )}
    </div>
  );
};
