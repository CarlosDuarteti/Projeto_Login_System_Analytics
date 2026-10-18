
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
        const resposta = await fetch("/data/dados_dashboard.json", {
            cache: "no-store"
        });

        if (!resposta.ok) {
            throw new Error(
                `Falha ao buscar JSON: HTTP ${resposta.status}`
            );
        }

        const dados = await resposta.json();

        // ==========================================
        // 1. ATUALIZAR OS INDICADORES
        // ==========================================

        for (const [id, formatar] of indicadores) {
            const elemento = document.getElementById(id);

            if (!elemento) continue;

            if (
                dados[id] === undefined ||
                dados[id] === null ||
                !Number.isFinite(Number(dados[id]))
            ) {
                elemento.textContent = "Indisponível";
                continue;
            }

            elemento.textContent = formatar(dados[id]);
        }

        // ==========================================
        // 2. GRÁFICO 1: TOP 5 CURSOS
        // ==========================================

        const ranking = dados.rankingCursos2022a2025;
        const canvasPrincipal = document.getElementById(
            "graficoPrincipal"
        );

        if (
            Array.isArray(ranking) &&
            ranking.length > 0 &&
            canvasPrincipal
        ) {
            const cursos = ranking
                .filter(item =>
                    item.curso != null &&
                    Number.isFinite(Number(item.matriculas))
                )
                .sort((a, b) =>
                    Number(a.matriculas) - Number(b.matriculas)
                );

            if (window.graficoPrincipal instanceof Chart) {
                window.graficoPrincipal.destroy();
            }

            if (cursos.length > 0) {
                const rotulosValores = {
                    id: "rotulosValores",

                    afterDatasetsDraw(chart) {
                        const contexto = chart.ctx;
                        const meta = chart.getDatasetMeta(0);
                        const valores = chart.data.datasets[0].data;

                        contexto.save();
                        contexto.font = "bold 12px Arial";
                        contexto.fillStyle = "#333";
                        contexto.textBaseline = "middle";
                        contexto.textAlign = "left";

                        meta.data.forEach((barra, indice) => {
                            const posicao = barra.tooltipPosition();

                            contexto.fillText(
                                Number(valores[indice])
                                    .toLocaleString("pt-BR"),
                                posicao.x + 8,
                                posicao.y
                            );
                        });

                        contexto.restore();
                    }
                };

                window.graficoPrincipal = new Chart(
                    canvasPrincipal,
                    {
                        type: "bar",

                        data: {
                            labels: cursos.map(item => item.curso),

                            datasets: [{
                                label: "Total de matrículas",
                                data: cursos.map(
                                    item => Number(item.matriculas)
                                ),
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
                                            return "Matrículas: " +
                                                Number(context.raw)
                                                    .toLocaleString("pt-BR");
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

                            layout: {
                                padding: {
                                    right: 55
                                }
                            }
                        },

                        plugins: [rotulosValores]
                    }
                );
            }
        } else {
            console.warn(
                "Ranking de cursos não encontrado no JSON."
            );
        }

        // ==========================================
        // 3. GRÁFICO 2: EVOLUÇÃO ANUAL
        // ==========================================

        const evolucao = dados.evolucaoMatriculasPorAno;
        const canvasEvolucao = document.getElementById(
            "graficoEvolucao"
        );

        if (
            Array.isArray(evolucao) &&
            evolucao.length > 0 &&
            canvasEvolucao
        ) {
            const dadosEvolucao = evolucao
                .filter(item =>
                    item.ano != null &&
                    Number.isFinite(Number(item.matriculas))
                )
                .sort((a, b) => Number(a.ano) - Number(b.ano));

            if (
                window.graficoEvolucaoMatriculas instanceof Chart
            ) {
                window.graficoEvolucaoMatriculas.destroy();
            }

            if (dadosEvolucao.length > 0) {
                const rotulosEvolucao = {
                    id: "rotulosEvolucao",

                    afterDatasetsDraw(chart) {
                        const contexto = chart.ctx;
                        const meta = chart.getDatasetMeta(0);
                        const valores = chart.data.datasets[0].data;

                        contexto.save();
                        contexto.font = "bold 12px Arial";
                        contexto.fillStyle = "#333";
                        contexto.textAlign = "center";
                        contexto.textBaseline = "bottom";

                        meta.data.forEach((ponto, indice) => {
                            contexto.fillText(
                                Number(valores[indice])
                                    .toLocaleString("pt-BR"),
                                ponto.x,
                                ponto.y - 10
                            );
                        });

                        contexto.restore();
                    }
                };

                window.graficoEvolucaoMatriculas = new Chart(
                    canvasEvolucao,
                    {
                        type: "line",

                        data: {
                            labels: dadosEvolucao.map(
                                item => item.ano
                            ),

                            datasets: [{
                                label: "Total de matrículas",
                                data: dadosEvolucao.map(
                                    item => Number(item.matriculas)
                                ),
                                borderColor: "#C9A227",
                                backgroundColor: "#C9A227",
                                borderWidth: 3,
                                pointRadius: 6,
                                pointHoverRadius: 8,
                                pointBackgroundColor: "#8C6D1F",
                                tension: 0.25,
                                fill: false
                            }]
                        },

                        options: {
                            responsive: true,
                            maintainAspectRatio: false,

                            layout: {
                                padding: {
                                    top: 25,
                                    right: 15
                                }
                            },

                            plugins: {
                                legend: {
                                    display: false
                                },

                                title: {
                                    display: true,
                                    text: "Evolução das matrículas (2022–2025)",
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
                                            return "Matrículas: " +
                                                Number(context.raw)
                                                    .toLocaleString("pt-BR");
                                        }
                                    }
                                }
                            },

                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Ano"
                                    },
                                    grid: {
                                        display: false
                                    }
                                },

                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: "Total de matrículas"
                                    },
                                    ticks: {
                                        callback(valor) {
                                            return Number(valor)
                                                .toLocaleString("pt-BR");
                                        }
                                    }
                                }
                            }
                        },

                        plugins: [rotulosEvolucao]
                    }
                );
            }
        } else {
            console.warn(
                "Dados da evolução anual não encontrados no JSON."
            );
        }

        // ==========================================
        // 4. GRÁFICO 3: HISTOGRAMA DAS MATRÍCULAS
        // ==========================================

        const distribuicao = dados.distribuicaoMatriculasTurma;
        const canvasDistribuicao = document.getElementById(
            "graficoDistribuicao"
        );

        if (
            distribuicao &&
            Array.isArray(distribuicao.faixas) &&
            distribuicao.faixas.length > 0 &&
            canvasDistribuicao
        ) {
            const faixas = distribuicao.faixas.filter(item =>
                item.faixa != null &&
                Number.isFinite(Number(item.frequencia))
            );

            if (
                window.graficoDistribuicaoTurmas instanceof Chart
            ) {
                window.graficoDistribuicaoTurmas.destroy();
            }

            if (faixas.length > 0) {
                window.graficoDistribuicaoTurmas = new Chart(
                    canvasDistribuicao,
                    {
                        type: "bar",

                        data: {
                            labels: faixas.map(item => item.faixa),

                            datasets: [{
                                label: "Quantidade de registros de turma",
                                data: faixas.map(
                                    item => Number(item.frequencia)
                                ),
                                backgroundColor: "#C9A227",
                                borderColor: "#8C6D1F",
                                borderWidth: 1,
                                barPercentage: 1,
                                categoryPercentage: 1
                            }]
                        },

                        options: {
                            responsive: true,
                            maintainAspectRatio: false,

                            plugins: {
                                legend: {
                                    display: false
                                },

                                title: {
                                    display: true,
                                    text: "Distribuição das matrículas por turma",
                                    font: {
                                        size: 16,
                                        weight: "bold"
                                    },
                                    padding: {
                                        bottom: 20
                                    }
                                },

                                subtitle: {
                                    display: true,
                                    text:
                                        `Mínimo: ${Number(distribuicao.menorValor).toLocaleString("pt-BR")} | ` +
                                        `Mediana: ${Number(distribuicao.mediana).toLocaleString("pt-BR")} | ` +
                                        `Máximo: ${Number(distribuicao.maiorValor).toLocaleString("pt-BR")}`,
                                    padding: {
                                        bottom: 15
                                    }
                                },

                                tooltip: {
                                    callbacks: {
                                        label(context) {
                                            return "Registros de turma: " +
                                                Number(context.raw)
                                                    .toLocaleString("pt-BR");
                                        }
                                    }
                                }
                            },

                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Faixa de matrículas por turma"
                                    },
                                    grid: {
                                        display: false
                                    }
                                },

                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: "Quantidade de registros"
                                    },
                                    ticks: {
                                        precision: 0,
                                        callback(valor) {
                                            return Number(valor)
                                                .toLocaleString("pt-BR");
                                        }
                                    }
                                }
                            }
                        }
                    }
                );
            }
        } else {
            console.warn(
                "Dados da distribuição de matrículas não encontrados no JSON."
            );
        }

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

// ==========================================
// 5. CARREGAR O DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);

// ==========================================
// 6. BOTÃO SAIR
// ==========================================

const btnSair = document.getElementById("btnSair");

if (btnSair) {
    btnSair.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}
