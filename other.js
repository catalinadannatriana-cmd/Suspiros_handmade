import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nehxhrlnzdzacdgztszo.supabase.co';
const supabaseKey = 'sb_publishable_WyRX0CF5iSryg6n5A06Pyg_gntJ0Ger';
const supabase = createClient(supabaseUrl, supabaseKey);

const loginSeccion = document.querySelector("#login-seccion");
const panelSeccion = document.querySelector("#panel-seccion");
const formLogin = document.querySelector("#form-login");
const loginError = document.querySelector("#login-error");
const listaMensajes = document.querySelector("#lista-mensajes");
const btnSalir = document.querySelector("#btn-salir");

// muestra el panel o el login según haya sesión
function mostrarPanel(haySesion) {
    loginSeccion.hidden = haySesion;
    panelSeccion.hidden = !haySesion;
    if (haySesion) cargarMensajes();
}

async function cargarMensajes() {
    listaMensajes.textContent = "Cargando...";

    const { data, error } = await supabase
        .from('Mensajes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('error al leer mensajes:', error);
        listaMensajes.textContent = "No se pudieron cargar los mensajes.";
        return;
    }

    if (data.length === 0) {
        listaMensajes.textContent = "Todavía no hay mensajes.";
        return;
    }

    listaMensajes.textContent = "";

    data.forEach(function(m) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        const nombre = document.createElement("h3");
        nombre.textContent = m.nombre;

        const email = document.createElement("p");
        email.textContent = m.email;

        const mensaje = document.createElement("p");
        mensaje.textContent = m.mensaje;

        const fecha = document.createElement("small");
        fecha.textContent = new Date(m.created_at).toLocaleString("es-CO");

        tarjeta.append(nombre, email, mensaje, fecha);
        listaMensajes.appendChild(tarjeta);
    });
}

// iniciar sesión
formLogin.addEventListener("submit", async function(evento) {
    evento.preventDefault();
    loginError.textContent = "";

    const { error } = await supabase.auth.signInWithPassword({
        email: document.querySelector("#correo").value,
        password: document.querySelector("#clave").value
    });

    if (error) {
        loginError.textContent = "Correo o contraseña incorrectos.";
    } else {
        formLogin.reset();
        mostrarPanel(true);
    }
});

// cerrar sesión
btnSalir.addEventListener("click", async function() {
    await supabase.auth.signOut();
    mostrarPanel(false);
});

// al abrir la página, revisa si ya hay sesión iniciada
const { data: { session } } = await supabase.auth.getSession();
mostrarPanel(!!session);