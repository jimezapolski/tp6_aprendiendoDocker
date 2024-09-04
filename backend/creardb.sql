/*
 CREATE TABLE Perfiles(
	id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE Notificaciones (
	id INTEGER PRIMARY KEY,
    mensaje TEXT NOT NULL
);

INSERT INTO Perfiles (nombre) VALUES ("leomessi");
INSERT INTO Perfiles (nombre) VALUES ("multimedia.umai"); */

-- DROP table Perfiles;

-- delete from Perfiles where nombre="Pedro";

-- CREATE TABLE Imagenes(
-- 	id INTEGER PRIMARY KEY,
--     Perfil INTEGER NOT NULL
-- );
-- drop table Imagenes;

delete urlUltimaPublicacion from Perfiles where id = 1;

update Perfiles set urlUltimaPublicacion = '' where id = 2;

ALTER TABLE Perfiles add idUltimaPublicacion VARCHAR(255);

ALTER TABLE Perfiles DROP COLUMN idUltimaPublicacion;

select * from Imagenes where Perfil = 2;

drop table Notificaciones;

delete from Perfiles;

select * from Perfiles;

INSERT INTO Perfiles (nombre) VALUES ("leomessi");

SELECT COUNT(*) AS total_filas FROM Imagenes;