import React from 'react';

interface LogoProps {
  type?: string;
  name?: string;
  className?: string;
}

export const CollegeLogo: React.FC<LogoProps> = ({ type, name, className = 'w-16 h-16' }) => {
  const normalized = (type || name || '').toLowerCase();

  if (normalized.includes('iit madras') || normalized.includes('iitm')) {
    // IIT Madras: Maroon round emblem with golden flame lamp (diya) and inner glow
    return (
      <div className={`${className} rounded-full overflow-hidden flex items-center justify-center bg-[#7A1521] border-2 border-[#E5A823] shadow-sm`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer golden ring with dots */}
          <circle cx="50" cy="50" r="46" stroke="#E5A823" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="40" stroke="#E5A823" strokeWidth="1" strokeDasharray="2 3" />
          
          {/* Flame aura */}
          <circle cx="50" cy="42" r="16" fill="#FBBF24" fillOpacity="0.3" />
          
          {/* Golden Flame */}
          <path
            d="M50 22 C55 32 60 38 56 46 C53 50 47 50 44 46 C40 38 45 32 50 22 Z"
            fill="#FBBF24"
          />
          <path
            d="M50 27 C52 33 55 37 53 42 C51 44 48 44 47 42 C45 37 48 33 50 27 Z"
            fill="#EF4444"
          />

          {/* Golden Diya / Oil Lamp Base */}
          <path
            d="M30 48 Q50 62 70 48 C72 56 65 66 50 66 C35 66 28 56 30 48 Z"
            fill="#E5A823"
          />
          {/* Diya Pedestal Stand */}
          <path
            d="M44 65 L40 76 L60 76 L56 65 Z"
            fill="#D97706"
          />
          <rect x="36" y="76" width="28" height="4" rx="2" fill="#E5A823" />
          
          {/* Center glow star */}
          <circle cx="50" cy="43" r="3" fill="#FFFBEB" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('anna') || normalized.includes('anna university')) {
    // Anna University: Red gear cog outline with red temple gopuram inside
    return (
      <div className={`${className} rounded-full overflow-hidden flex items-center justify-center bg-white border border-[#FCA5A5] p-1 shadow-sm`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red Gear Wheel Cog outline */}
          <g stroke="#DC2626" strokeWidth="2.5" fill="#FEF2F2">
            <path d="M44 14 L56 14 L58 20 L66 24 L72 19 L81 28 L76 34 L80 42 L86 44 L86 56 L80 58 L76 66 L81 72 L72 81 L66 76 L58 80 L56 86 L44 86 L42 80 L34 76 L28 81 L19 72 L24 66 L20 58 L14 56 L14 44 L20 42 L24 34 L19 28 L28 19 L34 24 L42 20 Z" />
          </g>
          <circle cx="50" cy="50" r="28" stroke="#DC2626" strokeWidth="2" fill="white" />
          
          {/* Temple Gopuram / Technical emblem in red */}
          <path
            d="M48 28 L52 28 L54 36 L46 36 Z M45 36 L55 36 L57 46 L43 46 Z M41 46 L59 46 L61 58 L39 58 Z M37 58 L63 58 L65 70 L35 70 Z"
            fill="#DC2626"
          />
          <rect x="47" y="60" width="6" height="10" fill="white" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('coimbatore') || normalized.includes('cit')) {
    // Coimbatore Institute of Technology: Deep royal blue circular seal with double rings
    return (
      <div className={`${className} rounded-full overflow-hidden flex items-center justify-center bg-[#1E3A8A] border-2 border-[#93C5FD] shadow-sm`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="#93C5FD" strokeWidth="2" />
          <circle cx="50" cy="50" r="41" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 2" />
          <circle cx="50" cy="50" r="35" stroke="#93C5FD" strokeWidth="1" />
          
          {/* Stylized CIT Crest Symbol */}
          <circle cx="50" cy="50" r="24" fill="#172554" />
          <text
            x="50"
            y="54"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            letterSpacing="1"
          >
            CIT
          </text>
          
          {/* Subtle radiating laurel leaves */}
          <path
            d="M32 50 Q28 65 50 72 Q72 65 68 50"
            stroke="#93C5FD"
            strokeWidth="2"
            fill="none"
          />
          <polygon points="50,22 52,27 48,27" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Default elegant academic badge
  return (
    <div className={`${className} rounded-full overflow-hidden flex items-center justify-center bg-blue-50 border-2 border-blue-200 text-blue-700 font-bold text-sm shadow-sm`}>
      {name ? name.substring(0, 3).toUpperCase() : 'COL'}
    </div>
  );
};
