// Criar listas de 100 itens cada
const temas = {};

// Filmes
temas["Filmes mais assistidos"] = [];
for (let i = 1; i <= 100; i++) {
  temas["Filmes mais assistidos"].push(`Filme ${i}`);
}

// Músicas
temas["Músicas mais ouvidas"] = [];
for (let i = 1; i <= 100; i++) {
  temas["Músicas mais ouvidas"].push(`Música ${i}`);
}

// Times
temas["Times mais valiosos"] = [];
for (let i = 1; i <= 100; i++) {
  temas["Times mais valiosos"].push(`Time ${i}`);
}

// Jogos
temas["Jogos mais vendidos"] = [];
for (let i = 1; i <= 100; i++) {
  temas["Jogos mais vendidos"].push(`Jogo ${i}`);
}

// Carros
temas["Carros mais rápidos"] = [];
for (let i = 1; i <= 100; i++) {
  temas["Carros mais rápidos"].push(`Carro ${i}`);
}

// Variáveis do jogo
let temaAtual = "";
let jogadorAtual = 1;
let pontuacao = {1: 0, 2: 0};
let tentativas = 0;
const maxTentativas = 3;
const pontuacaoVencedor = 500;

// Atualiza o select com os temas
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

// Inicializa os temas
atualizarTemasDisponiveis();

// Escolher tema
function escolherTema() {
  const select = document.getElementById("temaSelect");
  temaAtual = select.value;
  document.getElementById("temaAtual").textContent = `Tema atual: ${temaAtual}`;
  tentativas = 0;
  document.getElementById("resultado").textContent = "";
}

// Enviar resposta
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
    pontos = 101 - (index + 1); // Top 1 = 100 pontos, Top 2 = 99, etc
    pontuacao[jogadorAtual] += pontos;
    resultado.textContent = `✅ Jogador ${jogadorAtual} acertou "${temas[temaAtual][index]}"! +${pontos} pontos`;
  } else {
    resultado.textContent = `❌ Jogador ${jogadorAtual} errou!`;
  }

  // Atualiza o placar
  document.getElementById("p1").textContent = pontuacao[1];
  document.getElementById("p2").textContent = pontuacao[2];
  document.getElementById("resposta").value = "";

  tentativas++;

  if (tentativas >= maxTentativas) {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    document.getElementById("jogador").textContent = jogadorAtual;
    tentativas = 0;
    document.getElementById("resultado").textContent += `\nAgora é a vez do Jogador ${jogadorAtual}`;
  }

  // Checa vencedor
  if (pontuacao[1] >= pontuacaoVencedor) mostrarVencedor(1);
  else if (pontuacao[2] >= pontuacaoVencedor) mostrarVencedor(2);
}

// Mostrar vencedor
function mostrarVencedor(vencedor) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = `🏆 Jogador ${vencedor} venceu com ${pontuacao[vencedor]} pontos!`;
  document.getElementById("resposta").disabled = true;
  document.getElementById("temaSelect").disabled = true;
}

