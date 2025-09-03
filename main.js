document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode
  const toggleDark = document.getElementById("toggleDark");
  toggleDark.addEventListener("click", () => {
    //Selecciono la etiqueta html y aplico un toggle para poner o quitar la clase "dark"
    document.querySelector("html").classList.toggle("dark")
  });

})
