import express from "express";
import { engine } from "express-handlebars"; // exportar motor de plantillas
import { Server } from "socket.io";
const app = express();
const PUERTO = 8080;

// Middleware
app.use(express.json()); //definimos formato
app.use(express.urlencoded({extended:true})); // sirve para definir que vamos a recibir datos complejos (reemplaza body parse)
app.use(express.static("./src/public"));

// configuramos renderizado de pagina  (express-handlebars) - motor de plantillas
app.engine("handlebars", engine()); // motor de plantillas
app.set("view engine", "handlebars"); // extension que vamos a utilizar en el motor
app.set("views", "./src/views"); // ubicacion de las vistas a renderizar

// Rutas
app.get("/",(req,res) =>{
    res.render("index");
})

// Escuchar
const httpServer= app.listen(PUERTO,()=>{
    console.log(`escuchando puerto ${PUERTO}`);

})


// guardo la referencia del servidor
// generamos una instancia socket.io del lado del backend

const io = new Server(httpServer);

// creamos un historial de mensajes
let messages= [];

io.on("connection", (socket) => {
    console.log("nuevo usuario se conecto al chat viejaaa");

    socket.on("message", data => {
        messages.push(data);

        // Emitimos mensaje para el cliente, con todo el array de datos 
        io.emit("messagesLogs", messages);
    })
})
