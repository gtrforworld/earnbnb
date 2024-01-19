import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'success', options = {}) => {
    const toastConfig = {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type,
      ...options,
    };
  
    toast(message, toastConfig);
};