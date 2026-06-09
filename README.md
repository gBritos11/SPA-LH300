# Programación Web Avanzada - SPA

## Integrantes
- Britos Gabriel - FAI 5629 - Project Manager
- Veronica Lopez - FAI 5481 - Developer
- Paula Viggiano - FAI 5516 - Developer

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


### Agregamos Testing

# documentación oficial de las herramientas recomendadas por la catedra.
Vitest -> https://vitest.dev/
React Testing Library -> https://testing-library.com/docs/react-testing-library/intro/
jest-dom -> https://testing-library.com/docs/ecosystem-jest-dom/
user-event -> https://testing-library.com/docs/user-event/intro/

#| Librería | Versión | Para qué sirve |
|---|---|---|
| `vitest` | ^4.1.6 | Runner de tests compatible con Vite. Reemplaza a Jest pero con la misma API |
| `@testing-library/react` | ^16.3.2 | Renderiza componentes React en un DOM simulado para poder testearlos |
| `@testing-library/jest-dom` | ^6.9.1 | Agrega matchers como `toBeInTheDocument()` para verificar elementos del DOM |
| `@testing-library/user-event` | ^14.6.1 | Simula acciones reales del usuario como clicks y escritura |
| `jsdom` | ^29.1.1 | Simula el navegador (DOM) en Node.js para que los tests puedan correr |


### Configuración

**`vite.config.js`** — Vitest se configura dentro del mismo archivo de Vite:
```js
test: {
    globals: true,          // permite usar describe/it/expect sin importarlos
    environment: 'jsdom',   // simula el navegador
    setupFiles: './src/setupTests.js'  // archivo que corre antes de cada test
}
```

**`src/setupTests.js`** — Se ejecuta antes de cada test e importa los matchers de jest-dom:
```js
import '@testing-library/jest-dom';
```

---

### Cómo ejecutar los tests

```bash
# Modo watch: re-corre los tests automáticamente al guardar un archivo
npm run test

# Ejecución única: corre todos los tests una sola vez y termina
npm run test:run

# Correr un archivo de test específico
npx vitest run src/componentes/Boton/Boton.test.jsx
```

---



