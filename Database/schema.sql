-- Crear usuario administrador
CREATE USER admin_clinica WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE clinica_db TO admin_clinica;
GRANT ALL PRIVILEGES ON SCHEMA public TO admin_clinica;
ALTER SCHEMA public OWNER TO admin_clinica;
GRANT CREATE ON SCHEMA public TO admin_clinica;

-- Crear tablas

CREATE TABLE usuario_sistema (
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_usuario VARCHAR NOT NULL UNIQUE,
    nombre VARCHAR NOT NULL,
    apellido VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL,
    rol VARCHAR NOT NULL CHECK (rol IN ('admin', 'recepcionista', 'medico')),
    estado VARCHAR NOT NULL CHECK (estado IN ('activo', 'inactivo', 'bloqueado'))
);

CREATE TABLE pacientes (
    id_paciente INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    apellido VARCHAR NOT NULL,
    cedula VARCHAR UNIQUE NOT NULL,
    telefono VARCHAR,
    email VARCHAR,
    fecha_nacimiento DATE, 
    fecha_registro DATE DEFAULT CURRENT_DATE,
    estado VARCHAR CHECK (estado IN ('activo','inactivo')) DEFAULT 'activo'
);

CREATE TABLE especialidades (
    id_especialidad INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_especialidad VARCHAR NOT NULL UNIQUE
);

CREATE TABLE medicos (
    id_medico INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_especialidad INTEGER NOT NULL,
    email_contacto VARCHAR,
    telefono_contacto VARCHAR,
    CONSTRAINT fk_usuario_medico 
        FOREIGN KEY (id_usuario) REFERENCES usuario_sistema(id_usuario)
        ON DELETE CASCADE,
    CONSTRAINT fk_especialidad_medico
        FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
        ON DELETE RESTRICT
);

CREATE TABLE disponibilidad_medicos (
    id_disponibilidad INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_medico INTEGER NOT NULL,
    dia_semana VARCHAR NOT NULL CHECK (dia_semana IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT fk_medico_disponibilidad
        FOREIGN KEY (id_medico) REFERENCES medicos(id_medico)
        ON DELETE CASCADE
);

CREATE TABLE citas (
    id_cita INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero_seguimiento VARCHAR UNIQUE,
    id_paciente INTEGER NOT NULL,
    id_medico INTEGER NOT NULL,
    fecha_cita DATE ,
    hora_cita TIME ,
    preferencia_turno VARCHAR CHECK (preferencia_turno IN ('AM','PM')),
    tipo_cita VARCHAR CHECK (tipo_cita IN ('nueva','control')),
    estado VARCHAR CHECK (estado IN ('pendiente','confirmada','cancelada','atendida')) DEFAULT 'pendiente',
    fecha_solicitud DATE DEFAULT CURRENT_DATE,
    fecha_confirmacion DATE,
    tipo_solicitud VARCHAR CHECK (tipo_solicitud IN ('web','presencial')),
    cancelado_por VARCHAR(20),
    creado_por VARCHAR(20),
    CONSTRAINT fk_paciente_cita 
        FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
        ON DELETE CASCADE,
    CONSTRAINT fk_medico_cita 
        FOREIGN KEY (id_medico) REFERENCES medicos(id_medico)
        ON DELETE CASCADE
);



CREATE TABLE historial_consulta (
    id_consulta INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cita INTEGER NOT NULL,
    sintomas TEXT NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cita_historial
        FOREIGN KEY (id_cita) REFERENCES citas(id_cita)
        ON DELETE CASCADE
);

-- Permisos
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin_clinica;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO admin_clinica;
