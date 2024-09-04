import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { IgApiClient } from 'instagram-private-api';
import * as nodemailer from "nodemailer";
import fs from 'fs';

export const ig = new IgApiClient();

//Interfaces
export interface Usuario {
    nombre: string,
    clave: string,
    email: string
}
export interface Perfil {
    id: number,
    nombre: string,
    idUltimaPublicacion: string
}
export interface Imagen {
    id: number,
    Perfil: number
}

//Base de datos
async function abrirConexion() {
    return open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
}

ig.state.generateDevice("desdeelbarro10");
(async () => {
  
  const loggedInUser = await ig.account.login("desdeelbarro10", "DesdeElBarroPodcast");
  
  console.log('¡Iniciaste sesión como:', loggedInUser.username);
 
})();

//Perfiles
export async function agregarPerfil(nombre: string): Promise<Perfil> {
    const db = await abrirConexion();
    const idUltimaPublicacion = await obtenerUltimaPublicacion(nombre);
    const query = `INSERT INTO Perfiles (nombre, idUltimaPublicacion) VALUES ('${nombre}', '${idUltimaPublicacion}')`;
    await db.run(query);

    const perfil = await db.get<Perfil>(`SELECT * FROM Perfiles WHERE nombre="${nombre}"`);
    if (perfil == undefined)
        throw new Error("Esto nunca deberia pasar!");

    return perfil;
}

export async function borrarPerfil(id: number): Promise<void> {
    const db = await abrirConexion();

    const query = `DELETE FROM Perfiles WHERE id='${id}'`;
    await db.run(query);
}

export async function listarPerfiles(): Promise<Perfil[]> {
    const db = await abrirConexion();

    const perfiles: Perfil[] = await db.all<Perfil[]>('SELECT * FROM Perfiles');
    return perfiles;
}

//Imagenes
export async function agregarImagen(id: number, perfil: number): Promise<Imagen> {
    const db = await abrirConexion();
    const query = `INSERT INTO Imagenes (id, perfil) VALUES ('${id}', '${perfil}')`;
    await db.run(query);

    const imagen = await db.get<Imagen>(`SELECT * FROM Imagenes WHERE id="${id}"`);
    if (imagen == undefined)
        throw new Error("Esto nunca deberia pasar!");

    return imagen;
}

export async function listarImagenesPorPerfil(idPerfil: number): Promise<Imagen[]> {
    const db = await abrirConexion();
    let imagenesPerfil: Imagen[] = await db.all<Imagen[]>(`SELECT * FROM Imagenes where perfil = ${idPerfil}`);
    let cantTotalDeImagenes: number = (await db.all<Imagen[]>(`SELECT * FROM Imagenes;`)).length;
    const perfil = await db.get<Perfil>(`SELECT * FROM Perfiles WHERE id="${idPerfil}"`);
    if(perfil === undefined) return [];
    if(imagenesPerfil.length === 0){
        const urls = await extraerFotosPerfil(perfil.nombre);
        console.log("urls.length: " + urls.length);
        for (let i = urls.length - imagenesPerfil.length - 1; i >= 0; i--) {
          const nombreArchivo = `${cantTotalDeImagenes}.jpg`;
          await descargarImagen(urls[i], nombreArchivo);
          const imagen = await agregarImagen(cantTotalDeImagenes, idPerfil);
          imagenesPerfil.push(imagen);
          console.log(`Imagen agregada: ${imagen.id} - ${imagen.Perfil}`);
          cantTotalDeImagenes++;
        }
        const idUltimaPublicacion = await obtenerUltimaPublicacion(perfil.nombre);
        const query = `UPDATE Perfiles SET idUltimaPublicacion='${idUltimaPublicacion}' WHERE id='${idPerfil}'`;
        await db.run(query);
    }
    return imagenesPerfil;
}

// --------------
// Esta función tiene que crear un array de urls que es el que va a 
// usar la función descargarFotosPerfil para descargar las fotos
// La función recibe el nombre de perfil que es un string y va a devolver un array de strings (urls)
export async function extraerFotosPerfil(nombrePerfil: string): Promise<string[]> {
    // Aquí implementarían la lógica para extraer las fotos del perfil dado
    // Va a retornar un arreglo de URLs de las imágenes
    try {
        // Buscamos el usuario por nombre de perfil
        const usuario = await ig.user.searchExact(nombrePerfil);    
        // Si el usuario existe, obtenemos las fotos de su perfil
        if (usuario) {
          // Obtenemos las fotos del perfil
          const media = ig.feed.user(usuario.pk);
          const items = await media.items();
          let postInfo;
          // Extraemos las URLs de las fotos
          const urlsFotos: string[] = [];
          for (let i = 0; i < items.length; i++) {
            const post = items[i];
            let imageUrl;

            if(post.carousel_media)
              imageUrl = post.carousel_media[0].image_versions2.candidates[0].url;
            else
              imageUrl = post.image_versions2.candidates[0].url;                      
            if (imageUrl) urlsFotos.push(imageUrl);                  
          }
          //console.log('Fotos de perfil:', urlsFotos);    
          // Devolvemos las URLs de las fotos
          return urlsFotos;
        } else {
          // Si el usuario no existe, devolvemos un array vacío
          return [];
        }
      } catch (error) {
        console.error('Error al extraer fotos de perfil:', error);
        return [];
      }
}

