async function carregarGaleria() {
    const grid = document.getElementById("galeria-grid");

    if (!grid) return;

    const { data, error } = await supabaseClient
        .from("galeria")
        .select("*")
        .eq("ativo", true)
        .order("ordem", { ascending: true });

    if (error) {
        grid.innerHTML = "<p>Erro ao carregar galeria.</p>";
        return;
    }

    if (!data || data.length === 0) {
        grid.innerHTML = "<p>Nenhuma galeria cadastrada.</p>";
        return;
    }

    const menorColuna = Math.min(
        ...data.map(item => item.coluna || 1)
    );

    const totalColunas = Math.max(
        ...data.map(item =>
            ((item.coluna || 1) - menorColuna + 1) + ((item.largura || 1) - 1)
        )
    );

    grid.style.gridTemplateColumns = `repeat(${totalColunas}, 1fr)`;
    grid.innerHTML = "";

    data.forEach(item => {
        const temLink = item.link && item.link.trim() !== "";
        const classeStatus = temLink
            ? "galeria-disponivel"
            : "galeria-indisponivel";

        const colunaNormalizada = (item.coluna || 1) - menorColuna + 1;

        grid.innerHTML += `
      <div
        class="galeria-item"
        style="
          grid-column: ${colunaNormalizada} / span ${item.largura || 1};
          grid-row: ${item.linha || 1} / span ${item.altura || 1};
        "
      >
        <div
          class="galeria-placeholder ${classeStatus}"
          ${temLink
                ? `onclick="window.open('${item.link}', '_blank')"`
                : ""
            }
        >
          <div class="icon-g">${item.icone || "📸"}</div>
          <span>${item.texto}</span>
        </div>
      </div>
    `;
    });
}

document.addEventListener("DOMContentLoaded", carregarGaleria);