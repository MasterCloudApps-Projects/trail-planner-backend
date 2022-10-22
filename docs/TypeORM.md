# Instalación

Para instalar TypeORM ejecutamos:

```shell
npm install @nestjs/typeorm typeorm pg
```
En `package.json` añadimos los scripts para el cli de TypeORM, de forma que 
podamos ejecutar fácilmente la generación y creación de las migraciones.

```
  "scripts": {
    // ... Añadimos esta configuración a lo que ya haya
    "typeorm": "ts-node ./node_modules/typeorm/cli",
    "typeorm:run-migrations": "npm run typeorm migration:run -- -d ./typeOrm.config.ts",
    "typeorm:generate-migration": "npm run typeorm -- -d ./typeOrm.config.ts migration:generate ./migrations/$npm_config_name",
    "typeorm:create-migration": "npm run typeorm -- migration:create ./migrations/$npm_config_name",
    "typeorm:revert-migration": "npm run typeorm -- -d ./typeOrm.config.ts migration:revert",
  },
```

En el raíz del proyecto tenemos la configuración de acceso a la base de 
datos en `typeOrm.config.ts`:

```typescript
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [ /** Listado de entidades */],
  migrations: ['./migrations/*.ts'],
});
```

# Crear migraciones
A partir de las entidades:
```shell
npm run typeorm:generate-migration --name=<Nombre de la migración>
```
Para ejecutar las migraciones y sincronizar la base de datos:
```shell
npm run typeorm:run-migrations
```
## Tipos de datos Geoespaciales
Para poder utilizar los tipos de datos geoespaciales que da la extensión 
PostGIS de Postgres tenemos que instalar la librería de tipos:
```shell
npm install --save @types/geojson 
```
TypeORM tiene soporte para tipos Geoespaciales en GeoJSON. En el caso de 
Postgres las columnas tienen que ser etiquetadas como geometry/object, en 
caso de MySQL/MariaDB como string.

En las entidades, anotamos los campos de tipo geoespacial:
```typescript
  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: false,
    spatialFeatureType: 'Point',
  })
  coordinates: string;
```