/*Script de configuracion de darkMode
<script>
  tailwind.config = {
    darkMode: 'class'
  }
</script>
*/
document.addEventListener('DOMContentLoaded', () => {
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

})
