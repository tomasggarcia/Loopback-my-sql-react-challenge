# Loopback-my-sql-react-challenge

## Inicializar el proyecto:

### FrontEnd:

En /movies: 

```sh
$ npm install
$ npm start
```


### BackEnd:

Configuracion previa:
* Instalar MySQL (v8.0)
* Crear base de datos 'movies_users'
* Configurar acceso a la base de datos en '/api/src/datasources/mysql-db.datasource.ts' (por defecto user:'root' pass:'password')


En /api:
```sh
$ npm install
$ npm run buid
$ npm run migrate
$ npm start
```
