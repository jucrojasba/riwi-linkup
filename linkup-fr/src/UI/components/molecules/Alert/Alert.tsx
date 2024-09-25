import "./alertStyles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Type definition for the alert function
export function inputAlert(message: string, type: 'success' | 'error') {
    return MySwal.fire({
        title: <i>{message}</i>,
        icon: type,
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: "my-custom-button",
            icon: type === 'success' ? "my-custom-icon-success" : "my-custom-icon-error",
        }
    });
}

// Function to show a customized confirmation modal
export async function confirmDeleteAlert(textInfo: string, language: boolean): Promise<boolean> {
    const result = await MySwal.fire({
        title: language ? '¿Estás Seguro?' : 'Are you sure?',
        text: textInfo,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: language ? 'Sí, eliminar' : 'Yes, delete it!',
        cancelButtonText: language ? 'No, cancelar' : 'No, cancel!',
        reverseButtons: true,
        confirmButtonColor: 'var(--red-color)',
        customClass: {
            confirmButton: 'my-custom-confirm-button',
            cancelButton: 'my-custom-cancel-button',
            icon: 'my-custom-icon-warning',
        }
    });

    return result.isConfirmed; // Returns `true` if the user confirms
}
