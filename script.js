const temas = {};
["Filmes mais assistidos", "Músicas mais ouvidas", "Times mais valiosos", "Jogos mais vendidos", "Carros mais rápidos"].forEach((tema) => {
  temas[tema] = [];
  for (let j = 1; j <= 100; j++) {
    temas[tema].push(`${tema.split(" ")[0]} ${j}`);
  }
});

let temaAtual = "";
let jogadorAtual = 1;
let pontuacao = {1: 0, 2: 0};
let tentativas = 0;
const maxTentativas = 3;
const pontuacaoVencedor = 500;

function atualizarTemasDisponiveis() {
  const temaSelect = document.getElementById("temaSelect");
  temaSelect.innerHTML = "";
  for (let tema in temas) {
    const option = document.createElement("option");
    option.value = tema;
    option.textContent = tema;
    temaSelect.appendChild(option);
  }
}
atualizarTemasDisponiveis();

function escolherTema() {
  const select = document.getElementById("temaSelect");
  temaAtual = select.value;
  document.getElementById("temaAtual").textContent = `Tema atual: ${temaAtual}`;
  tentativas = 0;
  document.getElementById("resultado").textContent = "";
}

function animarPontuacao(jogador, pontos) {
  const el = document.getElementById(`p${jogador}`);
  let atual = parseInt(el.textContent);
  let target = pontuacao[jogador];
  let passo = Math.ceil((target - atual) / 10);
  const interval = setInterval(() => {
    atual += passo;
    if (atual >= target) { atual = target; clearInterval(interval); }
    el.textContent = atual;
  }, 50);
}

function enviarResposta() {
  if (!temaAtual) { alert("Escolha um tema antes de enviar a resposta!"); return; }
  const resposta = document.getElementById("resposta").value.trim().toLowerCase();
  if (!resposta) return;

  const lista = temas[temaAtual].map(n => n.toLowerCase());
  const index = lista.indexOf(resposta);
  let pontos = 0;
  const resultado = document.getElementById("resultado");

  if (index !== -1) {
    pontos = 101 - (index + 1);
    pontuacao[jogadorAtual] += pontos;
    resultado.textContent = `✅ Jogador ${jogadorAtual} acertou "${temas[temaAtual][index]}"! +${pontos} pontos`;
    animarPontuacao(jogadorAtual, pontos);
  } else {
    resultado.textContent = `❌ Jogador ${jogadorAtual} errou!`;
  }

  document.getElementById("resposta").value = "";
  tentativas++;

  if (tentativas >= maxTentativas) {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    document.getElementById("jogador").textContent = jogadorAtual;
    tentativas = 0;
    resultado.textContent += `\nAgora é a vez do Jogador ${jogadorAtual}`;
  }

  if (pontuacao[1] >= pontuacaoVencedor) mostrarVencedor(1);
  else if (pontuacao[2] >= pontuacaoVencedor) mostrarVencedor(2);
}

function mostrarVencedor(vencedor) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = `🏆 Jogador ${vencedor} venceu com ${pontuacao[vencedor]} pontos!`;
  document.getElementById("resposta").disabled = true;
  document.getElementById("temaSelect").disabled = true;
  const winnerBox = document.querySelector(`.player${vencedor}`);
  winnerBox.classList.add("vencedor");
}

