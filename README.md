# Programación Web Avanzada - SPA

## Integrantes
- Britos Gabriel - FAI 5629 - Project Manager
- Veronica Lopez - FAI 5481 - Developer
- Paula Viggiano -  - Developer

## Descripción del Proyecto
Esta es una Single Page Application (SPA) desarrollada con React y Tailwind CSS para el dominio elegido. 
El proyecto incluye:
- Consumo de API externa (MockAPI).
- Navegación con React Router.
- Internacionalización (i18next).
- Gestión de favoritos con persistencia local.

## Tecnologías
- React (Vite)
- Tailwind CSS v4
- React Router 
- i18next

## Guía de flujo de trabajo GIT
***-> RAMAS***

- **main**: Es la rama de producción. Nadie sube código aquí directamente. Solo se toca para entregas finales.

- **develop**: Es la rama de integración. Aquí se une el trabajo de todos. Es la rama "base" para empezar a trabajar.

- **Ramas de Tarea** ('tarea'/'nombre-tarea'): Cada vez que alguien empiece una tarea de Linear, debe crear una rama nueva desde develop.

Ejemplo para crear una nueva rama para empezar una tarea: git checkout -b 'tarea'/'enrutamiento'

***-> CAMBIOS DIARIOS***
- Bajar cambios: git checkout develop -> git pull origin develop.

- Crear tu rama: git checkout -b 'tarea'/'mi-tarea'.

- Trabajar y Commitear:
    -> Añadir cambios: git add .
    -> Guardar: git commit -m "descripción clara de lo que hiciste".

- Subir cambios: git push origin 'tarea'/'mi-tarea.'

***-> PROCESO DE MERGE***
- Cuando termines una tarea: 
    -> Ve a GitHub y crea un Pull Request (PR) desde tu rama hacia develop.

    ->Pedir revisión: Etiqueta a un compañero o al PM para que revise el código.
    
    -> Aceptar el Merge: Una vez aprobado, el PM o el autor hace clic en "Squash and merge".

    ->Actualizar local: Todos los demás deben hacer git pull origin develop para tener lo nuevo.