----------------CREACION TABLA PERSONA E INSERCION DE UNICAMENTE LOS DATOS DE CLASE_1.CSV

CREATE TEMP TABLE clase_1 (
    Nombre TEXT,
    Email TEXT,
    Promocion TEXT,
    Fecha_comienzo TEXT,
    Campus TEXT,
    Proyecto_HLF TEXT,
    Proyecto_EDA TEXT,
    Proyecto_BBDD TEXT,
    Proyecto_ML TEXT,
    Proyecto_Deployment TEXT
);


COPY clase_1 (
    Nombre,
    Email,
    Promocion,
    Fecha_comienzo,
    Campus,
    Proyecto_HLF,
    Proyecto_EDA,
    Proyecto_BBDD,
    Proyecto_ML,
    Proyecto_Deployment
)
FROM '/tmp/clase_1.csv'
WITH (
    FORMAT CSV,
    HEADER TRUE,
    DELIMITER ';'
);


select * from clase_1;


CREATE TABLE IF NOT EXISTS Persona (
    id_persona SERIAL PRIMARY KEY,
    Email VARCHAR(150),
    Nombre VARCHAR(100)
);


INSERT INTO Persona (Email, Nombre)
SELECT Email, Nombre
FROM clase_1;


select * from Persona