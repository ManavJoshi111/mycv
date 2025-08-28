import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
};

const errorToast = (msg = 'Someting went wrong, Please try again after sometime') =>
  toast.error(msg, toastConfig);

const successToast = (msg) => toast.success(msg, toastConfig);

export { errorToast, successToast };
