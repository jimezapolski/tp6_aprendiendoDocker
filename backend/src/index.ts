import express, { Express, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import path from "path";
import { agregarImagen, agregarPerfil, avisoPosteo, borrarPerfil, listarImagenesPorPerfil, listarPerfiles} from "./Modelo";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

function errorHandler(
    error: Error, request: Request, response: Response
) {
    console.log(`Hubo un error!`, error);
    response.header("Content-Type", 'application/json');
    response.status(500).json({ mensaje: error.message });
}

app.use(cors());
app.use(express.json());
app.use('/imagen', express.static(path.join(__dirname, '../imagenes')));

// Perfiles
app.post("/perfil/agregar", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nombre = req.body.nombre;
        console.log(`Nombre: ${nombre}`);
        const perfil = await agregarPerfil(nombre);
        res.send(perfil);
    } catch (error) {
        next(error);
    }
});

app.delete("/perfil/borrar", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.id;
        await borrarPerfil(parseInt(id));
        res.send("OK");
    } catch (error) {
        next(error);
    }
});

app.get("/perfil", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listado = await listarPerfiles();
        res.send(listado);
    } catch (error) {
        next(error);
    }
});

/* app.get("/perfil/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listado = await consultarPerfil();
        res.send(listado);
    } catch (error) {
        next(error);
    }
}); */

// Imagenes
app.get('/imagen/:id', (req, res) => {
    const idImagen = req.params.id;
    const rutaImagen = path.join(__dirname, '../imagenes', `${idImagen}.jpg`);

    res.sendFile(rutaImagen, err => {
        if (err) {
            res.status(404).send('Imagen no encontrada');
        }
    });
});

app.post("/imagen/agregar", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.body.id;
        const perfil = req.body.perfil;
        const imagen = await agregarImagen(parseInt(id), parseInt(perfil));
        res.send(imagen);
    } catch (error) {
        next(error);
    }
});

app.get("/imagenesPorPerfil/:idPerfil", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idPerfil = req.params.idPerfil;
        const listado = await listarImagenesPorPerfil(parseInt(idPerfil));
        res.send(listado);
    } catch (error) {
        next(error);
    }
});

app.post("/checkearFotoNueva", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await avisoPosteo();
        res.send("OK");
    } catch (error) {
        next(error);
    }
});

/* app.get("/imagen/:idImagen", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const imagen = await consultarImagen(req.params.idImagen);
        res.send(imagen);
    } catch (error) {
        next(error);
    }
}); */

app.use(errorHandler);

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});