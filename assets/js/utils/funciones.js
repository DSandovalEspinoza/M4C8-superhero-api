// Este código es una función llamada peticiones que toma una URL como parámetro. 
// La función devuelve una nueva promesa que se resuelve o rechaza dependiendo del resultado de una solicitud fetch
// Se define una función flecha llamada peticiones que tiene un parámetro url.
const peticiones = (url) => {
    // Dentro de la función, se crea una nueva promesa utilizando el constructor Promise.
    // La promesa toma dos funciones de devolución de llamada: resolve y reject.
    return new Promise((resolve, reject) => {
        // Dentro de la promesa, se utiliza el método fetch para realizar una solicitud a la URL especificada
        // Luego, se encadenan dos métodos then a la solicitud fetch. 
        // Estos métodos se utilizan para procesar la respuesta obtenida de la solicitud.
        fetch(url)
        // En el primer método then, la respuesta se convierte a formato JSON utilizando el método json().
        // Este método devuelve una promesa que resuelve con los datos analizados del cuerpo de la respuesta como un objeto JavaScript.
            .then((respuesta) => respuesta.json())
            // En el segundo método then, se resuelve la promesa externa utilizando la función resolve y
            // se pasa como argumento los datos obtenidos en el paso anterior (data).    
            .then((data) => resolve(data))
    })
    
}

export default { peticiones } 