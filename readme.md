# Online Store - BSALE 

<hr>

_Desarrollo, despliegue y uso de una API de **/Consulta de Productos**  de  [BSALE](https://www.bsale.com.pe/).馃挭_

## M贸dulos realizados 馃ぉ

- Creaci贸n y consumo de la [API](https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api).
- Carga de productos.
- Filtro de productos por categor铆as.
- B煤squedad de productos por texto ingresado.
- Ordenamiento por precio (mayor o menor).
- Ordenamiento por p谩ginas.

## Desktop

![Versi贸n Desktop](catalogo/img/screenshots/bsaledemo.png?raw=true "Demo Versi贸n Desktop")


_Toda la documentaci贸n y explicaci贸n a detalle, se encuentra dentro de los propios archivos._

_Pase o no pase, 隆Gracias por lo oportunidad!_ 馃檶鈿?

## Backend
El Backend es una API REST que est谩 conectada a una base de datos MySQL. 
Est谩 implementado con PHP nativo, y MySqli PDO para las conexiones a BD, y evitar las inyecciones sql, as铆 como la inclusi贸n de una configuraci贸n _.htaccess_ para el control de URL'S amigables.

* /api/    :
    * Trae todos los productos 
    * Ordenados de menor a mayor por precio
    * 12 productos por p谩gina
    * Ejemplo de uso: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/


* /allcategories/    :
    * Trae todas las categor铆as 
    * Ordenadas por nombre    
    * Ejemplo de uso: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/allcategories


* /nropages/    :
    * Trae el n煤mero de p谩ginas a mostrar seg煤n el n煤mero de items a mostrar,
    * Por defecto el n煤mero de items por p谩ginas es 12
    * Ejemplo de uso: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/nropages


* /category/id  : 
    * Trae productos filtrados por el ID de la categor铆a filtrada
    * Ordenados de menor a mayor por precio
    * Example of use: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/category/6


* /page/nropage
    * Trae los productos filtrados por el n煤mero de p谩gina correspondiente
    * Ordenados de menor a mayor por precio
    * Example of use: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/page/1

#### Tecnolog铆as usadas
* PHP Nativo

<hr>


## Frontend
El Frontend se desarroll贸 principalmente con la librer铆a TailwindCSS, HTML y JavaScript Vanilla. 
Este consume la API REST de Backend, y muestra en pantalla la lista de productos como tarjetas en una lista de 12 productos por p谩gina.

Ofrece al usuario la posibilidad de buscar productos a trav茅s de un campo de entrada y un bot贸n de b煤squedad, filtrar los productos por categor铆a mediante un opci贸n de men煤s en la barra de navegaci贸n y ordenar por precio de menor a mayor, e incluye un filtro de precios seg煤n resultados.

#### Tecnolog铆as usadas
* HTML
* TailwindCSS
* Javascript

<hr>

## C贸mo instalar/ejecutar

### Prerequisitos
- Tener instalado XAMP o cualquier servidor APACHE

1. Clonar proyecto, y abrirlo, tendr谩 a disposici贸n la carpeta API(Backend) y CATAL脫GO(Frontend)
```
git clone https://github.com/pierre-juarez/onlinestore_bsale.git
cd onlinestore_bsale
```
2. Mover la carpeta API (Backend) a la carpeta _htdocs_ , o cualquier carpeta ra铆z del servidor

3. La carpeta CAT脕LOGO (Frontend) puede ser modificado en cualquier carpeta a disposici贸n

<hr>

## Running deployments
* Frontend: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/catalogo/
* Backend: https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/


## Cr茅ditos


鈱笍 Desarrollado y dise帽ado con 鈾ワ笍 por [Pierre Juarez](https://github.com/pierre-juarez) 馃槉


