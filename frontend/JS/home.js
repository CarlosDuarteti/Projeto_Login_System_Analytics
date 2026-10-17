async function carregarDashboard() {
    const indicadores = [
        ["qtdTurmaUnicas", (valor) => Number(valor).toLocaleString("pt-BR")],
        ["totalVagas", (valor) => Number(valor).toLocaleString("pt-BR")],
        ["totalMatriculas", (valor) => Number(valor).toLocaleString("pt-BR")],
        ["taxaGeralOcupacao", (valor) =>
            Number(valor).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + "%"]
    ];

    try {
        // O backend (porta 3001) disponibiliza a pasta data nesta rota.
        const resposta = await fetch("/data/dados_dashboard.json", {
            cache: "no-store"
        });

        if (!resposta.ok) {
            throw new Error(`Falha ao buscar JSON: HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        for (const [id, formatar] of indicadores) {
            const elemento = document.getElementById(id);
            if (!elemento) {
                console.warn(`Não encontrei o card com id "${id}".`);
                continue;
            }

            if (dados[id] === undefined || dados[id] === null ||
                !Number.isFinite(Number(dados[id]))) {
                elemento.textContent = "Indisponível";
                console.warn(`Valor ausente ou inválido no JSON: ${id}`);
                continue;
            }

            elemento.textContent = formatar(dados[id]);
        }
    } catch (erro) {
        console.error("Não foi possível carregar os indicadores do dashboard:", erro);
        for (const [id] of indicadores) {
            const elemento = document.getElementById(id);
            if (elemento) elemento.textContent = "Indisponível";
        }
    }
}

document.addEventListener("DOMContentLoaded", carregarDashboard);

const btnSair = document.getElementById("btnSair");
if (btnSair) {
    btnSair.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}
