
import "./alertStyles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function inputAlert(message: string, type: 'success' | 'error') {
    return MySwal.fire({
        title: <h4>{message}</h4>,
        icon: type,
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: "my-custom-button",
            icon: type === 'success' ? "my-custom-icon-success" : "my-custom-icon-error",
        }
    });
}