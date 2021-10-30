const API_URL = "https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/";

export default class API{
    getProduct(id){
        fetch(`https://upgindustrial.unmsm.edu.pe/onlinestore_bsale/api/?id=${id}`)
            .then((response) => response.json())
            .then((products) => {
                console.log(products);
            });
    }
}