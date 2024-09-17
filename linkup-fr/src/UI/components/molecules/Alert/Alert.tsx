
import "./alertStyles.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function inputAlert(message: string, type: 'success' | 'error') {
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

// Función para mostrar un modal de confirmación personalizado
export async function confirmDeleteAlert(): Promise<boolean> {
    const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this coder?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        customClass: {
            confirmButton: 'my-custom-confirm-button',
            cancelButton: 'my-custom-cancel-button',
            icon: 'my-custom-icon-warning',
        }
    });

    return result.isConfirmed; // Retorna `true` si el usuario confirma
}