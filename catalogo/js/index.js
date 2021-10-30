import API from './api.js';
const api = new API();

console.log(api.getProduct(10));




document.getElementById('nav-toggle').onclick = function(){
    document.getElementById("nav-content").classList.toggle("hidden");
}
// const API_URL = "https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/";

// const $app = document.querySelector("#app");

// fetch(API_URL)
//     .then((response) => response.json())
//     .then((products) => {
//         const template = products.map((product) => `<li>${product.name}</li>`);
//         $app.innerHTML = `<ul>${template}</ul>`;
//     });