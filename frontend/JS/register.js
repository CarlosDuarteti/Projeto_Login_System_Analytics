// ========================================
// LOCALIZA O FORMULÁRIO
// ========================================
const form =
    document.getElementById("registerForm");
// ========================================
// EVENTO DE ENVIO DO FORMULÁRIO
// ========================================
form.addEventListener(
    "submit",
    async (e) => {
        // Impede o recarregamento
        // padrão da página
        e.preventDefault();
        // =================================
        // CAPTURA DOS DADOS
        // =================================
        const nome =
            document.getElementById("nome").value;
        const email =
            document.getElementById("email").value;
        const senha =
            document.getElementById("senha").value;
        const confirmar =
            document.getElementById("confirmar").value;
        // =================================
        // VALIDAÇÃO DAS SENHAS
        // =================================

        
        try {
            if (senha !== confirmar) {
            mostrarAlerta(
                "As senhas não coincidem!",
                document.getElementById("confirmar"),
                "erro"
            );
            return;
        }

        // =================================
        // ENVIO PARA O BACKEND
        // =================================
        const resposta =
            await fetch(
                "http://localhost:3001/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify({
                            nome,
                            email,
                            senha
                        })
                }
            );
        // =================================
        // RECEBE A RESPOSTA
        // =================================
        const json =
            await resposta.json();
        // =================================
        // MOSTRA A MENSAGEM
        // =================================
        //alert(json.message);
        if (resposta.ok) {
            mostrarAlerta(
                "Cadastro realizado com sucesso!",
                null,
                "sucesso",
                () => {
                    window.location.href = "index.html";
                }
            );
        } else {
            mostrarAlerta(
                json.message,
                null,
                "erro"
            );
        }
        
   } catch (error) {
        mostrarAlerta(
            "Não foi possível conectar ao servidor",
            null,
            "erro"
        );
    }
});