'use client';

import { toast } from 'react-hot-toast';

export const showToast = (message, type = 'success') => {
  const options = {
    duration: 3000,
    style: {
      background: '#fff',
      color: '#333',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
    },
  };
  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'warning':
      return toast.warning(message, options);
    case 'info':
      return toast.info(message, options);
    default:
      return toast(message, options);
  }
};