# Documentación sobre la estructura del proyecto y cómo ejecutarlo.

## Descripción del Proyecto

Este proyecto es una aplicación completa que combina tanto el Backend desarrollado en .NET Core 7 como el Frontend en React JS. El objetivo de la aplicación web es desarrollar una web que permita gestionar clientes y libros, realizar ventas, y visualizar las ventas realizadas.

### Las decisiones arquitectónicas tomadas.

    Decidí estructurar mi proyecto de forma modularizada ya a ayuda a mantener el código limpio, fácil de mantener y escalable. Cada parte del proyecto tiene su responsabilidad bien definida, lo que permite cambios y mejoras sin afectar otras partes del sistema.

## Tecnologías Utilizadas

- **Backend:** .NET Core 7
- **Frontend:** React JS
- **Base de Datos:** Sql Server
- **Cliente HTTP:** Axios (Frontend)
- **Estilos:** Bootstrap (Frontend)

## Requisitos Previos

Antes de poder ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **.NET SDK 7.0**: [Descargar e instalar .NET 7.0]
- **Node.js**
- **SQL Server**
- **Visual Studio**
- **Visual Studio Code**

## Estructura de el proyecto

### Backend

- BookStoreAPI
  - Constans
    - Status.cs
  - Controllers
    - Books
      - BookController.cs
    - Clients
      - ClientController.cs
    - Sales
      - SaleController.cs
  - Data
    - DbConnection.cs
  - Dtos
    - BookDto.cs
    - ClientDto.cs
    - SaleDetailDto.cs
    - SaleDto.cs
  - Models
    - Book.cs
    - Client.cs
    - SaleDetail.cs
    - Sale.cs
  - Repositories
    - Interfaces
      - IBookRepository.cs
      - IClientRepository.cs
      - ISaleRepository.cs
    - BookRepository.cs
    - ClientRepository.cs
    - SaleRepository.cs
  - appsettings.json
  - Program.cs

### Frontend

- bookstoreapp
  - public
  - src
    - api
      - api.js
    - assets
    - components
      - book
        - bookComponent.js
      - client
        - clientComponent.js
      - sale
        - saleComponent.js
      - headerComponent.js
      - homeComponent.js
      - paginationComponent.js
  - config
    - constants.js
  - domain
    - book
      - bookRepository.js
    - client
      - clientRepository.js
    - sale
      - saleRepository.js
  - utils
    - utils.js
  - App.css
  - App.js
  - App.test.js
  - index.css
  - index.js
  - package-lock.json
  - package.json
  - README.md

## Configuración del Proyecto

**Clonar el repositorio:**

```bash
git clone https://github.com/brailinreyes10/bookstoreweb.git
```

## Configuración de la Base de datos

1. **Buscar en la carpeta clonada el archivo .sql el cual debera correr en Microsoft Sql Server Management Studio para que se genere la Base de datos del proyecto.**

## Configuración del Backend

1. **En la carpeta clonada abrir la solución que esta en "BookStoreAPI" en Visual Studio.**

2. **Configuración de la Base de Datos:"**

   Edita el archivo appsettings.json para configurar la cadena de conexión a tu base de datos, por ejemplo:

   ```bash
   "ConnectionStrings": {
       "DefaultConnection": "Server=.;Database=NombreDeTuBD Trusted_Connection=True;MultipleActiveResultSets=true"
       }
   ```

3. **Luego de que configure todo debe poder correr el backend sin problemas**

   El Backend estará disponible en https://localhost:7157 o la URL especificada.

## Configuración del Frontend

1. **En la carpeta clonada abrir la carpeta "bookstoreapp" en donde prefiera (cmd, Visual Studio Code, o el IDE de su preferencia)**

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar el Frontend**
   ```bash
   npm start
   ```

## Despliegue

### Publicar el Backend

- **Primero, debes hacer build en la solución y luego ejecutar el comando debajo para construir y publicar la aplicación localmente en la carpeta "bin/Release/{target-framework}/publish"**

  ```bash
  dotnet publish --configuration Release
  ```

- **Ejecutar la Aplicación Localmente**

  Una vez que la publicación esté completa, puedes ejecutar la aplicación directamente desde la carpeta publish que se generó.

  - Navega al directorio de publicación y ejecuta el comando:

    ```bash
    cd bin/Release/{target-framework}/publish

    dotnet BookStoreAPI.dll
    ```

    Esto iniciará tu aplicación en el puerto el 5000.
    http://localhost:5000

### Publicar el FrontEnd

#### **_Antes de servir la aplicación debe asegurarse que el Backend esta corriendo correctamente._**

1. **Necesitas asegurarte de cumplir con los siguientes requisitos:**

   - NodeJs y npm instalados

   - Dependencias instaladas
     ```bash
     npm install
     ```

2. **Ejecutar el comando debajo en la raiz de el proyecto que es la cartepa "bookstoreapp" para construir la aplicacion:**

   ```bash
   cd bookstoreapp

   npm run build
   ```

3. **Servir la Aplicación:**
   Después de que la construcción se haya completado, ejecuta el comando debajo en la raiz de el proyecto que es la cartepa "bookstoreapp":

   ```bash
   cd bookstoreapp

   serve -s build
   ```

Este `README.md` proporciona una guía clara sobre cómo entender, configurar, ejecutar y contribuir al proyecto, tanto para el Backend en .NET Core 7 como para el Frontend en React JS.

#
