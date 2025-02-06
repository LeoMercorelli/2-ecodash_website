document.addEventListener("DOMContentLoaded", function () {
        // Cargar categorías desde un archivo JSON al cargar la página
    fetch('./data/categorias.json')
        .then(response => response.json())
        .then(data => {
            cargarCategorias(data.categorias);
        })
        .catch(error => {
            console.error('Error cargando categorías:', error);
            mostrarError("Hubo un problema al cargar las categorías.");
        });

    // Función para cargar las categorías en el select de la página
    function cargarCategorias(categorias) {
        const selectCategoria = document.getElementById("categoriaProducto");
        selectCategoria.innerHTML = "<option selected disabled value=''>Seleccione</option>";
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = JSON.stringify(categoria);
            option.textContent = categoria.nombre;
            selectCategoria.appendChild(option);
        });
    }
});
