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


