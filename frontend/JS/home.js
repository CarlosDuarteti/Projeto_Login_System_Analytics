// ========================================
// BOTÃO SAIR
// ========================================

const btnSair = document.getElementById("btnSair");

btnSair.addEventListener("click", () => {

    // Remove o token armazenado
    localStorage.removeItem("token");

    // Retorna para a página de login
    window.location.href = "index.html";
});