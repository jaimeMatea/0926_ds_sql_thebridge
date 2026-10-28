----------------CREACION TABLA E INSECION EN TABLA ROL-----------------------
CREATE TEMP TABLE claustro (
    Nombre TEXT,
    Rol TEXT,
    Vertical TEXT,
    Promocion TEXT,
    Campus TEXT,
    Modalidad TEXT
);

COPY claustro (
    Nombre,
    Rol,
    Vertical,
    Promocion,
    Campus,
    Modalidad
)
FROM '/tmp/claustro.csv'
WITH (
    FORMAT CSV,
    HEADER TRUE,
    DELIMITER ';'
);

select * from claustro;

CREATE SEQUENCE IF NOT EXISTS rol_id_seq START 1;
CREATE TABLE IF NOT EXISTS Rol (
    id_rol VARCHAR(10) PRIMARY KEY
        DEFAULT ('r' || nextval('rol_id_seq')),
    Rol VARCHAR(150) UNIQUE
);

INSERT INTO Rol (Rol)
SELECT DISTINCT Rol
FROM claustro
WHERE Rol IS NOT NULL;
ON CONFLICT (Rol) DO NOTHING;

select * from Rol


----------------CREACION TABLA E INSECION EN TABLA PERSONA-----------------------
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

CREATE TEMP TABLE clase_2 (
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

CREATE TEMP TABLE clase_3 (
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

CREATE TEMP TABLE clase_4 (
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

COPY clase_2 (
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
FROM '/tmp/clase_2.csv'
WITH (
    FORMAT CSV,
    HEADER TRUE,
    DELIMITER ';'
);

COPY clase_3 (
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
FROM '/tmp/clase_3.csv'
WITH (
    FORMAT CSV,
    HEADER TRUE,
    DELIMITER ';'
);

COPY clase_4 (
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
FROM '/tmp/clase_4.csv'
WITH (
    FORMAT CSV,
    HEADER TRUE,
    DELIMITER ';'
);

select * from clase_1;

CREATE SEQUENCE IF NOT EXISTS persona_id_seq START 1;
CREATE TABLE IF NOT EXISTS Persona (
    id_persona VARCHAR(10) PRIMARY KEY
        DEFAULT ('p' || nextval('persona_id_seq')),
    Email VARCHAR(150),
    Nombre VARCHAR(100),
    id_rol VARCHAR(10) REFERENCES Rol(id_rol)
);

INSERT INTO Persona (Email, Nombre, id_rol)
SELECT c.Email, c.Nombre, r.id_rol
FROM clase_1 c
LEFT JOIN claustro cl
    ON c.Nombre = cl.Nombre
LEFT JOIN Rol r
    ON cl.Rol = r.Rol;

INSERT INTO Persona (Email, Nombre, id_rol)
SELECT c.Email, c.Nombre, r.id_rol
FROM clase_2 c
LEFT JOIN claustro cl
    ON c.Nombre = cl.Nombre
LEFT JOIN Rol r
    ON cl.Rol = r.Rol;

INSERT INTO Persona (Email, Nombre, id_rol)
SELECT c.Email, c.Nombre, r.id_rol
FROM clase_3 c
LEFT JOIN claustro cl
    ON c.Nombre = cl.Nombre
LEFT JOIN Rol r
    ON cl.Rol = r.Rol;

INSERT INTO Persona (Email, Nombre, id_rol)
SELECT c.Email, c.Nombre, r.id_rol
FROM clase_4 c
LEFT JOIN claustro cl
    ON c.Nombre = cl.Nombre
LEFT JOIN Rol r
    ON cl.Rol = r.Rol;

INSERT INTO Persona (Nombre, id_rol)
SELECT DISTINCT cl.Nombre, r.id_rol
FROM claustro cl
LEFT JOIN Rol r
    ON cl.Rol = r.Rol;

select * from Persona






