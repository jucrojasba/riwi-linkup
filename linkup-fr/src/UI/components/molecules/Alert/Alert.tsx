
import "./alertStyles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function inputAlert(message: string, type: 'success' | 'error') {
    return MySwal.fire({
        title: <i>{message}</i>,
        icon: type,
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: "my-custom-button",
            icon: type === 'success' ? "my-custom-icon-success" : "my-custom-icon-error",
        }
    });
}