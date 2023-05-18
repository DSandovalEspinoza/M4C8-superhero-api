import funciones from "./utils/funciones.js";
const { peticiones } = funciones

$(document).ready(function() {

    // Declaración del evento submit, para identificar cuando el usuario intenta buscar un superheroe
    $("#formulario").submit(async function(event){
 // Esta línea de código evita que el formulario se envíe de forma predeterminada,
 // lo que permite controlar manualmente el envío y realizar acciones personalizadas.
        event.preventDefault();
 //Esta línea de código vacía el contenido del elemento con el id #listado-superheroes,
 // que se utilizará para mostrar los resultados de la búsqueda de superhéroes.
        $("#listado-superheroes").html("")
 // Aquí se agrega la clase d-none al elemento con el id #alert-error, lo que lo oculta inicialmente.
        $("#alert-error").addClass("d-none")
 // Esta línea de código obtiene el valor del campo de entrada con el id #txt-busqueda y lo asigna a la variable busqueda.
 // Este valor se utilizará para realizar una búsqueda de superhéroes.
        let busqueda = $("#txt-busqueda").val()
 // Aquí se construye la URL de la API para realizar la búsqueda de superhéroes.
 //  Se utiliza el valor de busqueda en la URL para especificar qué superhéroes se están buscando.
        let url = `https://superheroapi.com/api.php/10225832066284806/search/${busqueda}`

        //Opción 1 para esperar que termine de ejecutar la petición
        // let respuesta = peticiones(url)
        // respuesta.then((data) => console.log(data))

        //Opción 2 para esperar que termine de ejecutar la petición
        // Esta línea de código utiliza la función peticiones para realizar una solicitud a la URL construida en el paso anterior y espera la respuesta utilizando la palabra clave await.
        // La respuesta de la API se asigna a la variable respuesta.
        let respuesta = await peticiones(url)

     // Aquí se verifica si la respuesta de la API contiene un error. Si es así, se quita la clase d-none del elemento con el id #alert-error,
     //  lo que hace que se muestre en la interfaz de usuario.
        if(respuesta.response ==='error') {
            return $("#alert-error").removeClass("d-none")
        }
       // bucle forEach que itera sobre cada elemento en la matriz results de la respuesta de la API.
       //  Cada elemento representa un superhéroe encontrado en la búsqueda.        
        respuesta.results.forEach(element => {
            // Esta línea de código declara una variable raza y asigna el valor de element.appearance.race.
            //  Sin embargo, si el valor es igual a 'null', se asigna el valor 'no definido' a la variable raza.
            //  Esto se hace utilizando el operador ternario (? :) que verifica si element.appearance.race es igual a 'null'.     
            let raza = element.appearance.race ==='null' ? 'no definido': element.appearance.race
            // Esta línea de código utiliza la desestructuración de matrices para extraer el segundo elemento de la matriz
            // element.appearance.height y asignarlo a la variable altura. 
            // La desestructuración se realiza utilizando una coma antes del nombre de la variable altura,
            // lo que indica que solo estamos interesados en el segundo elemento de la matriz.
            let [,altura] = element.appearance.height
            // Esta línea de código agrega contenido HTML dinámico al elemento con el id #listado-superheroes.
            // Se utiliza el método append de jQuery para agregar el contenido especificado entre las comillas invertidas (plantilla de cadena) al final del elemento.
            $("#listado-superheroes").append(`
                <div class="col-12 col-sm-6 col-lg-4 pb-3">
                    <div class="card">
                        <img src="${element.image.url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <div><span class"fw-bold">Genero:${element.appearance.gender}</span>
                            <div><span class"fw-bold">Raza:${raza}</span>
                            <div><span class"fw-bold">Genero:${altura}</span>
                            <div><span class"fw-bold">Genero:${element.appearance.weight[1]}</span>                
                        </div>
                    </div>
                </div>
            `)
        });
        console.log(respuesta);
    })
})
