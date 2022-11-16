- [x] Poner parámetros de entrada al controlador en forma de DTO para Upload 
  GPX.
  - Añadido el Validator en `main.ts` y el DTO `uploadGPX.dto.ts` con las 
    reglas de validación.
- [x] Hacer que funcione con ficheros grandes (stream?).
  - Hecho con `chunk` en las opciones de `save`
- [ ] Crear el servicio para hacer el parser
- [x] Crear endpoint para obtener info del GPX.
- [x] Crear endpoint para borrar GPX.
- [x] Endpoint para editar nombre, tipo y descripción.
- [x] Quitar el eager y hacer un endpoint de info de puntos.
- [ ] Cambiar el tipo de dato de elevation a float
  - Primero crear el campo que permita nulls `elevation_float` y copiar `elevation`
  - Hacer que escriba en los dos campos
  - Eliminar el campo `elevation` y que solo escriba en `elevation_float`
  - Cambiar el nombre al campo `elevation_float` a `elevation` y que escriba en 
    `elevation`
- [ ] Cambiar el endpoint de Upload para que suba a un S3

- [x] Endpoint para cargar segmentos
- [ ] Endpoint para borrar segmentos
- [ ] Endpoint para obtener la lista de segmentos
- [ ] Endpoint para obtener la información de un segmento

- [ ] Endpoint CRUD para acciones del segmento
- [ ] Quitar Entity del nombre de las clases
- [ ] Cambiar la relación de trackpoints en Track y TrackPoint
- [ ] Devolver DTOS en los endpoints