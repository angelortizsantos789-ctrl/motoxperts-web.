
const filtroMarca = document.getElementById('tipo');
const filtroCilindrada = document.getElementById('cilindrada');
const tarjetasMotos = document.querySelectorAll('.moto-card');

//---Función principal del filtro---//
function filtrarMotos() {
    const marcaSeleccionada = filtroMarca.value.toLowerCase();
    const cilindradaSeleccionada = filtroCilindrada.value;

    tarjetasMotos.forEach(tarjeta => {
        //---Extraemos los textos de la tarjeta para analizarlos---//
        const textoTitulo = tarjeta.querySelector('.moto-info h2').textContent.toLowerCase();
        const textoEspecificaciones = tarjeta.querySelector('.moto-info').textContent;

        // --- LÓGICA DE MARCA ---
        const coincideMarca = (marcaSeleccionada === 'todas' || textoTitulo.includes(marcaSeleccionada));

        // ---LÓGICA DE CILINDRADA ---//
        let coincideCilindrada = false;

        if (cilindradaSeleccionada === 'Todas') {
            coincideCilindrada = true;
        } else {
            // EXPRESIÓN REGULAR //
            const patronNumerico = /(\d+(?:\.\d+)?)\s*(?:cc|cm³|cv)/i;
            const coincidencia = textoEspecificaciones.match(patronNumerico);

            if (coincidencia) {
            
                const ccReal = parseFloat(coincidencia[1]);

               
                if (cilindradaSeleccionada === '155-250') {
                    coincideCilindrada = (ccReal >= 150 && ccReal <= 250);
                } else if (cilindradaSeleccionada === '300-600') {
                    coincideCilindrada = (ccReal >= 250 && ccReal <= 600);
                } else if (cilindradaSeleccionada === '600+') {
                    coincideCilindrada = (ccReal > 600);
                }
            }
        }

        // Mostrar u ocultar la tarjeta según los resultados de ambos filtros //
        if (coincideMarca && coincideCilindrada) {
            tarjeta.style.display = 'flex'; 
        } else {
            tarjeta.style.display = 'none'; 
        }
    });
}

// Escuchar los cambios que haga el usuario en los menús desplegables //
filtroMarca.addEventListener('change', filtrarMotos);
filtroCilindrada.addEventListener('change', filtrarMotos);