function limparVersiculos(texto) {
    return texto
        // Remove todos os números
        .replace(/\d+/g, "")

        // Garante espaço depois de ponto, exclamação ou interrogação
        .replace(/([.!?])(?=[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ])/g, "$1 ")

        // Remove espaços antes da pontuação
        .replace(/\s+([.,;:!?])/g, "$1")

        // Remove espaços duplicados
        .replace(/\s{2,}/g, " ")

        .trim();
}

async function carregarEvangelho() {
    const card = document.getElementById("evangelho-card");

    if (!card) return;

    try {
        const response = await fetch("https://liturgia.up.railway.app/");
        const data = await response.json();

        const textoLimpo = limparVersiculos(data.evangelho.texto);

        card.innerHTML = `
            <div class="evangelho-data">
                ${data.data}
            </div>

            <div class="evangelho-ref">
                ${data.evangelho.referencia}
            </div>

            <div class="evangelho-texto">
                ${textoLimpo}
            </div>
        `;
    } catch (error) {
        console.error(error);

        card.innerHTML = `
            <p>Não foi possível carregar o Evangelho do dia.</p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", carregarEvangelho);
