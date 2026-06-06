async function carregarEventos() {
    const lista = document.getElementById("evento-list");

    if (!lista) return;

    const { data, error } = await supabaseClient
        .from("eventos")
        .select("*")
        .order("data_evento", { ascending: true });

    if (error) {
        console.error("Erro ao carregar eventos:", error);
        lista.innerHTML = `
      <p style="text-align:center;color:#ff6b6b;">
        Erro ao carregar eventos.
      </p>
    `;
        return;
    }

    if (!data || data.length === 0) {
        lista.innerHTML = `
      <p style="text-align:center;">
        Nenhum evento cadastrado.
      </p>
    `;
        return;
    }

    lista.innerHTML = "";

    data.forEach(evento => {
        const dataEvento = new Date(evento.data_evento);

        const dia = dataEvento.toLocaleDateString("pt-BR", {
            day: "2-digit"
        });

        const mes = dataEvento
            .toLocaleDateString("pt-BR", {
                month: "short"
            })
            .replace(".", "")
            .toUpperCase();

        const horas = dataEvento.getHours().toString().padStart(2, "0");
        const minutos = dataEvento.getMinutes().toString().padStart(2, "0");

        const horario =
            minutos === "00"
                ? `${horas}h`
                : `${horas}h${minutos}`;

        const concluido = dataEvento < new Date();

        lista.innerHTML += `
      <div class="evento-item reveal visible ${concluido ? "evento-concluido" : ""}">
        
        <div class="evento-data">
          <div class="dia">${dia}</div>
          <div class="mes">${mes}</div>
        </div>

        <div class="evento-info">
          <h4>${evento.titulo}</h4>
          <p>
            📍 ${evento.local || "A confirmar"} · ${horario}
          </p>
        </div>

        <div class="evento-tipo">
          ${concluido ? "Concluído" : (evento.tipo || "Evento")}
        </div>

      </div>
    `;
    });
}

document.addEventListener("DOMContentLoaded", carregarEventos);