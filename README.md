# Proyecto de Recetas: Fresh Food

Este proyecto es una aplicación web que ofrece una amplia colección de recetas, tanto vegetarianas como no vegetarianas, para satisfacer todos los gustos.  Utilizando Firebase como plataforma backend, este proyecto se basa en la eficiencia de Firestore Database para almacenar información de las recetas y Firestore Storage para alojar las imágenes de forma segura.

**Funcionalidades destacadas:**

* **Amplia colección de recetas:** La aplicación incluye una selección diversa de recetas con categorías específicas, como vegetarianas, veganas, sin gluten, etc.
* **Interfaz amigable:** La interfaz de usuario es intuitiva y fácil de usar, permitiendo a los usuarios navegar, buscar y filtrar recetas según sus preferencias.
* **Imágenes atractivas:** Imágenes de alta calidad, almacenadas en Firestore Storage, ilustran cada receta, haciendo que la experiencia sea aún más atractiva.
* **Detalles completos:** Cada receta incluye una descripción detallada, los ingredientes necesarios, las instrucciones paso a paso y los tiempos de preparación y cocción.
* **Integración con SweetAlert:** La aplicación utiliza SweetAlert para notificaciones amigables, que mejoran la experiencia del usuario y proporcionan feedback claro.
* **Componentes reutilizables:**  Se utilizan componentes de React para garantizar la coherencia y la reusabilidad del código, facilitando el mantenimiento y la escalabilidad del proyecto.
* **Módulos CSS:** Los estilos se manejan con CSS Modules, asegurando un código CSS organizado y fácil de mantener.
* **Analítica con Chart.js:**  Se incluyen gráficos y estadísticas utilizando Chart.js para ofrecer información valiosa sobre el uso de la aplicación y el éxito de las recetas.
* **Backend robusto:** Un backend Node.js con Express se encarga de gestionar las consultas a Firestore y las operaciones de subida de imágenes.
* **Operaciones CRUD:** La aplicación implementa operaciones CRUD (Create, Read, Update, Delete) para las recetas, permitiendo la gestión completa de la base de datos de recetas.

**Tecnologías utilizadas:**

* **Frontend:** React, Vite, SweetAlert, React Icons, CSS Modules, Chart.js
* **Backend:** Node.js, Express
* **Base de datos:** Firestore Database
* **Almacenamiento de imágenes:** Firestore Storage

**Ventajas:**

* **Escalabilidad:** El uso de Firebase permite una escalabilidad eficiente, adaptándose a un aumento en el número de usuarios y recetas.
* **Seguridad:** Firestore proporciona medidas de seguridad robustas para proteger la información de las recetas y las imágenes.
* **Velocidad y rendimiento:**  La arquitectura basada en cloud de Firebase garantiza un rendimiento rápido y eficiente.

**Público objetivo:**

* Amantes de la cocina que buscan inspiración para nuevas recetas.
* Personas que buscan recetas vegetarianas o veganas.
* Cocineros aficionados que desean ampliar sus habilidades culinarias.
* Cualquier persona interesada en recetas deliciosas y fáciles de preparar.

**Próximos pasos:**

* Implementar funciones de usuario: Permitir que los usuarios registren cuentas, guarden recetas favoritas y compartan sus propias recetas.
* Añadir funcionalidades de búsqueda más avanzadas: Buscar por ingredientes, dieta, tiempo de preparación, etc.
* Integrar recetas de diferentes culturas y regiones.

Este proyecto tiene como objetivo ser una herramienta completa y accesible para que los usuarios encuentren y preparen recetas deliciosas en un ambiente fácil de usar y seguro. 

Este repositorio contiene el backend diseñado para gestionar los inventarios de los servidores de una forma organizada y accesible.

## Características principales
- [x] 🔒 Autenticación JWT
- [x] 🔎 Consulta de empleados
- [x] ➕ Agregar nuevos empleados
- [x]  ✏️ Actualizar información
- [x]  ⛔ Eliminar empleados del la nomina
- [x] 👮 Registro de las acciones de los usuarios

## Instalación

 1. **Clonar el repositorio**
```bash
git clone https://github.com/xeduark/AppRecetas.git
cd backend
```

2. **Configurar el entorno**
   1. Crear archivo ``.env`` basado en ``.env.example``
   2. Configurar las variables de entorno:
      - ``FIREBASE_PROJECT_ID``
      - ``FIREBASE_PRIVATE_KEY``
      - ``FIREBASE_CLIENT_EMAIL``
      - ``JWT_SECRET``
      - `` GOOGLE_APPLICATION_CREDENTIALS``
      - ``GCLOUD_PROJECT``
      - ``GCLOUD_BUCKET``


3. **Instalar las dependencias**
```bash
npm install 
```
5. **Iniciar la API**
```bash
npm start
```
## Contribuciones
Si quieres contribuir en el desarrollo, por favor envia un **Pull Request**. Recuerda antes asegurarte que funcione correctamente en local, para intentar entre todos, tener un repositorio limpio y funcional.

## Contacto

**Jorge Eduardo Muñoz Quintero**\
*Desarrollador principal*\
jemunozqui@cesde.net | xeduarkk@gmail.com

