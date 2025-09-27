import React from 'react';

interface TogglePasswordIconProps extends React.SVGProps<SVGSVGElement> {
  isVisible: boolean;
}

const TogglePasswordIcon: React.FC<TogglePasswordIconProps> = ({ isVisible, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    {isVisible ? (
      <>
        {/* EyeOffIcon path */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 015.06-5.836M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.93 4.93l14.14 14.14M18.364 5.636A9.962 9.962 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7a9.962 9.962 0 01-3.364-.636"
        />
      </>
    ) : (
      <>
        {/* EyeIcon path */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    )}
  </svg>
);

export default TogglePasswordIcon;
