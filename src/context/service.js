import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

export const Toast = (type, msg) => {
    console.log("Toast: "+type+" "+msg)

    if (type === 0)
        toast.error(msg);
    if (type === 1)
        toast.success(msg); 
}

    