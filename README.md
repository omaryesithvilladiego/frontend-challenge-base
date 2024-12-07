# Quickbet Movies - Desarrollador Fullstack

## Descripción del Proyecto

- **Frontend**: Desarrollado en **Next.js** con **TypeScript** basado en un diseño proporcionado en **Figma**.
<a href=''>Link aquí<a>
- **Backend**: Desarrollado con **Node.js** y **Express**, que proporciona APIs para la autenticación de usuarios y la consulta de películas utilizando datos de **The Movie Database (TMDB)**.

---

## Configuración Inicial

### 1. Clona el Repositorio

Comienza por clonar el repositorio en tu máquina local usando el siguiente comando:

git clone <URL_DEL_REPOSITORIO>
cd backend-challenge-base

### 2. Crea el Archivo de Configuración
Dentro del directorio principal del proyecto, renombra el archivo .env.example a .env para que contenga las configuraciones de entorno necesarias para ejecutar el proyecto.


### 3. Configura las Variables de Entorno
Abre el archivo .env en tu editor de texto preferido y configura las siguientes variables:


APP_PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=0898
DB_NAME=movies
JWT_SECRET=loquemioclarose

Descripción de las Variables

APP_PORT: El puerto en el que se ejecutará la API del backend (default: 3001).
DB_HOST: La dirección del servidor de la base de datos (default: localhost).
DB_PORT: El puerto en el que la base de datos escucha (default: 5432).
DB_USERNAME: El nombre de usuario para acceder a la base de datos (default: postgres).
DB_PASSWORD: La contraseña asociada con el nombre de usuario de la base de datos (default: 0898).
DB_NAME: El nombre de la base de datos utilizada por la aplicación (default: movies).
JWT_SECRET: La clave secreta utilizada para firmar y verificar los tokens JWT, que se utiliza en la autenticación.

### 4. Configuración de la Base de Datos
Asegúrate de tener PostgreSQL instalado en tu máquina y de crear una base de datos con el nombre especificado en las variables de entorno (movies). Si aún no tienes PostgreSQL instalado, puedes descargarlo e instalarlo desde su página oficial.

Para crear la base de datos, abre una terminal y ejecuta los siguientes comandos (asegurándote de estar en el entorno de PostgreSQL):


psql -U postgres
CREATE DATABASE movies;

### 5. Instalación de Dependencias
Una vez que hayas configurado las variables de entorno, navega hasta la carpeta raíz del proyecto (si no lo has hecho ya) y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

npm install

### 6. Ejecuta la Aplicación
Para iniciar el servidor de desarrollo, utiliza el siguiente comando:
npm run start:dev
Este comando iniciará el servidor en el puerto 3001 o el que hayas configurado en la variable APP_PORT de las variables de entorno.

### 8. Accede a la API
Una vez que el servidor esté en ejecución, podrás acceder a la API a través de http://localhost:3001/api en tu navegador.

### 9. Prueba los Endpoints de la API
Endpoint para Registro de Usuario (Sign Up)
POST /users/signUp
Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
Endpoint para Iniciar Sesión (Login)
POST /users/login
Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}

Si el login es exitoso, el servidor retornará un token JWT.

Endpoint para Filtrar Películas
GET /movies

Parámetros:
genres: Géneros de las películas (separados por coma).
popularity: Valor booleano para indicar si se desea filtrar por popularidad.
page: Número de página para paginar los resultados.
Ejemplo de uso:


http://localhost:3001/movies?genres=action,comedy&popularity=true&page=1
Endpoint para Buscar Película por Nombre
GET /movies/{name}

Parámetros:
name: Nombre de la película a buscar.

