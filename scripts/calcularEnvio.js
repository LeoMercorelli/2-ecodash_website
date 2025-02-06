document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM que se utilizarán en el script
    const formEnvio = document.getElementById("formEnvio");
    const loader = document.getElementById("loader");
    const resultadoContainer = document.getElementById("resultado");
    const graficoCanvas = document.getElementById("graficoCostos");
    graficoCanvas.classList.add('hidden'); // Ocultar canvas inicialmente
    let graficoCostos = null;

    // Evento para manejar el envío del formulario
    formEnvio.addEventListener("submit", function (event) {
        event.preventDefault();
        calcularEnvio();
    });

    // Función para calcular el costo del envío
    function calcularEnvio() {
        const valorProducto = parseFloat(document.getElementById("valorProducto").value);
        const pesoProducto = parseFloat(document.getElementById("pesoProducto").value);
        const lugarCompra = document.getElementById("lugarCompra").value;
        const categoriaSeleccionada = JSON.parse(document.getElementById("categoriaProducto").value);

        // Validar los datos ingresados
        if (isNaN(valorProducto) || isNaN(pesoProducto) || !categoriaSeleccionada) {
            mostrarError("Por favor, ingrese todos los datos correctamente.");
            return;
        }

        // Mostrar el loader mientras se calcula el costo
        loader.style.display = 'block';

        // Simular un tiempo de procesamiento antes de mostrar el resultado
        setTimeout(() => {
            const resultado = calcularCosto(valorProducto, pesoProducto, lugarCompra, categoriaSeleccionada);
            mostrarResultado(resultado);
            loader.style.display = 'none';
        }, 2000);
    }

    // Función para calcular el costo total basado en los datos ingresados
    function calcularCosto(valor, peso, lugar, categoria) {
        const costoBase = peso * (lugar === "china" ? 2 : 3);
        const impuestos = valor * categoria.iva;
        const honorarios = 17;
        const costoTotal = costoBase + impuestos + honorarios;

        return { lugarCompra: lugar, categoria: categoria.nombre, costoBase, impuestos, honorarios, costoTotal };
    }

    // Función para mostrar el resultado del cálculo en el DOM
    function mostrarResultado(resultado) {
        resultadoContainer.innerHTML = `
            <h2>Resultado del Cálculo</h2>
            <ul>
                <li><strong>Lugar de compra:</strong> ${formatearLugarCompra(resultado.lugarCompra)}</li>
                <li><strong>Categoría:</strong> ${resultado.categoria}</li>
                <li><strong>Costo base:</strong> USD$${resultado.costoBase.toFixed(2)}</li>
                <li><strong>Impuestos:</strong> USD$${resultado.impuestos.toFixed(2)}</li>
                <li><strong>Honorarios:</strong> USD$${resultado.honorarios.toFixed(2)}</li>
                <li><strong><span style="font-size:1.2em; color:red;">Costo total:</span></strong> USD$${resultado.costoTotal.toFixed(2)}</li>
            </ul>
        `;

        // Mostrar el contenedor de resultados
        resultadoContainer.style.display = 'block';
        actualizarGrafico(resultado);
    }

    // Función para actualizar el gráfico de costos
    function actualizarGrafico(resultado) {
        // Destruir el gráfico anterior si existe
        if (graficoCostos) {
            graficoCostos.destroy();
        }

        // Crear un nuevo gráfico con los datos del resultado
        graficoCostos = new Chart(graficoCanvas, {
            type: 'bar',
            data: {
                labels: ['Costo Base', 'Impuestos', 'Honorarios', 'Total'],
                datasets: [{
                    label: 'Costo en USD',
                    data: [resultado.costoBase, resultado.impuestos, resultado.honorarios, resultado.costoTotal],
                    backgroundColor: ['blue', 'red', 'green', 'orange']
                }]
            }
        });

        // Mostrar el canvas del gráfico
        graficoCanvas.classList.remove('hidden');
    }

    // Función para formatear el lugar de compra con iniciales en mayúsculas
    function formatearLugarCompra(lugar) {
        if (lugar === 'china') {
            return 'China';
        } else if (lugar === 'usa') {
            return 'Estados Unidos';
        }
        return lugar;
    }
});
