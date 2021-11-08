const $productContainer = document.querySelector("#productContainer");
const $cbxOrder = document.querySelector("#cbxOrder");
const $containerFilters = document.querySelector("#containerFilters");
const $pagination = document.querySelector("#pagination");
const $spnCountProducts = document.querySelector("#spnCountProducts");
const $txtBuscador = document.querySelector("#txtBuscador");


/**
 * Función que trae e imprime las categorías desde la API, por default imprime todos los productos, con la categoría TODOS seleccionado
 */
getCategories();

/**
 * Función que trae las categorias de la API, y luego las imprime en pantalla de la mano de la 
 * función "printFilterCategory"
 */
function getCategories(){    
    const api_url = 'https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/allcategories';
    fetch(api_url)
    .then(response => response.json())
    .then((category) => {
        printFiltersCategories(category); 
        printPages();              
    })
    .catch(err => console.log(err));
}

/**
 * Función que imprime las categorías traídas desde la APIS
 * @param {object} categories Categorías traídas desde la BD en formato de objeto
 */
 function printFiltersCategories(categories){

    $containerFilters.innerHTML = `
    <a id="todos" class="category cursor-pointer rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" onclick="changeCategory();">
        <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
            <p>Todos</p>
        </div>
    </a>
    `;

    categories.forEach((element) => {
        $containerFilters.innerHTML += `
        <a id="category-${(element.id)}" class="category cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" onclick="changeCategory(this.id);" data-id-category="${element.id}">
            <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                <p>${capitalizarPrimeraLetra(element.name)}</p>
            </div>
        </a>
        `
    });


    /** Una vez cargadas todas las categorías traemos TODOS los productos */
    getProduct();    

}

/**
 * Función que consulta la API, recibe los datos, y los proceso e imprime con la función "renderProduct"
 * @param {string} api_url Recibe la URL de la API a consultar, la cual varía según la consulta a realizar
 * @param {string} order Tipo de order para filtrarlo en el render o pintado de la data
 */
function getProduct(api_url = `https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/`, order = 'desc'){    
    localStorage.setItem("api_url", JSON.stringify(api_url));    
    fetch(api_url)
    .then(response => response.json())
    .then((product) => {
        if(Object.entries(product).length !== 0){ //Si el elemento trae algún registro, pintamos el/los producto(s)
            renderProduct(product, order);
        }else{ //De lo contrario le mostramos un mensaje al usuario y ocultamos la paginación
            $productContainer.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full flex justify-center" role="alert">                
                <span class="block sm:inline">Lo sentimos 🙁, no hemos encontrado resultados para: "<strong>${$txtBuscador.value}</strong>"</span>                
            </div>`;
            $pagination.style.display = 'none';
        }
    })
    .catch(err => console.log(err));
}



/**
 * Función que pinta el/los producto(s) en el DOM según un template creado
 * @param {object} product Recibimos el PRODUCT en formato JSON para imprimirlo en el DOM
 * @param {string} order Filtro de order para pintar los productos 
 */
function renderProduct(product, order){ 

    $productContainer.innerHTML = '';    //Antes de renderizar un nuevo producto, vacíamos el contenedor
    sortJSON(product,'price',order); //Ordenamos el JSON según el filtro recibido    
                    
    let countProducts = Object.keys(product).length,
        url_image,
        discount,
        price_format,
        symbol_money = "S./"; 
                        
    $spnCountProducts.innerHTML = `Mostrando (${countProducts}) productos`;
    $spnCountProducts.style.display = 'block'; //Mostramos la paginación, la cuál no pude terminar, mil disculpas por eso

    product.forEach(product => {       
        url_image = ((product.url_image) === '' || (product.url_image) === null) ? './img/not_available.png' : product.url_image,
        discount = (product.discount == 0) ? '' : `<span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-400 rounded-full">-${product.discount}%</span>`,
        price_format = `${symbol_money} ${(product.price).slice(0,-2)}.${(product.price).slice(-2)}`;

        $productContainer.innerHTML += 
        `<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="#">
                <img class="hover:grow hover:shadow-lg" src="${url_image}">
                <div class="pt-3 flex items-center justify-between">
                    <p class="">${ (product.name)  }</p>
                    ${discount}
                </div>
                <p class="pt-1 text-gray-900">${price_format}</p>
            </a>
        </div>`;        
    });
    
}

$cbxOrder.addEventListener('change',orderProduct);

/**
 * Función que se ejecuta al seleccionar un nuevo filtro de orden para los productos, puede ser MAYOR PRECIO ó MENOR PRECIO
 */
function orderProduct(){    
    if($cbxOrder.value === 'higher_price'){
        getProduct(JSON.parse(localStorage.getItem("api_url")),'asc');
    }else{
        getProduct(JSON.parse(localStorage.getItem("api_url")),'desc');
    }    
}


/**
 * Función que retorna los productos filtrados por CATEGORIA SELECCIONADA, obtenidos por el ID de la misma
 * según la selección realizada
 * @param {number} category ID de la categoria a filtrar para realizar el pedido a la API 
 */
function changeCategory(category = null){

    $txtBuscador.value = "";
    let categorys = document.querySelectorAll(".category"), div, page1, pages;

    $cbxOrder.selectedIndex = 0;
    
    categorys.forEach(element => {           
        div = document.querySelector('#'+element.id+' div');          
        div.classList.remove('bg-indigo-100');
        div.classList.remove('text-indigo-700');
    });
        
    if(category !== null){        

        document.querySelector("#"+category+" div").classList.add('text-indigo-700');
        document.querySelector("#"+category+" div").classList.add('bg-indigo-100');        
        let id_category = document.getElementById(''+category+'').getAttribute('data-id-category'); // foto.jpg        
        getProduct(`https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/category/${id_category}`);
        $pagination.style.display = 'none';
        return;

    }

    div = document.querySelector("#todos div");
    page1 = document.querySelector("#page1");
    pages = document.querySelectorAll(".page");

    div.classList.add('text-indigo-700');
    div.classList.add('bg-indigo-100');

    pages.forEach(element => {                 
        divpage = document.querySelector('#'+element.id);          
        divpage.classList.add('bg-gray-200');
        divpage.classList.add('text-gray-700');
        divpage.classList.remove('bg-blue-400');
        divpage.classList.remove('text-white');
    });
    
    page1.classList.add('bg-blue-400');
    page1.classList.add('text-white');
    page1.classList.remove('bg-gray-200');
    page1.classList.remove('text-gray-700');

    getProduct();    
    $pagination.style.display = 'flex';    

}

/**
 * Función que ordena un JSON según los parámetros recibidos   
 * @param {object} data Objeto JSON a ordenar
 * @param {string} key Clave o key por la cual se va a ordenar el JSON
 * @param {string} orden Tipo de orden para ordenar el JSON, puede ser ASC ó DESC
 * @returns object, retorna el mismo objeto JSON ingresado ordenado según los parámetros recibidos
 */
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return y - x;
        }

        if (orden === 'desc') {
            return x -y;
        }
    });

}


