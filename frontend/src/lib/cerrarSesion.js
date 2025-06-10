import Swal from "sweetalert2";

export default function CerrarSesion() {
    Swal.fire({
        title: "¿Estás seguro de cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
        if (!result.isConfirmed) return;

        localStorage.clear();
        Swal.fire({
            icon: "success",
            title: "Has cerrado sesión correctamente",
            text: "Ayosssssssss",
            confirmButtonText: "Aceptar",
            timer: 1500,
        }).then(() => {
            window.location.href = "/";
        });
    });
}
