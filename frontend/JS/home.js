
async function carregarDashboard() {
    const indicadores = [
        ["qtdTurmaUnicas", (valor) =>
            Number(valor).toLocaleString("pt-BR")],

        ["totalVagas", (valor) =>
            Number(valor).toLocaleString("pt-BR")],

        ["totalMatriculas", (valor) =>
            Number(valor).toLocaleString("pt-BR")],

        ["taxaGeralOcupacao", (valor) =>
            Number(valor).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + "%"]
    ];

    try {
        // Carregar os indicadores e o ranking do dashboard
        const resposta = await fetch("/data/dados_dashboard.json", {
            cache: "no-store"
        });

        if (!resposta.ok) {
            throw new Error(
                `Falha ao buscar JSON: HTTP ${resposta.status}`
            );
        }

        const dados = await resposta.json();

        // ==================================================
        // 1. ATUALIZAR OS CARDS DOS INDICADORES
        // ==================================================

        for (const [id, formatar] of indicadores) {
            const elemento = document.getElementById(id);

            if (!elemento) {
                console.warn(
                    `Não encontrei o card com id "${id}".`
                );
                continue;
            }

            if (
                dados[id] === undefined ||
                dados[id] === null ||
                !Number.isFinite(Number(dados[id]))
            ) {
                elemento.textContent = "Indisponível";
                console.warn(
                    `Valor ausente ou inválido no JSON: ${id}`
                );
                continue;
            }

            elemento.textContent = formatar(dados[id]);
        }

        // ==================================================
        // 2. GERAR O GRÁFICO DOS CINCO CURSOS COM MAIS MATRÍCULAS
        // ==================================================

        const ranking = dados.rankingCursos2022a2025;

        if (!Array.isArray(ranking) || ranking.length === 0) {
            console.warn(
                "Ranking de cursos não encontrado no JSON."
            );
            return;
        }

        const elementoGrafico = document.getElementById(
            "graficoPrincipal"
        );

        if (!elementoGrafico) {
            console.warn(
                'Não encontrei o canvas "graficoPrincipal".'
            );
            return;
        }

        // Validar os dados e ordenar da menor para a maior
        // para que o maior valor apareça no topo do gráfico.
        const cursos = ranking
            .filter(item =>
                item.curso != null &&
                Number.isFinite(Number(item.matriculas))
            )
            .sort(
                (a, b) =>
                    Number(a.matriculas) - Number(b.matriculas)
            );

        if (cursos.length === 0) {
            console.warn("Não há dados válidos para o gráfico.");
            return;
        }

        const labels = cursos.map(item => item.curso);

        const quantidades = cursos.map(
            item => Number(item.matriculas)
        );

        // Evitar duplicar o gráfico se a função for chamada novamente
        if (window.graficoPrincipal instanceof Chart) {
            window.graficoPrincipal.destroy();
        }

        // Plugin para mostrar os valores ao lado das barras
        const rotulosValores = {
            id: "rotulosValores",

            afterDatasetsDraw(chart) {
                const contexto = chart.ctx;
                const dataset = chart.data.datasets[0];
                const meta = chart.getDatasetMeta(0);

                contexto.save();
                contexto.font = "bold 12px Arial";
                contexto.fillStyle = "#333";
                contexto.textBaseline = "middle";
                contexto.textAlign = "left";

                meta.data.forEach((barra, indice) => {
                    const valor = dataset.data[indice];
                    const posicao = barra.tooltipPosition();

                    contexto.fillText(
                        Number(valor).toLocaleString("pt-BR"),
                        posicao.x + 8,
                        posicao.y
                    );
                });

                contexto.restore();
            }
        };

        window.graficoPrincipal = new Chart(elementoGrafico, {
            type: "bar",

            data: {
                labels: labels,

                datasets: [{
                    label: "Total de matrículas",
                    data: quantidades,
                    backgroundColor: "#C9A227",
                    borderColor: "#8C6D1F",
                    borderWidth: 1,
                    barPercentage: 0.70,
                    categoryPercentage: 0.75
                }]
            },

            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    },

                    title: {
                        display: true,
                        text: "Cinco cursos com mais matrículas (2022–2025)",
                        font: {
                            size: 16,
                            weight: "bold"
                        },
                        padding: {
                            bottom: 20
                        }
                    },

                    tooltip: {
                        callbacks: {
                            label(context) {
                                return (
                                    "Matrículas: " +
                                    Number(context.raw)
                                        .toLocaleString("pt-BR")
                                );
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        beginAtZero: true,

                        title: {
                            display: true,
                            text: "Total de matrículas"
                        },

                        grid: {
                            color: "rgba(0, 0, 0, 0.10)",
                            borderDash: [5, 5]
                        },

                        ticks: {
                            callback(valor) {
                                return Number(valor)
                                    .toLocaleString("pt-BR");
                            }
                        }
                    },

                    y: {
                        grid: {
                            display: false
                        }
                    }
                },

                // Reservar espaço à direita para os valores
                layout: {
                    padding: {
                        right: 55
                    }
                }
            },

            plugins: [rotulosValores]
        });

    } catch (erro) {
        console.error(
            "Não foi possível carregar os dados do dashboard:",
            erro
        );

        for (const [id] of indicadores) {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = "Indisponível";
            }
        }
    }
}

// Carregar o dashboard após a página estar pronta
document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);

// ======================================================
// 3. BOTÃO SAIR
// ======================================================

const btnSair = document.getElementById("btnSair");

if (btnSair) {
    btnSair.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}
