# TallerSupermarket

Descripción breve de lo que hace la aplicación 


## Integrantes 

* DAVID CORREDOR HENAO


## Instrucciones de Ejecución

pasos para ejecutar el proyecto de manera local:

## Requisitos previos
* Node.js
* Base de datos utilizada: PostgreSQL 

## Repositorio
[https://github.com/davidhenao742-jpg/tallerSupermarket.git)

## Instalar dependencias 

## Variables de entorno

crea un archivo .env en la raiz
(PORT=3000
DB_URL=tu_conexion_aquí)


## Ejecutar el proyecto

npm start   # O el comando correspondiente para iniciar el servidor

## Ejemplo de Endpoints

crear un nuevo producto:

* {
  "nombre": "Arroz 1Kg",
  "precio": 4500,
  "stock": 50
}

Respuesta:

* {
  "id": 3,
  "nombre": "Arroz 1Kg",
  "precio": 4500,
  "stock": 50,
  "mensaje": "Producto registrado correctamente"
}