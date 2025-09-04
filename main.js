
  /*Script de configuracion de darkMode
<script>
  tailwind.config = {
    darkMode: 'class'
  }
</script>
*/
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired!");

    const dialog = document.getElementById('dialog');
    const openBtn = document.getElementById('abrir-modal');
    const closeBtn = document.getElementById('cerrar-modal');
    const closeBtn2 = document.getElementById('cerrar-modal2');
    const form = document.getElementById('form-huella');
    const resultadoDiv = document.getElementById('resultado-co2');
    const checked = document.getElementById('vegetariana');
    const div = document.getElementById('div');

    console.log("dialog:", dialog);
    console.log("openBtn:", openBtn);
    console.log("closeBtn:", closeBtn);
    console.log("closeBtn2:", closeBtn2);
    console.log("form:", form);
    console.log("resultadoDiv:", resultadoDiv);

    // Factores de emisión aproximados
    const factores = {
        km_auto: 0.2,
        km_moto: 0.1,
        km_colectivo: 0.09,
        km_tren: 0.04,
        km_subte: 0.03,
        km_taxi: 0.21,
        electricidad: 0.42,
        gas: 2.1,
        carnes: {
            bovina: 27,
            cerdo: 12,
            pollo: 6.9,
            cordero: 39
        },
        pescados: {
            pescado_fresco: 5.9,
            pescado_enlatado: 6.2,
            mariscos: 11
        }
    };
  
  // Dark Mode - Selecciono el boton "toggleDark" y le añado un evento click
  document.getElementById("toggleDark").addEventListener("click", (d) => {
    //Selecciono el documento "html"
    const html = document.documentElement
    const inicio = document.getElementById("inicio")
    //aplico un toggle para poner o quitar la clase "dark"
    html.classList.toggle("dark")

    //Cambio el toggle y la imagen inicial segun el modo usando ternario
    html.classList.contains("dark") ?
      (d.target.textContent = "☀️", inicio.classList.replace("light-img", "dark-img")) :
      (d.target.textContent = "🌙", inicio.classList.replace("dark-img", "light-img"))
  });


    // Abrir el modal
    if (openBtn && dialog) {
        openBtn.addEventListener('click', () => {
            dialog.showModal();
            if (resultadoDiv) {
                resultadoDiv.innerHTML = '';
                resultadoDiv.style.display = 'none';
                console.log("Resultado oculto y limpio.");
            }
            if (form) {
                form.reset();
                console.log("Formulario reseteado.");
            } else {
                console.log("No se encontró el formulario para resetear.");
            }
            // Restaurar visibilidad del div de carnes según el checkbox vegetariana
            if (checked && div) {
                if (checked.checked) {
                    div.style.display = 'none';
                } else {
                    div.style.display = 'block';
                }
            }
        });
    } else {
        console.log("No se puede abrir el modal porque faltan elementos:", { openBtn, dialog });
    }

    // Cerrar el modal
    if (closeBtn && dialog) {
        closeBtn.addEventListener('click', () => {
            console.log("cerrar-modal click");
            dialog.close();
        });
    } else {
        console.log("No se puede cerrar el modal con X porque faltan elementos:", { closeBtn, dialog });
    }
    if (closeBtn2 && dialog) {
        closeBtn2.addEventListener('click', () => {
            console.log("cerrar-modal2 click");
            dialog.close();
        });
    } else {
        console.log("No se puede cerrar el modal con Cancelar porque faltan elementos:", { closeBtn2, dialog });
    }

    // Mostrar/ocultar carnes cuando se marca/desmarca vegetariana
    if (checked && div) {
        checked.addEventListener('change', () => {
            if (checked.checked) {
                div.style.display = 'none';
            } else {
                div.style.display = 'block';
            }
        });
    }

    // Submit del formulario
    if (form && resultadoDiv) {
        form.addEventListener('submit', function(e) {
            console.log("Formulario enviado");
            e.preventDefault();

            // Transporte
            const km_auto = parseFloat(form.km_auto?.value) || 0;
            const km_moto = parseFloat(form.km_moto?.value) || 0;
            const km_colectivo = parseFloat(form.km_colectivo?.value) || 0;
            const km_tren = parseFloat(form.km_tren?.value) || 0;
            const km_subte = parseFloat(form.km_subte?.value) || 0;
            const km_taxi = parseFloat(form.km_taxi?.value) || 0;

            console.log("Transporte km:", { km_auto, km_moto, km_colectivo, km_tren, km_subte, km_taxi });

            // Hogar
            const personas_hogar = parseInt(form.personas_hogar?.value) || 1;
            const watts_mensuales = parseFloat(form.watts_mensuales?.value) || 0;
            const gas_mensual = parseFloat(form.gas_mensual?.value) || 0;

            console.log("Hogar:", { personas_hogar, watts_mensuales, gas_mensual });

            // Alimentación
            const carnes_agricolas = Array.from(form.querySelectorAll('input[name="carnes_agricolas[]"]:checked')).map(c => c.value);
            const carnes_pesqueras = Array.from(form.querySelectorAll('input[name="carnes_pesqueras[]"]:checked')).map(c => c.value);
            const vegetariano = checked.checked;
            console.log("Alimentación:", { carnes_agricolas, carnes_pesqueras, vegetariano });

            // Cálculo transporte (por semana)
            const co2_transporte =
                km_auto * factores.km_auto +
                km_moto * factores.km_moto +
                km_colectivo * factores.km_colectivo +
                km_tren * factores.km_tren +
                km_subte * factores.km_subte +
                km_taxi * factores.km_taxi;

            // Cálculo hogar (por mes)
            const co2_electricidad = ((watts_mensuales / 1000) * factores.electricidad);
            const co2_gas = gas_mensual * factores.gas;

            console.log("CO2 hogar:", { co2_electricidad, co2_gas });

            // Cálculo alimentación (por semana)
            let co2_alimentacion = 0;
            if (!vegetariano) {
                carnes_agricolas.forEach(tipo => { co2_alimentacion += factores.carnes[tipo] || 0; });
                carnes_pesqueras.forEach(tipo => { co2_alimentacion += factores.pescados[tipo] || 0; });
            }
            console.log("CO2 alimentación semanal:", co2_alimentacion);

            // Total mensual (transporte y alimentación semanal x 4)
            const co2_total =
                (co2_transporte * 4) +
                co2_electricidad +
                co2_gas +
                (co2_alimentacion * 4);

            const co2_por_persona = co2_total / personas_hogar;

            console.log("CO2 total mensual:", co2_total, "CO2 por persona:", co2_por_persona);

            // Muestra resultado en el modal
            resultadoDiv.style.display = 'block';
            resultadoDiv.innerHTML =
                `<span>🌱 <strong>Tu huella mensual estimada de CO₂</strong></span><br><br>
                <span>Total: <strong>${co2_total.toFixed(2)} kg CO₂</strong></span><br>
                <span>Por persona en tu hogar: <strong>${co2_por_persona.toFixed(2)} kg CO₂</strong></span><br><br>
                <span>¡Gracias por calcular tu huella!</span>`;
        });
    } else {
        console.log("No se puede enviar el formulario porque faltan elementos:", { form, resultadoDiv });
    }
});
