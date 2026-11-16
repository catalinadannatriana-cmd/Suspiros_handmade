// Chat flotante de Suspiros Handmade. Se construye solo desde JS,
// así index.html únicamente necesita cargar este archivo.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nehxhrlnzdzacdgztszo.supabase.co';
const supabaseKey = 'sb_publishable_WyRX0CF5iSryg6n5A06Pyg_gntJ0Ger';
const supabase = createClient(supabaseUrl, supabaseKey);

const historial = [];   // conversación que se envía a la función
let cargando = false;   // evita enviar dos preguntas a la vez

// Marcado estático (sin contenido del usuario), por eso es seguro usar innerHTML
function crearWidget() {
    const contenedor = document.createElement("div");
    contenedor.className = "chat-widget";
    contenedor.innerHTML = `
        <button class="chat-boton" type="button" aria-label="Abrir chat">💬</button>
        <section class="chat-panel" hidden>
            <header class="chat-encabezado">
                <span>Asistente de Suspiros 🌸</span>
                <button class="chat-cerrar" type="button" aria-label="Cerrar chat">✕</button>
            </header>
            <div class="chat-mensajes" aria-live="polite"></div>
            <form class="chat-form">
                <input type="text" class="chat-input" placeholder="Escribe tu pregunta..."
                       maxlength="300" required autocomplete="off">
                <button type="submit" class="chat-enviar">Enviar</button>
            </form>
        </section>`;
    document.body.appendChild(contenedor);
    return contenedor;
}

const widget = crearWidget();
const boton = widget.querySelector(".chat-boton");
const panel = widget.querySelector(".chat-panel");
const cerrar = widget.querySelector(".chat-cerrar");
const zonaMensajes = widget.querySelector(".chat-mensajes");
const form = widget.querySelector(".chat-form");
const input = widget.querySelector(".chat-input");
const btnEnviar = widget.querySelector(".chat-enviar");

// textContent (no innerHTML): lo que escribe el usuario o responde la IA
// nunca se interpreta como código
function agregarMensaje(texto, tipo) {
    const burbuja = document.createElement("div");
    burbuja.classList.add("chat-burbuja", `chat-${tipo}`);
    burbuja.textContent = texto;
    zonaMensajes.appendChild(burbuja);
    zonaMensajes.scrollTop = zonaMensajes.scrollHeight;
    return burbuja;
}

boton.addEventListener("click", function() {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) input.focus();
});

cerrar.addEventListener("click", function() {
    panel.hidden = true;
});

agregarMensaje("¡Hola! Soy el asistente de Suspiros Handmade 🌸 Pregúntame por nuestros productos y precios.", "bot");

form.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const texto = input.value.trim();
    if (!texto || cargando) return;

    agregarMensaje(texto, "usuario");
    historial.push({ rol: "usuario", texto });
    input.value = "";

    // estado de carga
    cargando = true;
    btnEnviar.disabled = true;
    const escribiendo = agregarMensaje("Escribiendo...", "bot");
    escribiendo.classList.add("chat-escribiendo");

    try {
        const { data, error } = await supabase.functions.invoke("chat-gemini", {
            body: { mensajes: historial }
        });

        if (error || !data?.respuesta) throw error || new Error("Respuesta vacía");

        escribiendo.remove();
        agregarMensaje(data.respuesta, "bot");
        historial.push({ rol: "bot", texto: data.respuesta });
    } catch (err) {
        console.error("error del chat:", err);
        escribiendo.remove();
        historial.pop(); // quita la pregunta que no se pudo responder
        agregarMensaje("Ups, ahora mismo no puedo responder. Intenta de nuevo en un momento o escríbenos por el formulario de contacto 💌", "error");
    } finally {
        cargando = false;
        btnEnviar.disabled = false;
        input.focus();
    }
});