const descargarImagen = async (url: string, nombreArchivo: string) => {
  console.log(url);
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const arrayBufferView = new Uint8Array(buffer);

    fs.writeFile(`imagenes/${nombreArchivo}`, arrayBufferView, (err) => {
        if (err) {
            console.error(`Error al guardar la imagen: ${err.message}`);
            return;
        }
        console.log(`Imagen ${nombreArchivo} descargada con éxito`);
    });
};

async function obtenerUltimaPublicacion(nombrePerfil: string): Promise<string> {
    // Aquí implementarían la lógica para extraer la última publicación del perfil dado
    // Va a retornar un string con la URL de la última publicación
    try {
        // Buscamos el usuario por nombre de perfil
        const usuario = await ig.user.searchExact(nombrePerfil);
        // Si el usuario existe, obtenemos las fotos de su perfil
        if (usuario) {
            // Obtenemos las fotos del perfil
            const media = ig.feed.user(usuario.pk);
            const items = await media.items();
            // Extraemos el id de la última publicación
            const idUltimaPublicacion = items[0].id;
            // Devolvemos el id de la última publicación
            return idUltimaPublicacion;
        } else {
            // Si el usuario no existe, devolvemos un string vacío
            return '';
        }
    } catch (error) {
        console.error('Error al extraer la última publicación:', error);
        return '';
    }
}

const transporter = nodemailer.createTransport({
  service: 'hotmail', // Por ejemplo, 'gmail', 'hotmail', etc.
  auth: {
    user: 'appinstagramprogra@hotmail.com',
    pass: 'programacion4'
  },
});

async function subioFotoNueva(idPerfil: number, nombrePerfil: string) {
    const db = await abrirConexion();
    const ultimoIdPublicacionGuardado = await db.get(`SELECT idUltimaPublicacion FROM Perfiles WHERE id='${idPerfil}'`).then(row => row.idUltimaPublicacion);
    console.log('ultimo id guardado en bd:', ultimoIdPublicacionGuardado);
    const idUltimaImagen = await obtenerUltimaPublicacion(nombrePerfil);
    console.log('id ultima imagen:', idUltimaImagen);
    const subioFotoNueva = ultimoIdPublicacionGuardado !== idUltimaImagen;
    if(subioFotoNueva){
      const query = `UPDATE Perfiles SET idUltimaPublicacion='${idUltimaImagen}' WHERE id='${idPerfil}'`;
      await db.run(query);
    }
    return subioFotoNueva;
}

// Esta función tiene que enviar un correo cuando se realice un nuevo posteo en cualquier perfil
export async function avisoPosteo() {
    // Aquí implementarían la lógica para enviar un aviso cuando 
    // se realice un nuevo posteo en el perfil dado
    // Intenta enviar el correo
    const perfiles = await listarPerfiles();
    perfiles.forEach(async perfil => {
      if(await subioFotoNueva(perfil.id, perfil.nombre) ){
        try {
          // Creamos una const transporter. El transporter es un objeto que se encarga de mandar el correo   
          // Enviar correo con los datos que correspondan
          const info = await transporter.sendMail({
            // El from siempre va a quedar así
            from: '"Programación Cuatro" <appinstagramprogra@hotmail.com>', // sender address
            to: "nushita_g@hotmail.com", // lista de destinatarios, va a ir a nuestro acosador (NOE NO ES LA ACOSADORA QUE QUIERE STALKEAR A SU EX, ES SOLO UNA PRUEBA)
            subject: `${perfil.nombre} subió foto nueva`, // asunto
            text: `${perfil.nombre} subió foto nueva`, // cuerpo de texto 
          });  
          // Si me muestra esto en consola, es que funcionó y se envió el mensaje
          console.log("Mensaje enviado: %s", info.messageId);
          // Si no puede enviar el correo, muestra error
        } catch (error) {
          console.error("Error al enviar el mensaje:", error);
        }
      }
  });
}
