const temas = {
  "Filmes mais assistidos": ["Avatar", "Titanic", "Vingadores", "Frozen", "Jurassic Park"],
  "Músicas mais ouvidas": ["Shape of You", "Blinding Lights", "Despacito", "Uptown Funk", "Closer"],
  "Times mais valiosos": ["Real Madrid", "Barcelona", "Manchester United", "Liverpool", "PSG"]
};

let temaAtual = "";
let jogadorAtual = 1;
let pontuacao = {1: 0, 2: 0};
let tentativas = 0;
const maxTentativas = 3;
const pontuacaoVencedor = 500;

function atualizarTemasDisponiveis() {
  const temaSelect = document.getElementById("temaSelect");
  temaSelect.innerHTML = ""; // limpa opções
  for (let tema in temas) {
    const option = document.createElement("option");
    option.value = tema;
    option.textContent = tema;
    temaSelect.appendChild(option);
  }
}

// Inicializa a seleção de temas
atualizarTemasDisponiveis();

function escolherTema() {
  const select = document.getElementById("temaSelect");
  temaAtual = select.value;
  document.getElementById("temaAtual").textContent = `Tema atual: ${temaAtual}`;
  tentativas = 0;
  document.getElementById("resultado").textContent = "";
}

function enviarResposta() {
  if (!temaAtual) {
    alert("Escolha um tema antes de enviar a resposta!");
    return;
  }

  const resposta = document.getElementById("resposta").value.trim().toLowerCase();
  if (!resposta) return;

  const lista = temas[temaAtual].map(n => n.toLowerCase());
  const index = lista.indexOf(resposta);
  let pontos = 0;
  const resultado = document.getElementById("resultado");

  if (index !== -1) {
    // Pontuação de acordo com a posição
    pontos = temas[temaAtual].length - index;
    pontuacao[jogadorAtual] += pontos;
    resultado.textContent = `✅ Jogador ${jogadorAtual} acertou "${temas[temaAtual][index]}"! +${pontos} pontos`;
  } else {
    resultado.textContent = `❌ Jogador ${jogadorAtual} errou!`;
  }

  // Atualiza a pontuação na tela
  document.getElementById("p1").textContent = pontuacao[1];
  document.getElementById("p2").textContent = pontuacao[2];
  document.getElementById("resposta").value = "";

  tentativas++;

  if (tentativas >= maxTentativas) {
    // Troca de jogador
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    document.getElementById("jogador").textContent = jogadorAtual;
    tentativas = 0;
    document.getElementById("resultado").textContent += `\nAgora é a vez do Jogador ${jogadorAtual}`;
  }

  // Checa se alguém venceu
  if (pontuacao[1] >= pontuacaoVencedor) {
    mostrarVencedor(1);
  } else if (pontuacao[2] >= pontuacaoVencedor) {
    mostrarVencedor(2);
  }
}

function mostrarVencedor(vencedor) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = `🏆 Jogador ${vencedor} venceu com ${pontuacao[vencedor]} pontos!`;
  // Bloqueia o input após vencer
  document.getElementById("resposta").disabled = true;
  document.getElementById("temaSelect").disabled = true;
}

