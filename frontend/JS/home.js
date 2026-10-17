
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

            if (
                dados[id] === undefined ||
                dados[id] === null ||
                !Number.isFinite(Number(dados[id]))
            ) {
                elemento.textContent = "Indisponível";
                console.warn(`Valor ausente ou inválido no JSON: ${id}`);
                continue;
            }

            elemento.textContent = formatar(dados[id]);
        }

    } catch (erro) {
        console.error(
            "Não foi possível carregar os indicadores do dashboard:",
            erro
        );

        for (const [id] of indicadores) {
            const elemento = document.getElementById(id);
            if (elemento) elemento.textContent = "Indisponível";
        }
    }
}

// ========================================
// GRÁFICO 1 — CINCO CURSOS COM MAIS MATRÍCULAS
// Período: 2022–2025
// ========================================

function criarGraficoCursos() {
    const canvas = document.getElementById("graficoPrincipal");

    if (!canvas) {
        console.warn('Canvas "graficoPrincipal" não encontrado.');
        return;
    }

    if (typeof Chart === "undefined") {
        console.error("Chart.js não foi carregado.");
        return;
    }

    const cursos = [
        "PACOTE OFFICE",
        "PILOTAGEM DE DRONE (VANT)",
        "Superior de Tecnologia em Produção Cênica",
        "Marketing Digital",
        "Técnico de Nível Médio em Marketing e Mídias Sociais"
    ];

    const matriculas = [2594, 2577, 1673, 1570, 1568];

    // Destrói o gráfico anterior caso a função seja executada novamente.
    if (Chart.getChart(canvas)) {
        Chart.getChart(canvas).destroy();
    }

    new Chart(canvas, {
        type: "bar",

        data: {
            labels: cursos,
            datasets: [{
                label: "Total de matrículas",
                data: matriculas,
                backgroundColor: [
                    "#2563eb",
                    "#3b82f6",
                    "#60a5fa",
                    "#93c5fd",
                    "#bfdbfe"
                ],
                borderColor: "#1d4ed8",
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.72,
                categoryPercentage: 0.8
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
                        size: 16
                    },
                    padding: {
                        bottom: 20
                    }
                },

                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return " Matrículas: " +
                                context.parsed.x.toLocaleString("pt-BR");
                        }
                    }
                }
            },

            scales: {
                x: {
                    beginAtZero: true,
                    max: 2900,
                    title: {
                        display: true,
                        text: "Total de matrículas"
                    },
                    ticks: {
                        callback: function(valor) {
                            return Number(valor).toLocaleString("pt-BR");
                        }
                    },
                    grid: {
                        color: "rgba(0, 0, 0, 0.08)"
                    }
                },

                y: {
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        },

        plugins: [{
            id: "valoresNasBarras",

            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                const dataset = chart.data.datasets[0];

                ctx.save();
                ctx.font = "bold 12px Arial";
                ctx.fillStyle = "#222";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";

                chart.getDatasetMeta(0).data.forEach((barra, indice) => {
                    const valor = dataset.data[indice];

                    ctx.fillText(
                        Number(valor).toLocaleString("pt-BR"),
                        barra.x + 7,
                        barra.y
                    );
                });

                ctx.restore();
            }
        }]
    });
}

// ========================================
// INICIALIZAÇÃO DA PÁGINA
// ========================================

document.addEventListener("DOMContentLoaded", async () => {
    await carregarDashboard();
    criarGraficoCursos();
});

// ========================================
// BOTÃO SAIR
// ========================================

const btnSair = document.getElementById("btnSair");

if (btnSair) {
    btnSair.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}
