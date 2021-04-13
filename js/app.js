// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let carritoLleno = [];

cargarFunciones();
function cargarFunciones() {
    // Mostrar productos en el carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar productos del carrito y mostrar carrito actualizado
    carrito.addEventListener('click', eliminarDelCarrito);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoLleno = [];

        limpiarHTML();
    })
}

// FUNCIONES

// Agrega el curso al carrito
function agregarCurso(e) {
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDataCursos(cursoSeleccionado);
    }
}

// Elimina un producto del carrito
function eliminarDelCarrito(e) {
    if ( e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        carritoLleno = carritoLleno.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

// Vacía el carrito


// Lee y recibe los datos del curso seleccionado
function leerDataCursos(curso) {
    const infoCurso = {
        img: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = carritoLleno.some(curso => curso.id === infoCurso.id)
    if (existe) {
        // Actualizamos la cantidad de productos en el carrito
        const cursos = carritoLleno.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna el objeto sin haberse duplicado
            }
        });
        carritoLleno = [...cursos];
    } else {
        carritoLleno = [...carritoLleno, infoCurso];
    }

    carritoHTML();
}

// Agrega el curso seleccionado al carrito en el HTML

function carritoHTML() {
    // Limpia el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    carritoLleno.forEach(curso => {
        const { img, nombre, precio, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${img}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a></td>
        `
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos agregados en el TBODY
function limpiarHTML() {
    // // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Mejor performance
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
