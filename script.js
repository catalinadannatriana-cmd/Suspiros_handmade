// inicializamos con la base de datos de supabase al principio
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nehxhrlnzdzacdgztszo.supabase.co';
const supabaseKey = 'sb_publishable_WyRX0CF5iSryg6n5A06Pyg_gntJ0Ger';
const supabase = createClient(supabaseUrl, supabaseKey);

// interactividad para el formulario de contacto
const formularioContacto = document.querySelector("#contacto form");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", async function(evento) {
        // evita que la página se refresque antes de tiempo
        evento.preventDefault();

        // capturamos los datos que escribe el cliente en el formulario
        const nombreInput = formularioContacto.querySelector("input[name='nombre']")?.value || "Anónimo";
        const emailInput = formularioContacto.querySelector("input[name='email']")?.value || "";
        const mensajeInput = formularioContacto.querySelector("textarea[name='mensaje']")?.value || "";

        // enviamos los datos a la tabla 'mensajes' en supabase
      const { error } = await supabase
    .from('Mensajes')
    .insert([
        { 
            nombre: nombreInput, 
            email: emailInput, 
            mensaje: mensajeInput 
        }
    ]);

        if (error) {
            console.error('error al guardar en la base de datos:', error);
            alert("hubo un error al enviar el mensaje, intenta de nuevo.");
        } else {
            console.log('mensaje guardado con éxito en supabase');
            
            // alerta de usuario para confirmar solo si se guardó bien
            alert("¡Mensaje enviado con éxito! Gracias por escribirnos a Suspiros Handmade. Te responderemos pronto.");

            // para limpiar el formulario despues de enviar el mensaje
            formularioContacto.reset();
        }
    });
}

// interactividad para el formulario de inicio de sesión, o sea el de "admin.html"
const formularioLogin = document.querySelector(".login-box form");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const usuarioInput = document.querySelector("#usuario").value;

        // mensaje de bienvenida simulado para el admin
        alert("¡Bienvenida de nuevo, creadora de Suspiros Handmade! Acceso concedido para: " + usuarioInput);

        // redirigir a la página principal o para limpiar
        window.location.href = "index.html";
    });
}

// --- IMPORTACIÓN PARA SUPABASE A ADMIN DE PAGINA---
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nehxhrlnzdzacdgztszo.supabase.co';
const supabaseKey = 'sb_publishable_WyRX0CF5iSryg6n5A06Pyg_gntJ0Ger';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- LÓGICA DEL PANEL DE ADMINISTRACIÓN ---
const loginSection = document.querySelector("#login-section");
const dashboardSection = document.querySelector("#dashboard-section");
const formLogin = document.querySelector("#form-login");
const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
const listaMensajes = document.querySelector("#lista-mensajes");

// Credenciales simuladas para ustedes dos
const ADMIN_CORREO = "catalinadannatriana@gmail.com";
const ADMIN_PASS = "1031";

// Revisar si ya habían iniciado sesión antes en esta pestaña
if (sessionStorage.getItem("sesionActiva") === "true") {
    if (dashboardSection && loginSection) {
        mostrarDashboard();
    }
}

if (formLogin) {
    formLogin.addEventListener("submit", function(evento) {
        // ¡ESTO ES CLAVE! Evita que la página se recargue y borre los campos
        evento.preventDefault();
        
        const inputUsuario = document.querySelector("#usuario").value.trim();
        const inputPass = document.querySelector("#password").value.trim();

        // Validamos las credenciales exactas
        if (inputUsuario === ADMIN_CORREO && inputPass === ADMIN_PASS) {
            // Guardamos el estado en la memoria de la sesión
            sessionStorage.setItem("sesionActiva", "true");
            mostrarDashboard();
        } else {
            alert("Credenciales incorrectas. Verifica tu usuario y contraseña.");
        }
    });
}

// Botón para cerrar sesión
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function() {
        sessionStorage.removeItem("sesionActiva");
        dashboardSection.style.display = "none";
        loginSection.style.display = "block";
        formLogin.reset();
    });
}

