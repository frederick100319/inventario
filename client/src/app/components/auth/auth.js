
document.getElementById("forgotPasswordLink").addEventListener("click", function(event) {
  event.preventDefault(); // Evita que el enlace recargue la página

  var emailFormContainer = document.getElementById("emailFormContainer");
  emailFormContainer.classList.toggle("d-none"); // Alternar la visibilidad del formulario
});

