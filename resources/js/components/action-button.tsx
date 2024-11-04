import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'delete' | 'update';
}

const ActionButton: React.FC<ActionButtonProps> = ({ variant, ...props }) => {
  const iconStyles = 'w-4 h-4 inline-block mr-1';
  const baseStyles =
    'inline-flex items-center px-2 py-1 text-sm font-medium rounded transition-colors';
  
  const typeStyles =
    variant === 'delete'
      ? 'bg-red-500 text-white hover:bg-red-600'
      : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <button
      className={`${baseStyles} ${typeStyles}`}
      aria-label={variant}
      {...props} // spread other props here
    >
      {variant === 'delete' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconStyles}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6M4 7h16m-3-4H7m4 0V3m0 0V3"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconStyles}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232a2.828 2.828 0 114 4L7 21H3v-4l12.232-12.232z"
          />
        </svg>
      )}
      {variant === 'delete' ? 'Delete' : 'Update'}
    </button>
  );
};

export default ActionButton;
