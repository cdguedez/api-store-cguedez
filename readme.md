# API-STORE-CDGUEDEZ

Esta es una api que simula un funcionamiento basico de una tienda virtual, la misma fue realizada con [nodejs](https://nodejs.org/es/) y [expressjs](https://expressjs.com/es/)

## Librerias utilizadas
- Joi: funciona para crear nuestros schemas de los recursos que usaremos en nuestra api.
- @hapi/boom: manejador de errores desarrollado por el framework @hapi
- sequelize: ORM de javascript el cual configuramos para que funcione inicialmente con mysql (trabajo para que funcione dinamicamente en postgres y mysql)

## Instalacion del proyecto

Al ser una api realizada con nodejs necesitamos tener nodejs instalado en nuestro pc, la version con la que fue realizada fue la 14.17.1.

Puedes utilizar docker (originalmente asi fue como la cree)

ejecutaremos el comando yarn `` para instalar las dependencias de nuestro proyecto

## Ejecutar servidor de desarrollo

en las dependencias que instalamos tenemos **nodemon** el cual nos servira para que nuestro sevridor se refresque cada vez que realizamos un cambio en nuestro codigo.

ejecutamos nuestro servidor con el comando. ` yarn dev `

## Ejecucion de migraciones

Con las dependencias que acabamos de instalar ya instalamos el cli de sequelize, el cual nos ayudara a realizar las migraciones a nuestra base de datos.

para ejecutarlas he creado varios scripts para que sea mas facil (los puedes ver el package.json)

comando para crear una nueva migracion: `yarn migrations:generate`

comando para ejecutar las migraciones: `yarn db:migrate`

comando para eliminar la ultima migracion: `yarn db:migrate:undo`

## En Postman

[API-STORE POSTMAN](https://web.postman.co/workspace/API-STORE~b09dbd66-3b3b-431e-a11d-a37b9d0ceb05)
