
//Interactividad para el formulario de contacto
const formularioContacto = document.querySelector("#contacto form");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", function(evento) {
        //Evita que la pagina se refresque antes de tiempo
        evento.preventDefault();
        
        // Alerta de usuario para confirmar
        alert("¡Mensaje enviado con éxito! Gracias por escribirnos a Suspiros Handmade. Te responderemos pronto.");
        
        // Para limpiar el formulario despues de enviar el mensaje
        formularioContacto.reset();
    });
}