/**
 * Función que se valida si en el texto buscar se ha clickeado "Enter"
 */
$txtBuscador.addEventListener('keyup',function(e){ 
    if(e.keyCode === 13){ //Si detecta el keyCode = 13, se ha presionado el enter, e iniciamos la busqueda
        searchParams();
    }
 });


/**
 * Función que realiza la búsquedad de productos según el TEXTO ingresado por el usuario
 * @param {*} valor Texto/parámetro de búsquedad ingresado por el usuario
 */
function searchParams(){
    let valor = $txtBuscador.value;
    if(valor !== '' || valor === ' '){ //Solo realizamos la busqueda si los parametros no están vaciós
        getProduct(`https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/search/${valor}`);
        $pagination.style.display = 'none';
    }else{ //De lo contrario pintamos los productos, y seleccianamos la primera categoría (TODOS), esto cuando el usuario borra los campos de su busqueda
        getProduct();
        changeCategory();
        $pagination.style.display = 'flex';
    }
}

/**
 * Función que capitaliza la primera letra de algún texto ingresado
 * @param {*} str String o texto a capitalizar
 * @returns Retorna el String o texto ingresado capitalizado solo por la primera letra
 */
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Función que trae el número de páginas desde la API y las imprime en pantalla para el filtrado necesario
 */
function printPages(){
    fetch('https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/nropages')
    .then(response => response.json())
    .then((nropages) => {
        $pagination.innerHTML = '';
        for (let i = 0; i < nropages; i++) {            
            $pagination.innerHTML += `
            <a id="page${i+1}" onclick="changePage(this.id);" class="cursor-pointer px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white page">
                ${i+1}
            </a>`        
        }
        changeCategory();
    })
    .catch(err => console.log(err));

}

/**
 * Función que muestra los resultados de la API según número de página
 * @param {string} id Id de la página seleccionada
 */
function changePage(id){
    
    let page = document.querySelector("#"+id), 
        pages = document.querySelectorAll(".page"),
        divpage, pageid = id.slice(-1);
        
    pages.forEach(element => {                 
        divpage = document.querySelector('#'+element.id);          
        divpage.classList.add('bg-gray-200');
        divpage.classList.add('text-gray-700');
        divpage.classList.remove('bg-blue-400');
        divpage.classList.remove('text-white');
    });

    page.classList.add('bg-blue-400');
    page.classList.add('text-white');
    page.classList.remove('bg-gray-200');
    page.classList.remove('text-gray-700');

    if(pageid === 1){
        getProduct();
    }else{
        getProduct(`https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/page/${pageid}`);
    }
   
}