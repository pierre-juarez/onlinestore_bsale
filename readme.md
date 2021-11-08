# Online Store - BSALE 

<hr>

_Desarrollo, despliegue y uso de una API de **/Consulta de Productos**  de  [BSALE](https://www.bsale.com.pe/).💪_

## Módulos realizados 🤩

- Creación y consumo de la [API](https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api).
- Carga de productos.
- Filtro de productos por categorías.
- Búsquedad de productos por texto ingresado.
- Ordenamiento por precio (mayor o menor).
- Ordenamiento por páginas.

## Desktop

![Versión Desktop](catalogo/img/screenshots/bsaledemo.png?raw=true "Demo Versión Desktop")


_Toda la documentación y explicación a detalle, se encuentra dentro de los propios archivos._

_Pase o no pase, ¡Gracias por lo oportunidad!_ 🙌⚡

## Backend
El Backend es una API REST que está conectada a una base de datos MySQL. 
Está implementado con PHP nativo, y MySqli PDO para las conexiones a BD, y evitar las inyecciones sql, así como la inclusión de una configuración _.htaccess_ para el control de URL'S amigables.

* /api/    :
    * Trae todos los productos 
    * Ordenados de menor a mayor por precio
    * 12 productos por página
    * Ejemplo de uso: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/


* /allcategories/    :
    * Trae todas las categorías 
    * Ordenadas por nombre    
    * Ejemplo de uso: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/allcategories


* /nropages/    :
    * Trae el número de páginas a mostrar según el número de items a mostrar,
    * Por defecto el número de items por páginas es 12
    * Ejemplo de uso: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/nropages


* /category/id  : 
    * Trae productos filtrados por el ID de la categoría filtrada
    * Ordenados de menor a mayor por precio
    * Example of use: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/category/6


* /page/nropage
    * Trae los productos filtrados por el número de página correspondiente
    * Ordenados de menor a mayor por precio
    * Example of use: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/page/1

#### Tecnologías usadas
* PHP Nativo

<hr>


## Frontend
El Frontend se desarrolló principalmente con la librería TailwindCSS, HTML y JavaScript Vanilla. 
Este consume la API REST de Backend, y muestra en pantalla la lista de productos como tarjetas en una lista de 12 productos por página.

Ofrece al usuario la posibilidad de buscar productos a través de un campo de entrada y un botón de búsquedad, filtrar los productos por categoría mediante un opción de menús en la barra de navegación y ordenar por precio de menor a mayor, e incluye un filtro de precios según resultados.

#### Tecnologías usadas
* HTML
* TailwindCSS
* Javascript

<hr>

## Cómo instalar/ejecutar

### Prerequisitos
- Tener instalado XAMP o cualquier servidor APACHE

1. Clonar proyecto, y abrirlo, tendrá a disposición la carpeta API(Backend) y CATALÓGO(Frontend)
```
git clone https://github.com/pierre-juarez/onlinestore_bsale.git
cd onlinestore_bsale
```
2. Mover la carpeta API (Backend) a la carpeta _htdocs_ , o cualquier carpeta raíz del servidor

3. La carpeta CATÁLOGO (Frontend) puede ser modificado en cualquier carpeta a disposición

<hr>

## Running deployments
* Frontend: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/catalogo/
* Backend: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/


## Créditos


⌨️ Desarrollado y diseñado con ♥️ por [Pierre Juarez](https://github.com/pierre-juarez) 😊


