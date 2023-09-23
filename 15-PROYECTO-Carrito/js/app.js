// Variables

const carrito = document.querySelector('#carrito');
const carContainer = document.querySelector('#lista-carrito tbody');
const carDeleteBtn = document.querySelector('#vaciar-carrito');
const courseList = document.querySelector('#lista-cursos');
let articleCar = [];

loudEvenListeners();
function loudEvenListeners(){
    courseList.addEventListener('click',addCourse);
    // courseList.addEventListener('click',addCourse);

    // Eliminar carrito
    carrito.addEventListener('click',eliminarCurso);

    // Vaciar Carrito de Compras
    carDeleteBtn.addEventListener('click',() =>{
        articleCar = []; //Resetear el arreglo
        limpiarHTML();// limpiar el html
    });

}

// funciones

function addCourse(e){
    
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){ 
        const coursSelect = e.target.parentElement.parentElement;
        readContetHtml(coursSelect);
    }
}


// Eliminar cursos
function eliminarCurso (e){
    e.preventDefault();
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        // Si hay varios cursos repetidos simplemente va eliminando de 1 en 1
        const cursos = articleCar.map( curso => {
            const itemCar = articleCar;
            console.log(curso.id);
            console.log(cursoId);
            if(cursoId === curso.id){

                if( curso.cantidad > 1 ) {
                    curso.cantidad--;
                    return curso;
                } else {
                    // Elimina del arrglo de articleCar por el data-id cuando solo hay un curso elegido
                    articleCar = articleCar.filter( curso => curso.id !== cursoId );
                    return curso;
                }
            }
        });
    }
    carHtml();
}




function readContetHtml(course){

    const infoCourse = {
        ima: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        cantidad: 1        
    }
    // console.log(infoCourse)
    // Revisa si un elemento ya existe en el carrito
    if( articleCar.some( curso => curso.id === infoCourse.id ) ) { 
        const cursos = articleCar.map( curso => {
             if( curso.id === infoCourse.id ) {
                  curso.cantidad++;
                   return curso;
              } else {
                   return curso;
           }
        })
        articleCar = [...cursos];
   }  else {
        articleCar = [...articleCar, infoCourse];
   }   
   
    //console.log(infoCourse);
    // Agregando elementos al arreglo de carrito
    // articleCar = [...articleCar,infoCourse];
    carHtml();

}



// Mostrando el HTML de las compras en el carrito 
function carHtml(){

    //limpiar el HTML
    limpiarHTML();


    // Recorre el carrito y generar el html
    articleCar.forEach(course => {
        const { ima,title,price,cantidad} = course;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${course.ima}" width = "100"/>
        </td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${cantidad}</td>
        <td>
            <a href ="#" class = "borrar-curso" data-id = "${course.id}" > X </a>
        </td>
        `;

        // Agregar el html del carrito en el tbody
        carContainer.appendChild(row); 
    })
}

function limpiarHTML(){
    // carContainer.innerHTML = '';
    while(carContainer.firstChild){
        carContainer.removeChild(carContainer.firstChild);
    } 
}