// Dark Mode
const toggleDark = document.getElementById("toggleDark");
toggleDark.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Calculadora de huella de carbono
function calcular() {
  const transporte = parseFloat(document.getElementById("transporte").value) || 0;
  const energia = parseFloat(document.getElementById("energia").value) || 0;
  const alimentacion = parseFloat(document.getElementById("alimentacion").value) || 0;

  // Factores aproximados de emisión
  const factorTransporte = transporte * 0.00021 * 52; // km → toneladas CO₂/año
  const factorEnergia = energia * 0.0004 * 12;       // kWh → toneladas CO₂/año
  const factorAlimentacion = alimentacion * 0.0005 * 52; // comidas → toneladas CO₂/año

  const total = (factorTransporte + factorEnergia + factorAlimentacion).toFixed(2);

  document.getElementById("resultado").innerText = total + " t CO₂/año";
}