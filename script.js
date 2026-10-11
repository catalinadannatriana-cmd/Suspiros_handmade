
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

//Interactividad para el formulario de inicio de sesión, o sea el de "admin.html"
const formularioLogin = document.querySelector(".login-box form");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();
        
        const usuarioInput = document.querySelector("#usuario").value;
        
        // Mensaje de bienvenida simulado para el admin
        alert("¡Bienvenida de nuevo, creadora de Suspiros Handmade! Acceso concedido para: " + usuarioInput);
        
        // Redirigir a la página principal o para limpiar
        window.location.href = "index.html";
    });
}