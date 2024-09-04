console.log("hola, funcionaaaa");


const socket = io();
//crea una instancia de socket.io desde el lad odel cliente ahora

//socket.emit("mensaje", "saludos desde el front");

//crear variable para usuario que se conecta al chat
let user;

const chatBox = document.getElementById("chatBox");


// utilizamos sweet alert para el mensaje de bienvenida (pegamos script, del lado del front, no se instala). 
//pagina sweetalert2.github.io - install, copio link

// swal es un objeto que nos permite usar los metodos de la libreria (esta  en la documentacionnn)
// fire nos permite configurar la alerta

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa un usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result =>{
    user= result.value;
})

// desde chatBox capturamos el msj y lo enviamos al backend
chatBox.addEventListener("keyup", (event) =>{
    if(event.key === "Enter"){

        // trim nos permite sacar los espacios en blanco del principio y final de un string
        // LENGTH = los gatitos tienen hambre
        if (chatBox.value.trim().length > 0){
            socket.emit("message",{user: user, message: chatBox.value});
            chatBox.value= "";
        }
    }
})


//Listener de mensajes: 
socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs"); 
    let messages = ""; 

    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })

    log.innerHTML = messages; 
})