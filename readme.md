# Jida Front-end compiler.


Generador simple de bundles de código javascript del
lado cliente para integrar en proyectos con PHP.


Implementación:

```

    const Manager = require('jida-frontend-compiler');
    const manager = new Manager('./config');

```
Parametros:

- config {mixed}: Puede ser un string o la ubicación relativa de un 
archivo JSON.

Ejemplo de configuracion:

```
{
  "path": "../Aplicacion",
  "env": "dev",
  "dev": {
    "imports": {
      "path": "/htdocs/modules/libs/",
      "files": {
        "react": "react.development.js",
        "reactDOM": "/htdocs/modules/libs/react-dom.development.js"
      }
    }
  },
  "prod": {
    "compress": true,
    "imports": {
      "path": "/htdocs/modules/libs/",
      "files": {
        "react": "react.development.js",
        "reactDOM": "react-dom.development.js"
      }
    }
  }
}
```