// inicializamos supabase una sola vez al principio
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nehxhrlnzdzacdgztszo.supabase.co';
const supabaseKey = 'sb_publishable_WyRX0CF5iSryg6n5A06Pyg_gntJ0Ger';
const supabase = createClient(supabaseUrl, supabaseKey);

// interactividad para el formulario de contacto de la tienda
const formularioContacto = document.querySelector("#contacto form");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", async function(evento) {
        evento.preventDefault();

        const nombreInput = formularioContacto.querySelector("input[name='nombre']")?.value || "Anónimo";
        const emailInput = formularioContacto.querySelector("input[name='email']")?.value || "";
        const mensajeInput = formularioContacto.querySelector("textarea[name='mensaje']")?.value || "";

        const { error } = await supabase
            .from('Mensajes')
            .insert([
                { 
                    nombre: nombreInput, 
                    email: emailInput, 
                    mensaje: mensajeInput 
                }
            ]);

        if (error) {
            console.error('error al guardar en la base de datos:', error);
            alert("hubo un error al enviar el mensaje, intenta de nuevo.");
        } else {
            console.log('mensaje guardado con éxito');
            alert("¡Mensaje enviado con éxito! Gracias por escribirnos a Suspiros Handmade.");
            formularioContacto.reset();
        }
    });
}

// --- logica del panel de administracion ---
const loginSection = document.querySelector("#login-section");
const dashboardSection = document.querySelector("#dashboard-section");
const formLogin = document.querySelector("#form-login");
const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion");
const listaMensajes = document.querySelector("#lista-mensajes");

// credenciales de acceso para la creadora
const ADMIN_CORREO = "catalinadannatriana@gmail.com";
const ADMIN_PASS = "1031";

// revisar si ya habia sesion activa
if (sessionStorage.getItem("sesionActiva") === "true") {
    if (dashboardSection && loginSection) {
        mostrarDashboard();
    }
}

if (formLogin) {
    formLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();
        
        const inputUsuario = document.querySelector("#usuario").value.trim();
        const inputPass = document.querySelector("#password").value.trim();

        if (inputUsuario === ADMIN_CORREO && inputPass === ADMIN_PASS) {
            sessionStorage.setItem("sesionActiva", "true");
            mostrarDashboard();
        } else {
            alert("credenciales incorrectas, revisa bien.");
        }
    });
}

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function() {
        sessionStorage.removeItem("sesionActiva");
        dashboardSection.style.display = "none";
        loginSection.style.display = "block";
        formLogin.reset();
    });
}

function mostrarDashboard() {
    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
    cargarMensajesDesdeSupabase();
}

async function cargarMensajesDesdeSupabase() {
    listaMensajes.innerHTML = "<p>cargando mensajes...</p>";

    const { data, error } = await supabase
        .from('Mensajes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('error al obtener mensajes:', error);
        listaMensajes.innerHTML = "<p style='color: red;'>hubo un error al cargar los mensajes.</p>";
        return;
    }

    if (data.length === 0) {
        listaMensajes.innerHTML = "<p>aun no hay mensajes de clientes guardados.</p>";
        return;
    }

    listaMensajes.innerHTML = "";
    data.forEach(msg => {
        const tarjeta = document.createElement('div');
        tarjeta.style.cssText = "background: #fdfbf7; border: 1px solid #dcd6cd; padding: 12px; margin-bottom: 10px; border-radius: 6px; font-size: 0.9rem;";
        
        tarjeta.innerHTML = `
            <p><strong>de:</strong> ${msg.nombre} (${msg.email})</p>
            <p><strong>mensaje:</strong> ${msg.mensaje}</p>
            <p style="font-size: 0.75rem; color: #888; margin-top: 5px;">recibido el: ${new Date(msg.created_at).toLocaleString()}</p>
        `;
        listaMensajes.appendChild(tarjeta);
    });
}